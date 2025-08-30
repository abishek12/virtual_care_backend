// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import multer from "multer";

// import {
//   CLOUD_NAME,
//   CLOUD_API_KEY,
//   CLOUD_API_SECRET,
// } from "../utils/app.env.js";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "articles",
//     format: async (req, file) => "png", // supports promises as well
//     public_id: (req, file) => {
//       const timestamp = Date.now();
//       const originalName = file.originalname.split(".")[0];
//       return `${originalName}-${timestamp}`;
//     },
//   },
// });

// cloudinary.config({
//   cloud_name: CLOUD_NAME,
//   api_key: CLOUD_API_KEY,
//   api_secret: CLOUD_API_SECRET,
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed!"), false);
//   }
// };

// const parser = multer({ storage, fileFilter });

// export { cloudinary, parser };
