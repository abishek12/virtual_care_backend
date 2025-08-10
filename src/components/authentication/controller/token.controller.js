import jwt from "jsonwebtoken";
import logger from "../../../lib/utils/logger.js";

const refreshTokenController = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Refresh token not provided",
    });
  }

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      logger.error(`Refresh Token Error: ${err}`);
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const access_token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "15m",
      }
    );

    return res.status(200).json({
      success: true,
      access_token,
    });
  });
};

export default refreshTokenController;
