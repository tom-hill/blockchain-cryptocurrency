/**
 *     Author: Tom Hill <tp.hill.uk@gmail.com>
 *     Created: Wed 26 Sep 2018
 */

class Block {
    static genesis() {
        return new this('Genesis Timestamp', 'n0l45t-h45h', 'g3n3515-h45h', []);
    }

    static mineBlock(lastBlock, data) {
        const timestamp = +new Date();
        const lastHash = lastBlock.getHash();
        const hash = 'newhash' //todo: update this with an actual hash

        return new this(timestamp, lastHash, hash, data);
    }

    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    toString() {
        return `Block -
            Timestamp: ${this.timestamp}
            Last Hash: ${this.lastHash.substr(0,10)}
            Hash     : ${this.hash.substr(0, 10)}
            Data     : ${this.data}`;
    }

    getTimestamp() {
        return this.timestamp;
    }

    getLastHash() {
        return this.lastHash;
    }

    getHash() {
        return this.hash;
    }

    getData() {
        return this.data;
    }

    getGenesis() {
        return Block.genesis();
    }
}

module.exports = Block;