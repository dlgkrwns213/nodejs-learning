import express from "express";
import contactsRoutes from "./routes/contactRoutes.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Node!");
});

app.use("/contacts", contactsRoutes);

app.listen(3000, () => {
  console.log('서버 실행 중');
});

