import express from "express";

const app = express();
const router = express.Router();

// contacts
router.route("/")
  .get((req, res) => {
    res.send("Contacts Page");
  })
  .post((req, res) => {
    res.send("Create Contacts");
  });

// contacts:id
router.route("/:id")
  .get((req, res) => {
    res.send(`View Contact for ID : ${req.params.id}`);
  })
  .post((req, res) => {
    res.send(`Update Contact for ID : ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete Contact for ID : ${req.params.id}`);
  });

export default router;