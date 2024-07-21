'use server'

import { db } from '@/db';
import { error } from 'console';
import ProductView from './ProductView';
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


    const sellerProducts = await db.product.findMany({ where: { storeId: store?.id } });
  
  
      if(!sellerProducts){
      throw error ("there's no sellerProducts");
      }
  
    
   
  
  
    return (
     <ProductView
        sellerProductsData={sellerProducts}
    />
    
    );
    
  } catch (error) {
    console.error('Error fetching data:', error);
    return <BadConnectionPage />;

    
  }

};

export  default Page ;

