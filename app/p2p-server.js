const Socket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const PEERS =  process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
    }

    listen() {
        const server = new Socket.Server({
            port: P2P_PORT
        });

        server.on('connection', socket => this.connectSocket(socket));

        this.connectToPeers();

        console.log(`Server listening for p2p connections on port :${P2P_PORT}`);
    }

    connectSocket(socket) {
        this.sockets.push(socket);
        console.log(`A new socket has been connected: ${socket}`);

        this.handleMessage(socket);

        socket.send(JSON.stringify(this.blockchain.chain));
    }

    connectToPeers() {
        PEERS.forEach((peer) => {
            const socket = new Socket(peer);

            socket.on('open', () => this.connectSocket(socket));
        });
    }

    handleMessage(socket) {
        socket.on('message', (msg) => {
            const messageObj = JSON.parse(msg);
        });
    }
}

module.exports = P2pServer;