const {
    expect
} = require('chai');

const Wallet = require('../index');
const { INITIAL_BALANCE } = require('../../project.consts');

describe('The wallet', function() {
  let wallet;

  beforeEach(function() {
    wallet = new Wallet();
  });

  it ('can create a wallet instance', function() {
    expect(wallet instanceof Wallet).to.equal(true);
  });

  it ('has an initial balance', function() {
    expect(wallet.balance).to.equal(INITIAL_BALANCE);
  });

  it ('has a keypair and public key', function() {
    expect(wallet.keyPair).to.not.equal(undefined);
    expect(wallet.publicKey.length > 0).to.equal(true);
  });

  it ('can represent itself as a sting', function() {
    expect(wallet.toString()).to.equal(`Wallet -
      publicKey: ${wallet.publicKey},
      balance  : ${wallet.balance}`);
  })
});
