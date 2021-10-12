import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

function ModalComponent(props) {

  return (
    <Modal
  //    closeIcon
      open={props.showModal}
     // trigger={<Button>Show Modal</Button>}
      onClose={() => props.closeModalPopup()}
      onOpen={() => props.showModalPopup()}
    >
      <Modal.Content>
        <p>
         You are not logged in to place an order. Please continue to login
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => props.closeModalPopup()}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='blue' onClick={() => props.showModalPopup()}>
          <Icon name='checkmark' /> Continue
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalComponent
