// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express=require('express');

// Start up an instance of app
const app=express();

/* Middleware*/
const bodyParser=require('body-parser');

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port=3000;
const server=app.listen(port, function(){
    console.log(`App is running on ${port}`);
});

//post route for incoming data
app.post('/data/new',function(req,res){
    projectData.temperature=req.body.temperature
    projectData.date=req.body.date
    projectData.userInput=req.body.userInput
});

//get route that returns projectData object
app.get('/data', function (req, res) {
    res.send(projectData);
});
