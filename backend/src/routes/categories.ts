import { Router } from "express";

import { categories } from "../data/mockData.js";

const categoriesRouter = Router();

categoriesRouter.get("/", (_request, response) => {
  response.json(categories);
});

export default categoriesRouter;
