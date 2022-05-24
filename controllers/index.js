const User = require("../models/user");

exports.postUser = (req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    description: req.body.description,
    image: req.file.filename,
  });
  user
    .save()
    .then((createdUser) => {
      res.status(201).json({
        message: "User added successfully",
        userId: createdUser._id,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Creating a user failed!",
        error: error,
      });
    });
};

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json({
        message: "Users fetched successfully!",
        users: users,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching users failed!",
      });
    });
};

exports.getOneUser = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching user failed!",
      });
    });
};
