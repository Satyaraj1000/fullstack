import express from "express";
import { authAdmin } from "../middleware/authAdmin.js";
import upload from "../middleware/upload.js";
import {
  loginAdmin,
  getProducts,
  getProduct,
  addProduct,
} from "../controllers/admin.controller.js";

export const adminRoutes = express.Router();

adminRoutes.get("/products", getProducts);
adminRoutes.get("/products/:slug", getProduct);
adminRoutes.post("/login", loginAdmin);

// ✅ Allow multiple images (max 3)
adminRoutes.post("/admin/products", authAdmin, upload.array("images", 3), addProduct);
