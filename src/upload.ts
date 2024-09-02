import multer from 'multer';
import express from 'express';

// 简化 multer 存储配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}`)
});

const upload = multer({ storage });

const initUpload = (app: express.Application) => {
  app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file as { filename: string } | undefined;
    if (file) {
      res.json({ message: 'File uploaded successfully', filename: file.filename });
    } else {
      res.status(400).send('No file uploaded');
    }
  });
}

export default initUpload;
