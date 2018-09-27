/**
 *  Author: Tom Hill <tp.hill.uk@gmail.com>
 *  Created: Thu 27 Sep 2018
 */

const Block = require('./block');

class Index {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock(data) {
        const lastBlock = this.chain[this.chain.length - 1];
        const newBlock = Block.mineBlock(lastBlock, data);

        if(!newBlock instanceof Block) throw new Error('There was a problem adding the block');

        this.chain.push(newBlock);

        return newBlock;
    }

    isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) throw new Error('Genesis block is not valid');

        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i - 1];

            if (block.lastHash !== lastBlock.hash) throw new Error('Blocks lastHash does not match previous blocks hash');
            if (block.hash.toString() !== Block.getBlockHash(block).toString()) throw new Error('Blocks hash does not match the expected hash for the block');
        }

        return true;
    }

    updateChain(newChain) {
        if (JSON.stringify(newChain) === JSON.stringify(this.chain)) throw new Error('The new chain is the same as the current chain');
        if (newChain.length <= this.chain.length) throw new Error('The new chain is not longer than the current chain');

        try {
            this.isValidChain(newChain)
        } catch(err) {
            throw new Error(err);
        }

        this.chain = newChain;

        return this.chain;
    }
}

module.exports = Index;