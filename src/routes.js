import { Router } from 'express';
import auth from './middlewares/auth';
import SessionsController from './controllers/SessionsController';
import HelloController from './controllers/HelloController';
import UsersController from './controllers/UsersController';
import RepositoriesController from './controllers/RepositoriesController';

const routes = new Router();


// --- Rota pública
routes.get("/hello", HelloController.index);
routes.post("/sessions", SessionsController.create);
routes.post("/users", UsersController.create);
routes.patch("/Perfil/:id", UsersController.updateOne);
routes.patch("/Perfil/:id/addBookToFavorites/:livro", UsersController.addBookToFavorites);



// --- middleware
routes.use(auth)

// --- Rosta protegida



routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.show);
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.destroy);
routes.get("/users/:user_id/repositories", RepositoriesController.index);
routes.post("/users/:user_id/repositories", RepositoriesController.create);
routes.delete("/users/:user_id/repositories", RepositoriesController.destroy);

export default routes;