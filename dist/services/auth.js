"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 const createPasswordHash = async (password) =>
    await _bcryptjs2.default.hash(password, 8); exports.createPasswordHash = createPasswordHash;

 const checkPassword = async (user, password) =>
    await _bcryptjs2.default.compare(password, user.password); exports.checkPassword = checkPassword;
    console.log('Checking password')