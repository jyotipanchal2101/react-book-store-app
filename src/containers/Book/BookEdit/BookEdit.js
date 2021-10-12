import React, { Component } from "react";
import { Form, Button, Grid, Header, Radio, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  bookSingleRecord,
  updateBookDetails,
} from "../../../redux/actions/bookAction";
import { firebaseApp } from "../../../firebase/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const db = firebase.firestore(firebaseApp);

const INITIAL_STATE = {
  id: "",
  title: "",
  author: "",
  status: "",
  description: "",
  price: "",
  discount: "",
  error: null,
};
export class BookEdit extends Component {
  constructor(props) {
    super(props);
    //  this.state = {...this.props.record}

    this.state = {
      title: this.props && this.props.record && this.props.record.title,
      author: this.props && this.props.record && this.props.record.author,
      status: this.props && this.props.record && this.props.record.status,
      description:
        this.props && this.props.record && this.props.record.description,
      discount:
        this.props && this.props.record && this.props.record.description,
      price: this.props && this.props.record && this.props.record.price,
    };
    // this.state = {
    //     title: '',
    //     author: '',
    //     status: '',
    //     description: '',
    //     discount: '',
    //     price: '',
    //   };
  }

  componentDidMount() {
    this.props.bookSingleRecord(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.record.title,
      author: nextProps.record.author,
      status: nextProps.record.status,
      description: nextProps.record.description,
      discount: nextProps.record.discount,
      price: nextProps.record.price,
    });
  }
  // static getDerivedStateFromProps(props, current_state) {
  //       if (current_state.title && current_state.title && current_state.title !== props.record.title) {
  //         return {
  //           title: props.record.title,
  //           author:props.record.author,
  //           status:props.record.status,
  //           description:props.record.description,
  //           discount:props.record.discount,
  //           price:props.record.discount
  //         }
  //       }

  //       return null
  // }


  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = (e, { value }) => {
    this.setState({ status:value })
  }
  onSubmit = (event) => {
    event.preventDefault();
    const { title, author, status, description, discount, price } = this.state;

    const bookdata = {
      id: this.props.match.params.id,
      title,
      author,
      status,
      description,
      price,
      discount,
      key: this.props.record.key,
    };
    this.props.updateBookDetails(bookdata);
    this.props.history.push("/dashboard/books");

  };
  render() {
      if (!this.props.record) {
      return <p>Loading</p>;
    }
    const statusOption= [
      {text: 'Published',value: 'Published'},
      {text: 'Pending', value: 'Pending'},
    ]
    const { title, author, status, description, discount, price } = this.state;
    return (
      <div className="sign-margin">
        <Grid centered>
          <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
            <Header style={{ color: "#4183c4" }} as="h2">
              Edit Book
            </Header>

            <Form size="big" binding={this}>
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
                Update
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
    error: state.userReducer.error,
    isAuthenticated: state.userReducer.token !== null,
    userId: state.userReducer.userId,
    loading: state.userReducer.loading,
    redirectpath: state.userReducer.redirectpath,
    operation_type: state.bookReducer.operation_type,
    record: state.bookReducer.single_record,
    isUpdate: state.bookReducer.isUpdate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    bookSingleRecord: (id) => dispatch(bookSingleRecord(id)),
    updateBookDetails: (bookinfo) => dispatch(updateBookDetails(bookinfo)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BookEdit));
