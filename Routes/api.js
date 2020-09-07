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

// update a user by id
Route.put('/user/update', redis.update_user)

// sign-in user
Route.post('/user/sign-in', redis.sign_in)

// get a user's cart
Route.get('/user/cart/:id', redis.get_cart)

module.exports = Route