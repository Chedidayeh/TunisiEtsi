'use server'

import { db } from "@/db";

  

export async function saveInDb(uploadPaths: string[], title: string) {
  try {
    const newProduct = await db.bacProducts.create({
      data: {
        image: uploadPaths,
        title: title,
      },
    });

    return newProduct;
  } catch (error) {
    console.error('Error saving to the database:', error);
    throw new Error('Failed to save product in the database');
  }
}