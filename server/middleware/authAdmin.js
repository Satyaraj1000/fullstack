import jwt from "jsonwebtoken";

export const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ✅ Check if Authorization header is present and formatted correctly
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
    }

    // ✅ Extract the token
    const token = authHeader.split(" ")[1];

    // ✅ Ensure JWT Secret exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables.");
      return res.status(500).json({ success: false, message: "Server configuration error." });
    }

    // ✅ Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Validate Admin Credentials
    if (decoded.username !== process.env.ADMIN_NAME) {
      return res.status(403).json({ success: false, message: "Forbidden. Invalid Admin Credentials." });
    }

    req.admin = decoded; // Attach decoded token data to request
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Token Verification Error:", error);

    // ✅ Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
    }

    return res.status(401).json({ success: false, message: "Authentication failed." });
  }
};
