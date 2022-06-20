const mongoose = require("mongoose");
const uuId = require("uuid");
const uuidV4 = uuId.v4();
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    id: {
      type: String,
      default: uuidV4,
      unique: true,
      required: true,
    },
    publicAddress: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      minlength: 3,
    },
    nonce: {
      type: Number,
      required: false,
      minglength: 3,
    },
  },
  {
    timestamp: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
