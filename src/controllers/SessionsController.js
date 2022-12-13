import jwt from "jsonwebtoken";
import authConfig from "../config/auth";
import User from "../models/User";
import { checkPassword } from "../services/auth";


class SessionController {
    async create(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                error: "User invalid"
            });
        }

        if (!checkPassword(user, password)) {
            console.log("passou aqui");
            return res.status(401).json({
                            error: "password invalid"
            });

        }

        const { id } = user;

        return res.json({
            user: {
                name: user.name,
                id,
                email
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            })
        });

    }
}

export default new SessionController();