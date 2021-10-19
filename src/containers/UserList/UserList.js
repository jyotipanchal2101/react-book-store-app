import React, {useEffect } from 'react';

import { getUserList } from "../../redux/actions/userAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Table } from "semantic-ui-react";
import TableListComponent from '../../utility/tableListComponent';
export const MyOrders = (props) => {
useEffect(() => {
  props.getUserList();
}, [])
const { userlist } = props;
const header = ["firstname","lastname","usertype" ]
  return (
    <div>
 <TableListComponent
              list={userlist}
              header={header}
              showActions={false}
              />      
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

