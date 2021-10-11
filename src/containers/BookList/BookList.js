import React, { Component } from "react";
import { bookList } from "../../redux/actions/bookAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CardComponet from "../../components/CardComponent";
import { v4 as uuidv4 } from 'uuid';
import { placeBookOrder } from "../../redux/actions/bookAction";
import ModalComponent  from "../../components/Modal/Modal";

const isAuthenticated = localStorage.getItem("token");

export class BookList extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       showModal : false
    }
  }
  
  componentDidMount() {
    this.props.getBookList();
  }
  showModalPopup = () => {
    this.props.history.push("/signin");
    this.setState({showModal:false})  
  }

  closeModalPopup = () => {
    this.setState({showModal:false})
  }

  placeOrder = (listdata) => {
    console.log('listdata123', listdata)
   // this.props.history.push("/order");
   if (isAuthenticated) {
    const { price, id, title } = listdata;
    const orderid = uuidv4();
    const orderdata = {
       orderid,
       finalprice:price,
       bookid:id,
       orderdate:"12/01/2021",
       userid:this.props.userId,
       status:"completed",
       booktitle: title
     };
     this.props.placeBookOrder(orderdata);
   } else {
    this.setState({showModal:true})
   }
  };

  render() {
    console.log("list", this.props.list);
    const { list } = this.props;
    const { showModal } = this.state;
    return (
      <div>
        {list && list.map((listdata) => {
          return (
            <div>
            <CardComponet {...listdata}
            placeOrder = {()=>this.placeOrder(listdata)}
            />
            <p></p>
            <ModalComponent showModal={showModal}
            showModalPopup = {this.showModalPopup}
            closeModalPopup = {this.closeModalPopup}
            />
            </div>
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.bookReducer.error,
    list: state.bookReducer.list,
    loading: state.bookReducer.loading,
    redirectpath: state.bookReducer.redirectpath,
    userId: state.userReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBookList: () => dispatch(bookList()),
    placeBookOrder: (bookdata) => dispatch(placeBookOrder(bookdata)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BookList));