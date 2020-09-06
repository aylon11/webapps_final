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
    client.hmset('admin',['pwd','admin'], function(err){
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
  

// // Search User
// app.post('/user/search', function(req,res,next){
//     let id = req.body.id;
// })


// // Log-in and sign-in page
// app.get('/user/reg', function(req,res,next){
//     res.render('reg');
// })


// // Add User process
// app.post('/user/add/:name/:pwd', function(req,res,next){
//     let user_name = req.params.name;
//     let pwd = parseInt(req.params.pwd);

//     console.log(user_name, pwd)
//     // Check if user name is taken. If not, register new user
//     client.hgetall(user_name, function(err,obj){
//         if (obj){
//             res.send('User name already exists')
//         }
//         else{
//             client.hmset(user_name,['password',pwd], function(err,reply){
//                 if (err){
//                     console.log(err)
//                 }
//                 console.log(reply);
//                 // redirect to home page after registration
//                 res.send('new user added');
//             })
//         }
//     })
// })


// // test route to get a password of a given user
// app.get('/user/get/:name', function(req, res, next){
//     let name = req.params.name;
//     client.hgetall(name, function(err, obj){
//         // console.log(obj)
//         res.send(obj)
//   });
// })




// Start server
app.listen(port, function(){
   console.log('Server started on port ' + port) 
});

module.exports = app