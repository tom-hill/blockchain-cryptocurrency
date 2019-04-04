const { INITIAL_BALANCE } = require('../project.consts');
import ChainUtil from '../chain-util';

class Wallet {
  /**
   * Create a wallet with an initial balance and a private and public key
   */
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.generateKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  /**
   * A method to return a string representation of the wallet instance
   * @return {string} A string representation of the wallet
   */
  toString() {
    return `Wallet -
      publicKey: ${this.publicKey},
      balance  : ${this.balance}`;
  }
}

module.export = Wallet;
