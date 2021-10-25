import React, { Component } from "react";
import {
  getAdminBookList,
  DataOperation,
  getSellerBookList,
  bookDelete,
  bookSingleRecord,
  getSellerList,
} from "../../../redux/actions/bookAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form, Grid, Modal, Icon } from "semantic-ui-react";
import formHoc from "../../../hoc/formHoc";
import TableListComponent from "../../../utility/tableListComponent";
import ModalComponent from "../../../components/Modal/Modal";

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
      bookid: "",
    };
  }

  componentDidMount() {
    this.props.getSellerList();
    if (this.props.usertype === "admin") {
      console.log("admin componentDidMount");
      this.props.getBookList();
    } else if (this.props.usertype === "seller") {
      console.log("componentDidMount");
      this.props.getSellerBookList(this.props.userId);
    }
  }

  createBook = () => {
    this.props.history.push(this.props.match.path + "/create");
  };
  gotToDashboard = () => {
    this.props.history.push("/dashboard");
  };

  bookDetailsHandler = (booklist, operation) => {
    console.log("booklist");
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

  closeView = () => {
    this.setState({
      showModal: false,
    });
  };

  deleteBook = () => {
    this.props.bookDelete(this.state.bookid, this.state.bookid);

    this.setState({
      showDeleteModal: false,
    });
    if (this.props.usertype === "admin") {
      this.props.getBookList();
    } else if (this.props.usertype === "seller") {
      console.log("componentDidMount");
      this.props.getSellerBookList(this.props.userId);
    }
  };
  delete = (booklist) => {
    this.setState({
      showDeleteModal: true,
      bookid: booklist.key,
    });
  };
  closeDeleteModal = () => {
    this.setState({
      showDeleteModal: false,
    });
  };

  bookAction = (list) => {
    return (
      <>
        <Button primary onClick={() => this.bookDetailsHandler(list, "view")}>
          <Icon name="eye" />
        </Button>
        <Button primary onClick={() => this.bookDetailsHandler(list, "edit")}>
          <Icon name="edit" />
        </Button>
        <Button color="red" onClick={()=>this.delete(list)}>
          <Icon name="delete" />
        </Button>
      </>
    );
  };

  render() {
    let list;
    if (this.props.usertype === "admin") {
      list = this.props.list;
    } else if (this.props.usertype === "seller") {
      list = this.props.sellerlist;
    }
    const statusOption = [
      { text: "Published", value: "Published" },
      { text: "Pending", value: "Pending" },
    ];
    const { title, author, status, description, price, discount } = this.state;
    const { smartElement } =
      this.props;
    let header = [
      "title",
      "author",
      "status",
      "price",
      "discount",
      "description",
      this.props.usertype === "admin" && "sellername"
    ];
    const bookActions = this.bookAction;
    console.log("this.props.list=====", this.props.list)
    return (
      <div>
        <Button onClick={this.createBook}>Create</Button>
        <TableListComponent
          list={list}
          showStatus={false}
          header={header}
          actions={bookActions}
        />
        <Modal open={this.state.showModal}>
          <Modal.Header>View Book Details</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Grid centered>
                <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
                  <Form size="big" binding={this}>
                    {smartElement.formInput({
                      name: "title",
                      label: "Title",
                      value: title,
                      placeholder: "title",
                      onChange: this.onChange,
                    })}
                    {smartElement.formInput({
                      name: "author",
                      label: "author",
                      value: author,
                      placeholder: "author",
                      onChange: this.onChange,
                    })}
                    Status
                    {smartElement.dropdown({
                      name: "status",
                      label: "Status",
                      value: status,
                      placeholder: "status",
                      options: statusOption,
                      onChange: this.handleChange,
                    })}
                    {smartElement.formTextArea({
                      name: "description",
                      label: "description",
                      value: description,
                      placeholder: "description",
                      onChange: this.onChange,
                    })}
                    {smartElement.formInput({
                      name: "price",
                      label: "price",
                      value: price,
                      placeholder: "price",
                      onChange: this.onChange,
                    })}
                    {smartElement.formInput({
                      name: "discount",
                      label: "Discount",
                      value: discount,
                      placeholder: "discount",
                      onChange: this.onChange,
                    })}
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
          <Modal.Actions></Modal.Actions>
        </Modal>

        <ModalComponent
          showModal={this.state.showDeleteModal}
          content="Are you sure , you want to delete?"
          showModalPopup={this.deleteBook}
          showActions={true}
          closeModalPopup={this.closeDeleteModal}
          showStatus={false}
        />
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
    getSellerList: () => dispatch(getSellerList()),
  };
};

export default formHoc(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(BookListComp))
);
