'use server'

import { auth } from "@/auth";
import { db } from "@/db";
import { Product } from "@prisma/client";




export const createOrderDb = async ( selectedProduct : Product,
  capturedProduct:string[],name : string,
  phoneNumber : string ,address : string, 
  selectedSize : string ,quantity : number,colorIndex:number
) => {

  try {

     // Begin the transaction
  const result = await db.$transaction(async (db) => {

    const user = await getUser()


    // Create the order
      const createdOrder = await db.order.create({
      data: {
        userId: user!.id,
        clientName:name,
        phoneNumber: phoneNumber,
        shippingAddress: address,
        amount: ((selectedProduct.price * quantity) + 7),
        isSellerOrder : true,
      },
    });


    // Create the order item and link it to the created order
    await db.orderItem.create({
      data: {
        productPrice : selectedProduct.price,
        frontsellerDesignId: selectedProduct.frontDesignId,
        backsellerDesignId: selectedProduct.backDesignId,
        productId:selectedProduct.id,
        orderId: createdOrder.id,
        quantity: quantity,
        productSize: selectedSize,
        productCategory: selectedProduct.category,
        capturedMockup:capturedProduct,
        productTitle : selectedProduct.title,
        productColor : selectedProduct.colors[colorIndex]
      },
    });

    return createdOrder.id;


  });

  // If everything went well, return the ID of the created order
  return { success: true, orderId: result , error : null };
    
  } catch (error) {
    console.log("error while creating order", error)
    return { success: false, orderId: null , error : true };
    
  }
 

  
}



export const getUser = async() => {
  const session = await auth();
  if(!session) return null
  const user = await db.user.findUnique({ where: { id: session.user.id } });
  return user;
}