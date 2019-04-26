const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const uuidV1 = require('uuid/v1');
const SHA3 = require('crypto-js/sha3');

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

  /**
   * Generate a hash for some given data
   * @param  {any}    data The data we want to hash
   * @return {string}      The hash of the data
   */
  static hash(data) {
    return SHA3(JSON.stringify(data)).toString();
  }

  /**
   * Verify a signature is valid
   * @param  {string}  publicKey The public key
   * @param  {string}  signature The signature to verify
   * @param  {string}  dataHash  The data we expect to find if valid
   * @return {boolean}           A true/false value representing validity
   */
  static verfiySignature(publicKey, signature, dataHash) {
    return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
  }
}

module.exports = ChainUtil;
