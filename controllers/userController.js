const { User, Thought } = require("../models");

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
    User.findOne({ _id: req.params.userId })
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

  //`POST` a new user-Create a new user
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

  //`PUT` to update a user by its `_id`
  updateUser(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //`DELETE` to remove user by its `_id`
  //"else"- remove a user's associated thoughts when deleted.
  deleteUser(req, res) {
    User.findByIdAndDelete({ _id: req.params.userId }).then((user) => {
      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      return Thought.deleteMany({ _id: { $in: user.thoughts } })
        .then(() => {
          res.json({ message: "Thoughts Deleted!" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    });
  },

  //`/api/users/:userId/friends/:friendId`

  //`POST` to add a new friend to a user's friend list
  addFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //`DELETE` to remove a friend from a user's friend list
  deleteFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
