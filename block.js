/**
 *     Author: Tom Hill <tp.hill.uk@gmail.com>
 *     Created: Wed 26 Sep 2018
 */

const SHA3 = require('crypto-js/sha3');

class Block {
    static genesis() {
        const timestamp = 'Genesis Timestamp';
        const lastHash = SHA3('No previous hash');
        const hash = Block.generateHash(timestamp, lastHash, []);
        return new this(timestamp , lastHash, hash, []);
    }

    static mineBlock(lastBlock, data) {
        const timestamp = +new Date();
        const lastHash = lastBlock.hash;
        const hash = Block.generateHash(timestamp, lastHash, data);

        return new this(timestamp, lastHash, hash, data);
    }

    static generateHash(timestamp, lasthash, data) {
        return SHA3(`${timestamp}${lasthash}${data}`);
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
            Last Hash: ${this.lastHash.toString()}
            Hash     : ${this.hash.toString()}
            Data     : ${this.data}`;
    }

    getGenesis() {
        return Block.genesis();
    }
}

module.exports = Block;