import Encryption from "../utils/encryption.js";
import db from "../modules/v1/auth/model/index.js";
import jwt from "jsonwebtoken";

const Users = db.Singup;

export const decryptBody = (req, res, next) => {
  try {
    const { dataString } = req.body;
    // console.log(dataString);
    if (!dataString) return next();

    try {
      // Poora string decrypt karna
      const decrypted = Encryption.decrypt(dataString);
      console.log(decrypted);

      // JSON parse
      req.body = JSON.parse(decrypted);
    } catch (e) {
      console.log("Cannot decrypt dataString:", e.message);
      return res.status(400).json({ message: "Invalid encrypted data" });
    }

    next();
  } catch (err) {
    console.log("Decryption Middleware Error:", err);
    res.status(500).json({ message: "Failed to decrypt data", err });
  }
};

export const tokenverify = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      console.log(token);
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findOne({ where: { id: decoded.id, token } });
    if (!user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: err.message });
  }
};
