/**
 *  Author: Tom Hill <tp.hill.uk@gmail.com>
 *  Created: Wed 26 Sep 2018
 */

const SHA3 = require('crypto-js/sha3');
const {
    expect
} = require('chai');

const Block = require('../block.js');

describe('The Block class', function () {
    describe('The Genesis Block', function () {
        const genesis = Block.genesis();

        it('Should return expected data', function () {
            const timestamp = 'Genesis Timestamp';
            const lastHash = SHA3('No previous hash').toString();
            const hash = Block.generateHash(timestamp, lastHash, []);

            expect(genesis.timestamp).to.equal(timestamp);
            expect(genesis.lastHash).to.deep.equal(lastHash);
            expect(genesis.hash).to.deep.equal(hash);
            expect(genesis.data).to.deep.equal([]);
        });

        it('Should always have the same values', function () {
            // Unary + triggers a valueOf() on the new Date() instance
            const newGenesis = new Block(+new Date(), 'l45t-h45h', 'n3w-h45h', []).getGenesis();

            expect(newGenesis.timestamp).to.equal(genesis.timestamp);
            expect(newGenesis.lastHash).to.deep.equal(genesis.lastHash);
            expect(newGenesis.hash).to.deep.equal(genesis.hash);
            expect(newGenesis.data).to.deep.equal(genesis.data);
            expect(newGenesis.toString()).to.equal(genesis.toString());
        });
    });

    describe('A New Instance', function () {
        const timestamp = +new Date();
        const lastHash = SHA3('0123456789876543210').toString();
        const data = JSON.stringify({
            data: 'some data'
        });
        const hash = Block.generateHash(timestamp, lastHash, data);

        const block = new Block(timestamp, lastHash, hash, data);

        it('Returns the correct data from its getters', function () {
            expect(block.timestamp).to.equal(timestamp);
            expect(block.lastHash).to.equal(lastHash);
            expect(block.hash).to.equal(hash);
            expect(block.data).to.equal(data);
        });

        it('Can describe itself with a toString() method', function () {
            expect(block.toString()).to.equal(`Block -
            Timestamp: ${timestamp}
            Last Hash: ${lastHash.toString()}
            Hash     : ${hash.toString()}
            Data     : ${data}`);
        });
    });

    it('Can mine new blocks', function () {
        const data = ['some-data'];
        const block = Block.mineBlock(Block.genesis(), data);

        expect(block).to.be.instanceOf(Block);
        expect(block.data).to.deep.equal(data);
        expect(block.lastHash).to.deep.equal(Block.genesis().hash);
    });

    it('Can get the hash from a block', function() {
        const originalBlock = Block.genesis();
        const blockHash = Block.getBlockHash(originalBlock);

        expect(originalBlock.hash).to.deep.equal(blockHash);
    });
});