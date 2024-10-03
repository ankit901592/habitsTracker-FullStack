import express from "express";
import { WeeklyHabbitController } from "../controllers/weeklyhabbitController.js";

const WeeklyRouter = express.Router();
const weeklyhabbitController = new WeeklyHabbitController();

WeeklyRouter.get("/", (req, res, next) => {
  weeklyhabbitController.ListAllHabbits(req, res, next);
});
WeeklyRouter.get("/Toogle/:habitId/:statusId", (req, res, next) => {
  weeklyhabbitController.ToggleStatus(req, res, next);
});

export { WeeklyRouter };
