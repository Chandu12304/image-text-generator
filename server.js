const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    Tesseract.recognize(
        req.file.path,
        'eng',
        {
            logger: (m) => console.log(m)
        }
    ).then(({ data: { text } }) => {
        res.json({ text });
    }).catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to process image' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
