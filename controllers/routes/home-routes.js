const router = require('express').Router();

const {User,Blog,Comment} = require('../../models');

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
        user_id: req.session.user_id
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

router.get('/dashboard', async (req,res)=>{

  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Blog }],
    });
    // console.log(userData);
    const user_name = userData.dataValues.username
    const blogs = userData.dataValues.blogs.map((blog)=> blog.get({ plain: true }))
    res.status(200).render('dashboard',{
      user_name,
      blogs
    })
  } catch (err) {
    res.status(500).json(err);
  }
 
})

router.get('/blog/:id',async (req,res)=>{
  const blogData = await Blog.findByPk(req.params.id, {
    include: [{ model: User }],
  });
  const dataSerial= blogData.get({plain:true})
  const user = dataSerial.user.username
  const title = dataSerial.blog_title
  const date = dataSerial.createdAt
  const content = dataSerial.blog_content 
  // console.log(user);
  // console.log(blogData.get({plain:true}));
  res.status(200).render('comment-field',{
    user,
    title,
    date,
    content,
    
  })
})
module.exports = router;