'use server'

import { db } from "@/db";

// Function to delete a product by id
export const deleteProduct = async (productId: string) => {
  try {
    const product = await db.bacProducts.delete({
      where: {
        id: productId,
      },
    });

    return product; // Optional: Return deleted product or success message
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product.');
  }
};
  
