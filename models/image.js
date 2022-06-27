const mongoose =require('mongoose');

const Shema=mongoose.Schema;

const image =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    photo:{
        type:String
    },
});
 const Image=mongoose.model('Image',image);
 module.exports=Image;
