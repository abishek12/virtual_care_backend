import jwt from "jsonwebtoken";
import logger from "../../../lib/utils/logger.js";

const refreshTokenController = async (req, res) => {
  try {
    // Read refresh token from cookie instead of body
    const refresh_token = req.cookies?.refresh_token;

    if (!refresh_token) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not provided",
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);

    // Re-issue access token (include role!)
    const access_token = jwt.sign(
      { id: decoded.id, email: decoded.email, role: decoded.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    return res.status(200).json({
      success: true,
      access_token,
    });
  } catch (err) {
    logger.error(`Refresh Token Error: ${err.message}`);

    return res.status(403).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};

export default refreshTokenController;
