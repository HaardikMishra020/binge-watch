const Playlist = require("../models/Playlist");
const Movie=require("../models/Movie")
const axios=require('axios');
const User=require('../models/User')


const showAllPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({author: req.user._id}).populate('movies');
        res.render('products/index', { playlists });
    }
    catch (e) {
        res.status(500).render('error',{err:e.message})
    }
}

const searchResults = async (req, res) => {
    let keyword = req.query.keyword;
    if (!keyword) {
        return res.render('search', { movies: [] });
    }
    const apiKey = process.env.API_KEY; // Replace with your actual API key
    const apiUrl = `http://www.omdbapi.com/?s=${keyword}&apikey=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const movies = response.data.Search || [];
        
        res.render('search', { movies: movies });
        
    } catch (error) {
        console.error('Error fetching data from API:', error);
        res.render('search', { movies: [] });
    }
};

const showMovie=async(req,res)=>{
    const movieId = req.params.id;
    const apiKey = process.env.API_KEY; // Replace with your actual API key
    const apiUrl = `http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}&plot=full`;
    try{
        let movie = await Movie.findOne({ imdbID: movieId });
        
        if(!movie){
        movie=await axios.get(apiUrl);
        movie=movie.data;
    }
        const playlists = await Playlist.find({author: req.user._id});
        res.render('products/show',{ movie: movie,playlists:playlists });

    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }

}
const addToPlaylist=async(req,res)=>{
    const { playlistIds } = req.body;
    const { id } = req.params;
    const apiKey = process.env.API_KEY;  // Replace with your actual API key
    const apiUrl = `http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;

    try {
        // Check if the movie already exists in the database
        let movie = await Movie.findOne({ imdbID: id });
        if (!movie) {
            const response = await axios.get(apiUrl);
            movie = new Movie(response.data);
            await movie.save();
        }
        const playlists = await Playlist.find({ _id: { $in: playlistIds }});
        for (const playlist of playlists) {
            if (!playlist.movies.includes(movie._id)) {
                playlist.movies.push(movie);
                await playlist.save();
            }
        }
        res.redirect('/products')
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const playlistForm = (req, res) => {
    try {
        res.render('products/new');
    }
    catch (e) {
         res.status(500).render('error',{err:e.message})
    }  
}

const createPlaylist = async (req, res) => {

    try {
        const { name } = req.body;
        const visibility = req.body.visibility ? true : false;
        await Playlist.create({ name, author:req.user._id,visibleToAll:visibility });
        req.flash('success', 'Successfully created a new playlist!');
        res.redirect('/products');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
}

const showProduct = async(req, res) => {

    try {
        const { id } = req.params;
        const playlist = await Playlist.findById(id).populate('movies');
        const {username}=await User.findById(playlist.author);
        if((playlist.visibleToAll==true)||(req.user!=undefined&&playlist.author.equals(req.user._id))){
        res.render('products/showPlaylist', { playlist:playlist,name:username}); }
        else{
            req.flash('error',"You don't have access to this playlist");
            res.redirect('/login');
        }
    }
    catch (e) {
        res.status(500).render('error',{err:e.message})
    }
}








module.exports = {addToPlaylist,showMovie,searchResults,showAllPlaylists , playlistForm , createPlaylist , showProduct }