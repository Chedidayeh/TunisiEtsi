'use server'

import { db } from "@/db";

export async function getProductsByCategory(category: string) {
    try {
        const products = await db.fripProducts.findMany({
            where: {
                category: category
            }
        });
        return products;
    } catch (error) {
        return null
    }
}