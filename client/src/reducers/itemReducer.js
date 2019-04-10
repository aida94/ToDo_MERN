import { GET_ITEMS, ADD_ITEM, ITEM_ADDED, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
  items: [],
  item_added: false,
  loading: false,
};
  
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS: 
      return {
        ...state,
        items: action.payload,
        loading: false,
      }; 
    case ADD_ITEM: 
      return {
        ...state,
        items: [action.payload, ...state.items],
        item_added: true,
      };
    case ITEM_ADDED: 
      return {
        ...state,
        item_added: false,
      };
    case DELETE_ITEM: 
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
      };
    case ITEMS_LOADING: 
      return {
        ...state,
        loading: true,
      };   
    default:
      return state;
  }
}
