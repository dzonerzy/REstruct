package ws

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/gorilla/websocket"
	"golang.org/x/sync/errgroup"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type WebSocketServer struct {
	ctx      context.Context
	errgroup *errgroup.Group
	srv      *http.Server
	iface    string
	port     int
}

func NewWebSocketServer(iface string, port int) *WebSocketServer {
	mainCtx, _ := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	errgroup, ctx := errgroup.WithContext(mainCtx)
	return &WebSocketServer{
		iface: iface,
		port:  port,
		srv: &http.Server{
			Addr: fmt.Sprintf("%s:%d", iface, port),
			Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				log.Printf("Connection received: %s\n", r.RemoteAddr)

				conn, err := upgrader.Upgrade(w, r, nil)

				if err != nil {
					log.Printf("Error upgrading connection: %s\n", err.Error())
					return
				}

				log.Printf("Connection established: %s\n", conn.RemoteAddr().String())

				for {
					select {
					case <-ctx.Done():
						log.Printf("Context done: %s\n", ctx.Err().Error())
						return
					default:
						_, msg, err := conn.ReadMessage()

						if err != nil {
							log.Printf("Error reading message: %s\n", err.Error())
							return
						}

						var generic GenericMessage
						err = json.Unmarshal(msg, &generic)
						if err != nil {
							log.Printf("Error unmarshalling message: %s message was: %s\n", err.Error(), string(msg))
							continue
						}

						log.Printf("Message with command %d received\n", generic.Command)

						switch generic.Command {
						case COMMAND_ATTACH:
							var attach MessageAttach
							err = json.Unmarshal(msg, &attach)
							if err != nil {
								log.Printf("Error unmarshalling message: %s\n", err.Error())
								continue
							}
							log.Printf("Attach message received: %d\n", attach.ProcessId)
						case COMMAND_DETACH:
							var detach MessageDetach
							err = json.Unmarshal(msg, &detach)
							if err != nil {
								log.Printf("Error unmarshalling message: %s\n", err.Error())
								continue
							}
							log.Printf("Detach message received: %d\n", detach.ProcessId)
						default:
							log.Printf("Unknown message received: %s\n", string(msg))
						}
					}
				}

			}),
			BaseContext: func(_ net.Listener) context.Context {
				return mainCtx
			},
		},
		errgroup: errgroup,
		ctx:      ctx,
	}
}

func (w *WebSocketServer) Start() error {
	w.errgroup.Go(func() error {
		log.Printf("Starting websocket server on %s:%d\n", w.iface, w.port)
		return w.srv.ListenAndServe()
	})
	return nil
}

func (w *WebSocketServer) Stop() error {
	w.srv.Shutdown(w.ctx)
	return w.errgroup.Wait()
}
