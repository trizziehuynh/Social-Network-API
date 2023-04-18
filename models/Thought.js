const { Schema, model, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => date.now(),
    },
  },
  //run getters when converting a document to JSON
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

//Thought Schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: () => date.now(),
  },
  username: {
    type: String,
    required: true,
  },
  reaction: [reactionSchema],
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reaction.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
