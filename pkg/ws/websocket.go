package ws

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

var (
	// Upgrader is a websocket upgrader
	Upgrader = websocket.Upgrader{}
)

type WebSocketServer struct {
	addr string
	port int
}

func (s *WebSocketServer) handler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("New connection")
	Upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	conn, err := Upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Failed to upgrade connection", err)
		return
	}
	defer conn.Close()
	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			fmt.Println("Failed to read message")
			return
		}
		fmt.Printf("Message received: %s\n", msg)
		err = conn.WriteMessage(websocket.TextMessage, msg)
		if err != nil {
			fmt.Println("Failed to write message")
			return
		}
	}
}

func (s *WebSocketServer) Start() {
	http.HandleFunc("/", s.handler)
	go http.ListenAndServe(fmt.Sprintf("%s:%d", s.addr, s.port), nil)
}

func NewServer(addr string, port int) *WebSocketServer {
	return &WebSocketServer{
		addr: addr,
		port: port,
	}
}
