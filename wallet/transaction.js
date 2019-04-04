const ChainUtil = require('../chain-util');

/**
 * A class for controlling transactions between wallets
 */
class Transaction {
  /**
   * A method to create a transation between two wallets.
   * @param  {object}   senderWallet The wallet of the sender
   * @param  {string}   recipient    The recipient wallet address
   * @param  {number}   amount       The amount to be transacted
   * @return {instance}              The instance of the transaction
   */
  static newTransaction(senderWallet, recipient, amount) {
    const transaction = new this();

    if (amount > senderWallet.balance) {
      const error = `Ammount ${amount} exceeds senders available balance ${senderWallet.balance}`;
      throw new Error(error);
    }

    transaction.outputs.push(...[
      {
        amount: senderWallet.balance - amount,
        address: senderWallet.publicKey
      },
      {
        amount,
        address: recipient
      }
    ]);

    Transaction.signTransaction(transaction, senderWallet);

    return transaction;
  }

  static signTransaction(transaction, wallet) {
    transaction.input = {
      timestamp: +new Date(),
      amount: wallet.balance,
      address: wallet.publicKey,
      signature: wallet.sign(ChainUtil.hash(transaction.outputs))
    }
  }

  /**
   * Constructor to create a transaction instance
   */
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }
}

module.exports = Transaction;
