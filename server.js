const http = require('http');
const PORT = 8080;
const app = require('./app');
const { setupWebSocket } = require('./websocket');

const server = http.createServer(app);
setupWebSocket(server);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
