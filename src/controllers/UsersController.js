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
        error: "Erro no servidor interno",
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

  async showUser(req, res) {
    try {
      const { id } = req.params;
      const userAtualizado = await User.findById(id);

      if (!userAtualizado) {
        return res.status(404).json();
      }
      return res.json(userAtualizado);
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
          .json({ message: `User ${email} already exists` });
      }

      // criptografa o password
      const createPasswordHash = await bcrypt.hash(password, 8);

      // const encryptedPassword = await createPasswordHash(password)

      const newUser = await User.create({
        name,
        email,
        password: createPasswordHash,
      });
      return res.status(201).json(newUser);
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
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Erro no servidor interno",
      });
    }
  }

  async updateOne(req, res) {
    try {
      const { id } = req.params;
      const { age } = req.body;

      const user = await User.findById(id);
      if (!user) {
        console.log("User not found");
        return res.status(404).json();
      }
      await User.findByIdAndUpdate(
        { _id: id },
        {
          $push: { details: { age: age } },
        }
      );
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Erro no servidor interno",
      });
    }
  }

  async updatePic(req, res) {
    try {
      const { id } = req.params;
      const { pic } = req.body;

      const user = await User.findById(id);
      if (!user) {
        console.log("User not found");
        return res.status(404).json();
      }
      await User.findByIdAndUpdate(
        { _id: id },
        {
          $set: { details: { picture: pic } },
        }
      );
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Erro no servidor interno",
      });
    }
  }

  async addBookToFavorites(req, res) {
    try {
      const { idUsuario } = req.params;
      const { idLivro, imgLivro, ttlLivro } = req.body;

      const user = await User.findById(idUsuario);
      if (!user) {
        console.log("User not found");
        return res.status(404).json();
      }
      await User.findByIdAndUpdate(
        { _id: idUsuario },
        {
          $addToSet: {
            books: {
              idLivro: idLivro,
              imgLivro: imgLivro,
              ttlLivro: ttlLivro,
            },
          },
        }
      );
        console.log(idUsuario);
        console.log(idLivro);
        console.log(imgLivro);
        console.log(ttlLivro);

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Erro no servidor interno",
      });
    }
  }

  async addBookToSeeLater(req, res) {
    try {
      const { idUsuario } = req.params;
      const { idLivro, imgLivro, ttlLivro } = req.body;

      const user = await User.findById(idUsuario);
      if (!user) {
        console.log("User not found");
        return res.status(404).json();
      }
      await User.findByIdAndUpdate(
        { _id: idUsuario },
        {
          $addToSet: {
            booksSeeLater: {
              idLivro: idLivro,
              imgLivro: imgLivro,
              ttlLivro: ttlLivro,
            },
          },
        }
      );
      console.log(idUsuario);
      console.log(idLivro);
      console.log(imgLivro);
      console.log(ttlLivro);
      return res.status(200).json(user);
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
        return res.status(404).json();
      }
      await user.deleteOne();
      return res.status(204).json({ done: "foi" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Erro no servidor interno",
      });
    }
  }

  async destroyBookfromFavorites(req, res) {
    try {
      const { idUsuario, idLivro } = req.params;
      console.error(idLivro);

      const user = await User.findById(idUsuario);
      if (!user) {
        console.log("User not found");
        return res.status(404).json();
      }
      await User.findByIdAndUpdate(
        { _id: idUsuario },
        {
          $pull: {
            books: { idLivro: idLivro },
          },
        }
      );
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Erro no servidor interno",
      });
    }
  }

  async destroySeeLaterBook(req, res) {
    try {
      const { idUsuario, idLivro } = req.params;
      console.error(idLivro);

      const user = await User.findById(idUsuario);
      if (!user) {
        console.log("User not found");
        return res.status(404).json();
      }
      await User.findByIdAndUpdate(
        { _id: idUsuario },
        {
          $pull: {
            booksSeeLater: { idLivro: idLivro },
          },
        }
      );
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Erro no servidor interno",
      });
    }
  }
}

export default new UsersController();
