import React, { Component } from "react";
import { Form, Button, Grid, Header, Radio, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  bookSingleRecord,
  updateBookDetails,
} from "../../../redux/actions/bookAction";
import formHoc from '../../../hoc/formHoc';


export class BookEdit extends Component {
  constructor(props) {
    super(props);

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
    const { formInput, dropdown, formTextArea } = this.props;

    return (
      <div className="sign-margin">
        <Grid centered>
          <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
            <Header style={{ color: "#4183c4" }} as="h2">
              Edit Book
            </Header>

            <Form size="big" binding={this}>

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

export default formHoc(connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BookEdit)));
