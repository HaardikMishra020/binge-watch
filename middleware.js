// const { productSchema } = require("./schema");
// const { reviewSchema } = require("./schema");
const passport = require('passport');
const Product = require("./models/Movie");


const isLoggedIn = (req,res,next)=>{
    // console.log(req.originalUrl);
    // console.log(req.xhr);
    if(req.xhr && !req.isAuthenticated()){
        return res.status(401).json({msg:'you need to login first'});
    }
    
    if(!req.isAuthenticated()){
        req.flash('error' , 'you need to login first');
        return res.redirect('/login');
    }
    next();
}





module.exports = {isLoggedIn } ;