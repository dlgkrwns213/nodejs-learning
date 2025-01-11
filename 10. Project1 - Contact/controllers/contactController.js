import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";

// Get all contacts
// Get /contacts
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.render("index", { contacts: contacts });
});

// View add Contact form
// Get /contacts/add
const addContactForm = (req, res) => {
  res.render("add");
};

// Create contact
// Post /contacts
const createContacts = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {name, email, phone} = req.body;
  if (!name || !email || !phone) {
    return res.send("필수 값이 입력되지 않음");
  }

  const contact = await Contact.create({
    name, email, phone
  });
  res.send("Create page")
});

// Get contact
// Get /contacts/:id
const getContact = asyncHandler( async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render("update", {contact: contact});
});

const updateContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const {name, email, phone} = req.body;
  const contact = await Contact.findById(id);

  if (!contact) {
    throw new Error("Contact not found");
  }

  contact.name = name;
  contact.email = email;
  contact.phone = phone;

  contact.save();

  res.redirect("/contacts");
});

const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);

  if (!contact) {
    throw new Error("Contact not found");
  }

  await Contact.deleteOne();
  res.send("Deleted");
});

export { 
  getAllContacts, 
  createContacts, 
  getContact, 
  updateContact,
  deleteContact,
  addContactForm,
};