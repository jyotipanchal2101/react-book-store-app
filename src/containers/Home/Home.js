import React, { Component } from "react";
import Header from "../../components/Header";
import BookList from "../BookList/BookList";
import { withRouter } from "react-router-dom";

class Home extends Component {
  
  render() {
    return (
      <div>
        <BookList />
      </div>
    );
  }
}
export default withRouter(Home);
