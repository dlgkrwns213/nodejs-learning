import express from "express";
import {
  getAllContacts,
  addContactForm, createContacts,
  getContact, updateContact, deleteContact, } from "../controllers/contactController.js";

const app = express();
const router = express.Router();

// contacts
router.route("/")
  .get(getAllContacts);

// contacts/add
router.route("/add")
  .get(addContactForm)
  .post(createContacts);

// contacts:id
router.route("/:id")
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

export default router;