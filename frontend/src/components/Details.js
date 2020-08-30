import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button'

export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    const { id, title, img, price, inCart, sizes, info } = value.detailProduct;
                    return (
                        <div className="container">
                            <div className="row">
                                <div className="col-10 mx-auto text-center text slanted my-5" style={{ fontSize: "2rem", color: "var(--mainPurple)" }}>
                                    <p><b>{title}</b></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-10 mx-auto col-md-4 my-3">
                                    <img src={img} className="img-fluid" alt="product" style={{ maxHeight: "277px", float: "right", border: "0.05rem solid rgb(202 202 202)", borderRadius: "3px" }} />
                                </div>
                                <div className="col-10 mx-auto col-md-8 my-3">
                                    <p className="text-title" style={{ fontSize: "1rem" }}>
                                        <strong style={{ color: "var(--mainBlue)" }}>Avilable sizes: </strong><span className="text-uppercase"> {sizes} </span>
                                    </p>
                                    <p className="text-title" style={{ fontSize: "1rem" }}>
                                        <strong style={{ color: "var(--mainBlue)" }}>Price: </strong><span className="text-uppercase">$</span>{price}
                                    </p>
                                    <p className="text-title" style={{ fontSize: "1rem" }}>
                                        <strong style={{ color: "var(--mainBlue)" }}>Description: </strong> {info}
                                    </p>
                                    <div className="buttons-div">
                                        <Link to='/'>
                                            <ButtonContainer style={{ background: "var(--mainGreen)", color: "white" }}>Back to products</ButtonContainer>
                                        </Link>
                                        <ButtonContainer style={{ background: "var(--mainRed)", marginLeft: "16px", color: "white" }} disabled={inCart ? true : false} onClick={() => {
                                            value.addToCart(id);
                                            value.openModal(id);
                                        }}>
                                            {inCart ? 'In cart' : 'Add to cart'}
                                        </ButtonContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </ProductConsumer>
        )
    }
}