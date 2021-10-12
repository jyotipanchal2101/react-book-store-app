import React, { Component } from "react";
import { bookList, getSellerBookList } from "../../redux/actions/bookAction";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import CardComponet from "../../components/CardComponent";
import { Button } from "semantic-ui-react";
import { Header, Table } from "semantic-ui-react";
import BookList from "../BookList/BookList";

export class SellerDashboard extends Component {
  componentDidMount() {
    this.props.getBookList(this.props.userId);
  }

  render() {
    return (
      <div>
        

        Welcome Seller
        <BookList />   

        {/* <Button onClick={this.routeChange}>Create</Button>
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
                    //  onClick={() => this.todoDetailsHandler(single.id, "view")}
                  >
                    Details
                  </Button>
                  <Button
                    primary
                    //   onClick={() => this.todoDetailsHandler(single.id, "edit")}
                  >
                    Edit
                  </Button>
                  <Button color="red">Delete</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.bookReducer.error,
    list: state.bookReducer.sellerBookList,
    loading: state.bookReducer.loading,
    redirectpath: state.bookReducer.redirectpath,
    userId: state.userReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBookList: (userId) => dispatch(getSellerBookList(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SellerDashboard));
