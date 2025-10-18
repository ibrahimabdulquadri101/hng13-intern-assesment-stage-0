import { PORT } from "./env.js";
import express from "express";
import { connectToCatApi } from "./services/catApi.js";
import { profileRouter } from "./routes/Profile.router.js";
const app = express();
app.use(express.json());
app.use("/", profileRouter);
app.get("/", (req, res) => {
  res.send("Welcome to profile Application");
});
app.listen(PORT, (req, res) => {
  console.log("App running on localhost 3000");
  connectToCatApi();
});
