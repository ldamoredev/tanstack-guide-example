import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import { fileURLToPath } from "node:url";

import categoriesRouter from "./routes/categories.js";
import productsRouter from "./routes/products.js";
import suppliersRouter from "./routes/suppliers.js";

const DEFAULT_PORT = 4001;

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
      ],
    }),
  );
  app.use(express.json());

  app.get("/", (_request, response) => {
    response.json({ message: "Session 2 backend is running" });
  });

  app.use("/products", productsRouter);
  app.use("/categories", categoriesRouter);
  app.use("/suppliers", suppliersRouter);
  app.use(jsonErrorHandler);

  return app;
}

export function startServer(port = DEFAULT_PORT) {
  const app = createApp();

  return app.listen(port, () => {
    console.log(`Backend API listening on http://localhost:${port}`);
  });
}

const isDirectRun =
  process.argv[1] !== undefined &&
  fileURLToPath(import.meta.url) === process.argv[1];

if (isDirectRun) {
  startServer();
}

function jsonErrorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  next: NextFunction,
) {
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    error.status === 400
  ) {
    response.status(400).json({ message: "Invalid product payload" });
    return;
  }

  next(error);
}
