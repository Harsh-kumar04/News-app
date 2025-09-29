import db from "../../auth/model/index.js";

// Add Comment
export const addComment = async (req, res) => {
  try {
    const { content, newsId } = req.body;

    // validations
    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }
    if (!newsId) {
      return res.status(400).json({ message: "NewsId is required" });
    }

    // news exist karta hai ya nahi check
    const news = await db.News.findByPk(newsId);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    // comment create
    const comment = await db.Comment.create({
      content,
      userId: req.user?.id, // tokenverify se user attach hoga
      newsId,
    });

    res.json({
      message: "Comment added successfully",
      comment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding comment" });
  }
};
