const Socket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const PEERS =  process.env.PEERS ? process.env.PEERS.split(',') : [];

/**
 * A simple P2P server class.
 */
class P2pServer {
    /**
     * Create a Peer To Peer sever.
     * @param {Blockchain} blockchain The blockchain to use on the server
     */
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
    }

    /**
     * Start a socket server on the given port and listen for connections
     * @return {console log} Log the output of the connection to the terminal
     */
    listen() {
        const server = new Socket.Server({
            port: P2P_PORT
        });

        server.on('connection', socket => this.connectSocket(socket));

        this.connectToPeers();

        console.log(`Server listening for p2p connections on port :${P2P_PORT}`);
    }

    /**
     * Connect a new socket to the server
     * @param  {object} socket The socket object to connect to the server
     */
    connectSocket(socket) {
        this.sockets.push(socket);
        console.log(`A new socket has been connected: ${socket}`);

        this.handleMessage(socket);

        socket.send(JSON.stringify(this.blockchain.chain));
    }

    /**
     * Connect to exisiting peer sockets
     */
    connectToPeers() {
        PEERS.forEach((peer) => {
            const socket = new Socket(peer);

            socket.on('open', () => this.connectSocket(socket));
        });
    }

    /**
     * Receive messages from other sockets
     * @param  {object} socket The socket to listen for messages on
     */
    handleMessage(socket) {
        socket.on('message', (msg) => {
            const messageObj = JSON.parse(msg);
        });
    }
}

module.exports = P2pServer;
