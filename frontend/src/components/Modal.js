import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import { ButtonContainer } from './Button';
import { Link } from 'react-router-dom';
//import { storeProducts } from '../data';
import styled from 'styled-components';

export default class Modal extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    const { modalOpen, closeModal } = value;
                    const { img, title, price } = value.modalProduct;

                    if (!modalOpen) {
                        return null;
                    } else {
                        return (
                            <ModalContainer>
                                <div className="container">
                                    <div className="row">
                                        <div id="modal" className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalized p-4">
                                            <h5 style={{ textTransform: "uppercase", letterSpacing: "0.2rem", margin: "10px 0px 20px 0px" }}>Item added to the cart!</h5>
                                            <img src={img} className="img-fluid" alt="product" />
                                            <h5>{title}</h5>
                                            <h5 className="text-muted">price : ${price}</h5>
                                            <Link to="/">
                                                <ButtonContainer onClick={() => closeModal()} style={{ background: "var(--mainBlue)", color: "white", marginTop: "17px" }}>
                                                    Return to store
                                                </ButtonContainer>
                                            </Link>
                                            <Link to="/cart">
                                                <ButtonContainer onClick={() => closeModal()} style={{ background: "var(--mainOrange)", marginLeft: "17px", color: "white", marginTop: "17px" }}>
                                                    Go to cart
                                                </ButtonContainer>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </ModalContainer>
                        )
                    }

                }}
            </ProductConsumer>
        )
    }
}

const ModalContainer = styled.div`
    left: 0;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    #modal{
        background: var(--mainWhite);
    }
`
