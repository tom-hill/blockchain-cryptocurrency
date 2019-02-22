/**
 *     Author: Tom Hill <tp.hill.uk@gmail.com>
 *     Created: Wed 26 Sep 2018
 */

const SHA3 = require('crypto-js/sha3');

const DIFFICULTY = 4;

class Block {
    static genesis() {
        const timestamp = 'Genesis Timestamp';
        const lastHash = SHA3('No previous hash').toString();
        const hash = Block.generateHash(timestamp, lastHash, []);
        return new this(timestamp , lastHash, hash, [], 0);
    }

    static mineBlock(lastBlock, data) {
        let hash, timestamp;
        const lastHash = lastBlock.hash;

        let nonce = 0;
        do {
            nonce ++;
            timestamp = +new Date();
            hash = Block.generateHash(timestamp, lastHash, data, nonce);
        } while (hash.substr(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));

        return new this(timestamp, lastHash, hash, data, nonce);
    }

    static generateHash(timestamp, lasthash, data, nonce) {
        return SHA3(`${timestamp}${lasthash}${data}${nonce}`).toString();
    }

    static getBlockHash(block) {
        const {
            timestamp,
            lastHash,
            data,
          nonce
        } = block;

        return Block.generateHash(timestamp, lastHash, data, nonce);
    }

    constructor(timestamp, lastHash, hash, data, nonce) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }

    toString() {
        return `Block -
            Timestamp: ${this.timestamp}
            Last Hash: ${this.lastHash.toString()}
            Hash     : ${this.hash.toString()}
            Data     : ${this.data}
            Nonce    : ${this.nonce}`;
    }

    getGenesis() {
        return Block.genesis();
    }
}

module.exports = Block;
