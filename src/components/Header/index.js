import React, { Component } from "react";
import { Button, Menu } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/userAction";

const isAuthenticated = localStorage.getItem("userId");

 class Header extends Component {
  loginHandler = () => {
    this.props.history.push("/signin");
  };

  registerHandler = () => {
    this.props.history.push("/signup");
  };
  goToHome = () => {
    this.props.history.push("/");
  };
  goToUserHome = () => {
    this.props.history.push("/dashboard");
  };
  goToMyOrders = () => {
    //  this.props.history.push("/dashboard/books/create");
      this.props.history.push("/dashboard/my-orders");
  
    };
    goToUserList = () => {
      //  this.props.history.push("/dashboard/books/create");
        this.props.history.push("/dashboard/userlist");
    
      };
    goToBookList = () => {
      //    this.props.history.push("/dashboard/books");
          this.props.history.push("/dashboard/books");
        };
    logout = () => {
          this.props.logout();
            this.props.history.push("/");
      };
         
  render() {
    return (
    <Menu style={{height:"10vh", backgroundColor:"#2185D0"}}>
      {!this.props.isLoggedIn ?
      <>
    <Menu.Item onClick={this.goToHome}>
      <label style={{color:"white", fontWeight: "bold",fontSize: "large"}}>Home</label>
    </Menu.Item>
   <Menu.Item position="right" onClick={this.loginHandler}>
   <label style={{color:"white", fontWeight: "bold",fontSize: "large"}}>Login</label>
    </Menu.Item>
    <Menu.Item onClick={this.registerHandler}>
      <label style={{color:"white", fontWeight: "bold",fontSize: "large"}}>Sign Up</label>
    </Menu.Item>
    </> : ''}

    {this.props.usertype === "customer" && this.props.isLoggedIn ?
      <>
    <Menu.Item onClick={this.goToUserHome}>
      <label style={{color:"white", fontWeight: "bold",fontSize: "initial" , cursor: "pointer"}}>Home</label>
    </Menu.Item>
    <Menu.Item onClick={this.goToMyOrders}>
      <label style={{color:"white", fontWeight: "bold",fontSize: "initial", cursor: "pointer"}}>My Orders</label>
    </Menu.Item>
   <Menu.Item position="right" onClick={this.logout}>
     <label style={{color:"white", fontWeight: "bold",fontSize: "initial", cursor: "pointer"}}>Logout</label>
    </Menu.Item>
    </> : ''}

    {this.props.usertype === "admin" && this.props.isLoggedIn ?
      <>
    <Menu.Item onClick={this.goToUserHome}>
      <label style={{color:"white", fontWeight: "bold",fontSize: "initial", cursor: "pointer"
}}>Home{""}</label>
    </Menu.Item>
    <Menu.Item onClick={this.goToUserList}>
      <label style={{color:"white", fontWeight: "bold",fontSize: "initial", cursor: "pointer"}}> User List{" "}</label>
    </Menu.Item>
    <Menu.Item onClick={this.goToBookList}>
      <label style={{color:"white", fontWeight: "bold",fontSize: "initial", cursor: "pointer"}}>Book List{" "}</label>
    </Menu.Item>
    <Menu.Item onClick={this.goToMyOrders}>
      <label style={{color:"white", fontWeight: "bold",fontSize: "initial", cursor: "pointer"}}>My Orders{" "}</label>
    </Menu.Item>
   <Menu.Item position="right" onClick={this.logout}>
      <label style={{color:"white", fontWeight: "bold",fontSize: "initial", cursor: "pointer"}}>Logout{" "}</label>
    </Menu.Item>
    </> : ''}

    {this.props.usertype == "seller" && this.props.isLoggedIn ?
      <>
    <Menu.Item onClick={this.goToUserHome}>
      <label style={{color:"white", fontWeight: "bold",fontSize: "initial", cursor: "pointer"}}>Home</label>
    </Menu.Item>
    <Menu.Item onClick={this.goToBookList}>
      <label style={{color:"white", fontWeight: "bold",fontSize: "initial", cursor: "pointer"}}>Book List{" "}</label>
    </Menu.Item>
    <Menu.Item onClick={this.goToMyOrders}>
      <label style={{color:"white", fontWeight: "bold",fontSize: "initial", cursor: "pointer"}}> My Orders</label>

    </Menu.Item>
   <Menu.Item position="right" onClick={this.logout}>
      <label style={{color:"white", fontWeight: "bold",fontSize: "initial", cursor: "pointer"}}>Logout{" "}</label>

    </Menu.Item>
    </> : ''}
  </Menu>
    );
  }
}
// export default Header;
// export default withRouter(Header);
const mapStateToProps = (state) => {
  return {
    userId: state.userReducer.userId,
    usertype: state.userReducer.usertype,
    isAuthenticated: state.userReducer.isAuthenticated,
    isLoggedIn:state.userReducer.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
