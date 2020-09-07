fetch = require("node-fetch")

num_tests = 0
num_valid = 0

async function testServer(){

    console.log('\n')
    console.log('-----------------------------------------------------------')
    console.log('-----------------------STARTING TEST-----------------------')
    console.log('-----------------------------------------------------------')
    console.log('\n')


    // Sign up new users
    console.log("################### TEST1: SIGN UP USERS ###################")

    let User1 = await signUpUser("User1", "user1");
    let User2 = await signUpUser("User2", "user2");
    let User3 = await signUpUser("User3", "user3");
    console.log("----- TEST USER NAME EXIST (SHOULD FAIL) -----")
    let failSignup = await signUpUser("User1", "user1");
    if(!failSignup['name']){
        num_valid ++;
    }

    console.log('\n')
    console.log("################### TEST2: LOGIN USERS ###################")
    let log1 = await logInUser(User1['name'], "user1")
    let log2 = await logInUser(User2['name'], "user2")

    console.log("----- TEST WRONG PASSWORD (SHOULD FAIL) -----")

    let log3 = await logInUser(User3['name'], "user")
    if(!log3['name']){
        num_valid++;
    }

    console.log('\n')
    console.log("################### TEST3: UPDATE CART ###################")
    let cart1 = ["call of duty", "god of war", "overwatch"]
    let cart2 = ["pink floyd", "foo fighters", "stone sour"]

    let update1 = await updateCart(User1['name'], cart1)
    let update2 = await updateCart(User2['name'], cart2)


    console.log('\n')
    console.log("################### TEST4: GET CART ###################")
    let getCart1 = await getCart(User1['name'])
    let getCart2 = await getCart(User2['name'])

    console.log('getCart1: ' ,getCart1['cart'], 'cart1: ' ,cart1)
    console.log('getCart2', getCart2['cart'], 'cart2: ' ,cart2)


    console.log('\n')
    console.log("################### TEST5: GET USERS ###################")
    let users = await getUsers()
    console.log(users)

    if(users['users'].length === 4){
        console.log("4 users as expected")
    }
    else{
        num_valid--;
    }





    console.log('\n')
    console.log("#########################################################")
    console.log("#################### TEST DONE ! ########################")
    console.log("#########################################################")
    console.log(`              NUM OF TEST: ${num_tests}   NUM VALID: ${num_valid}`)
    console.log("#########################################################")

}


async function signUpUser(name, pwd){
    num_tests ++;
    return await fetch(`http://localhost:4000/user/add`, {
        method: 'post',
        body: JSON.stringify({"id":name, "pwd":pwd}),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }}).then(res =>{
            if (res.status === 200){
                console.log(`Registered User ${name}`)
                num_valid++
            }
            else{
                console.log(`${name}: Failed registering`)
            }
            return res.json()
        });
}

async function logInUser(name, pwd){
    num_tests ++;
    return await fetch(`http://localhost:4000/user/sign-in`, {
        method: 'post',
        body: JSON.stringify({"id":name, "pwd":pwd}),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }}).then(res =>{
            if (res.status === 200){
                console.log(`Login User ${name}`)
                num_valid++
            }
            else{
                console.log(`${name}: Failed login-in`)
            }
            return res.json()
        });
}

async function updateCart(name, cart){
    num_tests ++;
    return await fetch(`http://localhost:4000/user/update`, {
        method: 'PUT',
        body: JSON.stringify({"id":name, "cart":cart}),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }}).then(res =>{
            if (res.status === 200){
                console.log(`Updated Cart: ${name} - ${cart}`)
                num_valid++
            }
            else{
                console.log(`${name}: Failed updating cart`)
            }
            return res
        });
}

async function getCart(name){
    num_tests ++;
    return await fetch(`http://localhost:4000/user/cart/${name}`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }}).then(res =>{
            if (res.status === 200){
                console.log(`Got Cart: ${name}`)
                num_valid++
            }
            else{
                console.log(`${name}: Failed updating cart`)
            }
            return res.json()
        });
}

async function getUsers(){
    num_tests ++;
    return await fetch(`http://localhost:4000/users`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }}).then(res =>{
            if (res.status === 200){
                console.log(`Got User List`)
                num_valid++
            }
            else{
                console.log('failed getting users')
            }
            return res.json()
        });
}


testServer()