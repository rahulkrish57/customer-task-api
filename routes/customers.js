const express = require("express");
const router = express.Router();
const {getAllCustomers, getSingleCustomer, addCustomer, deleteCustomer, searchCustomer, updateCustomer} = require("../controllers/customers")
const upload = require("../middleware/upload")
//fileUpload
router.route("/").get(getAllCustomers).post(upload.single("file"),addCustomer);
router.route("/:id").get(getSingleCustomer).delete(deleteCustomer).patch(upload.single("file"),updateCustomer);
router.route("/search/:name").get(searchCustomer)

module.exports = router;
