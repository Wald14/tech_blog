const router = require('express').Router();
const Model = require('../../models/Blog');
const {Comment, User} = require('../../models')


// Get all blogs
// router.get('/', async (req, res) => {
//   try {
//     // Get all blogs
//     const payload = await Model.findAll({
//       include: [{model: Comment}, {model: User}]
//     });

//     // Serialize data so the template can read it
//     const blogs = payload.map((blogObj) => blogObj.get({plain: true}));

//     // Pass serialized data and session flag into template
//     res.render('allBlogs', {
//       blogs: blogs,
//       loggedIn: req.session.loggedIn,
//     })
//     // res.status(200).json({ status: 'success', payload })
//   } catch (err) {
//     res.status(500).json({ status: 'error', payload: err.message })
//   }
// })


// Get one blog by pk
// router.get('/:id', async (req, res) => {
//   try {
//     const payload = await Model.findByPk(
//       req.params.id,
//       {
//       include: [{model: Comment}, {model: User}]
//       }
//     );
//     const data = payload.get({plain: true});
//     console.log({data});
//     res.render('singleBlog', {data})
//     // res.status(200).json({ status: 'success', payload })
//   } catch (err) {
//     res.status(500).json({ status: 'error', payload: err.message })
//   }
// })



// Get all Blogs
router.get('/', async (req, res) => {
  try {
    const payload = await Model.findAll();
    res.status(200).json({ status: 'success', payload })
  } catch (err) {
    res.status(500).json({ status: 'error', payload: err.message })
  }
})


// Get one blog by pk
router.get('/:id', async (req, res) => {
  try {
    const payload = await Model.findByPk(
      req.params.id,
      {
      include: [{model: Comment}, {model: User}]
      }
      );
    res.status(200).json({ status: 'success', payload })
  } catch (err) {
    res.status(500).json({ status: 'error', payload: err.message })
  }
})

// Create a new record
router.post('/', async (req, res) => {
  // console.log("trying to make new blog")
  try {
    const payload = await Model.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    // console.log(payload)
    res.status(200).json({ status: 'success', payload })
  } catch (err) {
    res.status(500).json({ status: 'error', payload: err.message })
  }
})

// Update a records
router.put('/:id', async (req, res) => {
  try {
    const payload = await Model.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.status(200).json({ status: 'success', payload })
  } catch (err) {
    res.status(500).json({ status: 'error', payload: err.message })
  }
})

// Delete a record
router.delete('/:id', async (req, res) => {
  try {
    const payload = await Model.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ status: 'success' })
  } catch (err) {
    res.status(500).json({ status: 'error', payload: err.message })
  }
})

module.exports = router;