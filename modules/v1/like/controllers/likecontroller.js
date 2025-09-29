import db from "../../auth/model/index.js";

export const toggleLike = async (req, res) => {
  const { newsId, type } = req.body;
  console.log(newsId);

  const userId = req.user.id;
  console.log(userId);
  try {
    // Check if user already liked/disliked
    const existing = await db.Like.findOne({ where: { newsId, userId } });

    if (existing) {
      // If same type, remove
      if (existing.type === type) {
        await existing.destroy();
        return res.json({ message: `${type} removed` });
      } else {
        // Change type (like → dislike or vice versa)
        existing.type = type;
        await existing.save();
        return res.json({ message: `Changed to ${type}` });
      }
    }

    // Otherwise create new
    const like = await db.Like.create({ newsId, userId, type });
    res.json(like);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error toggling like/dislike" });
  }
};
