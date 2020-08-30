import React, { Component } from 'react'
import Logo from '../Logo1.png'
import Title from './Title';

export default class AboutUs extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="About " title="Us" />
                        <div className="row">
                            <span style={{ letterSpacing: "0.2rem", fontSize: "30px", textTransform: "uppercase", textAlign: "center" }}>
                                <img src={Logo} alt="SOCKIT" style={{ height: "37px", paddingBottom: "7px" }} /> is a Israeli manufacturer and retailer of socks. The company was
                                founded in 2020 by Dana Feder and Eylon Goor who respectively took on the roles as CEO and creative director.
                                In 2020, Eylon Goor acquired the majority share and Dana Feder became CEO. Their merchandise is sold in 90-plus countries,
                                with 12,000 points of sale, as well as online, and over 100 <img alt="SOCKIT" src={Logo} style={{ height: "37px", paddingBottom: "7px" }} /> stores.
                            </span>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        )
    }
}