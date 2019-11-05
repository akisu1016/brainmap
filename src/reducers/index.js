import { combineReducers } from 'redux';
import postReducer from './postReducer';
import formReducer from './formReducer';

export default combineReducers({
    postReducer,
    formReducer,
});