import multer from 'multer';
import path from 'path';
import { v4 as uuid } from 'uuid';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/uploads')); 
    },
    filename: (req, file, cb) => {
        const fileName = `${uuid()}_${file.originalname}`;
        cb(null, fileName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } 
});

export default upload;
