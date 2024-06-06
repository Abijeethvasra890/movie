const db = require('../config/db');

const addToWishlist = (req, res) => {
  const { user_id, movie_id, movie_title, movie_poster } = req.body;
  const query = 'INSERT INTO wishlist (user_id, movie_id, movie_title, movie_poster) VALUES (?, ?, ?, ?)';
  db.query(query, [user_id, movie_id, movie_title, movie_poster], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Movie added to wishlist' });
  });
};

const removeFromWishlist = (req, res) => {
  const { user_id, movie_id } = req.body;
  const query = 'DELETE FROM wishlist WHERE user_id = ? AND movie_id = ?';
  db.query(query, [user_id, movie_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Movie removed from wishlist' });
  });
};

const getWishlist = (req, res) => {
  const { user_id } = req.params;
  const query = 'SELECT * FROM wishlist WHERE user_id = ?';
  db.query(query, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist
};
