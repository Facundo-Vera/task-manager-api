import express from "express";
import morgan from "morgan";
import { dbConnect } from "./config/db.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(`dev`));


await dbConnect();

app.listen(PORT,() => console.log(`servidor en linea puerto: ${PORT} ✔`))