/**
 *  Author: Tom Hill <tp.hill.uk@gmail.com>
 *  Created: Thu 27 Sep 2018
 */

const Block = require('./block');

/**
 * The main Blockchain class
 */
class Index {
  /**
   * Set up the initial chain with the genesis block
   */
  constructor() {
    this.chain = [Block.genesis()];
  }

  /**
   * Method to add a new block to the chain
   * @param  {string} data the data to save to the block
   * @return {block}       the block that was just added
   */
  addBlock(data) {
    const lastBlock = this.chain[this.chain.length - 1];
    const newBlock = Block.mineBlock(lastBlock, data);

    if (!newBlock instanceof Block) throw new Error('There was a problem adding the block');

    this.chain.push(newBlock);

    return newBlock;
  }

  /**
   * A method to check the validity of the chain
   * @param  {array}   chain The current chain
   * @return {Boolean}       A bool representing the validity of the chain
   */
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

  /**
   * A method to replace the exisiting chain with a new valid chain
   * @param  {array} newChain The new chain
   * @return {array}          The updated chain
   */
  updateChain(newChain) {
    if (JSON.stringify(newChain) === JSON.stringify(this.chain)) throw new Error('The new chain is the same as the current chain');
    if (newChain.length <= this.chain.length) throw new Error('The new chain is not longer than the current chain');

    try {
      this.isValidChain(newChain)
    } catch (err) {
      throw new Error(err);
    }

    this.chain = newChain;

    return this.chain;
  }
}

module.exports = Index;
