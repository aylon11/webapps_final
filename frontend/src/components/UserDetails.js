import React, { Component } from 'react'
import styled from "styled-components";
import { ProductConsumer } from '../context';
import PropTypes from 'prop-types';

export default class UserDetails extends Component {

    render() {
        const { userName, creationDate, password, cart } = this.props.user;

        return (
            <ProductWrapper className="container-fluid text-left d-none d-lg-block card" style={{ width: "50%", padding: "25px 1px 25px 0px", marginTop: "15px" }}>
                <div className="row">
                    <ProductConsumer>
                        {(value) => (
                            <div style={{ fontSize: "20px", width: "100%" }}>
                                <div className="col-10 mx-auto">
                                    <span style={{ color: "var(--mainPurple)" }}>User Name: </span>{userName}
                                </div>
                                <br />
                                <div className="col-10 mx-auto">
                                    <span style={{ color: "var(--mainPurple)" }}>Creation Date: </span>{creationDate}
                                </div>
                                <br />
                                <div className="col-10 mx-auto">
                                    <span style={{ color: "var(--mainPurple)" }}>Password: </span>{password}
                                </div>
                                <br />
                                <div className="col-10 mx-auto">
                                    <span style={{ color: "var(--mainPurple)" }}>Items in Cart: </span>{cart.map(item => { return item.count + " " + item.title + ", " })}
                                </div>
                            </div>
                        )}
                    </ProductConsumer>
                </div>
            </ProductWrapper>
        )
    }
}


UserDetails.propType = {
    user: PropTypes.shape({
        userName: PropTypes.string,
        creationDate: PropTypes.string,
        password: PropTypes.string,
        cart: PropTypes.object,
    }).isRequired
};

const ProductWrapper = styled.div`
.card{
    border: 0.05rem solid rgb(202 202 202);
    transition: all 0.5s linear;
}
.card-footer{
    background: transparent;
}
&:hover{
    .card{
        box-shadow: 0px 0px 8px #adb5bd;
    }
}
.img-container{
    position: relative;
    overflow: hidden;
}
.img-container:hover .card-img-top{
    transform: scale(1.2);
    
}
.card-img-top{
    max-width: 100%;
    transition all 1s linear;
}
.cart-btn{
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.3rem 0.4rem;
    background: var(--mainRed);
    border: none;
    color: white;
    font-size: 1.4rem;
    border-radius: 1rem 0 0 0;
    transform: translate(100%, 100%);
    transition all 0.5s linear;
}
.cart-btn:hover{
    color: var(--mainYellow);
}
.img-container:hover .cart-btn{
    transform: translate(0%, 0%);
    border: none;
}
`