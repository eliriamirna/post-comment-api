import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/uploads')); 
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        
        cb(null, originalName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } 
});

export default upload;
