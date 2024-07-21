'use server'

import { db } from "@/db";

export async function updateStoreName(storeId: string, newStoreName: string) {
    try {
      const updatedStore = await db.store.update({
        where: { id: storeId },
        data: { storeName: newStoreName },
      });
      return true;
    } catch (error) {
      console.error('Error updating store name:', error);
      return false;

    }
  }

export async function doesStoreNameExist(storeName: string): Promise<boolean> {
    try {
      const store = await db.store.findFirst({
        where: { storeName: storeName },
      });
      return store !== null;
    } catch (error) {
      console.error('Error checking store name:', error);
      return false
    }
  }

export async function deleteStore(userId: string) {
  try {
    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        userType: 'USER',
      },
    });
    return true
  } catch (error) {
    console.error('Error updating user type:', error);
    return false
  }
}