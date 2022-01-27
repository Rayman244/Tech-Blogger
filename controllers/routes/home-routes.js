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
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Post Blog
router.get('/blog',(req,res)=>{
  res.render('postBlog')
})

module.exports = router;