import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinery.js';
import path from 'node:path';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const folderPath = `bills`; // Update the folder path here
    const fileExtension = path.extname(file.originalname).substring(1);
    const publicId = `${file.fieldname}-${Date.now()}`;

    return {
      folder: folderPath,
      public_id: publicId,
      format: fileExtension,
    };
  },
});

export default storage;
