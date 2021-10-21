import React, {useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { getUserList } from "../../redux/actions/userAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TableListComponent from '../../utility/tableListComponent';

export const MyOrders = (props) => {
useEffect(() => {
  props.getUserList();
}, [])
let history = useHistory();

const { userlist } = props;
const header = ["firstname","lastname","usertype" ]

const goToUserDetails = (list) => {
  history.push(props.match.path + "/orders/" + list.userId);

}
  return (
    <div>
          <TableListComponent
              list={userlist}
              header={header}
              showActions={false}
              goToUserDetails={goToUserDetails}
              showUserAction={true}
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

