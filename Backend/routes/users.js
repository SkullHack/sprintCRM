const router = require("express").Router();
let User = require("../models/user.model");

//get all users
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const accessLevel = req.body.accessLevel;

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    accessLevel,
  });

  //add new user
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//get user by id
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//delete user by id
router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User Deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//update user
router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((users) => {
      users.firstName = req.body.firstName;
      users.lastName = req.body.lastName;
      users.email = req.body.email;
      users.password = req.body.password;
      users.accessLevel = req.body.accessLevel;

      users
        .save()
        .then(() => res.json("User Updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
