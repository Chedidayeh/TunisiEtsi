'use server'

import { db } from "@/db";
import { sendOrderEmail } from "@/lib/mailer";
import { Order } from "@prisma/client";

// Define the interface for cart products
interface FormattedCartProduct {
    cartProductId: string;
    productId: string;
    title?: string;
    price?: number;
    size?: string;
    category?: string;
    productImgs?: string[];
  }


  // Function to create an order and return a boolean indicating success
  export async function createOrderInDb(
    userId: string,
    shippingAddress: string,
    clientName: string,
    phoneNumber: string,
    orderAmount: number,
    cartProducts: FormattedCartProduct[]
  ) {
    try {
      let order
      // Start a transaction for atomicity
      await db.$transaction(async (tx) => {
        // Create the order
       order = await tx.fripOrder.create({
          data: {
            amount: orderAmount,
            shippingAddress,
            phoneNumber,
            clientName,
            userId,
            orderItems: {
              create: cartProducts.map((product) => ({
                productId: product.productId,
                productPrice: product.price ?? 1,
                productTitle: product.title ?? '',
                productSize: product.size ?? '',
                productCategory: product.category ?? '',
                capturedMockup: product.productImgs ?? [],
              })),
            },
          },
          include : {
            user : true,
            orderItems : true
          }
        });

          });
    
      return {orderId : order!.id as string  , success : true }; 
    } catch (error) {
      console.error('Error creating order:', error);
      return {orderId : null , success : false }; 
    }
  }



// fetch a user cart products
  export async function fetchCartProducts(userId: string) {
    try {
      // Find the user and include the cart and its products
      const user = await db.user.findUnique({
        where: { id: userId },
        include: {
          fripCart: {
            include: {
              selectedProducts: {
                include: {
                  product: true, // Include the original product details
                },
              },
            },
          },
        },
      });
  
      if (!user || !user.fripCart) {
        return
      }
  
      const cartProducts = user.fripCart.selectedProducts;
  
      // Format or process the cart products as needed
      const formattedCartProducts = cartProducts.map(cartProduct => ({
        cartProductId: cartProduct.id,
        productId: cartProduct.productId,
        title: cartProduct.product?.title,
        price: cartProduct.price,
        size: cartProduct.size,
        category: cartProduct.category,
        productImgs: cartProduct.productImg,
  
      }));
  
      return formattedCartProducts as FormattedCartProduct[]
    } catch (error) {
      console.error('Error fetching cart products:', error);
      throw error;
    }
  }


// remove product from user cart
export async function removeProductFromCart( cartProductId: string ,userId: string,): Promise<boolean | null> {
  try {
    // Find the user's cart
    const userCart = await db.fripCart.findUnique({
      where: { userId: userId },
      include: { selectedProducts: true }, // Include related CartProducts
    });

    // If user has no cart, return false (nothing to remove)
    if (!userCart) {
      console.error('User does not have a cart.');
      return false;
    }

    // Check if the product exists in the user's cart
    const existingProduct = userCart.selectedProducts.find(product => product.id === cartProductId);

    // If product does not exist in the cart, return false
    if (!existingProduct) {
      console.error('Product does not exist in the user\'s cart.');
      return false;
    }

    // Remove the product from the cart
    await db.cartFripProduct.delete({
      where: {
        id: existingProduct.id,
      },
    });

    return true; // Successfully removed product from cart

  } catch (error) {
    console.error('Error removing product from cart:', error);
    return null; // Return null or handle error as per your application's needs
  }
}


// Function to empty user's cart
export async function emptyUserCart(userId: string): Promise<boolean | null> {
  try {
    // Find the user's cart including selectedProducts
    const userCart = await db.fripCart.findUnique({
      where: { userId: userId },
      include: { selectedProducts: true },
    });

    // If user has no cart, return false (nothing to empty)
    if (!userCart) {
      console.error('User does not have a cart.');
      return false;
    }

    // Delete all products from the user's cart
    if (userCart.selectedProducts.length > 0) {
      await db.cartProduct.deleteMany({
        where: {
          cartId: userCart.id,
        },
      });
    }

    return true; // Successfully emptied user's cart

  } catch (error) {
    console.error('Error emptying user\'s cart:', error);
    return null; // Return null or handle error as per your application's needs
  }
}
  