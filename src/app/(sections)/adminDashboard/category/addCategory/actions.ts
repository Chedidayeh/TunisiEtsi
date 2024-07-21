'use server'

import { db } from "@/db";

  

export async function saveCategoryData(categoryData: any) {
    try {
      // Destructure category data
      const {
        label,
        href,
        value,
        price,
        colors,
        sizes,
        frontBorders,
        backBorders,
      } = categoryData;
  
      // Start a transaction
      await db.$transaction([
        // Save the category
        db.category.create({
          data: {
            label,
            href,
            value,
            price,
            // Map sizes to size relations
            sizes: {
              create: sizes.map((size: any) => ({
                label: size.label,
                value: size.value,
              })),
            },
            // Map colors to color relations
            colors: {
              create: colors.map((color: any) => ({
                label: color.label,
                value: color.value,
                tw: color.tw,
                frontImageUrl: color.frontImageUrl,
                backImageUrl: color.backImageUrl,
              })),
            },
            // Map front borders to frontBorder relations
            frontBorders: {
              create: frontBorders.map((border: any) => ({
                label: border.label,
                value: border.value,
              })),
            },
            // Map back borders to backBorder relations
            backBorders: {
              create: backBorders.map((border: any) => ({
                label: border.label,
                value: border.value,
              })),
            },
          },
        }),
      ]);
      return true
    } catch (error) {
      console.error('Error saving category data:', error);
      return false
    }
  }