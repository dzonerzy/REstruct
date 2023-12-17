export type GoBinds = {
  GetProcesses: () => Promise<GoApiResponse<Process[]>>;
  TerminateProcess: (pid: number) => Promise<GoApiResponse<number>>;
};
export type GoApiResponse<T> = {
  data: T;
  error: GoApiErr;
};
export type GoApiErr = null | string;

export type Architecture = 0 | 1 | 2;
export type Process = {
  desc: string;
  icon: string;
  name: string;
  pid: number;
  arch: Architecture;
};
