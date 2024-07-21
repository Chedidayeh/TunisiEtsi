'use server'

import { db } from "@/db";

  

export async function saveInDb(uploadPaths: string[], title: string , price : number , size : string , brand : string , category : string) {
  try {
    const newProduct = await db.fripProducts.create({
      data: {
        image: uploadPaths,
        title: title,
        price: price,
        size: size,
        brand : brand,
        category : category,
      },
    });

    return newProduct;
  } catch (error) {
    console.error('Error saving to the database:', error);
    throw new Error('Failed to save product in the database');
  }
}