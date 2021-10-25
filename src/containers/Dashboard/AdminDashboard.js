import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BookList from "../BookList/BookList";


export class AdminDashboard extends Component {

  goToBookList = () => {
    this.props.history.push(this.props.match.path + "/books");
  };
  render() {

    return (
      <div>
        Welcome {this.props.usertype}
        <BookList />   
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
    usertype: state.userReducer.usertype
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminDashboard));
