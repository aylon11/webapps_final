import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { ButtonContainer } from './Button';

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  function validateForm() {
    return name.length > 0 && password.length > 0 && password2.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    debugger;
  }

  return (
    <div className="Login col-10 mx-auto text-center text-title" style={{width: "40%", marginTop: "5%"}}>
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
        <ButtonContainer style={{background: "var(--mainBlue)"}} block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </ButtonContainer>
      </form>
    </div>
  );
}