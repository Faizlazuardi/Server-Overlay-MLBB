const http = require('http');
const app = require('./app'); // Import API dari app.js
const { setupWebSocket } = require('./websocket'); // Import WebSocket setup

const server = http.createServer(app); // Gunakan satu server HTTP
const PORT = 3000; // Semua berjalan di port 3000

setupWebSocket(server); // Jalankan WebSocket di server yang sama

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
