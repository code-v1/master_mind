const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup
};

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    // TODO: Send back a JWT instead of the user
    const token = createJWT(user);
    res.json({token});
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}


// helper  functions

function createJWT(user) {
  return jwt.sign(
    {user},
    SECRET,
    {expiresIn: '24h'}
  );
}