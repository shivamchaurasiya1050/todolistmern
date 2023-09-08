const mongoose= require("mongoose");

const todoSchema= new mongoose.Schema({
    name:{
        type:String,
   
    }, 
    email:{
        type:String
    },
    password:{
         type:String
    }

})

module.exports= mongoose.model("Todo",todoSchema)