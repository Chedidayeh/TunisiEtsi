'use server'


import { getUser } from "@/actions/actions";
import { db } from "@/db";
import { OrderStatus, OrderType } from "@prisma/client";


export const getOrderWithItemsAndProducts = async (orderId : string) => {
    try {
      const order = await db.fripOrder.findUnique({
        where: { id: orderId },
        include: {
          orderItems: true,
          user : true
        },
      });
  
      return order;
    } catch (error) {
      console.error('Error retrieving order with items and products:', error);
      throw new Error('Failed to retrieve order with items and products from database');
    }
  };


  export const changeStatus = async (orderId: string, status: OrderStatus) => {
    try {
      // Define the data object to update based on status
      let dataToUpdate: any = { status: status };
  
      // If status is 'DELIVERED', set isPaid to true; otherwise, set it to false
      dataToUpdate.isPaid = status === OrderStatus.DELIVERED;
  
      // Update the order in the database
      const updatedOrder = await db.fripOrder.update({
        where: { id: orderId },
        data: dataToUpdate,
      });
  
      return updatedOrder;
    } catch (error) {
      console.error('Error changing order status:', error);
      throw new Error('Failed to change order status in the database');
    }
    
  };

  export const changeType = async (orderId: string, type: OrderType) => {
    try {
      // Update the order status in the database
      const updatedOrder = await db.fripOrder.update({
        where: { id: orderId },
        data: { type: type },
      });
  
      return updatedOrder;
    } catch (error) {
      console.error('Error changing order status:', error);
      throw new Error('Failed to change order status in the database');
    }
  };



    // update for products
  export async function updateRevenueAndSalesForProducts(orderId: string, platformProfit: number , totalIncome : number) {
    try {
      // Fetch the order with its items and related products
      const order = await db.fripOrder.findUnique({
        where: { id: orderId },
        include: {
          orderItems: {
            include: {
              product: true
            },
          },
        },
      });
  
      if (!order) {
        throw new Error('Order not found');
      }
    

  
      // Mark order as updated
      await db.fripOrder.update({
        where: { id: order.id },
        data: {
          updated: true,
        },
      });

  
      // Update platform profit
      const user = await getUser(); // Assuming this function gets the current user
      if (user) {
        await db.platform.update({
          where: { id: 'a', userId: user.id },
          data: {
            profit: { increment: platformProfit },
            totalIncome : { increment: totalIncome }
          },
        });
      } else {
        throw new Error('User not found');
      }
  
      return {
        message: 'Product revenue and total sales updated successfully.',
      };
    } catch (error) {
      console.error('Error updating product revenue and total sales:', error);
      throw error;
    }
  }


