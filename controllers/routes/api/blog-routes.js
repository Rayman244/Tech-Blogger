const router = require("express").Router();
const {User,Blog} = require('../../../models')

// Read All
router.get("/", async (req, res) => {
    // find all users
    try {
      const blogData = await Blog.findAll({
        include: [{ model: User }],
      });
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // READ
  router.get("/:id", async (req, res) => {
    // find user by its id
    try {
      const blogData = await Blog.findByPk(req.params.id, {
        include: [{ model: User }],
      });
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

 // CREATE
 router.post("/", async (req, res) => {
    // create a new user
    try {
      const blogData = await Blog.create(req.body,req.session.id);
      if (!blogData) {
        res.status(404).json({ message: "Please try again!" });
        return;
      }
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //   UPDATE
  router.put("/:id", async (req, res) => {
    // update a category by its `id` value
    try {
      const blogData = await Blog.update(
      {
        blog_title: req.body.blog_title,
        blog_content: req.body.blog_content
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
      if(!blogData){
        res.status(404).json({ message: "Please try again!" });
        return;
      }
    return res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
    
  });
//   Delete
router.delete("/:id", async (req, res) => {
    // delete a blog
    try {
      const blogData = await Blog.destroy({
        where: {
          id: req.params.id,
        },
      });
      if(!blogData){
        res.status(404).json({ message: "Please enter a valad Blog!" });
        return;
      }
    return res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router