import jwt from "jsonwebtoken";
import { Product } from "../models/productsData.models.js";
import { cloudinaryUpload } from "../config/cloudinary.js";

export const loginAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (
      name === process.env.ADMIN_NAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ username: name }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch product" });
  }
};

export const addProduct = async (req, res) => {
  console.log("Received Data:", req.body);
  console.log("Received Files:", req.files);

  try {
    const {
      name,
      slug,
      category,
      description,
      shortDescription,
      features,
      applications,
      industries,
    } = req.body;

    if (
      !name ||
      !slug ||
      !category ||
      !description ||
      !shortDescription ||
      !req.files ||
      req.files.length === 0
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }

    // Parse stringified fields
    const featureList = Array.isArray(features)
      ? features
      : JSON.parse(features || "[]");
    const applicationList = Array.isArray(applications)
      ? applications
      : JSON.parse(applications || "[]");
    const industryList = Array.isArray(industries)
      ? industries
      : JSON.parse(industries || "[]");

    // Upload each image to Cloudinary
    const imageUploads = await Promise.all(
      req.files.map((file) => cloudinaryUpload(file.path))
    );

    const newProduct = new Product({
      name,
      slug,
      category,
      description,
      shortDescription,
      features: featureList,
      applications: applicationList,
      industries: industryList,
      images: imageUploads.map((img) => ({
        public_id: img.public_id,
        url: img.secure_url,
      })),
    });

    await newProduct.save();

    res
      .status(201)
      .json({ success: true, message: "Product added", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    await Product.findByIdAndDelete(id);

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete product" });
  }
};
