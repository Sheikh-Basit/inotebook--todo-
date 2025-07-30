const express = require('express');
const router = express.Router();
const User = require('../model/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "somethw904ngag3@$@ortandouuy";

// Create a new user (POST /auth)   http://localhost:3000/auth/createuser
router.post('/createuser', [
  body('name').notEmpty().withMessage("Name must be Required"),
  body('email').isEmail().withMessage('Enter the correct Email'),
  body('password').isLength({ min: 5 }).withMessage('Password must be atleast 5 character'),
], async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const { name, email, password } = req.body;

    // Optional: Add validation here
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists, enter different email" });
    }

    // Conver the plain password into hash password
    const saltRound = 10;
    const hashedPass = await bcrypt.hash(password, saltRound);

    const user = await User.create({ name, email, password:hashedPass });

    const data = { user: { id: user.id } };  // fetch the user id from user table and store in the data variable

    const authToken = jwt.sign(data, JWT_SECRET)
    res.status(201).json({ authToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Login user (POST /auth)   http://localhost:3000/auth/login
router.post('/login', [
  body('email').isEmail().withMessage('Enter the correct Email'),
  body('password').exists().withMessage('Password cannot blank'),
], async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please enter the correct login caredential" });
    }

    const passcompare = await bcrypt.compare(password, user.password);
    if (!passcompare) {
      return res.status(400).json({ error: "Please enter the correct login caredential" });
    }

    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET)
    res.status(201).json({ authToken });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

// Get user data (POST /auth)    http://localhost:3000/auth/getuser
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from middleware
    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
