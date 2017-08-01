import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';
import {
  LIKE_ITEM,
  CLEAR_LIKED_ITEMS
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.likedItems || [];
    case CLEAR_LIKED_ITEMS:
      return [];
    case LIKE_ITEM:
      return _.uniqBy([
        action.payload, ...state
      ], 'uid');
    default:
      return state;
  }
}