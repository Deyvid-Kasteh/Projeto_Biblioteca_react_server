"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _appjs = require('./app.js'); var _appjs2 = _interopRequireDefault(_appjs);

 function server() {

const PORT = process.env.PORT || 5000;
_appjs2.default.listen(PORT, () => console.log("Connect"));

} exports.server = server;


