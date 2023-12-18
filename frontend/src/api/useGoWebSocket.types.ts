enum Command {
  ATTACH = 0,
  DETACH = 1,
}

export interface GenericMessage {
  serialize(): object;
}

export class MessageAttach implements GenericMessage {
  constructor(public pid: number) {}

  serialize() {
    return { command: Command.ATTACH, processId: this.pid };
  }
}

export class MessageDetach implements GenericMessage {
  constructor(public pid: number) {}

  serialize() {
    return { command: Command.DETACH, processId: this.pid };
  }
}
