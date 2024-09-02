import express from 'express';
import multer from 'multer';

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), (req, res) => {
  const file = req.file as { filename: string } | undefined;
  if (file) {
    res.json({ message: 'File uploaded successfully', filename: file.filename });
  } else {
    res.status(400).send('No file uploaded');
  }
});

export default router;