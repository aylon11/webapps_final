let redis = require('redis')  // Require Redis
const e = require('express')
let client = redis.createClient() // Create a new redis instance
let login_time = new Date()



exports.get_all_users = (req, res, next) => {
  let return_dataset = []

  client.keys('*', (err, id) => {
    let multi = client.multi()
    let keys = Object.keys(id)
    let i = 0

    keys.forEach( (l) => {
      client.hgetall(id[l], (e, o) => {
        i++
        if (e) {console.log(e)} else {
          temp_data = {'id':id[l],'data':o}
          return_dataset.push(temp_data)
        }

        if (i == keys.length) {
          res.send({users:return_dataset})
        }
      })
    })
  })
}


exports.add_user = (req, res, next) => {
  // Sign up a new user
  let id = req.body.id
  let pwd = req.body.pwd
  let cart = String([])

  client.hgetall(id, function(err,obj){
    if (obj){
        res.status(404)
        res.send({"msg":"User name already exists"})
    }
    else{
        client.hmset(id,['pwd',pwd,'cart',cart,'create_time',login_time], function(err,reply){
            if (err){
                console.log(err)
            }
            console.log(reply);
            // redirect to home page after registration
            res.send({"msg":"New User Created!", "name": id ,"cart": cart});
        })
    }
  })
}


exports.delete_user = (req, res, next) => {
  // find key associated with the id and deletes it
  client.del(req.params.id, (err, reply) => {
    if (err) {
      console.log(err)  // callback incase something goes wrong
    }

    console.log(reply)  // log success message
    res.send('User deleted successfully') // response back to the client
  })
}

exports.get_user = (req, res, next) => {
  // id from url Parameter
  let id = req.body.id
  let pwd = req.body.pwd

  // get all values associated with the key as id
  client.hgetall(id, (err, obj) => {
    if (!obj) {
      res.send('User does not exist') // if no user is associated with that id/key return this
    } else {    
      if (obj.pwd == pwd){
        res.send({
          'user': obj // if user is found return details
        })
      }
      else{
        res.status(404);
        res.send('Wrong Password')
      }
    }
  })
}

exports.update_user = (req, res, next) => {
  // put Parameters
  let id = req.body.id
  let cart = req.body.cart

  // make id the key and assign the id to the other Parameters
  client.hset(id, [
    'cart', cart
  ], (err, reply) => {
    if (err) {
      console.log(err)  // callback to log errors
    }

    console.log(reply)  // log success message
    res.send("User updated successfully") // response to client
  })
}


exports.sign_in = (req, res, next) => {
  let id = req.body.id
  let pwd = req.body.pwd
  client.hgetall(id, function(err,obj){
    if (obj){
      if(obj.pwd === pwd){
          res.status(200)
          res.send(obj)
      }
      else{
          res.status(404) // wrong pwd
          res.send('wrong Password')
      }
    }
    else{
        res.status(400) // User doesn't exist
        res.send('User doesnt exist')
    }
  })
}