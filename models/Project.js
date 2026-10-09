const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  { author: String, text: { type: String, required: true } },
  { timestamps: true }
);

const projectSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: String,
    deadline: Date,
    members: [String],
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);