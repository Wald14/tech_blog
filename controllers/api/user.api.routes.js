const router = require('express').Router();
const Model = require('../../models/User');
const { Blog, Comment } = require('../../models')


// Get all records
router.get('/', async (req, res) => {
  try {
    const payload = await Model.findAll({
      include: [{ model: Blog }, { model: Comment }]
    });
    res.status(200).json({ status: 'success', payload })
  } catch (err) {
    res.status(500).json({ status: 'error', payload: err.message })
  }
})

// Get one User by pk
router.get('/:id', async (req, res) => {
  try {
    const payload = await Model.findByPk(req.params.id);
    res.status(200).json({ status: 'success', payload })
  } catch (err) {
    res.status(500).json({ status: 'error', payload: err.message })
  }
})


// Update a User
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

// Delete a User
router.delete('/:id', async (req, res) => {
  try {
    const payload = await Model.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ status: 'success' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 'error', payload: err.message })
  }
})


// // User signup
// router.post("/signup", async (req, res) => {
//   try {
//     const user = await Model.create({
//       username: req.body.username,
//       password: req.body.password,
//     });

//     req.session.save(() => {
//       req.session.loggedIn = true;

//       res.status(200).json({ status: "success", msg: "Signup Successful" })
//     });

//   } catch (err) {
//     console.log(err)
//     res.status(500).json(err)
//   }
// });

module.exports = router;