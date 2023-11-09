const router = require('express').Router()

// import all api route files here
const userApiRoutes = require('./api/user.api.routes')
const blogApiRoutes = require('./api/blog.api.routes')
const commentApiRoutes = require('./api/comment.api.routes')

// import all html files route files here
// const userHtmlRoutes = require('./html/user.html.routes')

// Add api routes to the router
router.use('/api/user', userApiRoutes);
router.use('/api/blog', blogApiRoutes);
router.use('/api/comment', commentApiRoutes);


// Add html routes to the router
// router.use('/user', userHtmlRoutes);

module.exports = router;