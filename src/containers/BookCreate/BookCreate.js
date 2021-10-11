import React, { Component } from "react";
import { Form, Button, Grid, Header, Radio } from "semantic-ui-react";
import { createBook } from "../../redux/actions/bookAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = {
  title: "",
  author: "",
  status: "",
  description: "",
  price: "",
  discount: "",
  error: null,
};

export class BookCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { title, author, status, description, price, discount } = this.state;
    const { userId, usertype } = this.props;
    const id = uuidv4();

    const bookdata = {
      id,
      title,
      author,
      status,
      description,
      price,
      discount,
      userId,
      usertype
    };
    this.props.createBook(bookdata);
  };
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {

      const { title, author, status, description, price, discount, error } = this.state;

    // const isInvalid =
    //   firstname == "" || lastname == "" || email === "" || password === "";
    // let authRedirectPath = null;
    // console.log("error", this.props.error);
    // if (this.props.isLoginSuccess) {
    //   authRedirectPath = <Redirect to={this.props.redirectPath} />;
    // }
    return (
      <div className="sign-margin">
        <Grid centered>
          <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
            <Header style={{ color: "#4183c4" }} as="h2">
              Add Book
            </Header>

            <Form size="big">
              <Form.Input
                name="title"
                label="Title"
                value={title}
                placeholder="title"
                onChange={(e) => this.onChange(e)}
              />

              <Form.Input
                name="author"
                label="Author"
                value={author}
                placeholder="author"
                onChange={(e) => this.onChange(e)}
              />

              <Form.Input
                name="status"
                label="Status"
                value={status}
                placeholder="status"
                onChange={(e) => this.onChange(e)}
              />

              <Form.Input
                name="description"
                label="Description"
                value={description}
                type="description"
                placeholder="description"
                onChange={(e) => this.onChange(e)}
              />
              <Form.Input
                name="price"
                label="price"
                value={price}
                type="price"
                placeholder="price"
                onChange={(e) => this.onChange(e)}
              />
               <Form.Input
                name="discount"
                label="discount"
                value={discount}
                type="discount"
                placeholder="discount"
                onChange={(e) => this.onChange(e)}
              />
             
              <Button
                primary
             //   disabled={isInvalid}
                control={Button}
                onClick={this.onSubmit}
              >
                Add
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.bookReducer.isError,
    loading: state.bookReducer.isLoading,
    isLoginSuccess: state.userReducer.isLoginSuccess,
    redirectPath: state.userReducer.authRedirectPath,
    userId: state.userReducer.userId,
    usertype: state.userReducer.usertype
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBook: (bookdata) => dispatch(createBook(bookdata)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BookCreate));




