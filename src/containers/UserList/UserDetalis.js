import React, { Component } from "react";
import { getUserOrder, updateOrderDetails } from "../../redux/actions/bookAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TableListComponent from "../../utility/tableListComponent";

export class UserDetalis extends Component {

    
  componentDidMount() {
    this.props.getOrderList(this.props.match.params.id);

  }
  updateStatus = (list) => {
      console.log("lis", list)
      this.props.getOrderList(this.props.match.params.id);
    let data = {
        status:"completed",
        key:list.key
    }
      this.props.updateOrderDetails(data);
      this.props.getOrderList(this.props.match.params.id);

  }
  render() {

    console.log("this.props.orderlist", this.props.orderlist)
    const header = ["booktitle", "finalprice", "price","discount"]

    return (
      <div>
        <TableListComponent
              list={this.props.orderlist}
              header={header}
              showActions={false}
              updateStatus={this.updateStatus}
              showStatus={true}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderList: (userId) => dispatch(getUserOrder(userId)),
    updateOrderDetails: (orderinfo) => dispatch(updateOrderDetails(orderinfo)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserDetalis));

