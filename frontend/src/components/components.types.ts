export type GoResponse = {
    data: any;
    error: string;
}

export type Architecture = 1 | 2;

export type Process = {
    name: string;
    pid: number;
    arch: Architecture;
}
