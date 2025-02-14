const http = require("http");
const WebSocket = require("ws");
const app = require("./app");
const { fetchSpreadsheetData } = require("./services/spreadsheetService");

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

server.on("upgrade", (request, socket, head) => {
    if (request.url === "/ingame") {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit("connection", ws, request);
        });
    } else {
        socket.destroy();
    }
});

wss.on("connection", async (ws) => {
    try {
        const data = await fetchSpreadsheetData();
        ws.send(JSON.stringify(data));
    } catch (error) {
        ws.send(JSON.stringify({ error: "Failed to fetch data" }));
    }
    
    const interval = setInterval(async () => {
        try {
            const newData = await fetchSpreadsheetData();
            ws.send(JSON.stringify(newData));
        } catch (error) {
            console.error("Error updating data:", error);
        }
    }, 500);

    ws.on("message", async (message) => {
        console.log("Received from client:", message);
        if (message === "update") {
            try {
                const updatedData = await fetchSpreadsheetData();
                ws.send(JSON.stringify(updatedData));
            } catch (error) {
                ws.send(JSON.stringify({ error: "Failed to fetch updated data" }));
            }
        }
    });
    
    ws.on("close", () => {
        clearInterval(interval);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});