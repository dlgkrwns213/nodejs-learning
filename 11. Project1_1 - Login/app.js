import express from "express";
import dbConnect from "./config/dbConnects.js";
import contactsRoutes from "./routes/contactRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import methodOverride from "method-override";

const app = express();

dbConnect();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));

app.use(methodOverride("_method"));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/", loginRoutes);
app.use("/contacts", contactsRoutes);

app.listen(3000, () => {
  console.log('서버 실행 중');
});



