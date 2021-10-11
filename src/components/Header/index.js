import React, { Component } from "react";
import { Button, Menu } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/userAction";

const isAuthenticated = localStorage.getItem("token");

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
    goToBookList = () => {
      //    this.props.history.push("/dashboard/books");
          this.props.history.push("/dashboard/books");
        };
    logout = () => {
          this.props.logout();
            this.props.history.push("/");
      };
         
  render() {
    console.log("header usertype", this.props.usertype)
    return (
    <Menu style={{height:"10vh", backgroundColor:"#2185D0"}}>
      {!this.props.usertype?
      <>
    <Menu.Item onClick={this.goToHome}>
      <label style={{color:"white", fontWeight: "bold",fontSize: "large"}}>Home</label>
    </Menu.Item>
   <Menu.Item position="right" onClick={this.loginHandler}>
   <label style={{color:"white", fontWeight: "bold",fontSize: "large"}}>Login</label>
    </Menu.Item>
    <Menu.Item onClick={this.registerHandler}>
      <label style={{color:"white", fontWeight: "bold",fontSize: "large"}}>SignUp</label>
    </Menu.Item>
    </> : ''}

    {this.props.usertype == "customer"  ?
      <>
    <Menu.Item onClick={this.goToUserHome}>
      Home
    </Menu.Item>
    <Menu.Item onClick={this.goToMyOrders}>
      My Orders
    </Menu.Item>
   <Menu.Item position="right" onClick={this.logout}>
     Logout
    </Menu.Item>
    </> : ''}

    {this.props.usertype == "admin" ?
      <>
    <Menu.Item>
    <Button primary onClick={this.goToUserHome}>
    Home{" "}
      </Button>
    </Menu.Item>
    <Menu.Item>
    <Button primary onClick={this.goToMyOrders}>
    User List{" "}
      </Button>
    </Menu.Item>
    <Menu.Item>
    <Button primary onClick={this.goToBookList}>
    Book List{" "}
      </Button>
    </Menu.Item>
    <Menu.Item>
    <Button primary onClick={this.goToMyOrders}>
    My Orders{" "}
      </Button>
    </Menu.Item>
   <Menu.Item position="right">
      <Button primary onClick={this.logout}>
        Logout{" "}
      </Button>
    </Menu.Item>
    </> : ''}
    {this.props.usertype == "seller" ?
      <>
    <Menu.Item>
    <Button primary onClick={this.goToUserHome}>
    Home{" "}
      </Button>
    </Menu.Item>
    <Menu.Item>
    <Button primary onClick={this.goToBookList}>
    Book List{" "}
      </Button>
    </Menu.Item>
    <Menu.Item>
    <Button primary onClick={this.goToMyOrders}>
    My Orders{" "}
      </Button>
    </Menu.Item>
   <Menu.Item position="right">
      <Button primary onClick={this.logout}>
        Logout{" "}
      </Button>
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
    usertype: state.userReducer.usertype
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
