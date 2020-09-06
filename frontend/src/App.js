import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';
import Modal from './components/Modal';
import AboutUs from './components/AboutUs';
import Register from './components/Register';
import { Switch, Route, Redirect } from 'react-router-dom';


class App extends Component {

  constructor() {
    super();
    this.state = {
      name: "React",
      isUserAuthenticated: false
    };
  }

  isUserAuthenticatedChange

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                this.state.isUserAuthenticated ?
                  <Redirect to="/products" component={ProductList} /> :
                  <Redirect to="/register" component={Register} />
              )
            }}
          />
          <Route exact path="/products" component={ProductList}></Route>
          <Route path="/about" component={AboutUs}></Route>
          <Route path="/details" component={Details}></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route path="/register" component={Register}></Route>
          <Route component={Default}></Route>
        </Switch>
        <Modal />
      </React.Fragment>
    );
  }
}

export default App;
