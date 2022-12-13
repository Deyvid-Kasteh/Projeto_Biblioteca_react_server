import User from "../models/User";
import bcrypt from "bcryptjs";


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
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
          return res.status(404).json();
        }
        return res.json(user);


      } catch (error) {
        console.error(error);
        return res.status(500).json({
          error: "Erro no servidor interno",
        });

      }
  }
    async create(req, res) {
        try {
            const { name, email, password } = req.body;
            const user = await User.findOne({ email });
            if (user) {
                return res
                    .status(422)
                    .json({ message: `User ${email} already exists` })
          }

          // criptografa o password
          const createPasswordHash = await bcrypt.hash(password, 8);

          // const encryptedPassword = await createPasswordHash(password)

          const newUser = await User.create({
            name,
            email,
            password: createPasswordHash
          });
            return res
                .status(201)
                .json(newUser);

        } catch (error) {
          console.error(error);
          return res.status(500).json({
            error: "Erro no servidor interno",
          });
      }
  }
    async update(req, res) {
      try {
        const { id } = req.params;
        const { email, password } = req.body;
        const user = await User.findById(id);

        if (!user) {
          return res.status(404).json();
        }
        const createPasswordHash = await bcrypt.hash(password, 8);
        await user.updateOne({
          email,
          password: createPasswordHash,
        });
        return res
           .status(200)
           .json(user);

      } catch (error) {
        console.error(error);
        return res.status(500).json({
          error: "Erro no servidor interno",
        });

      }
  }
    async destroy(req, res) {
      try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json()
        }
        await user.deleteOne();
        return res.status(204).json({"done": "foi"});

      } catch (error) {
        console.error(error);
        return res.status(500).json({
          error: "Erro no servidor interno",
        });
      }
  }
}

export default new UsersController();
