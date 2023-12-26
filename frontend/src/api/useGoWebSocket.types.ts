import { getRandomInt } from "../utils/numbers";

export enum Command {
  ATTACH = 0,
  DETACH = 1,
}

export type GoWsResponse = {
  rId: number;
  error: null | string;
  command: Command;
  success: boolean;
};

export type GoWsRequest<T extends Command> = {
  id: number;
  command: T;
  [key: PropertyKey]: any;
};

export interface GenericMessage {
  serialize(): GoWsRequest<Command>;
}

export class MessageAttach implements GenericMessage {
  constructor(public pid: number) {}

  serialize(): GoWsRequest<Command.ATTACH> {
    return { id: getRandomInt(), command: Command.ATTACH, processId: this.pid };
  }
}

export class MessageDetach implements GenericMessage {
  constructor(public pid: number) {}

  serialize(): GoWsRequest<Command.DETACH> {
    return { id: getRandomInt(), command: Command.DETACH, processId: this.pid };
  }
}
