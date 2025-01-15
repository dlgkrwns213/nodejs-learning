import dotenv from "dotenv";
import express from "express";
import routerMain from "./routes/main.js";
import routerAdmin from "./routes/admin.js";
import expressLayouts from "express-ejs-layouts";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDb();

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/", routerMain);
app.use("/", routerAdmin);

app.listen(port, ()=> {
  console.log(`Application listening on port ${port}`)
});