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
import { getUser } from '@/actions/actions';
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
    
    const user = await getUser()
    const bacProducts = await db.bacProducts.findMany();
  
      if(!bacProducts){
      throw error ("there's no bac Products");
      }
  
    
   
  
  
    return (
     <ProductView
     bacProducts={bacProducts}
    />
    
    );
    
  } catch (error) {
    console.error('Error fetching data:', error);
    return <BadConnectionPage />;

    
  }

};

export  default Page ;

