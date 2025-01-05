import express from "express";
import {getAllContacts, createContacts, getContact, updateContact, deleteContact} from "../controllers/contactController.js";

const app = express();
const router = express.Router();

// contacts
router.route("/")
  .get(getAllContacts)
  .post(createContacts);

// contacts:id
router.route("/:id")
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

export default router;