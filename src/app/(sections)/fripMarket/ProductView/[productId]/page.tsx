'use server'

import { db } from "@/db";
import { Product } from "@prisma/client";
import { notFound } from "next/navigation";
import ViewProduct from "./viewProduct"
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
import { OctagonAlert } from "lucide-react";
import { fetchDesignById, fetchProductsByCategory, getUser } from "@/actions/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProductsByCategory } from "./actions";
interface PageProps {
  params: {
    productId: string
  }
}

const NoProductFound = () => {
  return (
    <AlertDialog open={true} >
    <AlertDialogContent>
    <AlertDialogHeader className="flex flex-col items-center">
        <div className="text-red-500 mb-2">
            <OctagonAlert className=''/>
        </div>
        <AlertDialogTitle className="text-xl font-bold text-center">
            No product found ! 
        </AlertDialogTitle>
        <AlertDialogDescription>
            Return to home page and try again !
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Link  href="/fripMarket" ><Button variant="link">
                  Return
                    </Button>
                    </Link>
                </AlertDialogFooter>
    </AlertDialogContent>
</AlertDialog>
  )
}



const Page = async ({ params }: PageProps) => {
  const { productId } = params

  try {
    const user = await getUser()

    const product = await db.fripProducts.findFirst({
      where : {id : productId},
      });
      if (!product) return notFound()
      

        const categoryProducts = await getProductsByCategory(product.category)
        const filteredProducts = categoryProducts?.filter(item => item.id !== product.id);

        return (
          <ViewProduct product={product} user={user!} categoryProducts={filteredProducts!}  />
        )

  } catch (error) {
    console.log(error)
    return NoProductFound()


    
  }








}

export default Page