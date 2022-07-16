const Customer = require("../models/Customer");
const joi = require("joi");

const asyncHandler = require("express-async-handler");
const getAllCustomers = asyncHandler(async (req, res) => {
  const allCustomer = await Customer.find().sort("createdAt");
  res.status(200).send(allCustomer);
});

const getSingleCustomer = asyncHandler(async (req, res) => {
  const customerId = req.params.id;
  const customer = await Customer.findById({
    _id: customerId,
  });
  if (!customer) {
    throw new Error(`No Customer with id ${customerId}`);
  }
  res.status(200).json(customer);
});

const addCustomer = asyncHandler(async (req, res) => {
  const schema = joi
    .object({
      customerName: joi.string().min(3).max(50).required(),
      customerNumber: joi
        .string()
        .length(12)
        .pattern(/[6-9]{1}[0-9]{9}/)
        .required(),
      customerCity: joi.string().min(3).max(50).required(),
      customerState: joi.string().min(3).max(50).required(),
      customerCountry: joi.string().min(3).max(50).required(),
      customerDescription: joi.string().min(3).max(500).required(),
      areaOfIntrest: joi.string().default("Jobs"),
    })
    .options({ abortEarly: false });
  const { error } = schema.validate(req.body);
  console.log(error);
  req.body.file = req.file.path;
  if (error) {
    res.json({ msg: "error", error: error.message });
  } else {
    const customer = await Customer.create(req.body);
    res.status(201).json({ customer });
  }
  //
  // console.log(req.body)
});

const updateCustomer = asyncHandler(async (req, res) => {
    
    if (!req.body.file) {
        req.body.file = req.file.path;
      }
      const customerId = req.params.id;
      const customer = await Customer.findByIdAndUpdate(
        {
          _id: customerId,
        },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!customer) {
        throw new NotFoundError(`No customer with id ${customerId}`);
      }
      res.json({ customer });  
});

const deleteCustomer = asyncHandler(async (req, res) => {
  const customerId = req.params.id;
  const customer = await Customer.findByIdAndRemove({
    _id: customerId,
  });
  if (!customer) {
    throw new Error(`No Customer with id ${customerId}`);
  }
  res.status(200).json({ msg: "Customer deleted" });
});

const searchCustomer = asyncHandler(async (req, res) => {
  searchName = req.params.name;
  const customer = await Customer.findOne({
    customerName: searchName,
  });
  if (!customer) {
    // throw new Error(`No customer with name ${searchName}`)
    res.status(400).send("no customer");
  }

  res.status(200).json(customer);
});

module.exports = {
  getAllCustomers,
  getSingleCustomer,
  addCustomer,
  deleteCustomer,
  searchCustomer,
  updateCustomer,
};
