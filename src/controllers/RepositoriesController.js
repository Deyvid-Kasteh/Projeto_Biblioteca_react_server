import User from "../models/User.js";
import Repository from "../models/Repository.js";


class RepositoriesController {
  async index(req, res) {
    try {
      const { user_id } = req.params;
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json();
      }

      const repositories = await Repository.find({
        userId: user_id,
      });

      return res.json(repositories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Erro no servidor interno",
      });
    }
  }

  async create(req, res) {
    try {
      const { user_id } = req.params;
      const { name, url } = req.body;
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json();
      }

      const repository = await Repository.findOne({
        userId: user_id,
        name,
      });

      if (repository) {
        return res
          .status(422)
          .json({ message: `Repository ${name} already exists.` });
      }

      const newRepository = await Repository.create({
        name,
        url,
        userId: user_id
      });

      return res.status(201).json(newRepository);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Erro no servidor interno",
      });
    }
  }
  async destroy(req, res) {
      try {
          const { user_id, id } = req.params;
          const user = await User.findById(user_id);
          if (!user) {
              return res.status(404).json();
          }
          const repository = await Repository.findOne({
              userId: user_id,
              id
          });
          if (!repository) {
              return res.status(404).json();
          }

          await repository.deleteOne();
          return res.status(204).json();


      }
      catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Erro no servidor interno",
      });
    }
  }
}

export default new RepositoriesController();