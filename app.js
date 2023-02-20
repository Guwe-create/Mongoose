var express = require("express");
var app = express();
var path = require("path");
var bodyparser = require("body-parser");
//var mongoose = require("mongoose");
var port = process.env.port||5000;
//var db = require("./config/database");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB");
});

require("./models/Game");
var Game = mongoose.model("game");

//Example of generating text using routes
app.get("/", function(req,res){
    //res.send("Yo how you doing");
    res.redirect("highscores.html")
});

app.get("/poop", function(req,res){
    res.send("Yo poop");
});

app.post("/swap", function(req,res){
    res.redirect("highscores.html")
});

app.post("/saveGame", function(req, res){
    console.log(req.body);
  
    new Game(req.body).save().then(function(){
        //res.send(req.body);
        res.redirect("highscores.html");
        
    });
});
//Searching and sorting the games
app.get("/sort",function(req,res){
  Game.find({}).sort({"game":1}).then(function(game){
    res.json({game});
  });
});
app.post("/search", function(req, res){
  console.log(req.body.game);
  Game.find({"game":req.body.game}).then(function(game){
      res.redirect("QueryExample.html?id=" + game[0]._id + "&game=" + game[0].game);
  }).catch(function(){
      res.redirect("QueryExample.html?game=");
  });
});

app.get("/getGames", function(req,res){
    Game.find({}).then(function(game)
    {
        res.json({game});
    });
});

app.post("/deleteGame", function(req,res){
    console.log(`Game Deleted ${req.body.game}`);
    Game.findByIdAndDelete(req.body.game).exec();
    res.redirect('highscores.html');
});

app.use(express.static(__dirname+"/AsteroidAvoidance"));
app.listen(port, function(){
    console.log(`Running on port ${port}`);
    
});

