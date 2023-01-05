"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

var _databasejs = require('../config/database.js'); var _databasejs2 = _interopRequireDefault(_databasejs);

class Database {
    constructor() {
        this.connection = _mongoose2.default.connect(
            _databasejs2.default.url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
    }
}

exports. default = new Database();
