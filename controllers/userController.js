const { User, Thought } = require("../../models");

module.exports = {
  //`GET` all users
  getAllUsers(req, res) {
    User.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  //`GET` a single user by its `_id'
  //and populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({
      _id: req.params.userId,
    })
      .populate("thoughts")
      .populate("friends")
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({ message: "Cannot find the user with this id!" });
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
