import { create, decode, getNumericDate, verify } from "@djwt";
import { JWTConfig } from "@fathym/eac";

export const jwtConfig: JWTConfig = {
  Algorithm: { name: "HMAC", hash: "SHA-512" } as AlgorithmIdentifier,
  async Create(data: Record<string, unknown>, expTime?: number) {
    const jwt = await create(
      { alg: "HS512", typ: "JWT" },
      { exp: getNumericDate(expTime || this.ExpirationTime), ...data },
      await this.SecretKey(),
    );

    return jwt;
  },
  async Decode<T>(
    token: string,
  ): Promise<[header: unknown, payload: T, signature: Uint8Array]> {
    const [header, payload, signature] = await decode(token);

    return [header, payload as T, signature];
  },
  ExpirationTime: 60 * 60 * 24 * 365 * 5, // 5 years
  Header: "Authorization",
  JWK: JSON.parse(Deno.env.get("SECURE_API_SECRET") || "") as JsonWebKey,
  KeyUsages: ["sign", "verify"] as KeyUsage[],
  LoadToken(req: Request) {
    const jwtHeader = req.headers.get(jwtConfig.Header);

    const jwtToken = jwtHeader?.replace(`${jwtConfig.Schema} `, "");

    return jwtToken;
  },
  async SecretKey() {
    return await crypto.subtle.importKey(
      "jwk",
      this.JWK,
      this.Algorithm,
      true,
      this.KeyUsages,
    );
  },
  Schema: "Bearer",
  Type: "JWT",
  async Verify(token: string) {
    const verified = await verify(token, await this.SecretKey());

    return verified;
  },
};
