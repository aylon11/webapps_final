import React from 'react';
import { Link } from 'react-router-dom';

export default function CartTotal({ value }) {

    const { cartSubTotal, cartTax, cartTotal, clearCart } = value;

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col text-capitalized text-center align-middle">
                        <Link to="/">
                            <button className="btn btn-outline-danger text-uppercase mb-3 px-5" type="button" onClick={() => clearCart()}>
                                Clear cart
                            </button>
                        </Link>
                        <div>
                            <h5>
                                <span className="text-title">
                                    Subtotal: <strong> ${cartSubTotal}</strong>
                                </span>
                            </h5>
                            <h5>
                                <span className="text-title">
                                    Tax: <strong> ${cartTax}</strong>
                                </span>
                            </h5>
                            <h5>
                                <span className="text-title" style={{ fontSize: "1.6rem", color: "var(--mainOrange)" }}>
                                    Total: <strong> ${cartTotal}</strong>
                                </span>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
