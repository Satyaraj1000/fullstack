import Enquiry from "../models/enquiry.models.js";

export const submitEnquiry = async (req, res) => {
  try {
    const { name, company, email, phone, product, quantity, requirements } =
      req.body;

    if (!name || !email || !phone || !product) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const enquiry = new Enquiry({
      name,
      company,
      email,
      phone,
      product,
      quantity,
      requirements,
      date: new Date(),
    });

    await enquiry.save();

    res.status(200).json({ message: "Enquiry stored successfully" });
  } catch (err) {
    console.error("Error saving enquiry:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, enquiries });
  } catch (err) {
    console.error("Error fetching enquiries:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch enquiries" });
  }
};
