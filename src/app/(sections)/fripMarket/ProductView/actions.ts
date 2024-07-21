'use server'

import { db } from "@/db";


export async function getAllProducts() {
    try {
      const products = await db.fripProducts.findMany();
      return products;
    } catch (error) {
      console.error(error);
      return null
    }
  }