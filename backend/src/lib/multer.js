import multer from 'multer';
import storage from './cloudinery-multer.js';

const parser = multer({ storage: storage });
export default parser;
