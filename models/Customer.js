const mongoose = require("mongoose");
const customerSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    customerCity: {
      type: String,
      required: true,
    },
    customerState: {
      type: String,
      required: true,
    },
    customerCountry: {
      type: String,
      required: true,
    },
    customerDescription: {
      type: String,
      required: true,
    },
    areaOfIntrest: {
      type: String,
      // enum:["Jobs", "Candidates", "Others"],
      default: "Jobs",
    },
    file: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
