const {
    expect
} = require('chai');

const Transaction = require('../transaction');
const Wallet = require('../index');

describe('Transactions', function() {
  let transaction, wallet, recipient, amount;

  beforeEach(function() {
    wallet = new Wallet();
    amount = 10;
    recipient = 'r3c1p13nt';
  });

  it ('input balance is euqal to the wallet balance', function() {
    const t = Transaction.newTransaction(wallet, recipient, amount);
    expect(t.input.amount).to.equal(wallet.balance);
  });

  it ('can create new transactions', function() {
    const t = Transaction.newTransaction(wallet, recipient, amount);
    expect(t instanceof Transaction).to.equal(true);
    expect(t.outputs.length).to.equal(2);
    expect(t.outputs[0].amount).to.equal(wallet.balance - amount);
    expect(t.outputs[1]).to.deep.equal({
      amount,
      address: recipient
    });
  });

  it ('throws an error if the user does not have enough currency', function() {
    const err = `Ammount ${wallet.balance + 100} exceeds senders available balance ${wallet.balance}`;
    expect(Transaction.newTransaction.bind(Transaction, wallet, recipient, (wallet.balance + 100))).to.throw(err);
  });

  it ('can verify if a transation is valid', function() {
    const t = Transaction.newTransaction(wallet, recipient, amount);
    expect(Transaction.verifyTransaction(t)).to.equal(true);
    t.outputs[0].amount = 999888777666555444333222111;
    expect(Transaction.verifyTransaction(t)).to.equal(false);
  });
});
