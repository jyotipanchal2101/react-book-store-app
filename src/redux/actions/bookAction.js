import { firebaseApp } from "../../firebase/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import * as actionTypes from "./actionTypes";
const db = firebase.firestore(firebaseApp);

export const bookList = () => {
  console.log('booklist')
    return (dispatch) => {
      dispatch(getBookListStart());
      db.collection("booklist").where("status", "==", "Published").get().then((querySnapshot) => {
          const list = [];
          querySnapshot.forEach((doc) => {
            list.push({
              key: doc.id,
             ...doc.data(),
            });
          });
          dispatch(getBookList(list));
        })
        .catch((error) => {
          // console.log("Error getting documents: ", error);
          dispatch(bookListFailed(error.message));
        });
    };
  };
  
  const getBookListStart = () => {
    return {
      type: actionTypes.BOOK_LIST_START,
    };
  };
  
  const getBookList = (list) => {
    return {
      type: actionTypes.BOOK_LIST_SUCCESS,
      list: list,
    };
  };
  
  const bookListFailed = (error) => {
    return {
      type: actionTypes.BOOK_LIST_FAIL,
      error: error,
    };
  };

  export const getAdminBookList = () => {
    console.log('getAdminBookList')
    return (dispatch) => {
      dispatch(getBookListStart());
      db.collection("booklist").get().then((querySnapshot) => {
          const list = [];
          querySnapshot.forEach((doc) => {
            list.push({
              key: doc.id,
             ...doc.data(),
            });
          });
          console.log('list=============', list)
          dispatch(adminBookList(list));
        })
        .catch((error) => {
          // console.log("Error getting documents: ", error);
          dispatch(bookListFailed(error.message));
        });
    };
  };
  
  const adminBookList = (list) => {
    return {
      type: actionTypes.ADMIN_BOOK_LIST_SUCCESS,
      list: list,
    };
  };

  export const getSellerBookList = (userId) => {
    console.log('userId', userId)
    return (dispatch) => {
      dispatch(getBookListStart());
      db.collection("booklist").where("userid", "==",userId)
      .where("usertype", "==", "seller")
      .get().then((querySnapshot) => {
          const list = [];
          querySnapshot.forEach((doc) => {
            list.push({
              key: doc.id,
             ...doc.data(),
            });
          });
          console.log('list=============', list)
          dispatch(sellerBookList(list));
        })
        .catch((error) => {
          // console.log("Error getting documents: ", error);
          dispatch(bookListFailed(error.message));
        });
    };
  };
  
  const sellerBookList = (list) => {
    return {
      type: actionTypes.SELLER_BOOK_LIST_SUCCESS,
      list: list,
    };
  };

  export const createBook = (bookinfo) => {
  return async (dispatch) => {
    dispatch(bookCreateStart());
    try {
    
      await db.collection("booklist")
        .add(bookinfo)
        .then((res) => {
           console.log("test==========", res); 
           dispatch(bookCreateSuccess(res));    
        })
    } catch (err) {
      //console.log(err.message);
      dispatch(bookCreateFail(err.message));
      // TypeError: failed to fetch
    }
  };
};
export const bookCreateSuccess = (payload) => {
  return {
    type: actionTypes.BOOK_CREATE_SUCCESS,
    payload: payload,
  };
};

export const bookCreateStart = () => {
  return {
    type: actionTypes.BOOK_CREATE_START,
  };
};

export const bookCreateFail = (error) => {
  return {
    type: actionTypes.BOOK_CREATE_FAIL,
    error: error,
  };
};
  

export const placeBookOrder = (orderinfo) => {
console.log('orderinfo', orderinfo)
return async (dispatch) => {
  dispatch(placeOrderStart());
  try {
  
    await db.collection("bookorder")
      .add(orderinfo)
      .then((res) => {
         console.log("test==========", res); 
         dispatch(placeOrderSuccess(res));    
      })
  } catch (err) {
    //console.log(err.message);
    dispatch(placeOrderFail(err.message));
    // TypeError: failed to fetch
  }
};
};
export const placeOrderSuccess = (payload) => {
return {
  type: actionTypes.PLACE_ORDER_SUCCESS,
  payload: payload,
};
};

export const placeOrderStart = () => {
return {
  type: actionTypes.PLACE_ORDER_START,
};
};

export const placeOrderFail = (error) => {
return {
  type: actionTypes.PLACE_ORDER_FAIL,
  error: error,
};
};

export const getOrderList = (userId) => {
  console.log('userId', userId)
  return (dispatch) => {
    dispatch(getOrderListStart());
    db.collection("bookorder").where("userid", "==", userId)
    .get().then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({
            key: doc.id,
           ...doc.data(),
          });
        });
        dispatch(getMyOrderList(list));
      })
      .catch((error) => {
        // console.log("Error getting documents: ", error);
        dispatch(getOrderListFailed(error.message));
      });
  };
};

const getMyOrderList = (orderlist) => {
  return {
    type: actionTypes.ORDER_LIST_SUCCESS,
    list: orderlist,
  };
};
const getOrderListStart = () => {
  return {
    type: actionTypes.ORDER_LIST_START,
  };
};

const getOrderListFailed = (error) => {
  return {
    type: actionTypes.ORDER_LIST_FAIL,
    error: error,
  };
};
export const DataOperation = (operation) => {
  return {
    type: actionTypes.DATA_OPERATION,
    operation: operation,
  };
};

export const bookSingleRecord = (id) => {
  return (dispatch) => {
    dispatch(getBookSingleFetchStart());
    db.collection("booklist")
      .where("id", "==", id)
      .get()
      .then((querySnapshot) => {
        const list = {
          key: querySnapshot.docs[0].id,
          ...querySnapshot.docs[0].data(),
        };

        dispatch(getBookSingleFetchSuccess(list));
      })
      .catch((error) => {
        //  console.log("Error getting documents: ", error);
        dispatch(getBookSingleFetchFail(error.message));
      });
  };
};

const getBookSingleFetchStart = () => {
  return {
    type: actionTypes.BOOK_SINGLE_FETCH_START,
  };
};

const getBookSingleFetchSuccess = (record) => {
  return {
    type: actionTypes.BOOK_SINGLE_FETCH_SUCCESS,
    record: record,
  };
};

const getBookSingleFetchFail = (error) => {
  return {
    type: actionTypes.BOOK_SINGLE_FETCH_FAIL,
    error: error,
  };
};

const bookUpdateStart = () => {
  return {
    type: actionTypes.BOOK_UPDATE_START,
  };
};

const bookUpdateSuccess = () => {
  return {
    type: actionTypes.BOOK_UPDATE_SUCCESS,
  };
};

const bookUpdateFail = (error) => {
  return {
    type: actionTypes.BOOK_UPDATE_FAIL,
    error: error,
  };
};

export const updateBookDetails = (bookinfo) => {
  const { title, author, status, description, discount, price, key } = bookinfo;

  // console.log(todoinfo);
  return (dispatch) => {
    dispatch(bookUpdateStart());
    //console.log(todoinfo);
    db.collection("booklist")
      .doc(key)
      .update({
        title,
        author,
        status,
        description,
        discount,
        price
      })
      .then((res) => {
        dispatch(bookUpdateSuccess());
      })
      .catch((err) => {
        dispatch(bookUpdateFail(err.message));
      });
  };
};