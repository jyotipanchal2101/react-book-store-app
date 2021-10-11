import React, { Component } from "react";
import { Form, Button, Grid, Header, Radio } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bookSingleRecord, updateBookDetails } from "../../../redux/actions/bookAction";

const INITIAL_STATE = {
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
    this.state = {...this.props.record}


    // this.state = {
    //   title: this.props && this.props.record && this.props.record.title,
    //   author:  this.props && this.props.record && this.props.record.author,
    //   status: this.props &&  this.props.record && this.props.record.status,
    //   description: this.props &&  this.props.record && this.props.record.description,
    //   discount: this.props &&  this.props.record && this.props.record.description,
    //   price: this.props &&  this.props.record && this.props.record.price,
    // };
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
    this.setState({
            title: this.props && this.props.record && this.props.record.title,
            author:  this.props && this.props.record && this.props.record.author,
            status: this.props &&  this.props.record && this.props.record.status,
            description: this.props &&  this.props.record && this.props.record.description,
            discount: this.props &&  this.props.record && this.props.record.description,
            price: this.props &&  this.props.record && this.props.record.price,
    })
  }
  static getDerivedStateFromProps(props, current_state) {
      console.log("current_state", current_state)
    if (current_state.title !== props.record.title) {
      return {
        title: props.record.title,
        author:props.record.author,
        status:props.record.status,
        description:props.record.description,
        discount:props.record.discount,
        price:props.record.discount
      }
    }
    return null
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.props.record.title) {
      this.setState({
        title: nextProps.title
      });
    }
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = (event) => {
    event.preventDefault();
    console.log("this.state.title", this.state.title);
    const { title, author, status, description, discount, price } = this.state;

    const bookdata = {
      id: this.props.match.params.id,
      title,
      author,
      status,
      description,
      price,
      discount,
      key:this.props.record.key
    };
    this.props.updateBookDetails(bookdata);
  };
  render() {
    console.log("record======", this.props.record);
    const { title, author, status, description, discount, price } = this.state;
    return (
      <div className="sign-margin">
        <Grid centered>
          <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
            <Header style={{ color: "#4183c4" }} as="h2">
            Edit Book            
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
