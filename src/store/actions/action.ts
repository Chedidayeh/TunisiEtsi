import { BackBorder, Category, Color, FrontBorder, Size } from "@prisma/client";

// Action Types
export const SAVE_ORDER_DATA = 'SAVE_ORDER_DATA';
export const SELECTED_PRODUCT = 'SELECTED_PRODUCT';

interface fetchedCat extends Category {
  colors : Color[]
  sizes : Size[]
  frontBorders : FrontBorder[]
  backBorders : BackBorder[]
}


// Action Creators
export const saveOrderData = (orderData : any) => ({
  type: SAVE_ORDER_DATA,
  payload: orderData,
});

export const saveSelectedProduct = (selectedProduct : fetchedCat) => ({
    type: SELECTED_PRODUCT,
    payload: selectedProduct,
  });









