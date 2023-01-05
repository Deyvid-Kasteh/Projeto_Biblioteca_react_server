"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Userjs = require('../models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);
var _Repositoryjs = require('../models/Repository.js'); var _Repositoryjs2 = _interopRequireDefault(_Repositoryjs);


class RepositoriesController {
  async index(req, res) {
    try {
      const { user_id } = req.params;
      const user = await _Userjs2.default.findById(user_id);
      if (!user) {
        return res.status(404).json();
      }

      const repositories = await _Repositoryjs2.default.find({
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
      const user = await _Userjs2.default.findById(user_id);
      if (!user) {
        return res.status(404).json();
      }

      const repository = await _Repositoryjs2.default.findOne({
        userId: user_id,
        name,
      });

      if (repository) {
        return res
          .status(422)
          .json({ message: `Repository ${name} already exists.` });
      }

      const newRepository = await _Repositoryjs2.default.create({
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
          const user = await _Userjs2.default.findById(user_id);
          if (!user) {
              return res.status(404).json();
          }
          const repository = await _Repositoryjs2.default.findOne({
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

exports. default = new RepositoriesController();