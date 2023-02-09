var express = require("express");
var app = express();
var path = require("path");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.port||3000;
var db = require("./config/database");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

//Mongoos Connect (mongodb+srv://Mango12345:<password>@cluster0.w21atvv.mongodb.net/?retryWrites=true&w=majority);
mongoose.connect(db.mongoURI,{
    useNewURLParser:true

}).then(function(){
    console.log("Connected to MongoDB Database");
}).catch(function(err){
    console.log(err);
});

require("./models/Game");
var Game = mongoose.model("game");

//Example of generating text using routes
app.get("/", function(req,res){
    //res.send("Yo how you doing");
    res.redirect("gameList.html")
});

app.get("/poop", function(req,res){
    res.send("Yo poop");
});

app.post("/saveGame", function(req, res){
    console.log(req.body);
    
    new Game(req.body).save().then(function(){
        //res.send(req.body);
        res.redirect("gameList.html");
        
    });
});

app.get("/getGames", function(req,res){
    Game.find({}).then(function(game)
    {
        //console.log({game});
        res.json({game});
    })
});

app.post("/deleteGame", function(req,res){
    console.log(`Game Deleted ${req.body.game}`);
    Game.findByIdAndDelete(req.body.game).exec();
    res.redirect('gameList.html');
});
app.post("/updateGame", function(req,res)
{
    console.log(req.body);
    ///res.redirect('gameList.html');
    Game.findByIdAndUpdate(req.body.id, {game:req.body.game}, function()
    {
        res.redirect('gameList.html');
    });
});

app.post("/getID::id", function(req,res)
{
console.log(req.params.game);
res.redirect(`updatePage.html?id=${req.params.id}`);// + "/" + req.body.game._id);
});

app.use(express.static(__dirname+"/pages"));
app.listen(port, function(){
    console.log(`Running on port ${port}`);
    
});

