const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); // Pastikan path ini benar

const app = express();

// Middleware untuk parsing body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Menyajikan file statis
app.use(express.static(path.join(__dirname, 'public')));

// Menggunakan rute
app.use('/', authRoutes); // Menambahkan rute untuk halaman utama

// Menyajikan tampilan
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Menjalankan server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
