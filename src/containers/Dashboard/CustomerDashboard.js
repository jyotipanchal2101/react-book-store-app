import React, { Component } from "react";
import { bookList, getAdminBookList } from "../../redux/actions/bookAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button } from "semantic-ui-react";
import BookList from "../BookList/BookList";

export class CustomerDashboard extends Component {

  goToMyOrders = () => {
    //  this.props.history.push("/dashboard/books/create");
      this.props.history.push(this.props.match.path + "/my-orders");
  
    };
  render() {

    return (
      <div>
          Customer    
         <BookList />   
         {/* <Button onClick={this.goToMyOrders}>My Orders</Button>            */}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CustomerDashboard));
