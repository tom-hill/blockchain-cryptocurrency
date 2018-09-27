/**
 *  Author: Tom Hill <tp.hill.uk@gmail.com>
 *  Created: Wed 26 Sep 2018
 */

const {
    expect
} = require('chai');

const Block = require('../block');
const Blockchain = require('../blockchain');

describe('The Blockchain', function () {
    let blockchain, blockchain2;

    beforeEach(function() {
        blockchain = new Blockchain();
        blockchain2 = new Blockchain();
    });

    it('should always have the genesis block as the first block in the chain', function () {
        const chain = blockchain.chain;
        expect(chain[0].toString()).to.equal(Block.genesis().toString());
    });

    it('should allow you to add new blocks to the chain', function () {
        expect(blockchain.chain.length).to.equal(1);

        blockchain.addBlock('new data');

        expect(blockchain.chain.length).to.equal(2);
        expect(blockchain.chain.pop().data).to.equal('new data');
    });

    describe('Can validate the chain', function() {
        it('Passes a valid chain', function() {
            blockchain2.addBlock('data');
            expect(blockchain.isValidChain(blockchain2.chain)).to.be.true;
        });

        it('Throws an error if the chain has an invalid genesis block', function() {
            blockchain2.chain[0].data = 'invalid data';

            expect(blockchain.isValidChain.bind(blockchain, blockchain2.chain)).to.throw('Genesis block is not valid');
        });

        it('Throws and error if a non-genesis block has been corrupted', function() {
            blockchain2.addBlock('data');
            blockchain2.chain[1].data = 'invalid data';

            expect(blockchain.isValidChain.bind(blockchain, blockchain2.chain)).to.throw('Blocks hash does not match the expected hash for the block');
        });
    });

    describe('Updating the chain', function() {
        it('Can update the chain', function() {
            blockchain2.addBlock('new data');
            blockchain.updateChain(blockchain2.chain);

            expect(blockchain.chain).to.deep.equal(blockchain2.chain);
        });

        it('Throws an error if the chains are the same length', function() {
            blockchain.addBlock('chain 1');
            blockchain2.addBlock('chain 2');

            // Ensure they are different
            expect(blockchain.chain).to.not.deep.equal(blockchain2.chain);
            // Ensure they are the same length
            expect(blockchain.chain.length).to.equal(blockchain2.chain.length);
            // Check error
            expect(blockchain.updateChain.bind(blockchain, blockchain2.chain)).to.throw('The new chain is not longer than the current chain');
        });

        it('Throws an error if the chains are identical', function() {
            blockchain.addBlock('data');
            blockchain2.chain = blockchain.chain;

            // Check they're identical first
            expect(blockchain.chain).to.deep.equal(blockchain2.chain);
            // Check Error
            expect(blockchain.updateChain.bind(blockchain, blockchain2.chain)).to.throw('The new chain is the same as the current chain');
        });
    });
});