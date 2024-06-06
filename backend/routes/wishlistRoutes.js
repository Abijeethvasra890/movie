const express = require('express');
const { addToWishlist, removeFromWishlist, getWishlist } = require('../controllers/wishlistController');
const router = express.Router();

router.post('/add', addToWishlist);
router.post('/remove', removeFromWishlist);
router.get('/:user_id', getWishlist);

module.exports = router;
