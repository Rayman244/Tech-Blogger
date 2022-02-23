const router = require("express").Router();
const { Blog,User, Comment } = require("../../../models");

// Read All
router.get("/", async (req, res) => {
  // find all users
  try {
    const commentData = await Comment.findAll({
      include: [{ model: User },{model:Blog}],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET by id
router.get("/:id", async (req, res) => {
  try {
    const dbCommentData = await Comment.findByPk(parseInt(req.params.id), {
      include: { model: Blog },
    });
    const comment = dbCommentData.get({ plain: true });
    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/:id", async (req, res) => {
  // console.log("hello world");
  console.log(req.body);
  try {
    // const dataJson = {
    //   "comment_content":`${req.body.comment_content}`,
    //   'blog_id':`${req.params.id}`,
    //   'user_id':`${req.session.user_id}`

    // }
    const newComment = await Comment.create({
      comment_content: req.body.comment_content,
      blog_id: req.params.id,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
