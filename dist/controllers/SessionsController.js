"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _authjs = require('../config/auth.js'); var _authjs2 = _interopRequireDefault(_authjs);
var _Userjs = require('../models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);
// import { checkPassword } from "../services/auth";
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);



class SessionController {
    async create(req, res) {
        const { email, password } = req.body;

        const user = await _Userjs2.default.findOne({ email });

        if (!user) {
            return res.status(401).json({
                error: "User invalid"
            });
        }

        // if (!checkPassword(user, password)) {
        //     console.log("passou aqui");
        //     return res.status(401).json({
        //                     error: "password invalid"
        //     });
        // }


        try {
            if (await _bcryptjs2.default.compare(password, user.password)) {
                console.log(password);
                console.log(user.password);
                console.log('é o mesmo');
            } else {
                console.log("NÃO É O MESMO");

            }

            console.log(password)
            console.log(user.password);

        } catch (error) {
            console.log(error)
        }

        const { id } = user;
        console.log(user)

        return res.json({
            user: {
                name: user.name,
                id,
                email,
                books: user.books,
                details: user.details
            },
            token: _jsonwebtoken2.default.sign({ id }, _authjs2.default.secret, {
                expiresIn: _authjs2.default.expiresIn,
            })
        });

    }
}

exports. default = new SessionController();