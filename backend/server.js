const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'https://cathrin.github.io'
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running successfully!');
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please fill all fields' });
    }

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Database error' });
        } else {
            res.json({ success: true, message: 'Message sent successfully!' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is live and running on port ${PORT}`);
});