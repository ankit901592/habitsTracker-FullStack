import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import connect from "./config.js/mongose.config.js";
import HabbitRouter from "./Src/Routes/Habbit.routes.js";
import { WeeklyRouter } from "./Src/Routes/weeklyHabit.routes.js";

const server = express();

server.use(express.static("public"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.set("view engine", "ejs");
server.set("views", "./Src/views");

server.use(express.static("Src/views"));

server.use("/api/", HabbitRouter);
server.use("/api/weekly", WeeklyRouter);
console.log(process.env.MONGO_URI);

server.listen(3000, () => {
  
  console.log("server is runnig on port   http://localhost:3000/api/");
  connect();
});
