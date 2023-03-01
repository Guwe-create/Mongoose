var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Schema = new Schema({
    game:{
        type:String
        
    },
    score:{
        type:Number
    }, 
    name:{
        type:String
    },
    level:{
        type:Number
    },
    timeElapsed:{
        type:Number
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    }
});

mongoose.model("game", Schema);

