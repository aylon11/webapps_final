const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');
const { send } = require('process');
const cors = require('cors');

const port = 4000;

const app = express();
app.use(cors());

let routes = './Routes/api'

let client = redis.createClient();

// Connect to Redis and create admin user
client.on('connect', function(err){
    if (err){
        console.log('Could not connect to Redis ' + err)
    }
    else{
    console.log('Connected to Redis')
    client.flushdb( function (err, succeeded) {
        console.log(succeeded); // will be true if successfull
    });
    client.hmset('admin',['pwd','admin','create_time','2000 B.C.','cart','[]'], function(err){
        if(err){
            console.log('Error in creating admin user ' + err)
        }
        else{
            console.log('Connected to Redis and added admin user')
        }
    });
    }
});



// Security measure - limit connections (DDoS)
const rateLimit = require("express-rate-limit");
const Route = require('./Routes/api');
const limiter = rateLimit({
    windowMs: 10000,
    max: 200,
    message: "Too many requests from this IP, please try again"
});
app.use(limiter);

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


// methodOverride
app.use(methodOverride('_method'));


app.use(Route)


// 404 handler
app.use((req, res) => {
    res.status(404)
    res.send('endpoint not found')
  })
  

// Start server
app.listen(port, function(){
   console.log('Server started on port ' + port) 
});

module.exports = app