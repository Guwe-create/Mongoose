var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Schema = new Schema({
    game:{
        type:String,
        score: Number
    }
});

mongoose.model("game", Schema);

