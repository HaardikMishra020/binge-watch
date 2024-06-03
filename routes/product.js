const express = require('express');
const router = express.Router();
const Product = require('../models/Movie');
const {isLoggedIn} = require('../middleware');
const { searchResults,playlistForm , showProduct , showAllPlaylists, createPlaylist, showMovie, addToPlaylist} =  require('../controllers/product')

router.get('/products',isLoggedIn , showAllPlaylists );
router.get('/search',isLoggedIn, searchResults);
router.get('/search/:id',isLoggedIn,showMovie);
router.get('/products/new', isLoggedIn, playlistForm);
router.post('/products/:id/movies',isLoggedIn,addToPlaylist);
router.post('/products', isLoggedIn,  createPlaylist);

router.get('/products/:id', showProduct);





module.exports = router;