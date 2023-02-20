var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Schema = new Schema({
    game:{
        type:String
        
    },
    score:{
        type:Number
    }
});

mongoose.model("game", Schema);

