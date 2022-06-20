const router = require("express").Router();
const jwt = require("express-jwt");

const config = require("./config");
const User = require("../models/user_model");
//const { initialization, returnOwner } = require("../web3Client");
router.route("/").get((req, res) => {
  // If a query string ?publicAddress=... is given, then filter results
  // THATS AN SQL LITE BROOO WE HAVE TO CHANGE IT
  const whereClause = req.query.publicAddress;

  return User.find({ publicAddress: whereClause })
    .then((users) => res.json(users))
    .catch((error) => console.log(error));
});

router.route("/:userId").get(jwt(config), (req, res) => {
  if (req.user.payload.id !== req.params.userId) {
    return res.status(401).send({ error: "You can can only access yourself" });
  }
  return User.find({ id: req.params.userId })
    .then((user) => res.json(user))
    .catch((error) => console.log(error));
});

router.route("/register").post(async (req, res, next) => {
  const { publicAddress } = req.body;

  const nonce = Math.floor(Math.random() * 1000000);
  try {
    User.create({
      publicAddress,
      nonce,
    }).then((response) => res.json(response));

    console.log("User created successfully", response);
    //res.json(response);
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: "error", error: "Address exists." });
    }
    throw error;
  }
  //next();
});

router.route("/register").patch(async (req, res, next) => {
  const { publicAddress } = req.body;
  const nonce = Math.floor(Math.random() * 1000000);
  try {
    User.create({
      publicAddress,
      nonce,
    }).then((response) => res.json(response));

    console.log("User created successfully", response);
    //res.json(response);
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: "error", error: "Address exists." });
    }
    throw error;
  }
  //next();
});

module.exports = router;
