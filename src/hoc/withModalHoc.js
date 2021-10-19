import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const withModalHoc = WrappedComponenet => {
    class NewComponent extends React.Component {

        render(){
            return (
                <Modal
      closeIcon
      open={this.props.showModal}
      onClose={() => this.props.closeModalPopup()}
    //  onOpen={() => props.showModalPopup()}
    >
      <Modal.Content>
        <p>
         {this.props.content}
        </p>
      </Modal.Content>
     {this.props.showActions && <Modal.Actions>
        <Button onClick={() => this.props.closeModalPopup()}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='blue' onClick={() => this.props.showModalPopup()}>
          <Icon name='checkmark' /> Continue
        </Button>
      </Modal.Actions>}
    </Modal>
            )
        }
        
    }
    return NewComponent
}

export default withModalHoc