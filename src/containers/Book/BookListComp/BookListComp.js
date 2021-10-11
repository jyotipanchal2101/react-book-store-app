import React, { Component } from "react";
import { bookList, getAdminBookList, DataOperation, getSellerBookList } from "../../../redux/actions/bookAction";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import CardComponet from "../../../components/CardComponent";
import { Button } from "semantic-ui-react";
import { Header, Table } from "semantic-ui-react";
import BookCreate from "../../BookCreate/BookCreate";

export class BookListComp extends Component {
  componentDidMount() {
    if(this.props.usertype === "admin"){
      this.props.getBookList();
    } else if(this.props.usertype === "seller"){
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
  
  bookDetailsHandler = (id, operation) => {
    this.props.onTodoOperation(operation);
    if (operation === "view") {
      this.props.history.push(this.props.match.path + "/" + id);
    } else if (operation === "edit") {
      this.props.history.push(this.props.match.path + "/edit/" + id);
    }
  };

  render() {
    console.log("list", this.props.list);
    let list;
    if(this.props.usertype === "admin"){
      list  = this.props.list;
    } else if(this.props.usertype === "seller"){
      list = this.props.sellerlist;
    }

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
            {list.map((booklist) => (
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
                  >
                    Details
                  </Button>
                  <Button
                    primary
                    onClick={() => this.bookDetailsHandler(booklist.id, "edit")}
                  >
                    Edit
                  </Button>
                  <Button color="red">Delete</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BookListComp));
