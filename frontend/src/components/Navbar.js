import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Logo from '../Logo1.png'
import { ButtonContainer } from './Button';
import Cookies from "js-cookie"
import { ProductConsumer } from '../context';

export default class NavBar extends Component {
    render() {
        return (

            <ProductConsumer>
                {(value) => (

                    <nav className="navbar navbar-expand-sm navbar-dark px-sm-5" style={{ background: "var(--mainYellow)" }}>
                        <Link to='/'>
                            <img src={Logo} alt="store" className="navbar-brand" style={{ width: "150px", margin: "10px" }}></img>
                        </Link>
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item ml-5">
                                <Link to="/" className="nav-link" style={{ color: "black", fontSize: "1.5rem" }}>
                                    Products
                        </Link>
                            </li>
                            <li className="nav-item ml-5">
                                <Link to="/about" className="nav-link" style={{ color: "black", fontSize: "1.5rem" }}>
                                    About Us
                        </Link>
                            </li>
                        </ul>
                        <Link to="/cart" className="ml-auto">
                            <ButtonContainer style={{ color: "var(--mainBlue)", fontSize: "1.2rem" }}>
                                <span className="mr-3">
                                    <i className="fas fa-shopping-cart"></i>
                                </span>
                        My Cart
                    </ButtonContainer>
                        </Link>
                        <Link to="/Register">
                            <ButtonContainer style={{ color: "var(--mainRed)", marginLeft: "20px", fontSize: "1.2rem" }} onClick={() => {
                                value.presentNavBar(false);
                                signOut();
                            }}>
                                <span className="mr-3">
                                    <i className="fas fa-sign-in-alt"></i>
                                </span>
                        Sign Out
                    </ButtonContainer>
                        </Link>
                        {value.userName === "admin" ? <Link to="/admin">
                            <ButtonContainer style={{ color: "var(--mainPurple)", marginLeft: "20px", fontSize: "1.2rem" }}>
                                <span className="mr-3">
                                    <i className="fas fa-user-cog"></i>
                                </span>
                                Admin Page
                            </ButtonContainer>
                        </Link> : null}
                        <div style={{ marginLeft: "40px" }}>
                            <span style={{ fontSize: "1.2rem", color: "var(--mainDarkBlue)" }}>Hello,</span><br />
                            <span style={{ fontSize: "1rem" }}>{value.userName}</span>
                        </div>
                    </nav>
                )}
            </ProductConsumer>
        )
    }
}

function signOut() {
    Cookies.remove('user');

    window.location.href = "http://localhost:3000/register"
}