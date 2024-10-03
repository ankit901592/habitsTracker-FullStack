import express from "express";
import { habbitsController } from "../controllers/habbits.controller.js";

const HabbitController = new habbitsController();

const HabbitRouter = express.Router();
HabbitRouter.post("/createHabit", (req, res, next) => {
  HabbitController.CreateHabbit(req, res, next);
});
HabbitRouter.get("/", (req, res, next) => {
  HabbitController.DisplayHabbitsPage(req, res, next);
});
HabbitRouter.get("/delete/:id", (req, res, next) => {
  HabbitController.deleteHabbit(req, res, next);
});
HabbitRouter.get("/update/:id", (req, res, next) => {
  HabbitController.findTheUpdateHabit(req, res, next);
});
HabbitRouter.post("/updateHabbit:id", (req, res, next) => {
  HabbitController.UpdateHabbit(req, res, next);
});
HabbitRouter.get("/Togglehabbits/:id", (req, res, next) => {
  HabbitController.MarkHabbit(req, res, next);
});

export default HabbitRouter;
