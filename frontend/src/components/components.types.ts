export type GoApiResponse = {
  data: any;
  error: string;
};
export type GoApiErr = string;

export type Architecture = 1 | 2;
export type Process = {
  desc: string;
  icon: string;
  name: string;
  pid: number;
  arch: Architecture;
};
