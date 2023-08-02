import { Router } from "express";
import UserApplication from "../../application/user.application";
import { UserRepository } from "../../domain/user.repository";
import UserInfraestructure from "../../infraestructure/user.infraestructure";
import userController from "./user.controller";
import { MiddlewareGuid, MiddlewareState } from "./middlewares/user.middleware";
const infraestructure: UserRepository = new UserInfraestructure();
const application = new UserApplication(infraestructure);
const controller = new userController(application);

class UserRouter {
  readonly expressRouter: Router;
  constructor() {
    this.expressRouter = Router();
    this.mountRoutes();
  }
  mountRoutes() {
    this.expressRouter.post("/insert", controller.insert);
    this.expressRouter.get("/list/:state", ...MiddlewareState, controller.list);
    this.expressRouter.get(
      "/listOne/:guid",
      ...MiddlewareGuid,
      controller.listOne
    );
    this.expressRouter.put(
      "/update/:guid",
      ...MiddlewareGuid,
      controller.update
    );
    this.expressRouter.delete(
      "/delete/:guid",
      ...MiddlewareGuid,
      controller.delete
    );
  }
}

export default new UserRouter().expressRouter;
