const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost", // Sesuaikan dengan pengaturan MySQL Anda
  user: "root", // Sesuaikan dengan pengaturan MySQL Anda
  password: "", // Sesuaikan dengan pengaturan MySQL Anda
  database: "sevencell", // Sesuaikan dengan nama database Anda
});

db.connect((err) => {
  if (err) throw err;
  console.log("Terhubung ke database MySQL");
});

// Tambahkan rute untuk pendaftaran (signup) di sini

app.post("/signin", (req, res) => {
  const { fullname, email, password, phone, address } = req.body;

  const sql =
    "INSERT INTO singin (fullname, email, password, phone, address) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [fullname, email, password, phone, address], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Gagal menyimpan data ke database" });
    } else {
      res.status(200).json({ message: "Pendaftaran berhasil" });
    }
  });
});
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

