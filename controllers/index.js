const router = require('express').Router()

// import all api route files here
const apiRoutes = require('./api')

// Add api routes to the router
router.use('/api', apiRoutes)

module.exports = router;