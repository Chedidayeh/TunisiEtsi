'use server'

import { db } from "@/db";


export async function searchProducts(query: string) {
    try {
        const decodedQuery = decodeURIComponent(query); // Decode the URI-encoded query string
        const keywords = decodedQuery.split(' ').filter(keyword => keyword.trim() !== ''); // Split decoded query into keywords

        const products = await db.fripProducts.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: decodedQuery,
                            mode: 'insensitive', // Case insensitive search for title
                        },
                    },
                    {
                        brand: {
                            contains: decodedQuery,
                            mode: 'insensitive', // Case insensitive search for brand
                        },
                    },
                    {
                        category: {
                            contains: decodedQuery,
                            mode: 'insensitive', // Case insensitive search for category
                        },
                    },
                ],
            },

        });

        // If no products found and query is a phrase, try searching with the exact phrase in the title
        if (products.length === 0 && decodedQuery.includes(' ')) {
            const exactTitleProducts = await db.fripProducts.findMany({
                where: {
                    title: {
                        contains: decodedQuery,
                        mode: 'insensitive', // Case insensitive search for exact phrase in title
                    },
                },
            });

            return exactTitleProducts;
        }

        return products; // Return the matched products
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
}
