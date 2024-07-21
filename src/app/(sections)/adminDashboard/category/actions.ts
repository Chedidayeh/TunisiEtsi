'use server'

import { db } from "@/db";

export async function getAllCategoriesWithDetails() {
    try {
      const categories = await db.category.findMany({
        include: {
          colors: true,
          sizes: true,
        },
      });
      return categories;
    } catch (error) {
      console.error("Error fetching categories with details:", error);
      throw error;
    }
  }


  export async function deleteCategoryAndAssociated(categoryId: string) {
    try {
      await db.$transaction(async (prisma) => {
        // Fetch the category
        const category = await prisma.category.findUnique({
          where: { id: categoryId },
        });
  
        // Delete products associated with the category
        await prisma.product.deleteMany({
          where: {
            category: category!.label,
          },
        });
  
        // Delete cart products associated with the products
        await prisma.cartProduct.deleteMany({
          where: {
            productId: {
              in: await prisma.product.findMany({
                where: {
                  category: category!.id,
                },
                select: {
                  id: true,
                },
              }).then(products => products.map(product => product.id)),
            },
          },
        });
  
        // Delete order items associated with the products
        await prisma.orderItem.deleteMany({
          where: {
            productId: {
              in: await prisma.product.findMany({
                where: {
                  category: category!.label,
                },
                select: {
                  id: true,
                },
              }).then(products => products.map(product => product.id)),
            },
          },
        });
  
        // Delete pre-order previews associated with the products
        await prisma.preOrderPreview.deleteMany({
          where: {
            productCategory: category!.label,
          },
        });
  
        // Delete the category itself
        const deletedCategory = await prisma.category.delete({
          where: {
            id: categoryId,
          },
        });
  
        return true
      });
    } catch (error) {
      console.error('Error deleting category and associated items:', error);
      return false
    }
  }