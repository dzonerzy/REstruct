type WSObject = {
  _ws: any;
  [key: string | symbol | number]: any;
};

export const WS: WSObject = {
  _ws: null,
  open: (url: string): any => {
    WS._ws = new WebSocket(url);
    return WS._ws;
  },
  close: () => {},
  error: () => {},
  message: () => {},
  send: () => {},
};
