import React from 'react';

export default function CartColumns() {
    return (
        <div className="container-fluid text-center d-none d-lg-block">
            <div className="row">
                <div className="col-10 mx-auto col-lg-2">
                    <h3>
                        Products
                    </h3>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <h3>
                        Product Name
                    </h3>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <h3>
                        Price
                    </h3>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <h3>
                        Quantity
                    </h3>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <h3>
                        Remove
                    </h3>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <h3>
                        Total
                    </h3>
                </div>
            </div>
        </div>
    )
}
