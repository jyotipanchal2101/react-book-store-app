import React, { Component } from "react";
import { getOrderList, getAllOrderList } from "../../redux/actions/bookAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Table } from "semantic-ui-react";

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
    console.log("this.props.allOrderlist", this.props.allOrderlist);
    console.log("orderlist", orderlist)
    return (
      <div>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Title</Table.HeaderCell>
              {/* <Table.HeaderCell>Order Date</Table.HeaderCell> */}
              <Table.HeaderCell>Discounted Amount</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Discount</Table.HeaderCell>

            </Table.Row>
          </Table.Header>

          <Table.Body>
            {orderlist && orderlist.length>0 ? orderlist.map((orderlist) => (
              <Table.Row>
                <Table.Cell>{orderlist.booktitle}</Table.Cell>
                {/* <Table.Cell>{orderlist.orderdate}</Table.Cell> */}
                <Table.Cell>{orderlist.finalprice}</Table.Cell>
                <Table.Cell>{orderlist.price}</Table.Cell>
                <Table.Cell>{`${orderlist.discount}%`}</Table.Cell>

              </Table.Row>
            )):"Records not found"}
          </Table.Body>
        </Table>
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

