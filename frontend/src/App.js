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
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AuthApi from "./AuthApi";
import Cookies from "js-cookie";
import { ProductConsumer, ProductContext } from './context'


const userName = React.createContext("user")
const cart = React.createContext("[]")

function App() {

  const [auth, setAuth] = React.useState(false)
  const valueContext = React.useContext(ProductContext)


  const readCookie = () => {
    const user = Cookies.get("user");
    if (user) {
      setAuth(true);
      valueContext.setName(user)
    }
  }

  React.useEffect(() => {
    readCookie();
  }, [])
  return (
    <div>
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Router>
          <Routes />
        </Router>
      </AuthApi.Provider>
    </div>
  )
}


const Routes = () => {
  const Auth = React.useContext(AuthApi)
  return (
    <React.Fragment>

      <ProductConsumer>
        {(value) =>
          value.isNavBar ? <Navbar /> : null}
      </ProductConsumer>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <Redirect to="/products" component={ProductList} />
            )
          }}
        />
        <ProtectedRoute exact path="/products" auth={Auth.auth} component={ProductList} />
        <Route path="/about" component={AboutUs}></Route>
        <Route path="/details" component={Details}></Route>
        <ProtectedRoute path="/cart" auth={Auth.auth} component={Cart} />
        <ProtectedReg path="/register" auth={Auth.auth} component={Register} />
        <Route component={Default}></Route>
      </Switch>
      <Modal />
    </React.Fragment>
  );

}

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => auth ? (
        <Component />
      ) :
        (
          <Redirect to="/register" />
        )
      }
    />
  )
}

const ProtectedReg = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => !auth ? (
        <Component />
      ) :
        (
          <Redirect to="/products" />
        )
      }
    />
  )
}

export default App;
