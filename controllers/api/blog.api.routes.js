const router = require('express').Router();
const Model = require('../../models/Blog');
const {Comment} = require('../../models')


// Get all blogs
router.get('/', async (req, res) => {
  try {
    // Get all blogs
    const payload = await Model.findAll({
      include: [{model: Comment}]
    });
    res.status(200).json({ status: 'success', payload })
  } catch (err) {
    res.status(500).json({ status: 'error', payload: err.message })
  }

  // Serialize data so the template can read it
  // const blogs = payload.map((blog) => payload.get({plain: ture}));

  // Pass serialized data and session flag into template
  // res.render('blogpage', {
  //   blogs,
  //   logged_in: req.session.logged_in
  // })
})




// Get one blog by pk
router.get('/:id', async (req, res) => {
  try {
    // const payload = await Model.findByPk(req.params.id);
    // res.status(200).json({ status: 'success', payload })
    const payload = await Model.findByPk(req.params.id)
    res.status(200).json({ status: 'success', payload })
    res.render('singleBlog', payload[req.params.num - 1])

  } catch (err) {
    res.status(500).json({ status: 'error', payload: err.message })
  }
})





// Create a new record
router.post('/', async (req, res) => {
  try {
    const payload = await Model.create(req.body);
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