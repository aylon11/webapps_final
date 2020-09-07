import React, { useState, useContext } from "react";
import { FormGroup, FormControl, ControlLabel, Checkbox, Alert } from "react-bootstrap";
import { ButtonContainer } from './Button';
import AuthApi from "../AuthApi";
import Cookies from "js-cookie";
import { ProductConsumer, ProductContext } from '../context';

var rememberMe = false;
var in30Minutes = 1/48;
var isLogIn = false;

export default function Register() {
  const [name, setName] = useState("");
  const [msg, updateMsg] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const Auth = React.useContext(AuthApi)

  const valueContext = React.useContext(ProductContext)


  function clickedRememberMe(event) {
    rememberMe = event.target.checked;
  }

  function validateForm() {
    return name.length > 0 && password.length > 0 && password2 === password;
  }

  function handleSubmit(event) {
    var callSuccess = false
    var extension = 'add'
    if (isLogIn) {
      extension = 'sign-in'
    }
    event.preventDefault();
    var _body = {
      id: name,
      pwd: password,
    }
    fetch(`http://localhost:4000/user/${extension}`, {
      method: 'post',
      body: JSON.stringify(_body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      if (response.status === 200) {
        callSuccess = true
        Auth.setAuth(true)
        var expTime = 7;
        if (rememberMe){
          expTime = in30Minutes
        }
        Cookies.set("user", name, { expires: expTime })
        console.log('set auth to true')
      }
      return response.json();
    }).then( function (data){
      if (callSuccess){
        valueContext.setName(data['name'])
        valueContext.setCart(data['cart'])
        valueContext.presentNavBar(true);
        valueContext.addTotal()
        // populate admin's user data
        if(data['name'] === 'admin'){
          fetch(`http://localhost:4000/users`, {
          method: 'get',
          headers: {
           Accept: "application/json",
           "Content-Type": "application/json"
          }}).then(function (res){
            return res.json();
          }).then( function (users_data){
              valueContext.setUsers(users_data['users'])
          })
        }
      }
      updateMsg(data['msg'])
    })
  }

  return (

    <ProductConsumer>
      {(value) => (

        <div className="Login col-10 mx-auto text-center text-title" style={{ width: "40%", marginTop: "5%" }}>
          <form onSubmit={handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Name</ControlLabel>
              <FormControl
                autoFocus
                type="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
              />
            </FormGroup>
            <FormGroup controlId="password2" bsSize="large">
              <ControlLabel>Verify Password</ControlLabel>
              <FormControl
                value={password2}
                onChange={e => setPassword2(e.target.value)}
                type="password"
              />
            </FormGroup>
            <ButtonContainer onClick={() => { isLogIn = true }} style={{ background: "var(--mainBlue)" }} block bsSize="large" disabled={!validateForm()} type="submit">
              Log In
            </ButtonContainer>
            <ButtonContainer onClick={() => { isLogIn = false }} style={{ marginLeft: "30px", background: "var(--mainOrange)" }} block bsSize="large" disabled={!validateForm()} type="submit">
              Sign Up
            </ButtonContainer>
            <span>
              <Checkbox onChange={clickedRememberMe} disabled={!validateForm()} style={{ textTransform: "capitalize", display: "inline-block", marginLeft: "30px", fontSize: "14px" }} type="checkbox" value="Remember Me" label="Remember Me" > Remember Me </Checkbox>
            </span>

            {msg == "" ? null :
            <Alert style={{ marginTop: "30px" }} variant="danger">
              <p>
                {msg}
              </p>
            </Alert>}

          </form>
        </div>

      )}
    </ProductConsumer>
  );
}