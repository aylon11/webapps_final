import React, { Component } from 'react';
import Title from './Title';
import { storeProducts } from '../data';
import { ProductConsumer } from '../context';
import Product from './Product';


export default class ProductList extends Component {

    state = {
        products: storeProducts,
        inputValue: ""
    };

    render() {

        function productsFilterOnChange(event) {

            this.setState({
                inputValue: event.target.value,
                products: this.state.products.filter(product => {
                    return product.title.toLowerCase().includes(this.state.inputValue.toLocaleLowerCase())
                })
            })
        }

        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container text-center text title">
                        <Title name="Our " title="Products" />
                        <input className="search-bar" placeholder="Search for..." value={this.state.inputValue} onChange={productsFilterOnChange.bind(this)} />
                        <div className="row">
                            {this.state.inputValue !== "" ? this.state.products.map(product => {
                                return <Product key={product.id} product={product} />
                            }) :
                                <ProductConsumer>
                                    {value => {
                                        this.state.products = value.products;
                                        return value.products.map(product => {
                                            return <Product key={product.id} product={product} />;
                                        })
                                    }}
                                </ProductConsumer>}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}