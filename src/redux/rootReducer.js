import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import bookReducer from './reducers/bookReducer'

export default combineReducers({
    userReducer,
    bookReducer
});