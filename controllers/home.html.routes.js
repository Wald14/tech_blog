const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

// -------------------------------------------------------------------
// Sends user to home page that displays all blogs
// -------------------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    // Get all blogs
    const payload = await Blog.findAll({
      include: [{model: Comment}, {model: User}]
    });

    // Serialize data so the template can read it
    const blogs = payload.map((blogObj) => blogObj.get({plain: true}));

    // Pass serialized data and session flag into template
    res.render('allBlogs', {
      blogs: blogs,
      loggedIn: req.session.loggedIn,
    })
  } catch (err) {
    res.status(500).json({ status: 'error', payload: err.message })
  }
})

// -------------------------------------------------------------------
// Sends user to single blog page based on blog primary key id
// -------------------------------------------------------------------
router.get('/single-blog/:id', async (req, res) => {
  try {
    const payload = await Blog.findByPk(
      req.params.id,
      {
      include: [{model: Comment}, {model: User}]
      }
    );
    const data = payload.get({plain: true});
    console.log({data});
    res.render('singleBlog', {data})
  } catch (err) {
    res.status(500).json({ status: 'error', payload: err.message })
  }
})


// -------------------------------------------------------------------
// Sends user to signup page
// -------------------------------------------------------------------
router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;