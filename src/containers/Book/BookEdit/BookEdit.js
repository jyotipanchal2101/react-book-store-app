import React, { Component } from "react";
import { Form, Button, Grid, Header, Radio, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  bookSingleRecord,
  updateBookDetails,
} from "../../../redux/actions/bookAction";
import formHoc from '../../../hoc/formHoc';

let initialFormObj={
  title: "",
  author: "",
  status:"",
  description:"",
  discount:"",
  price:""
}
const  initialFormErrors={
  title: [{required:false}],
  author: [{required:false}],
  description: [{required:false}],
  price: [{required:false}],
  discount: [{required:false}],
}
export class BookEdit extends Component {
 
  componentDidMount() {
    this.props.bookSingleRecord(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.props;
    if(data.title === "") {
      this.props.smartElement.formValueState(nextProps.record)
    }
  }
  
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = (e, { value }) => {
    this.setState({ status:value })
  }
  onSubmit = (event) => {
    event.preventDefault();
    const { title, author, status, description, discount, price } = this.props.data;

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
    const { smartElement, data, formErrors } = this.props;
  
    return (
      <div className="sign-margin">
        <Grid centered>
          <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
            <Header style={{ color: "#4183c4" }} as="h2">
              Edit Book
            </Header>

            <Form size="big" binding={this}>

          {smartElement.formInput({name:'title',
                label:"Title",
                value:data.title,
                placeholder:'title',
                })}
                
                 {smartElement.formInput({name:'author',
                label:"author",
                value:data.author,
                placeholder:'author',
                })}

              Status
             {smartElement.dropdown({
               name:'status',
                label:"Status",
                value:data.status,
                placeholder:'status',
                options:statusOption,
                })}

              {smartElement.formTextArea({name:'description',
                label:"description",
                value:data.description,
                placeholder:'description',
              })}

               {smartElement.formInput({name:'price',
                label:"price",
                value:data.price,
                placeholder:'price',
              })}

              {smartElement.formInput({name:'discount',
                label:"Discount",
                value:data.discount,
                placeholder:'discount',
                })}
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

// export default formHoc(connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withRouter(BookEdit)));


export default (formHoc((connect(mapStateToProps, mapDispatchToProps)(withRouter(BookEdit))), initialFormObj, initialFormErrors));