const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

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
}

module.exports = ChainUtil;
