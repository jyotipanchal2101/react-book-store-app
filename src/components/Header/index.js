import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/userAction";
import { MenuItems, CustMenuItems, AdminMenuItems, SellerMenuItems } from './menuItems';

 class Header extends Component {

    logout = () => {
          this.props.logout();
            this.props.history.push("/");
      };
         
  render() {
    return (
    <Menu style={{height:"10vh", backgroundColor:"#2185D0"}}>
      {!this.props.isLoggedIn ?
      <>
      {MenuItems.map((menudata) => 
  <Menu.Item position={menudata.url =="/signin" ?"right" : "" } onClick={menudata.url =="/signin" ? ()=>this.props.history.push(menudata.url) : ()=>this.props.history.push(menudata.url)}>
   <label style={{color:"white", fontWeight: "bold",fontSize: "large"}}>{menudata.title}</label>
    </Menu.Item>
      )}
    </> : ''}

    {this.props.usertype === "customer" && this.props.isLoggedIn ?
      <>
 {CustMenuItems.map(({ url, title }) => 
  <Menu.Item  position={url=="/logout" ? "right" : ""}  onClick={url=="/logout" ? this.logout : ()=>this.props.history.push(url)}>
   <label style={{color:"white", fontWeight: "bold",fontSize: "large"}}>{title}</label>
    </Menu.Item>
  )}
    </> : ''}

    {this.props.usertype === "admin" && this.props.isLoggedIn ?
      <>
      {AdminMenuItems.map(({ url, title }) => 

  <Menu.Item position={url=="/logout" ? "right" : ""} onClick={url=="/logout" ? this.logout : ()=>this.props.history.push(url)}>
   <label style={{color:"white", fontWeight: "bold",fontSize: "large"}}>{title}</label>
    </Menu.Item>
  )}

    </> : ''}

    {this.props.usertype == "seller" && this.props.isLoggedIn ?
      <>
 {SellerMenuItems.map(({ url, title }) => 
  <Menu.Item position={ url=="/logout" ? "right": ""} onClick={url=="/logout" ? this.logout :()=>this.props.history.push(url)}>
   <label style={{color:"white", fontWeight: "bold",fontSize: "large"}}>{title}</label>
    </Menu.Item>
  )}
    </> : ''}
  </Menu>
    );
  }
}

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
