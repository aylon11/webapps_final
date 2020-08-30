import React, { Component } from 'react';
import Title from './Title';
import { storeProducts } from '../data';
import { ProductConsumer } from '../context';
import Product from './Product';

export default class ProductList extends Component {
    state = {
        products: storeProducts,
        query: "",
    };


    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container text-center text title">
                        <Title name="Our " title="Products" />
                        <input className="search-bar" placeholder="Search for..." value={this.state.query} onChange={() => { }} />
                        <div className="row">
                            <ProductConsumer>
                                {value => {
                                    return value.products.map(product => {
                                        return <Product key={product.id} product={product} />;
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}