import { Router } from "express";

export const apiRouter = Router();

// TODO: CRUD for task
apiRouter.get("/task", (_, res) => {
  res.status(200).send("Task available");
});
