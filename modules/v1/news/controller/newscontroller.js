import db from "../../auth/model/index.js";
import { Op } from "sequelize"; // ✅ don't forget this

export const addNews = async (req, res) => {
  try {
    const { heading, tag, imageUrl, content, categoryName } = req.body;

    if (!categoryName) {
      return res.status(400).json({ message: "categoryName is required" });
    }

    let category = await db.Category.findOne({
      where: { name: categoryName },
    });

    if (!category) {
      category = await db.Category.create({ name: categoryName });
    }
    
    const news = await db.News.create({
      heading,
      tag,
      imageUrl,
      content,
      userId: req.user.id,
      categoryId: category.id,
    });

    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding news" });
  }
};

// ---------------- Get News List ----------------
export const getNewsList = async (req, res) => {
  try {
    const { page = 1, limit = 10, title } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (title) where.heading = { [Op.like]: `%${title}%` };

    const { rows, count } = await db.News.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      include: [db.Singup, db.Category], // join users + category
    });

    res.json({
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
      news: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching news list" });
  }
};

// ---------------- Get News Details ----------------
export const getNewsDetails = async (req, res) => {
  try {
    const news = await db.News.findByPk(req.params.id, {
      include: [db.Singup, db.Category], // only user + category
    });
    if (!news) return res.status(404).json({ message: "News not found" });

    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching details" });
  }
};
