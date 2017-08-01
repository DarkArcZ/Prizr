import { combineReducers } from 'redux';
import auth from './auth_reducer';
import items from './shop_reducer'
import likedItems from './likes_reducer'


export default combineReducers ({
	auth, items, likedItems
});