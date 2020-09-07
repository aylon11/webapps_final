import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import UserDetails from './UserDetails';
import Title from './Title';


export default class AdminPage extends Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <div style={{ marginTop: "60px" }}>
                        <Title name="Admin " title="Page" />
                        <ProductConsumer>
                            {value => {
                                return value.users.map(user => {
                                    return (
                                        <UserDetails key={user.userName} user={user} />
                                    );
                                })
                            }}
                        </ProductConsumer>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}