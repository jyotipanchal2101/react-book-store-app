import React, { Component } from "react";
import Header from "../../components/Header";
import BookList from "../BookList/BookList";
import { withRouter } from "react-router-dom";

class Home extends Component {
  // loginHandler = () => {
  //   this.props.history.push("/signin");
  // };

  // registerHandler = () => {
  //   this.props.history.push("/signup");
  // };

  render() {
    return (
      <div>
        {/* <Header
          loginHandler={this.loginHandler}
          registerHandler={this.registerHandler}
        /> */}
        <BookList />
      </div>
    );
  }
}
export default withRouter(Home);
