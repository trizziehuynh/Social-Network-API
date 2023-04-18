const { User, Thought } = require("../models");

module.exports = {
  //`/api/thoughts`

  //`GET` to get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  //`GET` to get a single thought by its `_id`
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          return res
            .status(404)
            .json({ message: "No thought found with this id" });
        }
        res.json(comment);
      })
      .catch((err) => res.status(500).json(err));
  },

  //`POST` to create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({ message: "Thought created, but no user with this ID" });
        }
        res.json({ message: "Thought created!" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  //`PUT` to update a thought by its `_id`
  updateThought(req, res) {
    Thought.findByIdAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //`DELETE` to remove a thought by its `_id`
};
