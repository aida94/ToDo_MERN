import { GET_ITEMS, ADD_ITEM, ITEM_ADDED, DELETE_ITEM, ITEMS_LOADING, EMPTY_ITEMS, FILTER_ITEMS } from '../actions/types';

const initialState = {
  items: [],
  item_added: false,
  loading: false,
  itemMessage: '',
  filter: 'all',
};
  
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS: 
      return {
        ...state,
        itemMessage: '',
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
        itemMessage: 'Item added successfully',
        item_added: false,
      };
    case FILTER_ITEMS:
      if (action.filter === 'completed') {
        return {
          ...state,
          itemMessage: '',
          items: action.payload.filter(item => item.is_checked === true),
          filter: action.filter,
        };
      }
      if (action.filter === 'notCompleted') {
        return {
          ...state,
          itemMessage: '',
          items: action.payload.filter(item => item.is_checked === false),
          filter: action.filter,
        };
      }
      return {
        ...state,
        itemMessage: '',
        items: action.payload,
        filter: action.filter,
      };
    case DELETE_ITEM: 
      return {
        ...state,
        itemMessage: '',
        items: state.items.filter(item => item._id !== action.payload),
      };
    case ITEMS_LOADING: 
      return {
        ...state,
        loading: true,
      };   
    case EMPTY_ITEMS: 
      return {
        items: [],
        item_added: false,
        loading: false,
        filter: '',
      };
    default:
      return state;
  }
}
