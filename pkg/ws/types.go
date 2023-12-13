package ws

type WebSocketServer struct {
	addr string
	port int
}

func (s *WebSocketServer) Start() error {
	return nil
}

func NewServer(addr string, port int) *WebSocketServer {
	return &WebSocketServer{
		addr: addr,
		port: port,
	}
}
