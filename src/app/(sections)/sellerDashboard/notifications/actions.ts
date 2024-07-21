'use server'

import { db } from "@/db";

export async function getNotificationsForStore(storeId :string) {
    try {
      const notifications = await db.notification.findMany({
        where: {
          storeId: storeId,
        },
      });
  
      console.log(`Notifications for store ${storeId}:`, notifications);
      return notifications;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }


export async function deleteNotificationById(notificationId : string) {
    try {
      const deletedNotification = await db.notification.delete({
        where: {
          id: notificationId,
        },
      });
  
      console.log(`Notification with ID ${notificationId} deleted:`, deletedNotification);
      return true;
    } catch (error) {
      console.error('Error deleting notification:', error);
      return false
    } 
  }


export async function markNotificationAsViewed(notificationId : string) {
    try {
      const updatedNotification = await db.notification.update({
        where: {
          id: notificationId,
        },
        data: {
          isViewed: true,
        },
      });
  
      console.log(`Notification with ID ${notificationId} marked as viewed:`, updatedNotification);
      return updatedNotification;
    } catch (error) {
      console.error('Error marking notification as viewed:', error);
      throw error;
    }
  }