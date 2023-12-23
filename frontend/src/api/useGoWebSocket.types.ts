import { getRandomInt } from "../utils/numbers";

enum Command {
  ATTACH = 0,
  DETACH = 1,
}

export type GoWsResponse = {
  rId: number;
  error: null | string;
  command: Command;
  success: boolean;
};

export interface GenericMessage {
  serialize(): object;
}

export class MessageAttach implements GenericMessage {
  constructor(public pid: number) {}

  serialize() {
    return { id: getRandomInt(), command: Command.ATTACH, processId: this.pid };
  }
}

export class MessageDetach implements GenericMessage {
  constructor(public pid: number) {}

  serialize() {
    return { id: getRandomInt(), command: Command.DETACH, processId: this.pid };
  }
}
