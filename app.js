var express = require("express");
var app = express();
var path = require("path");
var bodyparser = require("body-parser");
var timing = 1;
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
  var test;
  Game.find({}).then(function(game)
  {
    
    for (let i = 0; i < game.length; i++) 
        {
          var holdGame = game;//.//su//g(0, string.indexOf(":"));
          //test = holdGame[i].game;
        if(holdGame[i].game = req.body.game)
         {
            test = game[i].id;
         }
         
        }

    res.redirect("QueryExample.html?id=" + test + "&game=" + req.body.game);

  }).catch(function()
  {
      res.redirect("QueryExample.html?game=");
  });
});

//Unity Route Testing
app.post("/unity", function(req, res){
    console.log("Hello from Unity.");
    //prep an object to recieve the object data
    var unityData = {
        "level" : req.body.level,   //we can grab basedon the parameter name values of the obj we want to grab
        "timeElapsed" : req.body.timeElapsed,
        "name" : req.body.name,
        "score" : req.body.score,
        "lastName" : req.body.lastName,
        "firstName" : req.body.firstName
    }
    Game.find({}).then(function(game)
    {
        for (let i = 0; i < game.length; i++) 
        {
            if(game[i].name == req.body.name)
            {
                console.log(`Game Deleted ${req.body.name}`);
                Game.findByIdAndDelete(game[i]).exec();
            }
        }
    });

    new Game(req.body).save().then(function(){
        //if(req.body != null)
        //{
            res.send(req.body);
        //}
        
    });
    console.log(unityData);
});

//#region SearchFunction
var placeSearch = 0;
var searchPlace;
app.get("/getSearch", function(req,res){
    console.log("request made return");
    Game.find({}).then(function(game)
    {
        var dataToSend = [];
        for (let i = 0; i < game.length; i++) 
        {
            if(game[i].name == searchPlace)
            {
                game[i].name = "( Read: " + game[i].name + ")";
                dataToSend[placeSearch] = 
                {
                    "level" : game[i].level,   //we can grab basedon the parameter name values of the obj we want to grab
                    "timeElapsed" : game[i].timeElapsed,
                    "name" : game[i].name,
                    "score" : game[i].score,
                    "lastName" : game[i].lastName,
                    "firstName" : game[i].firstName
                }
                
                
            }
        }
        //console.log(dataToSend[placeSearch]);
        res.send(dataToSend[placeSearch]);
        placeSearch = placeSearch + 1;
    
    });
});


app.post("/searchUnity", function(req, res){
    console.log("Hello from Unity search.");
    //prep an object to recieve the object data
    Game.find({}).then(function(game)
    {
        searchPlace = req.body.name;
        
    });
});
//#endregion

//#region DeleteUnityandEdit
var deleteAble;

app.post("/deleteUnity", function(req, res){
    console.log("Deleting from Unity");
    //prep an object to recieve the object data
    Game.find({}).then(function(game)
    {
        deleteAble = req.body.name;
        for (let i = 0; i < game.length; i++) 
        {
            if(game[i].name == deleteAble)
            {
                console.log(`Game Deleted ${req.body.name}`);
                Game.findByIdAndDelete(game[i]).exec();
                
            }
        }
    });
});
var editAble;
app.post("/editUnity", function(req, res){
    console.log("Editing from Unity");
    //prep an object to recieve the object data
    Game.find({}).then(function(game)
    {
        editAble = req.body.name;
        for (let i = 0; i < game.length; i++) 
        {
            if(game[i].name == editAble)
            {
                console.log(`Game Edited ${req.body.name}`);
                Game.findByIdAndUpdate(game[i], {level:req.body.level,firstName:req.body.firstName,lastName:req.body.lastName,score:req.body.score,timeElapsed:req.body.timeElapsed}, function()
                {
                });
                
            }
        }
    });
});

//#endregion


app.get("/getData", function(req,res){
    console.log("request made return");
    Game.find({}).then(function(game)
    {
        var dataToSend;
        game.sort();
        //console.log(game);
        //test = score.score;
            if(game[game.length - timing].name == null)
            {
                timing = 1;
            }
            //var placeHold;
            if(game.length - timing > 0)
            {
                dataToSend = 
            {
        
                "level" : game[game.length - timing].level,   //we can grab basedon the parameter name values of the obj we want to grab
                "timeElapsed" : game[game.length - timing].timeElapsed,
                "name" : game[game.length - timing].name,
                "score" : game[game.length - timing].score,
                "lastName" : game[game.length - timing].lastName,
                "firstName" : game[game.length - timing].firstName
            }

            timing = timing + 1;
            }
            
           // dataToSend = dataToSend + placeHold;
        
        res.send(dataToSend);
    
    });
});
app.get("/sendUnityData", function(req, res){
    console.log("request made");
    var test;
    Game.find({}).then(function(game)
    {
        var dataToSend;
        //console.log(game);
        //test = score.score;
        for (let i = 0; i < game.length; i++) 
        {
            //var placeHold;
            dataToSend = 
            {
        
                "level" : game[i].level,   //we can grab basedon the parameter name values of the obj we want to grab
                "timeElapsed" : game[i].timeElapsed,
                "name" : game[i].name,
                "score" : game[i].score,
                "lastName" : game[i].lastName,
                "firstName" : game[i].firstName
            }
           // dataToSend = dataToSend + placeHold;
        }
        res.send(dataToSend);
    
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

app.use(express.static(__dirname+"/AsteroidAvoidance"));
app.listen(port, function(){
    console.log(`Running on port ${port}`);
    
});

