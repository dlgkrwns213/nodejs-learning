import dotenv from "dotenv";
import express from "express";
import router from "./routes/main.js";
import expressLayouts from "express-ejs-layouts";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", router);

app.listen(port, ()=> {
  console.log(`Application listening on port ${port}`)
});