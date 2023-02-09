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
    //const highScoreSchema = new mongoose.Schema({
    //   playerName: String,
    //   score: Number
    //  });
     //const HighScore = mongoose.model("HighScore", highScoreSchema);
    new Game(req.body).save().then(function(){
        //res.send(req.body);
        res.redirect("highscores.html");
        
    });
});

/*app.get('/highScorePage', (req, res) => {
    HighScore.find({}).sort({score: -1}).exec((err, data) => {
      if (err) {
        res.send(err);
      } else {
        //send a compiled html doc with the info filled in
        res.send(
          <html>
          <head>
            <title>highscores</title>
            <nav stlye = "display: flex; justify-content: center;">
              <ul style = "display: flex; list-style: none; margin: 0; padding: 0;">
                <li><a href="http://localhost:5000/" style = "color: black; text-decoration: none; padding: 20px;">Home</a></li>
                <li><a href="http://localhost:5000/highScorePage" style = "color: black; text-decoration: none; padding: 20px;">High Scores Listing</a></li>
                <li><a href="http://localhost:5000/highScoreJSON" style = "color: black; text-decoration: none; padding: 20px;">High Scores JSON Strings</a></li>
              </ul>
            </nav>
          </head>
          <body>
            <table>
              <tr>
                <th>Name</th>
                <th>Score</th>
                
              </tr>
              ${data.map(item => 
                <tr>
                  <td>${item.playerName}</td>
                  <td>${item.score}</td>

                </tr>
              ).join('')}
            </table>
          </body>
          </html>
        );
      }
    });
  });*/


app.get("/getGames", function(req,res){
    Game.find({}).then(function(game)
    {
        /*db.collection("highscores")
      .find({})
      .sort({ "score": -1 })
      .toArray((error, scores) => {
        if (error) throw error;
        res.send(scores);
      });*/
        //console.log({game});
        res.json({game});
    })
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

