import React, { Component } from "react";
import {
  getAdminBookList,
  DataOperation,
  getSellerBookList,
  bookDelete,
  bookSingleRecord,
  getSellerList
} from "../../../redux/actions/bookAction";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { Button, Form, Grid, Header, Table, Modal, Icon } from "semantic-ui-react";
import BookDelete from "../../../components/BookDelete/BookDelete";
import formHoc from '../../../hoc/formHoc';

export class BookListComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      author: "",
      status: "",
      description: "",
      discount: "",
      price: "",
      bookid:''
    };
  }

  componentDidMount() {
    this.props.getSellerList();
    if (this.props.usertype === "admin") {
      console.log("admin componentDidMount")
      this.props.getBookList();
    } else if (this.props.usertype === "seller") {
      console.log("componentDidMount")
      this.props.getSellerBookList(this.props.userId);
    }
  }

  createBook = () => {
    //  this.props.history.push("/dashboard/books/create");
    this.props.history.push(this.props.match.path + "/create");
  };
  gotToDashboard = () => {
    this.props.history.push("/dashboard");
  };

  bookDetailsHandler = (booklist, operation) => {
    this.props.onTodoOperation(operation);
    if (operation === "view") {
      this.setState({
        showModal: true,
        title: booklist.title,
        author: booklist.author,
        status: booklist.status,
        description: booklist.description,
        discount: booklist.discount,
        price: booklist.price,
      });
    } else if (operation === "edit") {
    this.props.bookSingleRecord(booklist.id);

      this.props.history.push(this.props.match.path + "/edit/" + booklist.id);
    }
  };
  // componentWillReceiveProps(nextProps) {
  //   console.log("componentWillReceiveProps", nextProps);
  //   this.setState({list:this.props.sellerBookList})
  // }
  closeView = () => {
    this.setState({
      showModal: false,
    });
  };

  deleteBook = () => {
    this.props.bookDelete(this.state.bookid,this.state.bookid);
    
    this.setState({
      showDeleteModal: false,
    });
    if (this.props.usertype === "admin") {
      this.props.getBookList();
    } else if (this.props.usertype === "seller") {
      console.log("componentDidMount")
      this.props.getSellerBookList(this.props.userId);
    }
  }
  delete = (booklist) => {
    this.setState({
      showDeleteModal: true,
      bookid:booklist.key
    });
  }
  closeDeleteModal = () => {
    this.setState({
      showDeleteModal: false,
    });  
  }

  render() {
    let list;
    if (this.props.usertype === "admin") {
      list = this.props.list;
    } else if (this.props.usertype === "seller") {
      list = this.props.sellerlist;
    }
    const statusOption= [
      {text: 'Published',value: 'Published'},
      {text: 'Pending', value: 'Pending'}
    ]
    const { title, author, status, description, price, discount } = this.state;
    const { formInput, dropdown, formTextArea } = this.props;

    return (
      <div>
        <Button onClick={this.createBook}>Create</Button>
        {/* <Button onClick={this.gotToDashboard}>Back</Button> */}
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Title</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Discount</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {list && list.length> 0 ? list.map((booklist) => (
              <Table.Row>
                <Table.Cell>{booklist.title}</Table.Cell>
                <Table.Cell singleLine>{booklist.author}</Table.Cell>
                <Table.Cell>{booklist.status}</Table.Cell>
                <Table.Cell textAlign="right">{booklist.price}</Table.Cell>
                <Table.Cell>{`${booklist.discount}%`}</Table.Cell>
                <Table.Cell>{booklist.description}</Table.Cell>
                <Table.Cell singleLine>
                  <Button
                    primary
                    onClick={() => this.bookDetailsHandler(booklist, "view")}
                  >
                                                  <Icon name="eye" />

                  </Button>
                  <Button
                    primary
                    onClick={() => this.bookDetailsHandler(booklist, "edit")}
                  >
                              <Icon name="edit" />
                  </Button>
                  <Button color="red" onClick={()=>this.delete(booklist)}>
                  <Icon name="delete" />

                  </Button>
                  {/* <BookDelete id={booklist.id} idKey={booklist.key}>
                    <Button color="red">Delete</Button>
                  </BookDelete> */}
                </Table.Cell>
              </Table.Row>
            )) : <Table.Row>Records not found</Table.Row>}
          </Table.Body>
        </Table>
        <Modal
          //  onOpen={() => setOpen(true)}
          open={this.state.showModal}
          // trigger={<Button>Show Modal</Button>}
        >
          <Modal.Header>View Book Details</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Grid centered>
                <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
                  <Form size="big" binding={this}>

              {formInput({name:'title',
                label:"Title",
                value:title,
                placeholder:'title',
                onChange:this.onChange})}

                 {formInput({name:'author',
                label:"author",
                value:author,
                placeholder:'author',
                onChange:this.onChange})}
             Status
             {dropdown({
               name:'status',
                label:"Status",
                value:status,
                placeholder:'status',
                options:statusOption,
                onChange:this.handleChange})}

            {formTextArea({name:'description',
                label:"description",
                value:description,
                placeholder:'description',
                onChange:this.onChange})}
                
               {formInput({name:'price',
                label:"price",
                value:price,
                placeholder:'price',
                onChange:this.onChange})}

              {formInput({name:'discount',
                label:"Discount",
                value:discount,
                placeholder:'discount',
                onChange:this.onChange})}
                    <Button
                      primary
                      //   disabled={isInvalid}
                      control={Button}
                      onClick={this.closeView}
                    >
                      Close
                    </Button>
                  </Form>
                </Grid.Column>
              </Grid>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
  
          </Modal.Actions>
        </Modal>
        <Modal
          closeIcon
          onClose={this.closeDeleteModal}
          open={this.state.showDeleteModal}
          // trigger={props.children}
          // onClose={() => setOpen(false)}
          // onOpen={() => setOpen(true)}
        >
          <Header icon="archive" content="Delete Book" />
          <Modal.Content>
            <p>Are you sure , you want to delete?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={this.closeDeleteModal}>
              <Icon name="remove" /> No
            </Button>
            <Button color="green" onClick={this.deleteBook}>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.bookReducer.error,
    list: state.bookReducer.adminBookList,
    loading: state.bookReducer.loading,
    redirectpath: state.bookReducer.redirectpath,
    userId: state.userReducer.userId,
    usertype: state.userReducer.usertype,
    sellerlist: state.bookReducer.sellerBookList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBookList: () => dispatch(getAdminBookList()),
    onTodoOperation: (operation) => dispatch(DataOperation(operation)),
    getSellerBookList: (userId) => dispatch(getSellerBookList(userId)),
    bookDelete: (id, key) => dispatch(bookDelete(id, key)),
    bookSingleRecord: (id) => dispatch(bookSingleRecord(id)),
    getSellerList: () => dispatch(getSellerList())
  };
};

export default formHoc(connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BookListComp)));
