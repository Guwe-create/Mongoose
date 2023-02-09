var express = require("express");
var app = express();    //sets to an object instance    //object instantiation in JS
var port = process.env.port || 5000;

//setup a route for static files
app.use(express.static(__dirname+"/"));

//place a request with a designated response on access - ROUTE
app.get("/", function(req, res){
    //res.send("Welcome to Web API Games Server");
    res.sendFile(__dirname+"/index.html");
});
require("./models/Game");
var Game = mongoose.model("game");

//Route for a home section
app.get("/home", function(req, res){
    res.send("This will be our homepage for now.");
});



//testing for unity 
//let enemy = {
	//"name": "orc",
	//"health": 100,
	////"attack": 25
//}

//app.get('/enemy/orc', (req, res) => {
   //// res.send(enemy);
//node });
app.use(express.static(__dirname+"/pages"));
app.listen(port, function(){
    console.log("Server is running... Please remember to shut down the server... Shutdown with: Control+C");
});   //listens on port 3000
