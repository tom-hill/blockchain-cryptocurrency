/**
 *  Author: Tom Hill <tp.hill.uk@gmail.com>
 *  Created: Thu 27 Sep 2018
 */

const Block = require('./block');

class Blockchain {
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
}

module.exports = Blockchain;