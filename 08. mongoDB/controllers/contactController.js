import asyncHandler from "express-async-handler";

// Get all contacts
// Get /contacts
const getAllContacts = asyncHandler(async (req, res) => {
  res.send("Contact Page");
});

// Create contact
// Post /contacts
const createContacts = asyncHandler(async (req, res) => {
  const {name, email, phone} = req.body;
  if (!name || !email || !phone) {
    return res.send("필수 값이 입력되지 않음");
  }
  res.send("Create page")
});

const getContact = asyncHandler( async (req, res) => {
  res.send(`View Contact for ID : ${req.params.id}`);
});

const updateContact = asyncHandler(async (req, res) => {
  res.send(`Update Contact for ID : ${req.params.id}`);
});

const deleteContact = asyncHandler(async (req, res) => {
  res.send(`Delete Contact for ID : ${req.params.id}`);
});

export { 
  getAllContacts, 
  createContacts, 
  getContact, 
  updateContact,
  deleteContact
};