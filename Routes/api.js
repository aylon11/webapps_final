let express = require('express')
let Route = express()
let redis = require('../redisConnector')

// return instructions
Route.get('/', (req, res, next) => {
  res.send('This is the server for our web store application')
})

// get all users
Route.get('/users', redis.get_all_users)

// add a new user
Route.post('/user/add', redis.add_user)

// delete a user
Route.delete('/user/delete/:id', redis.delete_user)

// get a user by id
Route.get('/user/:id', redis.get_user)

// update a user by id
Route.put('/user/update/:id', redis.update_user)

// sign-in user
Route.post('/user/sign-in', redis.sign_in)

module.exports = Route