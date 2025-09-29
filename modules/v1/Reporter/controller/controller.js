import db from "../../auth/model/index.js";
import { Op } from "sequelize";

export const myNewsList = async (req, res) => {
  try {
    const user = req.user;

    // Check if user is a Reporter
    if (user.user !== "Repoter") {
      return res
        .status(403)
        .json({ message: "Only reporters can view their news" });
    }

    const { page = 1, limit = 10, title } = req.query;
    const offset = (page - 1) * limit;

    const where = { userId: user.id };
    if (title) where.heading = { [Op.like]: `%${title}%` };

    const { rows, count } = await db.News.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      include: [db.Category], // optional: join category
      order: [["createdAt", "DESC"]],
    });

    res.json({
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
      news: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching news" });
  }
};
