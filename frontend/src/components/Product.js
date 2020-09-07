import React, { Component } from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';
import PropTypes from 'prop-types';

export default class Product extends Component {

    render() {
        const { id, title, img, price, inCart } = this.props.product;
        return (
            <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                <div className="card">
                    <ProductConsumer>
                        {(value) => (
                        <div className="img-container" onClick={() => { value.handleDetail(id) }}>
                            <Link to="/details">
                                <img src={img} alt="product" className="card-img-top" />
                            </Link>
                            <button className="cart-btn" disabled={inCart ? true : false} onClick={() => {
                                value.addToCart(id);
                                value.openModal(id);
                            }}>
                                {inCart ? (<p className="text-capitalize mb-0" disabled>In cart</p>) : <i className="fas fa-cart-plus"></i>}
                            </button>
                        </div>
                        )}
                    </ProductConsumer>
                    {/*card footer*/}
                    <div className="card-footer d-flex justify-content-between" style={{ background: "var(--mainBlue)" }}>
                        <p className="align-self-center mb-0">
                            {title}
                        </p>
                        <h5 className="mb-0" style={{ color: "white" }}>
                            ${price}
                        </h5>
                    </div>
                </div>
            </ProductWrapper>
        )
    }
}

Product.propType = {
    product: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        img: PropTypes.string,
        price: PropTypes.number,
        info: PropTypes.string,
        inCart: PropTypes.bool,
        sizes: PropTypes.string
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