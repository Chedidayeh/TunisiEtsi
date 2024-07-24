'use server'

import { db } from '@/db';
import { error } from 'console';
import { auth } from '@/auth';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Frown, OctagonAlert } from 'lucide-react';
import OrderData from './OrderData';
import { getUser } from '@/actions/actions';
import { getUserOrders } from './actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


const Page = async () => {

try {

  const user = await getUser()



  const orders = await getUserOrders(user!.id)


    
    return (
    <OrderData
        ordersData={orders}
    />
    );

  }
  catch (error) {
    console.log(error)
  }

}

export  default Page ;

