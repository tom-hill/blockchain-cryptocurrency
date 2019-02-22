/**
 *     Author: Tom Hill <tp.hill.uk@gmail.com>
 *     Created: Wed 26 Sep 2018
 */
const { DIFFICULTY, MINE_RATE } = require('./project.consts');
const SHA3 = require('crypto-js/sha3');

class Block {
    static genesis() {
        const timestamp = 'Genesis Timestamp';
        const lastHash = SHA3('No previous hash').toString();
        const hash = Block.generateHash(timestamp, lastHash, []);
        return new this(timestamp , lastHash, hash, [], 0, DIFFICULTY);
    }

    static mineBlock(lastBlock, data) {
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;

        let nonce = 0;
        do {
            nonce ++;
            timestamp = +new Date();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.generateHash(timestamp, lastHash, data, nonce, difficulty);
        } while (hash.substr(0, difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    static generateHash(timestamp, lasthash, data, nonce, difficulty) {
        return SHA3(`${timestamp}${lasthash}${data}${nonce}${difficulty}`).toString();
    }

    static getBlockHash(block) {
        const {
            timestamp,
            lastHash,
            data,
            nonce,
            difficulty
        } = block;

        return Block.generateHash(timestamp, lastHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime) {
        let { difficulty, timestamp } = lastBlock;
        const rate = timestamp + MINE_RATE;
        if (rate > currentTime) {
            difficulty++
        } else if (rate < currentTime) {
            difficulty--
        }

        return difficulty;
    }

    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString() {
        return `Block -
            Timestamp : ${this.timestamp}
            Last Hash : ${this.lastHash.toString()}
            Hash      : ${this.hash.toString()}
            Data      : ${this.data}
            Nonce     : ${this.nonce}
            Difficulty: ${this.difficulty}`;
    }

    getGenesis() {
        return Block.genesis();
    }
}

module.exports = Block;
