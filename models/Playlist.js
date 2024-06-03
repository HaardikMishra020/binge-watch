const mongoose=require('mongoose');
const shortid=require('shortid');

const PlaylistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: {type:String},
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    playlistCode: {
        type: String,
        required: true,
        unique: true,
        default: () => shortid.generate()
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    visibleToAll:{type:Boolean, default:false},
});
const Playlist = mongoose.model('Playlist', PlaylistSchema);
module.exports=Playlist;