const { INITIAL_BALANCE } = require('../project.consts');
const ChainUtil = require('../chain-util');

/**
 * Class to create and control wallets
 */
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
   * A method to create a signature
   * @param  {string} data A hashed version of the data we want to sign
   * @return {string}      The signature for the signed data
   */
  sign(data) {
    return this.keyPair.sign(data);
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

module.exports = Wallet;
