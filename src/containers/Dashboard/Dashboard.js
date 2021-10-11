import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CardComponet from "../../components/CardComponent";
import AdminDashboard from './AdminDashboard'
import SellerDashboard from "./SellerDashboard";
import CustomerDashboard from './CustomerDashboard';

export class Dashboard extends Component {
 
  render() {
    console.log('this.props.usertype', this.props.usertype)
    return (
      <div>
   {/* <AdminDashboard/> */}
   {this.props.usertype && this.props.usertype === "admin" && <AdminDashboard/>}
   {this.props.usertype && this.props.usertype === "seller" && <SellerDashboard/>}
   {this.props.usertype && this.props.usertype === "customer" && <CustomerDashboard/>}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userReducer.userId,
    usertype: state.userReducer.usertype
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
 //   getBookList: () => dispatch(getAdminBookList()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
