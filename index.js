import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Router from './Router/Router.js'

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("get in the server"));
app.use('/api',Router)

mongoose
  .connect(process.env.CONNECTION_URL)
  .then((result) => console.log("Data Base Connected Successfully"))
  .catch((err) => console.log(err));
app.listen(PORT, () => console.log(`server start to run on port no ${PORT}`));
