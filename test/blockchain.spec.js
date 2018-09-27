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
    let blockchain;

    beforeEach(function() {
        blockchain = new Blockchain();
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
});