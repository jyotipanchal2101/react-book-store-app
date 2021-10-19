import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

function ModalComponent(props) {
  return (
    <Modal
      closeIcon
      open={props.showModal}
      onClose={() => props.closeModalPopup()}
      //  onOpen={() => props.showModalPopup()}
    >
      <Modal.Content>
        <p>{props.content}</p>
      </Modal.Content>
      {props.showActions && (
        <Modal.Actions>
          <Button onClick={() => props.closeModalPopup()}>
            <Icon name="remove" /> No
          </Button>
          <Button color="blue" onClick={() => props.showModalPopup()}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      )}
    </Modal>
  );
}

export default ModalComponent;
