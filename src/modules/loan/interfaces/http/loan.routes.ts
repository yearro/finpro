import { Router } from "express";
import LoanApplication from "../../application/loan.application";
import { LoanRepository } from "../../domain/loan.repository";
import LoanInfraestructure from "../../infraestructure/loan.infraestructure";
import loanController from "./loan.controller";
import { MiddlewareGuid, MiddlewareState } from "./middlewares/loan.middleware";

const infraestructure: LoanRepository = new LoanInfraestructure();
const application = new LoanApplication(infraestructure);
const controller = new loanController(application);

class LoanRouter {
  readonly expressRouter: Router;
  constructor() {
    this.expressRouter = Router();
    this.mountRoutes();
  }
  mountRoutes() {
    // Design pattern Chain of Responsability
    this.expressRouter.post("/insert", controller.insert);
    this.expressRouter.get("/list/:state", ...MiddlewareState, controller.list);
    this.expressRouter.get(
      "/listOne/:id",
      ...MiddlewareGuid,
      controller.listOne
    );
    this.expressRouter.get(
      "/listByUser/:guid",
      ...MiddlewareGuid,
      controller.listByUser
    );
    this.expressRouter.put("/update/:guid", controller.update);
    this.expressRouter.delete("/delete/:guid", controller.delete);
  }
}

export default new LoanRouter().expressRouter;
