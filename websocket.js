const WebSocket = require("ws");
const { fetchSpreadsheetData } = require("./services/spreadsheetService");

function setupWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", async (ws) => {
        console.log("Client connected to WebSocket");

        try {
            const data = await fetchSpreadsheetData();
            ws.send(JSON.stringify(data));
        } catch (error) {
            ws.send(JSON.stringify({ error: "Failed to fetch data" }));
        }

        // Kirim update setiap 500ms
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
            console.log("Client disconnected");
            clearInterval(interval);
        });
    });

    console.log("WebSocket server is running.");
}

module.exports = { setupWebSocket };
