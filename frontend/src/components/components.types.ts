export type GoApiResponse<T> = {
  data: T;
  error: string;
};
export type GoApiErr = string;

export type Architecture = 1 | 2;
export type Process = {
  name: string;
  pid: number;
  arch: Architecture;
};
