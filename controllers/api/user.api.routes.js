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

// Create a new User
router.post('/signup', async (req, res) => {
  try {
    const userData = await Model.create(req.body);

    // Logs user in after signup
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ status: 'success', userData });
    })
  } catch (err) {
    console.log("Error creating new user");
    console.log(err);
    res.status(500).json({ status: 'error', userData: err.message })
  }
})

// Log User In
router.post('/login', async (req, res) => {
  try {
    // Check if the entered username is in the database
    const userData = await Model.findOne({ where: { username: req.body.username } });

    // If the username doesn't exist, send back error
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

     // If the username exists, validate password
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password isn't correct, send back error
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // If username and password are correct, log user in
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout User
router.post('/logout', (req, res) => {
  console.log(req.session.logged_in)
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    console.log("You're already logged out")
    // res.status(404).end();
  }
});


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





module.exports = router;