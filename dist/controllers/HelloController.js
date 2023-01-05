"use strict";Object.defineProperty(exports, "__esModule", {value: true});class HelloController {
    async index(req, res) {
        return res.json({hello: 'world'})
    }
}

exports. default = new HelloController();