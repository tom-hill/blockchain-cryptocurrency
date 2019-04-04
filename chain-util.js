const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const uuidV1 = require('uuid/v1');

/**
 * A utility class for maintining the chain
 */
class ChainUtil {
  /**
   * Generate a new private public key pair
   * @return {object} A secure key pair object
   */
  static generateKeyPair() {
    return ec.genKeyPair();
  }

  /**
   * Generate a universally unique id based from the current time
   * @return {string} A universally unique ID
   */
  static id() {
    return uuidV1();
  }
}

module.exports = ChainUtil;
