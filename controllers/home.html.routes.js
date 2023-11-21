const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

// -------------------------------------------------------------------
// Sends user to home page that displays all blogs
// -------------------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    // Get all blogs
    const payload = await Blog.findAll(
      {
        include: [{model: Comment}, {model: User}],
        order: [['updatedAt', 'DESC']]
      },
    );

    // Serialize data so the template can read it
    const blogs = payload.map((blogObj) => blogObj.get({plain: true}));

    // Pass serialized data and session flag into template
    res.render('allBlogs', {
      blogs: blogs,
      loggedIn: req.session.logged_in,
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
      include: [{model: Comment, include: {model: User}}, {model: User}]
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
router.get('/login-signup', async (req, res) => {
  try {
    res.render('login-signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

// -------------------------------------------------------------------
// Sends user to dashboard page
// -------------------------------------------------------------------
router.get('/dashboard', async (req, res) => {
  try {
    if (req.session.logged_in) {
      // Get all blogs of specific user
      const payload = await Blog.findAll({
        include: [{model: Comment}, {model: User}],
        where: {user_id: req.session.user_id},
        order: [['createdAt', 'DESC']]
      });

      // Serialize data so the template can read it
      const blogs = payload.map((blogObj) => blogObj.get({plain: true}));

      // Pass serialized data and session flag into template
      res.render('dashboard', {
        blogs: blogs,
        loggedIn: req.session.logged_in,
      })
    } else {
      res.redirect('/')
    }
  } catch (err) {
    res.status(500).json(err);
  }

});

// -------------------------------------------------------------------
// Sends user to dashboard -> new blog page
// -------------------------------------------------------------------
router.get('/dashboard/newBlog', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render('newBlog', {loggedIn: req.session.logged_in})
    } else {
      res.redirect('/')
    }
  } catch (err) {
    res.status(500).json(err);
  }

});

// -------------------------------------------------------------------
// Sends user to edit page for blog based on blog's primary key id
// -------------------------------------------------------------------
router.get('/dashboard/edit/:id', async (req, res) => {
  console.log(req.params)
  try {
    const payload = await Blog.findByPk(req.params.id);
    const data = payload.get({plain: true});

    res.render('editBlog', {data})
  } catch (err) {
    res.status(500).json({ status: 'error', payload: err.message })
  }
})

module.exports = router;