"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const userSchema = new _mongoose2.default.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    password: {
      type: String,
      required: true,
    },
    details: {
      age: { type: Number },
      gender: { type: String },
      picture: 0,
    },
    books: {
      type: [],
    },
    booksSeeLater: {
      type: [],
    },
  },
  {
    timestamps: true,
  }
);

exports. default = _mongoose2.default.model("User", userSchema);