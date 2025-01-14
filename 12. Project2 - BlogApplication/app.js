import dotenv from "dotenv";
import express from "express";
import router from "./routes/main.js";
import expressLayouts from "express-ejs-layouts";
import connectDb from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDb();

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

app.use("/", router);

app.listen(port, ()=> {
  console.log(`Application listening on port ${port}`)
});