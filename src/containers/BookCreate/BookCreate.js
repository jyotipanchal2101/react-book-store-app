import React, { Component } from "react";
import { Form, Button, Grid, Header, Radio, Dropdown } from "semantic-ui-react";
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
  value:'',
  seller:""
};

export class BookCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { title, author, status, description, price, discount,seller } = this.state;
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
      userId:seller,
      usertype:"seller"
    };
    this.props.createBook(bookdata);
    this.props.history.push("/dashboard/books");
  };
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = (e, { value }) => {
    this.setState({ status:value })
  }
  handleChangeSeller = (e, { value }) => {
    this.setState({ seller:value })
  }
  
  render() {
    console.log("selleruserlist================", this.props.selleruserlist)
      const { title, author, status, description, price, discount ,seller} = this.state;

    // const isInvalid =
    //   firstname == "" || lastname == "" || email === "" || password === "";
    // let authRedirectPath = null;
    // console.log("error", this.props.error);
    // if (this.props.isLoginSuccess) {
    //   authRedirectPath = <Redirect to={this.props.redirectPath} />;
    // }
    let userOptions = [];
    this.props.selleruserlist.forEach(element => {
      let data = {
        text:element.firstname,
        value:element.userId
      }
      userOptions.push(data);
    });
    console.log("userOptions", userOptions)
    const statusOption= [
      {text: 'Published',value: 'Published'},
      {text: 'Pending', value: 'Pending'},
    ]
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

              {/* <Form.Input
                name="status"
                label="Status"
                value={status}
                placeholder="status"
                onChange={(e) => this.onChange(e)}
              /> */}
              Status
               <Dropdown 
                  label="Status"
                  placeholder='status'
                  name="status"
                  onChange={this.handleChange}
                  selection 
                  options={statusOption} 
                  value={status}
             />
              Seller
               <Dropdown 
                  label="seller"
                  placeholder='seller'
                  name="seller"
                  onChange={this.handleChangeSeller}
                  selection 
                  options={userOptions} 
                  value={seller}
             />

              <Form.TextArea
                name="description"
                label="Description"
                value={description}
                type="description"
                placeholder="description"
                onChange={(e) => this.onChange(e)}
              />
              <Form.Input
                name="price"
                label="Price"
                value={price}
                type="price"
                placeholder="price"
                onChange={(e) => this.onChange(e)}
              />
               <Form.Input
                name="discount"
                label="Discount"
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
    usertype: state.userReducer.usertype,
    selleruserlist : state.bookReducer.sellerlist
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




