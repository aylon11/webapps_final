import React, { useState, useContext } from "react";
import { FormGroup, FormControl, ControlLabel, Form, Checkbox } from "react-bootstrap";
import { ButtonContainer } from './Button';
import AuthApi from "../AuthApi";
import Cookies from "js-cookie";
import { ProductConsumer, ProductContext } from '../context';

var rememberMe = false;

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const Auth = React.useContext(AuthApi)

  const valueContext = React.useContext(ProductContext)


  function clickedRememberMe(event) {
    rememberMe = event.target.checked;
    console.log(rememberMe);
  }
  function validateForm() {
    return name.length > 0 && password.length > 0 && password2 === password;
  }

  function handleSubmit(event) {
    event.preventDefault();
    var _body = {
      id: name,
      pwd: password,
    }
    fetch('http://localhost:4000/user/add', {
      method: 'post',
      body: JSON.stringify(_body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      if (response.status === 200) {
        Auth.setAuth(true)
        Cookies.set("user", name, { expires: 7 })
        console.log('set auth to true')
      }
      return response.json();
    }).then( function (data){
      valueContext.setName(data['name'])
      var cart = JSON.parse(data['cart'])
      valueContext.setCart(cart)
      debugger
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
            <ButtonContainer style={{ background: "var(--mainOrange)" }} block bsSize="large" disabled={!validateForm()} type="submit">
              Login
            </ButtonContainer>
            <span>
              <Checkbox onChange={clickedRememberMe} disabled={!validateForm()} style={{ textTransform: "capitalize", display: "inline-block", marginLeft: "44px", fontSize: "14px" }} type="checkbox" value="Remember Me" label="Remember Me" > Remember Me </Checkbox>
            </span>

          </form>
        </div>

      )}
    </ProductConsumer>
  );
}