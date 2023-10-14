const jwt = require('jsonwebtoken')
const User = require('../../models/user')

module.exports = {
  create
};

async function create(req, res) {
  // res.json({
  //   user: {
  //     name: req.body.name,
  //     email: req.body.email
  //   }
  // });
  try {
    // Add the user to the db
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

/*----- Helper Functions -----*/
function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}