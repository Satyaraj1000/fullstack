import express from "express";
import { submitEnquiry, getAllEnquiries } from "../controllers/enquiry.controller.js";
import { authAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

router.post("/enquiry", submitEnquiry); // public route
router.get("/admin/enquiries", authAdmin, getAllEnquiries); // admin-only

export default router;
