import React, { Component } from 'react';
import { storeProducts } from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: storeProducts,
        cart: [],
        modalOpen: false,
        modalProduct: storeProducts,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        userName: "User Name",
        isNavBar: false,
        users: [{
            userName: "David", creationDate: "02/05/20", password: "dada", cart: [{
                id: 1,
                title: "Space Cat Sock",
                img: "img/socks1.jpg",
                price: 29,
                info: "Add a little (solar) flair to your wardrobe with the Space Cat low sock. It won’t go near water, but the infinite, ever-expanding void we call the universe is a doddle when you’re Space Cat.",
                inCart: false,
                sizes: "S M L",
                count: 0,
                total: 0
            },
            {
                id: 2,
                title: "Bavaria Duck Sock",
                img: "img/socks2.jpg",
                price: 39,
                info: "Prepare for the wurst! The duck is back, now with a background with the traditional bavarian motif perfectly fitting any Oktoberfest feast!",
                inCart: false,
                sizes: "S M L",
                count: 0,
                total: 0
            }]
        },
        {
            userName: "Daviddfdfd", creationDate: "02/05/20", password: "daddddddda", cart: [{
                id: 1,
                title: "Space Cat Sock",
                img: "img/socks1.jpg",
                price: 29,
                info: "Add a little (solar) flair to your wardrobe with the Space Cat low sock. It won’t go near water, but the infinite, ever-expanding void we call the universe is a doddle when you’re Space Cat.",
                inCart: false,
                sizes: "S M L",
                count: 0,
                total: 0
            },
            {
                id: 2,
                title: "Bavaria Duck Sock",
                img: "img/socks2.jpg",
                price: 39,
                info: "Prepare for the wurst! The duck is back, now with a background with the traditional bavarian motif perfectly fitting any Oktoberfest feast!",
                inCart: false,
                sizes: "S M L",
                count: 0,
                total: 0
            }]
        }],
    };

    sendDataToBack = () => {
        var _body = {
            id: this.state.userName,
            cart: this.state.cart,
        }
        fetch(`http://localhost:4000/user/update`, {
            method: 'put',
            body: JSON.stringify(_body),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          }).then(function (response) {
              console.log(response)
          })
    }

    componentDidMount() {
        this.setProducts();
    }

    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            //coping the values instead of referencing them
            const singleItem = { ...item };
            tempProducts = [...tempProducts, singleItem];
        })
        this.setState(() => { return { products: tempProducts } })
    }

    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => { return { detailProduct: product } })
    };

    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(() => {
            return { products: tempProducts, cart: [...this.state.cart, product] };
        }, () => { 
            this.addTotal() 
            this.sendDataToBack()
        });
    };

    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { modalProduct: product, modalOpen: true }
        })
    }

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false }
        })
    }

    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;
        this.setState(() => {
            return {
                cart: [...tempCart]
            }
        }, () => {
            this.addTotal()
            // this.sendDataToBack()

        })
    }

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;
        if (product.count === 0) {
            this.removeItem(id);
        } else {
            product.total = product.count * product.price;
            this.setState(() => {
                return {
                    cart: [...tempCart]
                }
            }, () => {
                this.addTotal()
            })
        }
    }

    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempProducts.indexOf(this.getItem(id))
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts],
            };
        }, () => {
            this.addTotal();
        })
    }

    clearCart = () => {
        this.setState(() => {
            return { cart: [] };
        }, () => {
            this.setProducts();
            this.addTotal();
        });
    }

    addTotal = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.17;
        const tax = parseFloat(tempTax.toFixed(2));
        const tempTotal = subTotal + tax;
        const total = parseFloat(tempTotal.toFixed(2));
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total,
            }
        })
    }

    setName = (name) => {
        this.setState(() => {
            return {
                userName: name
            }
        })
    }

    presentNavBar = (bool) => {
        this.setState(() => {
            return {
                isNavBar: bool
            }
        })
    }

    setCart = (cart) => {
        this.setState(() => {
            return {
                cart: cart
            }
        })
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
                setName: this.setName,
                setCart: this.setCart,
                presentNavBar: this.presentNavBar,
                addTotal: this.addTotal
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer, ProductContext };