import * as actionTypes from "../actions/actionTypes";

const initialState = {
  error: null,
  list: [],
  adminBookList: [],
  sellerBookList:[],
  loading: false,
  redirectpath: null,
  bookData: [],
  isLoading: false,
  isError: false,
  isCreate: false,
  isUpdate: false,
  isDelete: false,
  orderdata:[],
  orderlist:[],
  single_record: null,
  sellerlist:[],
  allOrderlist:[]
};
const updateObject = (oldObject, updatedProperties) => {
    return {
      ...oldObject,
      ...updatedProperties,
    };
  };
const bookListSuccess = (state, action) => {
  return updateObject(state, {
    list: action.list,
    loading: false,
    isCreate: false,
    isUpdate: false,
    isDelete: false,
    operation_type: null,
  });
};
const bookListStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    isCreate: false,
    isUpdate: false,
    isDelete: false,
    operation_type: null,
  });
};
const bookListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isCreate: false,
    isDelete: false,
    isUpdate: false,
    operation_type: null,
  });
};
const adminBookListSuccess = (state, action) => {
  console.log("adminBookList", action.list)
  return updateObject(state, {
    adminBookList: action.list,
    loading: false,
    isCreate: false,
    isUpdate: false,
    isDelete: false,
    operation_type: null,
  });
};
const sellerBookListSuccess = (state, action) => {
  return updateObject(state, {
    sellerBookList: action.list,
    loading: false,
    isCreate: false,
    isUpdate: false,
    isDelete: false,
    operation_type: null,
  });
};

const createBookListSuccess = (state, action) => {
  return updateObject(state, {
    bookData: action.payload,
    isLoading: false,
    isError: false,
    isCreate: true,
    isUpdate: false,
    isDelete: false,

  });
};
const createBookListStart = (state, action) => {
  return updateObject(state, {
    operation_type: null,
    isLoading: true,
    isError: false,
    isCreate: true,
    isUpdate: false,
    isDelete: false,
  });
};
const createBookListFail = (state, action) => {
  return updateObject(state, {
    isError: action.error,
    isLoading: false,
    isCreate: false,
    isDelete: false,
    isUpdate: false,
    operation_type: null,
  });
};

const placeOrderSuccess = (state, action) => {
  return updateObject(state, {
    orderdata: action.payload,
    isLoading: false,
    isError: false,
  });
};
const placeOrderStart = (state, action) => {
  return updateObject(state, {
    operation_type: null,
    isLoading: true,
    isError: false,
  });
};
const placeOrderFail = (state, action) => {
  return updateObject(state, {
    isError: action.error,
    isLoading: false,
  });
};

const orderListSuccess = (state, action) => {
  return updateObject(state, {
    orderlist: action.list,
    loading: false,
    isCreate: false,
    isUpdate: false,
    isDelete: false,
    operation_type: null,
  });
};
const orderListStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    isCreate: false,
    isUpdate: false,
    isDelete: false,
    operation_type: null,
  });
};
const orderListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isCreate: false,
    isDelete: false,
    isUpdate: false,
    operation_type: null,
  });
};
const DataOperation = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    isCreate: false,
    operation_type: action.operation,
    isDelete: false,
    isUpdate: false,
  });
};

const bookSingleRecordStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    isCreate: false,
    isDelete: false,
    isUpdate: false,
  });
};
const bookSingleRecordSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    isCreate: false,
    isUpdate: false,
    isDelete: false,
    single_record: action.record,
  });
};
const bookSingleRecordFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isUpdate: false,
    isDelete: false,
    isCreate: false,
  });
};

const bookUpdateStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    isCreate: false,
    isDelete: false,
    isUpdate: false,
  });
};

const bookUpdateSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    isCreate: false,
    isDelete: false,
    isUpdate: true,
  });
};
const bookUpdateFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isCreate: false,
    isDelete: false,
    isUpdate: false,
  });
};

const bookDeleteStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    isCreate: false,
    isDelete: false,
    isUpdate: false,
  });
};

const bookDeleteSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    isCreate: false,
    isDelete: true,
    isUpdate: false,
  });
};
const bookDeleteFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isCreate: false,
    isDelete: false,
    isUpdate: false,
  });
};
const sellerListSuccess = (state, action) => {
  return updateObject(state, {
    sellerlist: action.list,
    loading: false,
  });
};
const sellerListStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};
const sellerListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};
const allOrderListSuccess = (state, action) => {
  return updateObject(state, {
    allOrderlist: action.list,
    loading: false,
  });
};
const allOrderListStart = (state, action) => {
  return updateObject(state, {
    loading: true,
     });
};
const allOrderListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};
const orderUpdateStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    isCreate: false,
    isDelete: false,
    isUpdate: false,
  });
};

const orderUpdateSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    isCreate: false,
    isDelete: false,
    isUpdate: true,
  });
};
const orderUpdateFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isCreate: false,
    isDelete: false,
    isUpdate: false,
  });
};

const userOrderListSuccess = (state, action) => {
  console.log("action", action.list)
  return updateObject(state, {
    orderlist: action.list,
    loading: false
  });
};
const userOrderListStart = (state, action) => {
  return updateObject(state, {
    loading: true,
   
  });
};
const userOrderListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};


const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BOOK_LIST_SUCCESS:
      return bookListSuccess(state, action);
    case actionTypes.BOOK_LIST_START:
      return bookListStart(state, action);
    case actionTypes.BOOK_LIST_FAIL:
      return bookListFail(state, action);
    case actionTypes.ADMIN_BOOK_LIST_SUCCESS:
      return adminBookListSuccess(state, action);
    case actionTypes.SELLER_BOOK_LIST_SUCCESS:
      return sellerBookListSuccess(state, action);
    case actionTypes.BOOK_CREATE_SUCCESS:
      return createBookListSuccess(state, action);
    case actionTypes.BOOK_CREATE_START:
      return createBookListStart(state, action);
    case actionTypes.BOOK_CREATE_FAIL:
      return createBookListFail(state, action);
    case actionTypes.PLACE_ORDER_SUCCESS:
      return placeOrderSuccess(state, action);
    case actionTypes.PLACE_ORDER_START:
      return placeOrderStart(state, action);
    case actionTypes.PLACE_ORDER_FAIL:
      return placeOrderFail(state, action);
    case actionTypes.ORDER_LIST_SUCCESS:
      return orderListSuccess(state, action);
    case actionTypes.ORDER_LIST_START:
      return orderListStart(state, action);
    case actionTypes.ORDER_LIST_FAIL:
      return orderListFail(state, action);
    case actionTypes.DATA_OPERATION:
      return DataOperation(state, action);
    case actionTypes.BOOK_SINGLE_FETCH_START:
      return bookSingleRecordStart(state, action);
    case actionTypes.BOOK_SINGLE_FETCH_SUCCESS:
      return bookSingleRecordSuccess(state, action);
    case actionTypes.BOOK_SINGLE_FETCH_FAIL:
      return bookSingleRecordFail(state, action);
    case actionTypes.BOOK_UPDATE_START:
      return bookUpdateStart(state, action);
    case actionTypes.BOOK_UPDATE_SUCCESS:
      return bookUpdateSuccess(state, action);
    case actionTypes.BOOK_UPDATE_FAIL:
      return bookUpdateFail(state, action);
    case actionTypes.BOOK_DELETE_START:
      return bookDeleteStart(state, action);
    case actionTypes.BOOK_DELETE_SUCCESS:
      return bookDeleteSuccess(state, action);
    case actionTypes.BOOK_DELETE_FAIL:
      return bookDeleteFail(state, action);
    case actionTypes.SELLER_LIST_SUCCESS:
      return sellerListSuccess(state, action);
    case actionTypes.SELLER_LIST_START:
      return sellerListStart(state, action);
    case actionTypes.SELLER_LIST_FAIL:
      return sellerListFail(state, action);
    case actionTypes.ALL_ORDER_LIST_SUCCESS:
      return allOrderListSuccess(state, action);
    case actionTypes.ALL_ORDER_LIST_START:
      return allOrderListStart(state, action);
    case actionTypes.ALL_ORDER_LIST_FAIL:
      return allOrderListFail(state, action);
    case actionTypes.ORDER_UPDATE_START:
      return orderUpdateStart(state, action);
    case actionTypes.ORDER_UPDATE_SUCCESS:
      return orderUpdateSuccess(state, action);
    case actionTypes.ORDER_UPDATE_FAIL:
      return orderUpdateFail(state, action);
    case actionTypes.USER_ORDER_LIST_SUCCESS:
      return userOrderListSuccess(state, action);
    case actionTypes.USER_ORDER_LIST_START:
      return userOrderListStart(state, action);
    case actionTypes.USER_ORDER_LIST_FAIL:
      return userOrderListFail(state, action);

    default:
      return state;
  }
};

export default bookReducer;
