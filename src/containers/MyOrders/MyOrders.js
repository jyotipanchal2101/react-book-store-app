import React, { Component } from "react";
import { getOrderList, getAllOrderList } from "../../redux/actions/bookAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Table } from "semantic-ui-react";
import TableListComponent from "../../utility/tableListComponent";

export class MyOrders extends Component {
  componentDidMount() {
  //  this.props.getOrderList(this.props.userId);
    if (this.props.usertype === "admin") {
      this.props.getAllOrderList();
    } else if (this.props.usertype === "seller") {
      this.props.getOrderList(this.props.userId);
    }

  }
  render() {
    let orderlist;

    if (this.props.usertype === "admin") {
      orderlist = this.props.allOrderlist;
    } else if (this.props.usertype === "seller") {
      orderlist = this.props.orderlist;
    }
    const header = ["booktitle", "finalprice", "price","discount" ]

    return (
      <div>
        <TableListComponent
              list={orderlist}
              header={header}
              showActions={false}
              />   
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.bookReducer.error,
    orderlist: state.bookReducer.orderlist,
    loading: state.bookReducer.loading,
    redirectpath: state.bookReducer.redirectpath,
    userId: state.userReducer.userId,
    usertype: state.userReducer.usertype,
    allOrderlist: state.bookReducer.allOrderlist
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderList: (userId) => dispatch(getOrderList(userId)),
    getAllOrderList: () => dispatch(getAllOrderList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyOrders));

