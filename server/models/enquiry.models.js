// enquiry.models.js
import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  name: String,
  company: String,
  email: String,
  phone: String,
  product: String,
  quantity: String,
  requirements: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);
export default Enquiry;
