const router = require('express').Router()

// import all api route files here
const apiRoutes = require('./api')
const homeRoutes = require('./home.html.routes');

// Add api routes to the router
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;