import React, { Component } from "react";
import { getOrderList } from "../../redux/actions/bookAction";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import CardComponet from "../../components/CardComponent";
import { Button } from "semantic-ui-react";
import { Header, Table } from "semantic-ui-react";

export class MyOrders extends Component {
  componentDidMount() {
    this.props.getOrderList(this.props.userId);
  }
  render() {
    console.log("this.props.orderlist", this.props.orderlist);
    const { orderlist } = this.props;
    return (
      <div>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Title</Table.HeaderCell>
              <Table.HeaderCell>Order Date</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {orderlist.map((orderlist) => (
              <Table.Row>
                <Table.Cell>{orderlist.booktitle}</Table.Cell>
                <Table.Cell>{orderlist.orderdate}</Table.Cell>
                <Table.Cell>{orderlist.finalprice}</Table.Cell>
              </Table.Row>
            ))}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderList: (userId) => dispatch(getOrderList(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyOrders));

