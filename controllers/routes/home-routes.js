const router = require('express').Router();


const {User,Blog} = require('../../models')

// Read All
router.get("/", async (req, res) => {
    // find all users
    try {
      const blogData = await Blog.findAll({
        include: [{ model: User }],
      });
      const blogs = blogData.map((blog)=> blog.get({ plain: true }))
      res.render('homepage', {
        blogs,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

// Login route
router.get('/login', (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
  res.render('login');
});


module.exports = router;