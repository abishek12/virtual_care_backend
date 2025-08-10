import express from "express";

const router = express.Router();

import userRoute from "./src/components/users/router/user.route.js";
import authRoute from "./src/components/authentication/router/auth.route.js";

import serviceRoute from "./src/components/services/router/service.route.js";
import contactRoute from "./src/components/contact/router/contact.route.js";
import bookingRoute from "./src/components/assessment-booking/router/booking.router.js";

import articleRoute from "./src/components/articles/article.route.js";

router
  .use("/user", userRoute)
  .use("/auth", authRoute)
  .use("/service", serviceRoute)
  .use("/contact", contactRoute)
  .use("/article", articleRoute)
  .use("/booking", bookingRoute);

export default router;
