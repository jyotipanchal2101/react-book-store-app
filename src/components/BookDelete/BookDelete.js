import React from "react";
import { connect } from "react-redux";
import { bookDelete } from "../../redux/actions/bookAction";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

const ModalExampleCloseIcon = (props) => {
  const [open, setOpen] = React.useState(false);

  const OpenHandler = () => {
    setOpen(false);

    const id = props.id;
    const key = props.idKey;
    props.bookDelete(id, key);
  };

  return (
    <Modal
      closeIcon
      open={open}
      trigger={props.children}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="archive" content="Todo Tasks" />
      <Modal.Content>
        <p>Are you sure , you want to delete?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" onClick={OpenHandler}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    bookDelete: (id, key) => dispatch(bookDelete(id, key)),
  };
};

export default connect(null, mapDispatchToProps)(ModalExampleCloseIcon);
