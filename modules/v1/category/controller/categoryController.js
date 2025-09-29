import db from "../../../models/index.js";

export const getCategories = async (req, res) => {
  const categories = await db.Category.findAll();
  res.json(categories);
};
