import {  SAVE_ORDER_DATA, SELECTED_PRODUCT } from "../actions/action";



// Define the initial state with selectedProduct included
const initialState = {
  orderData: null,
  selectedProduct: null,
};
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = (state = initialState, action : any) => {
  switch (action.type) {
    case SAVE_ORDER_DATA:
      return {
        ...state,
        orderData: action.payload,
      };
    case SELECTED_PRODUCT:
        return {
          ...state,
          selectedProduct: action.payload,
        };
        
    default:
      return state;
  }
};

export default rootReducer;
