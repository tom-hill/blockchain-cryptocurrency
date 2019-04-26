const ChainUtil = require('../chain-util');
const { DIFFICULTY, MINE_RATE } = require('../project.consts');

/**
 * A class for creating/controlling blocks in a blockchain
 */
class Block {
    /**
     * Generate the initial 'genesis' block of the chain.
     * @return {block} The initial block for the chain
     */
    static genesis() {
        const timestamp = 'Genesis Timestamp';
        const lastHash = ChainUtil.hash('No previous hash');
        const hash = Block.generateHash(timestamp, lastHash, [], 0, DIFFICULTY);
        return new this(timestamp , lastHash, hash, [], 0, DIFFICULTY);
    }

    /**
     * A method to mine a new block and add it to the chain.
     * @param  {block}  lastBlock The last block on the chain when work was started
     * @param  {object} data      The data to be stored in the block
     * @return {block}            The new block added to the chain.
     */
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

    /**
     * Generate a new hash for the block based on it's content
     * @param  {string} timestamp  The timestamp for the block
     * @param  {string} lasthash   The hash from the last block on the chain
     * @param  {string} data       The data for the block
     * @param  {string} nonce      The nonce used when creating the block
     * @param  {string} difficulty The difficulty level used when creating the block
     * @return {string}            A hash describing the block and its data
     */
    static generateHash(timestamp, lasthash, data, nonce, difficulty) {
        return ChainUtil.hash(`${timestamp}${lasthash}${data}${nonce}${difficulty}`);
    }

    /**
     * A method to get the hash for a given block
     * @param  {block}  block The block we want the hash for
     * @return {string}       The hash for the given block of data
     */
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

    /**
     * Method to adjust the difficulty level of block generation
     * @param  {block}  lastBlock   The last block on the chain
     * @param  {string} currentTime The current time
     * @return {number}             The difficulty rate to be used
     */
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

    /**
     * Setup the class with the data required for block generation
     * @param {string} timestamp  The current time
     * @param {string} lastHash   The hash of the last block on the chain
     * @param {string} hash       The hash of the block
     * @param {string} data       The data to be stored on the block
     * @param {number} nonce      The current nonce
     * @param {number} difficulty The level of difficulty for solving the block
     */
    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    /**
     * A method to return a string representation of the current block
     * @return {string} A string representation of the block.
     */
    toString() {
        return `Block -
            Timestamp : ${this.timestamp}
            Last Hash : ${this.lastHash.toString()}
            Hash      : ${this.hash.toString()}
            Data      : ${this.data}
            Nonce     : ${this.nonce}
            Difficulty: ${this.difficulty}`;
    }

    /**
     * A method to get the original genesis block of the chain
     * @return {block} The genesis block
     */
    getGenesis() {
        return Block.genesis();
    }
}

module.exports = Block;
