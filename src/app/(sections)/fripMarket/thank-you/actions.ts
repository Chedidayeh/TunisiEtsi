import { db } from "@/db";
import { FripOrder } from "@prisma/client";


  // get order by orderId 
  export async function getFripOrder(orderId: string): Promise<FripOrder | null> {
    try {
      const order = await db.fripOrder.findUnique({
        where: {
          id: orderId,
        },
        include: {
          user: true, // Include the user relation
          orderItems: true // Include the orderItems relation
        },
      });
        return order
        } catch (error) {
          console.log(error)
          return null
        }
      }