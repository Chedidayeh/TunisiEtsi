/* eslint-disable @next/next/no-async-client-component */
'use server'

import { db } from '@/db';
import { error } from 'console';
import DesignView from './DesignView';
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
import { Frown, Loader2 } from 'lucide-react';
const BadConnectionPage = () => {
  return (
    <AlertDialog open={true}>
    <AlertDialogTrigger asChild>
    </AlertDialogTrigger>
    <AlertDialogContent className="flex flex-col items-center">
      <AlertDialogHeader className="flex flex-col items-center">
        <AlertDialogTitle className="text-2xl text-blue-700 font-bold text-center">
          Bad Connection !
        </AlertDialogTitle>
        <AlertDialogDescription className="flex flex-col items-center">
          Please verify your connection and reload the page.
        </AlertDialogDescription>
      </AlertDialogHeader>
          <Frown className="text-blue-700 h-[20%] w-[20%]" />
    </AlertDialogContent>
  </AlertDialog>
  );
};


const Page = async () => {

  try {
    const session = await auth();
    if(!session) return null

    const store = await db.store.findUnique({
      where:{userId:session.user.id}
    })
    
  const sellersDesigns = await db.sellerDesign.findMany({
    where: { 
      storeId: store?.id,
      isDesignForSale : true 
    }  
  });

    if(!sellersDesigns){
    throw error ("there's no sellersDesigns");
    }

  
 


  return (

   <DesignView
    SellerDesignsData={sellersDesigns}
  />  );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <BadConnectionPage />;

    
  }


  

};

export  default Page ;

