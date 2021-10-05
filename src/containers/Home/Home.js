import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";

class Home extends Component {
  loginHandler = () => {
    this.props.history.push("/signin");
  };

  registerHandler = () => {
    this.props.history.push("/signup");
  };

  render() {
    let redirect = null;
    return (
      <div>
        <h1>Book Store</h1>
        <Button primary onClick={this.loginHandler}>
          Login
        </Button>
        <Button primary onClick={this.registerHandler}>
          SignUp
        </Button>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: state.auth.token !== null,
//   };
// };

// export default connect(mapStateToProps)(withRouter(Home));
export default Home
