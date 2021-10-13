import React, {useEffect } from 'react';

import { getUserList } from "../../redux/actions/userAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Table } from "semantic-ui-react";

export const MyOrders = (props) => {
  const { userlist } = this.props;
useEffect(() => {
  this.props.getUserList();
}, [])
  return (
    <div>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>First Name</Table.HeaderCell>
            <Table.HeaderCell>last Name</Table.HeaderCell>
            <Table.HeaderCell>User</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {userlist.map((userlist) => (
            <Table.Row>
              <Table.Cell>{userlist.firstname}</Table.Cell>
              <Table.Cell>{userlist.lastname}</Table.Cell>
              <Table.Cell>{userlist.usertype}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    error: state.userReducer.error,
    userlist: state.userReducer.list,
    loading: state.userReducer.loading,
    userId: state.userReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserList: () => dispatch(getUserList()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyOrders));

