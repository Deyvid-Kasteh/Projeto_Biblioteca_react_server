"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _authjs = require('./middlewares/auth.js'); var _authjs2 = _interopRequireDefault(_authjs);
var _SessionsControllerjs = require('./controllers/SessionsController.js'); var _SessionsControllerjs2 = _interopRequireDefault(_SessionsControllerjs);
var _HelloControllerjs = require('./controllers/HelloController.js'); var _HelloControllerjs2 = _interopRequireDefault(_HelloControllerjs);
var _UsersControllerjs = require('./controllers/UsersController.js'); var _UsersControllerjs2 = _interopRequireDefault(_UsersControllerjs);
var _RepositoriesControllerjs = require('./controllers/RepositoriesController.js'); var _RepositoriesControllerjs2 = _interopRequireDefault(_RepositoriesControllerjs);

const routes = new (0, _express.Router)();


// --- Rota pública
routes.get("/hello", _HelloControllerjs2.default.index);
routes.post("/sessions", _SessionsControllerjs2.default.create);
routes.post("/users", _UsersControllerjs2.default.create);
routes.get("/Perfil/:id", _UsersControllerjs2.default.showUser);



// --- middleware
routes.use(_authjs2.default)

// --- Rosta protegida

routes.patch("/Perfil/:id", _UsersControllerjs2.default.updateOne);
routes.patch("/Perfil/:id/pic", _UsersControllerjs2.default.updatePic);
routes.patch(
  "/Perfil/:idUsuario/addBookToFavorites/:idLivro",
  _UsersControllerjs2.default.addBookToFavorites
);

routes.patch(
  "/Perfil/:idUsuario/addBookToSeeLater/:idLivro",
  _UsersControllerjs2.default.addBookToSeeLater
);

routes.delete(
  "/Perfil/:idUsuario/destroyBookfromFavorites/:idLivro",
  _UsersControllerjs2.default.destroyBookfromFavorites
);

routes.delete(
  "/Perfil/:idUsuario/destroySeeLaterBook/:idLivro",
  _UsersControllerjs2.default.destroySeeLaterBook
);


// destroySeeLaterBook;



routes.get("/users", _UsersControllerjs2.default.index);
routes.get("/users/:id", _UsersControllerjs2.default.show);
routes.put("/users/:id", _UsersControllerjs2.default.update);
routes.delete("/users/:id", _UsersControllerjs2.default.destroy);
routes.get("/users/:user_id/repositories", _RepositoriesControllerjs2.default.index);
routes.post("/users/:user_id/repositories", _RepositoriesControllerjs2.default.create);
routes.delete("/users/:user_id/repositories", _RepositoriesControllerjs2.default.destroy);

exports. default = routes;