export type MSALAuthSession = {
  clear(): any;

  get(key: string): any;

  has(key: string): boolean;

  set(key: string, value: any): any;
};
