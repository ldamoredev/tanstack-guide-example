import { Router } from "express";

import { suppliers } from "../data/mockData.js";

const suppliersRouter = Router();

suppliersRouter.get("/", (_request, response) => {
  response.json(suppliers);
});

export default suppliersRouter;
