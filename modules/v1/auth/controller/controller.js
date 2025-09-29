import db from "../model/index.js";
import bcrypt from "bcrypt";
import Encryption from "../../../../utils/encryption.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const database = db.Singup;

export const enc = async (req, res) => {
  try {
    const data = req.body; // 👈 Client se aaya user data object
    console.log(data);
    // Step 1: Convert object to string
    const stringData = JSON.stringify(data);

    // Step 2: Encrypt the full string
    const encryptedData = Encryption.encrypt(stringData);

    // Step 3: Return encrypted string to client
    res.status(201).json({
      message: "FULL OBJECT ENCRYPTED (SAFE FOR DB)",
      data: encryptedData,
    });
  } catch (err) {
    console.log("error encrypting data", err);
    res.status(500).json({ message: "Something went wrong", err });
  }
};

export const signup = async (req, res) => {
  try {
    const encryptedData = req.body.data; //get enc data

    const decrypt = Encryption.decrypt(encryptedData); //decrypt it

    const data = JSON.parse(decrypt); //convert data to object

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    // record insert
    const singup = await database.create(data);

    // response
    res.status(201).json({
      message: "Signup successful! Data stored in database.",
      data: singup,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error while signing up",
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { login_type, username, email, password, social_id } = req.body;

    let user;

    if (login_type !== "n") {
      if (!social_id) {
        return res.status(400).json({ message: "Social ID required" });
      }

      user = await database.findOne({ where: { social_id } });
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found for social login" });
      }
    }

    // 🟢 Case 2: Normal login
    else if (login_type === "n") {
      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ message: "Username , Email and password required" });
      }

      user = await database.findOne({ where: { username, email } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
    } else {
      return res.status(400).json({ message: "Invalid login type" });
    }

    // Token generate for both cases
    const token = jwt.sign(
      { id: user.id, email: user.email, social_id: user.social_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    await user.update({ token }, { where: { id: user.id } });

    res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong", err });
  }
};

export const logout = async (req, res) => {
  try {
    const user = req.user;

    await user.update({ token: null }, { where: { id: user.id } });

    res.json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", err });
  }
};

export const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await database.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Forgot Password Request",
      html: `
        <p>Hi ${user.username},</p>
        <p>We received your request for password reset.</p>
        <p>Right now we are only sending email confirmation. </p>
      `,
    });

    res.json({ message: "Mail sent successfully to your email address" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

export const resetpassword = async (req, res) => {
  const { email, oldpassword, newpassword } = req.body;

  const user = await database.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(oldpassword, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const hashedPassword = await bcrypt.hash(newpassword, 10);
  await user.update({ password: hashedPassword });

  res.json({ message: "Passward changed succesfully" });
};
