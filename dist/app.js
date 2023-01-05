"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);

var _routesjs = require('./routes.js'); var _routesjs2 = _interopRequireDefault(_routesjs);
require('./database/index.js');

class App {
    constructor() {
        this.server = _express2.default.call(void 0, );
        this.middleware();
        this.routes();
    }

    middleware() {
        this.server.use(_express2.default.json());
        this.server.use(_cors2.default.call(void 0, ));
    }

    routes() {
        this.server.use(_routesjs2.default);
    }

}

exports. default = new App().server;

