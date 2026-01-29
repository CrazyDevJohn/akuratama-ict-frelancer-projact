import { v2 as Cloudinary } from 'cloudinary';

Cloudinary.config({
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_API_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
});

export default Cloudinary;
