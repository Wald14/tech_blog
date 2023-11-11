const router = require('express').Router();
const userApiRoutes = require('./user.api.routes')
const blogApiRoutes = require('./blog.api.routes')
const commentApiRoutes = require('./comment.api.routes')

router.use('/user', userApiRoutes);
router.use('/blog', blogApiRoutes);
router.use('/comment', commentApiRoutes);

module.exports = router;