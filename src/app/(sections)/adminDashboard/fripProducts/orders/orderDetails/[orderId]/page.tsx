'use server';

import {  getOrderWithItemsAndProducts } from "./actions";
import ProductOrderView from "./ProductOrderView";

interface PageProps {
  params: {
    orderId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { orderId } = params;
  try {

    const order = await getOrderWithItemsAndProducts(orderId);
      return <ProductOrderView order={order} />;

  } catch (error) {
    console.error('Error fetching order:', error);
    // Handle error or return an error view/component
    return <div>Error fetching order. Please try again later.</div>;
  }
};

export default Page;
