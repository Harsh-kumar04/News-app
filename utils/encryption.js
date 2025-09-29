import cryptLib from "cryptlib";
import dotenv from "dotenv";

dotenv.config();

export default class Encryption {
  static shaKey;

  static encrypt(data, BITS = 32) {
    if (!Encryption.shaKey) {
      Encryption.shaKey = cryptLib.getHashSha256(process.env.KEY, BITS);
    }
    return cryptLib.encrypt(data, Encryption.shaKey, process.env.IV);
  }

  static decrypt(data, BITS = 32) {
    if (!Encryption.shaKey) {
      Encryption.shaKey = cryptLib.getHashSha256(process.env.KEY, BITS);
    }
    return cryptLib.decrypt(data, Encryption.shaKey, process.env.IV);
  }
}
