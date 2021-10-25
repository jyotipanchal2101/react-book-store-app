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
const  initialFormErrors={
  title: [{required:false}],
  author: [{required:false}],
  description: [{required:false}],
  price: [{required:false}],
  discount: [{required:false}],
}
export class BookCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { title, author, status, description, price, discount,seller } = this.props.data;
    const { userId, usertype, sellername } = this.props;
    let name
    this.props.selleruserlist && this.props.selleruserlist.map(s=>{
       if(s.userId ===seller){
       name = `${s.firstname} ${s.lastname}`
      return name;
     }})

    const id = uuidv4();
    if(this.props.smartElement.isFormValid()) {
      const bookdata = {
        id,
        title,
        author,
        status,
        description,
        price,
        discount,
        userId:usertype === "admin" ? seller : userId,
        usertype:"seller",
        sellername:usertype === "admin" ? name : sellername
      };
     this.props.createBook(bookdata);
      this.props.history.push("/dashboard/books");
    } 
  };
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = (e, { value }) => {
    console.log("handleChange", value)
    this.setState({ status:value })
  }
  handleChangeSeller = (e, { value }) => {
    console.log("handleChangeSeller", value)
    this.setState({ seller:value })
  }
  
  render() {
    const userOptions = [];
    this.props.selleruserlist.forEach(element => {
      let data = {
        text:`${element.firstname} ${element.lastname}`,
        value:element.userId
      }
      userOptions.push(data);
    });

    const statusOption= [
      {text: 'Published',value: 'Published'},
      {text: 'Pending', value: 'Pending'},
    ]
    const { usertype, smartElement, data, formErrors } = this.props;
    console.log("formErrors", formErrors)
    return (
      <div className="sign-margin">
        <Grid centered>
          <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
            <Header style={{ color: "#4183c4" }} as="h2">
              Add Book
            </Header>

            <Form size="big">

              {smartElement.formInput({name:'title',
                label:"Title",
                value:data.title,
                placeholder:'title',
                error: formErrors.title && formErrors.title.length ? formErrors.title.some(r=> !r["required"]) ? 'Title Required' :"": "",
                rules:["required"]
                })}

                 {smartElement.formInput({name:'author',
                label:"author",
                value:data.author,
                placeholder:'author',
                error: formErrors.author && formErrors.author.length ? formErrors.author.some(r=> !r["required"]) ? 'Author Required' :"": "",
                rules:["required"]
                })}
             Status
             {smartElement.statusDropdown({
               name:'status',
                label:"Status",
                value:data.status,
                placeholder:'status',
                options:statusOption,
                // error: formErrors.status && formErrors.status.length ? formErrors.status.some(r=> !r["required"]) ? 'Status Required' :"": "",
                // rules:["required"]
                })}

            {smartElement.formTextArea({name:'description',
                label:"description",
                value:data.description,
                placeholder:'description',
                error: formErrors.description && formErrors.description.length ? formErrors.description.some(r=> !r["required"]) ? 'Description Required' :"": "",
                rules:["required"]
                })}

              {usertype === "admin" ? smartElement.dropdown({
               name:'seller',
                value:data.seller,
                placeholder:'seller',
                options: userOptions, 
                // error: formErrors.seller && formErrors.seller.length ? formErrors.seller.some(r=> !r["required"]) ? 'Seller Required' :"": "",
                // rules:["required"]
                }): ""} 

               {smartElement.formInput({name:'price',
                label:"price",
                value:data.price,
                placeholder:'price',
                error: formErrors.price && formErrors.price.length ? formErrors.price.some(r=> !r["required"]) ? 'Price Required' :"": "",
                rules:["required"]
                })}

              {smartElement.formInput({name:'discount',
                label:"Discount",
                value:data.discount,
                placeholder:'discount',
                error: formErrors.discount && formErrors.discount.length ? formErrors.discount.some(r=> !r["required"]) ? 'Discount Required' :"": "",
                rules:["required"]
                })}

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
    sellername:state.userReducer.sellername,
    selleruserlist : state.bookReducer.sellerlist
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBook: (bookdata) => dispatch(createBook(bookdata)),
  };
};

export default (formHoc((connect(mapStateToProps, mapDispatchToProps)(withRouter(BookCreate))), INITIAL_STATE, initialFormErrors));



