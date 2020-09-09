import React, { Component } from 'react'

export default class ReadMe extends Component {
    render() {
        return (
            <html>
            <body>
            
                <ul>
                    <li><b>My name:</b> Eylon Goor 305789182 </li>
                    <li><b>Store name:</b> SOCKIT </li>
                    <li><b>What are you selling:</b> We are selling colorful and cool unisex socks </li>
                    <li><b>What additional page(s) did you add and how to operate them?</b>
                        <ol>
                            <li>Sign in/Log in page - appears automaticly while entering the websit or after clicking on "Sign Out"
                                button on the navigation bar</li>
                            <li>Products page - clicking on the Logo or on "Products" on the navigation bar</li>
                            <li>Product details page - by clicking on any product card from the Product page</li>
                            <li>Add to cart modal - appear when adding item to the cart</li>
                            <li>Cart page - entering this page by clicking on "Cart" on the nevigation bar or "Go to cart" button in
                                the modal after adding item to the cart</li>
                            <li>Aboute us - page that describes our company, enter from the nevifation bar by clickin "About us"
                            </li>
                            <li>Admin page - the button "Admin" on nevigate this page appears only when the admin is logged in and
                                entering this page by clicking this button</li>
                            <li>404 page - while trying to move to route that not exist</li>
                        </ol>
                    </li>
                    <li><b>What was hard to do:</b> Design the website's architecture and conecting the BE to the FE</li>
                    <li><b>Who is your partner:</b> Dana Feder 311308266</li>
                    <li><b>What did you do and what did your partner do?</b> I've built the server and was incharge of the BE, and conecting the BE to the FE. Dana built the entire user facing FE</li>
                    <li><b>Specify all the different route your app supports:</b>
                        <ol>
                            <li>"/"</li>
                            <li>"/products"</li>
                            <li>"/about"</li>
                            <li>"/details"</li>
                            <li>"/cart"</li>
                            <li>"/register"</li>
                            <li>"/admin"</li>
                            <li>"/default" - any other URL that nod exist will map to 404 page</li>
                        </ol>
                    </li>
                    <li><b>How did you make your store secured?</b> Prevented DDOS attacks by limiting the number of sessions, and securing payment using PayPal</li>
                    <li><b>Did you implement the store using react.js?</b> Yes</li>
                </ul>
            
            </body>
            </html>
        )
    }
}