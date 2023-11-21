const router = require('express').Router();
const Model = require('../../models/Comment');
const {User} = require('../../models')


// Get all comments
router.get('/', async (req, res) => {
  try {
    const payload = await Model.findAll(
      {
        include: [{model: User}]
      }
    );
    res.status(200).json({ status: 'success', payload })
  } catch (err) {
    res.status(500).json({ status: 'error', payload: err.message })
  }
})

// Get one comment by pk
router.get('/:id', async (req, res) => {
  try {
    const payload = await Model.findByPk(
      req.params.id,
      {
        include: [{model: User}]
      }
      );
    res.status(200).json({ status: 'success', payload })
  } catch (err) {
    res.status(500).json({ status: 'error', payload: err.message })
  }
})

// Create a new comment
router.post('/', async (req, res) => {
  try {
    const payload = await Model.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json({ status: 'success', payload })
  } catch (err) {
    res.status(500).json({ status: 'error', payload: err.message })
  }
})

// Update a comments
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

// Delete a comment
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