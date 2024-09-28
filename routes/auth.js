const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dbPath = path.join(__dirname, '../database.json');

// Rute untuk halaman utama
router.get('/', (req, res) => {
    res.render('index'); // Pastikan ada index.ejs untuk halaman utama
});

// Rute untuk halaman gallery
router.get('/gallery', (req, res) => {
    const videosDir = path.join(__dirname, '../public/videos');
    fs.readdir(videosDir, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading video directory');
        }
        // Mengirim daftar video ke halaman gallery
        res.render('gallery', { videos: files });
    });
});

// Rute untuk menampilkan halaman login
router.get('/login', (req, res) => {
    res.render('login');
});

// Rute untuk menampilkan halaman register
router.get('/register', (req, res) => {
    res.render('register');
});

// Rute untuk menangani registrasi
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Membaca database
    fs.readFile(dbPath, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }

        const db = JSON.parse(data);
        // Menambahkan user baru
        db.users.push({ name, email, password });

        // Menyimpan ke database
        fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error saving user');
            }
            // Redirect ke halaman login setelah registrasi berhasil
            res.redirect('/login');
        });
    });
});

// Rute untuk menangani login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    fs.readFile(dbPath, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }

        const db = JSON.parse(data);
        const user = db.users.find(u => u.email === email && u.password === password);

        if (user) {
            // Redirect ke halaman gallery setelah login berhasil
            res.redirect('/gallery');
        } else {
            res.status(401).send('Invalid email or password');
        }
    });
});

module.exports = router;
