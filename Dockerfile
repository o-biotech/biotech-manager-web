FROM denoland/deno:1.38.3
ARG VERSION
ENV DENO_DEPLOYMENT_ID=${VERSION}
ENV SECURE_API_SECRET=${INPUT_SECURE_API_SECRET}

WORKDIR /app

COPY . .
RUN deno cache main.ts

EXPOSE 8000

CMD ["run", "-A", "--unstable-kv", "main.ts"]