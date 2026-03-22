import { SERVER_CONFIG } from "./server-config";
import indexHtml from "../../public/index.html";
import { generateUuid } from "../utils/generate-uuid";
import type { WebSocketData } from "../types";

Bun.serve<WebSocketData>({
  port: SERVER_CONFIG.port,
  routes: {
    "/": indexHtml,
  },
  fetch(req, server) {

    // identificar nuestro clientes
    const clientId = generateUuid();

    const upgraded = server.upgrade(req, {
        data:{
            clientId: clientId
        }
    });

    if (upgraded) {
        return undefined;
    }

    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    data: {
        
    } as WebSocketData,
    message(ws, message) {}, // a message is received
    open(ws) {}, // a socket is opened
    close(ws, code, message) {}, // a socket is closed
    drain(ws) {}, // the socket is ready to receive more data
  },
});
