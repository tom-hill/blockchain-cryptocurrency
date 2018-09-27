/**
 *  Author: Tom Hill <tp.hill.uk@gmail.com>
 *  Created: Wed 26 Sep 2018
 */

const Block = require('../block.js');

const {
    expect
} = require('chai');

describe('The Block class', function () {
    describe('The Genesis Block', function () {
        const genesis = Block.genesis();

        it('Should return expected data', function () {
            expect(genesis.getTimestamp()).to.equal('Genesis Timestamp');
            expect(genesis.getLastHash()).to.equal('n0l45t-h45h');
            expect(genesis.getHash()).to.equal('g3n3515-h45h');
            expect(genesis.getData()).to.deep.equal([]);
        });

        it('Should always have the same values', function () {
            const newGenesis = new Block(+new Date(), 'l45t-h45h', 'n3w-h45h', []).getGenesis();

            expect(newGenesis.getTimestamp()).to.equal(genesis.getTimestamp());
            expect(newGenesis.getLastHash()).to.equal(genesis.getLastHash());
            expect(newGenesis.getHash()).to.equal(genesis.getHash());
            expect(newGenesis.getData()).to.deep.equal(genesis.getData());
            expect(newGenesis.toString()).to.equal(genesis.toString());
        });
    });

    describe('A New Instance', function () {
        const timestamp = +new Date(); // Unary + triggers a valueOf() on the new Date() instance
        const lastHash = '0123456789876543210';
        const hash = '1234567890987654321';
        const data = JSON.stringify({
            data: 'some data'
        });

        const block = new Block(timestamp, lastHash, hash, data);

        it('Returns the correct data from its getters', function () {
            expect(block.getTimestamp()).to.equal(timestamp);
            expect(block.getLastHash()).to.equal(lastHash);
            expect(block.getHash()).to.equal(hash);
            expect(block.getData()).to.equal(data);
        });

        it('Can describe itself with a toString() method', function () {
            expect(block.toString()).to.equal(`Block -
            Timestamp: ${timestamp}
            Last Hash: ${lastHash.substr(0, 10)}
            Hash     : ${hash.substr(0, 10)}
            Data     : ${data}`);
        });
    });

    it('Can mine new blocks', function () {
        const data = ['some-data'];
        const block = Block.mineBlock(Block.genesis(), data);

        expect(block).to.be.instanceOf(Block);
        expect(block.getData()).to.deep.equal(data);
        expect(block.getLastHash()).to.equal(Block.genesis().getHash());
    });
});