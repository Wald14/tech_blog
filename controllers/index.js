const router = require('express').Router()

// import all api route files here
const apiRoutes = require('./api')

// import all html files route files here
// const userHtmlRoutes = require('./html/user.html.routes')

// Add api routes to the router
router.use('/api', apiRoutes)

// Add html routes to the router
// router.use('/user', userHtmlRoutes);

module.exports = router;