const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const register = async (req, res) => {
  const { email, password, display_name, photo_url } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (email, password, display_name, photo_url) VALUES (?, ?, ?, ?)';
    db.query(query, [email, hashedPassword, display_name, photo_url], (err, result) => {
      if (err) throw err;
      res.status(201).send('User registered successfully');
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) throw err;
      if (results.length === 0) return res.status(400).send('User not found');

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).send('Invalid credentials');

      const token = jwt.sign({ id: user.id },  process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { register, login };
