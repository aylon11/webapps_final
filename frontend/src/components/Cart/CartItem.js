import React from 'react';
import './Cart.css'

export default function CartItem({ item, value }) {

    const { id, title, img, price, total, count } = item;
    const { increment, decrement, removeItem } = value;

    return (
        <div className="row my-2 text-capitalize text-center" >
            <div className="col-10 mx-auto col-lg-2">
                <img src={img} style={{ width: "6rem" }} alt="product" className="img-fluid">

                </img>
            </div>
            <div className="col-10 mx-auto col-lg-2" style={{paddingTop: "2rem"}}>
                <span className="d-lg-none">Product name: </span>{title}
            </div>
            <div className="col-10 mx-auto col-lg-2" style={{paddingTop: "2rem"}}>
                <span className="d-lg-none">Price: </span>${price}
            </div>
            <div className="col-10 mx-auto col-lg-2" style={{paddingTop: "2rem"}}>
                <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                    <div className="d-flex justify-content-center">
                        <span className="btn btn-plus-minus mx-1" onClick={() => decrement(id)}>
                            -
                            </span>
                        <span style={{padding: "5px 10px 0px 10px" }}>{count}</span>
                        <span className="btn btn-plus-minus mx-1" onClick={() => increment(id)}>
                            +
                            </span>
                    </div>
                </div>
            </div>
            <div className="col-10 mx-auto col-lg-2" style={{paddingTop: "2rem"}}>
                <div className="cart-icon" onClick={() => removeItem(id)}>
                    <i className="fas fa-trash"></i>
                </div>
            </div>
            <div className="col-10 mx-auto col-lg-2" style={{paddingTop: "2rem"}}>
                <strong> Item total: ${total}</strong>
            </div>
        </div>
    )
}

