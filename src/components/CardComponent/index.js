import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'

const CardComponet = (props) => (
    <Card>
      <Card.Content>
        <Card.Header>{props.title}</Card.Header>
        <Card.Meta>{props.author}</Card.Meta>
        <Card.Description>
        {props.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
     <Icon name='rupee'/>{props.price-props.discount/100 * 100}<sub><strike><Icon name='rupee'/>{props.price}</strike></sub>  Save<Icon name='rupee'/>10{`  ${props.discount}%`}
     <Button onClick={props.placeOrder}>Place Order</Button>
      </Card.Content>
    </Card>
)

export default CardComponet
