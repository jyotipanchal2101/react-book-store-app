import React, { Component } from 'react'
import { Button } from "semantic-ui-react";

export class Order extends Component {
    render() {
        return (
            <div>
         <Button onClick={this.goToBookList}>Place Order </Button>                  
            </div>
        )
    }
}

export default Order
