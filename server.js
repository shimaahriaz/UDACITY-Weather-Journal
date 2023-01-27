// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
// (body parser) => allow the backend to access JSON Data sent from the client using request body in bost route handler.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance(for security purposes)
// Cors is a mechanism that allows aclint application to accept any request or restricted resources hosted on server from a different origin.
// His Default (are only allowed to request resources that live on the same origin as the location where the client application is running.) 
const cors = require('cors');

// Enable All CORS Requests
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening(){
    console.log(` Server Running on localhost:http://localhost:${port}`);
};

// Callback Function To Completa GET 
//GET is an HTTP request method used to request data from a specified resource.
//Get Is Afunction That Accespt Two Parm (Url, callBack(Req,res))
app.get('/getData', (request, respons)=> {
    respons.send(projectData);
  });


 // Callback Function To Completa POST 
 //POST is an HTTP request method that requests the webserver to accept the data enclosed in the body of the request message.
 app.post('/storData',callBack);
 function callBack(request, respons) {
    projectData.date = request.body.date
    projectData.temp = request.body.temp
    projectData.content = request.body.content
  respons.send();  
 }
