import { INITIAL_BALANCE } from '../project.consts';

export default class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = null;
    this.publicKey = null;
  }

  toString() {
    return `Wallet -
      publicKey: ${this.publicKey},
      balance  : ${this.balance}`;
  }
}
