export type GoApiResponse<T> = {
  data: T;
  error: GoApiErr;
};
export type GoApiErr = null | string;

export type Architecture = 1 | 2;
export type Process = {
  desc: string;
  icon: string;
  name: string;
  pid: number;
  arch: Architecture;
};
