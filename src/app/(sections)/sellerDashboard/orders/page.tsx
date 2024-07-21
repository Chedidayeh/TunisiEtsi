'use server'



import { db } from '@/db';

import { Frown } from 'lucide-react';
import { getDesignsOrdersForStore, getStoreByUserId, getUser } from '@/actions/actions';
import ProductsView from './ProductsView';
import DesignView from './DesignView';
import { getProductsOrdersForStore, getStoreDesignOrders } from './actions';


async function checkProductInStore(orderItemId : string, storeId : string) {
  try {
    // Fetch the order item with its related product
    const orderItem = await db.orderItem.findUnique({
      where: { id: orderItemId },
      include: { product: true },
    });

    // If the order item or product does not exist, return false
    if (!orderItem || !orderItem.product) {
      return false;
    }

    // Check if the product's store ID matches the provided store ID
    if (orderItem.product.storeId === storeId) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking product in store:", error);
    return false;
  }
}




interface GroupedOrder {
  id: string;
  status : string;
  type : string;
  isSellerOrder : boolean;
  isPaid : boolean
  items: OrderItem[];
}


interface OrderItem {
  id: string;
  productCategory: string;
  productTitle: string;
  productColor: string;
  quantity: number;
  productSize: string;
  productPrice: number;
  capturedMockup : string[]
}



const Page = async () => {

  try {

  const user = await getUser()
  const store = await getStoreByUserId(user!.id!)
  const storeOrdersForProducts = await getProductsOrdersForStore(store.id , user?.id!)

  
  const orderedDesigns = await getStoreDesignOrders(store.id)


    // group the products by order id
  const groupedProductsOrders: Record<string, GroupedOrder> = {};

  for (const order of storeOrdersForProducts) {
    const orderId = order.id;
    if (!groupedProductsOrders[orderId]) {
      groupedProductsOrders[orderId] = { id: orderId, status : order.status , type : order.type, isSellerOrder : order.isSellerOrder, isPaid : order.isPaid , items: [] };
    }

    for (const item of order.orderItems) {
      const isProductInStore = await checkProductInStore(item.id, store.id);
      if (isProductInStore) {
        const orderItem: OrderItem = {
          id: item.id,
          productCategory: item.productCategory,
          productTitle: item.productTitle ?? '',
          productColor: item.productColor ?? '',
          quantity: item.quantity ?? 0,
          productSize: item.productSize ?? '',
          productPrice: item.productPrice ?? 0,
          capturedMockup : item.capturedMockup,
        };
        groupedProductsOrders[orderId].items.push(orderItem);
      }
    }
  }

  const groupedProductsOrdersArray = Object.values(groupedProductsOrders);   








    return (
      <>

    <p className="text-sm text-gray-700 mb-2">SellerDashboard/All Orders</p>
    <h1 className="text-2xl font-semibold mb-8">All Orders</h1>
      
      <ProductsView
        ordersData={storeOrdersForProducts}
        groupedOrders={groupedProductsOrdersArray}
    />
    <DesignView
        orderedDesigns={orderedDesigns}
    />



</>

    );


  
} catch (error) {
  // Handle the error here
  console.error('Error fetching data:', error);
}


};

export  default Page ;

