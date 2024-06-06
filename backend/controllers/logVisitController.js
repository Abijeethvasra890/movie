const db = require('../config/db');
const jwt = require('jsonwebtoken');

const logGenreVisit = (req, res) => {
  
  const { genre, user_id } = req.body;
  console.log(req.body);

  if (!Array.isArray(genre)) {
    return res.status(400).json({ error: 'Genres should be an array' });
  }

  const query = 'INSERT INTO user_genres (user_id, genre_id, genre_name) VALUES ?';
  const values = genre.map(gen => [user_id, gen.id, gen.name]);

  db.query(query, [values], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Genre visits logged' });
  });
};

const getUserGenres = (req, res) => {
    const { user_id } = req.query;
  console.log(req.query);
  const query = 'SELECT DISTINCT genre_id, genre_name FROM user_genres WHERE user_id = ?';
  db.query(query, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
    console.log(results);
  });
};

module.exports = { logGenreVisit, getUserGenres };
