import User from "../models/User";


class UsersController {
    async index(req, res) {
        try {
            const users = await User.find({});
            return res.json(users);

      } catch (error) {
            console.error(error);
            return res.status(500).json({
              error: "Erro no servidor interno"
            });
      }
  }
    async show(req, res) {
      try {

      } catch (error) {

      }
  }
    async create(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (user) {
                return res
                    .status(422)
                    .json({ message: `User ${email} already exists` })
            }

            const newUser = await User.create({ email, password });
            return res
                .status(201)
                .json(newUser);

        } catch (error) {
      }
  }
    async update(req, res) {
      try {

      } catch (error) {

      }
  }
    async destroy(req, res) {
      try {

      } catch (error) {

      }
  }
}

export default new UsersController();
