const express = require('express');
const { logGenreVisit, getUserGenres } = require('../controllers/logVisitController');
const router = express.Router();

router.post('/log-visit', logGenreVisit);
router.get('/user-genres', getUserGenres);

module.exports = router;
