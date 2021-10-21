import React, { Component } from "react";
import { Form, Button, Grid, Header, Radio, Dropdown } from "semantic-ui-react";
import { createBook } from "../../redux/actions/bookAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import formHoc from '../../hoc/formHoc';

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
      userId:usertype === "admin" ? seller : userId,
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
    console.log("handleChangeSeller", value)
    this.setState({ seller:value })
  }
  
  render() {
      const { title, author, status, description, price, discount ,seller} = this.state;
    const userOptions = [];
    this.props.selleruserlist.forEach(element => {
      let data = {
        text:element.firstname,
        value:element.userId
      }
      userOptions.push(data);
    });

    const statusOption= [
      {text: 'Published',value: 'Published'},
      {text: 'Pending', value: 'Pending'},
    ]
    const { formInput, dropdown, formTextArea, usertype } = this.props;

    return (
      <div className="sign-margin">
        <Grid centered>
          <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
            <Header style={{ color: "#4183c4" }} as="h2">
              Add Book
            </Header>

            <Form size="big">

              {formInput({name:'title',
                label:"Title",
                value:title,
                placeholder:'title',
                onChange:this.onChange})}

                 {formInput({name:'author',
                label:"author",
                value:author,
                placeholder:'author',
                onChange:this.onChange})}
             Status
             {dropdown({
               name:'status',
                label:"Status",
                value:status,
                placeholder:'status',
                options:statusOption,
                onChange:this.handleChange})}

            {formTextArea({name:'description',
                label:"description",
                value:description,
                placeholder:'description',
                onChange:this.onChange})}

              {usertype === "admin" ? dropdown({
               name:'seller',
                value:seller,
                placeholder:'seller',
                options: userOptions, 
                onChange:this.handleChangeSeller}): ""} 

               {formInput({name:'price',
                label:"price",
                value:price,
                placeholder:'price',
                onChange:this.onChange})}

              {formInput({name:'discount',
                label:"Discount",
                value:discount,
                placeholder:'discount',
                onChange:this.onChange})}

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

export default formHoc(connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BookCreate)));




