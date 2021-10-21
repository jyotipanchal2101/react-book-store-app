import React, { Component } from "react";
import { getSellerBookList } from "../../redux/actions/bookAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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
