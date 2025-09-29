import db from "../../auth/model/index.js";

export const getProfile = async (req, res) => {
  const user = await db.Singup.findByPk(req.params.userId);
  res.json(user);
};

// Update Profile (including role)
export const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { username, phone, user } = req.body;

  const userObj = await db.Singup.findByPk(userId);
  if (!userObj) return res.status(404).json({ message: "User not found" });

  userObj.username = username || userObj.username;
  userObj.phone = phone || userObj.phone;
  userObj.user = user || userObj.user; // role change
  await userObj.save();

  res.json(userObj);
};
