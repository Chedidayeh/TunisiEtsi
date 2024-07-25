'use client'
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import NextImage from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Skeleton } from '../ui/skeleton'
import { FripProducts, Product, Store, User, UserType } from '@prisma/client'
import { Badge } from "../ui/badge"
import { Label } from "@radix-ui/react-label"
import { Heart, Loader2, ShoppingBag } from "lucide-react"
import { buttonVariants } from "../ui/button"
import { auth } from "@/auth"
import { useToast } from "../ui/use-toast"

import session from "redux-persist/lib/storage/session"
import { addFripProductToFavList, addProductToFavList, checkFripProductInFavList, checkProductInFavList, getUser, removeFripProductFromFavList, removeProductFromFavList } from "@/actions/actions"
import { useRouter } from "next/navigation"


interface ProductListingProps {
  user:User
  product: FripProducts
  index: number
}

const ProductListing = ({
  user,
  product,
  index,
}: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isFavSaved, setIsFavSaved] = useState<boolean>(false)
  const { toast } = useToast()
  const router = useRouter()


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 475)
    return () => clearTimeout(timer)
  }, [index])


  useEffect(() => {
    const checkFavStatus = async () => {
      try {
        
        const isProductSaved = await checkFripProductInFavList(product!.id , user.id)
        setIsFavSaved(isProductSaved!);
        
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavStatus();
    
  }, );
  

  const saveToFavList = async () => {
    try {
      if (!user) {
        toast({
          title: 'No logged in user found !',
          description: 'Try to login first!',
          variant: 'destructive',
        });
        return;
      }


      if(isFavSaved === false) {
        console.log(isFavSaved)
        // add product
        const result = await addFripProductToFavList(product!.id , user.id)
        if(result){
          setIsFavSaved(true)
        toast({
          title: 'Product added to fav list !',
          description: '',
          variant: 'default',
        });
        router.refresh()
        return
        }
        
      }
      else if(isFavSaved === true){
        // remove product
        const result = await removeFripProductFromFavList(product!.id , user.id)
        if(result){
          setIsFavSaved(false)
        toast({
          title: 'Product removed from fav list !',
          description: '',
          variant: 'default',
        });
        router.refresh()
        return
        }

      }

      
    } catch (error) {
      console.error('Error saving product to Fav list:', error);
      toast({
        title: 'Error saving product to Fav list!',
        description: 'Please try again later.',
        variant: 'destructive',
      });
      return
    }
  };




  // to trigger the alert dialog
  const alertDialogTriggerRef = useRef<HTMLButtonElement>(null);
  const alertDialogCancelRef = useRef<HTMLButtonElement>(null);

    
                // function will trigger the dialog
                const openDialog = () => {
                  if (alertDialogTriggerRef.current) {
                    alertDialogTriggerRef.current.click();
                  }
                };

                // function will cancel the dialog
                const closeDialog = () => {
                  if (alertDialogCancelRef.current) {
                    alertDialogCancelRef.current.click();
                  }
                };







  if (!product || !isVisible) return <ProductPlaceholder />

  if (isVisible && product) {
    return (

      <>

                           {/* The AlertDialog component */}
                           <AlertDialog>
                          <AlertDialogTrigger asChild ref={alertDialogTriggerRef}>
                            <button className="hidden">Hidden Trigger</button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader className="flex flex-col items-center">
                              <div></div>
                              <AlertDialogTitle className="text-2xl text-blue-700 font-bold text-center">
                                Loading your product!
                              </AlertDialogTitle>
                              <AlertDialogDescription className="flex flex-col items-center">
                                This will take a moment.
                                <Loader2 className="text-blue-700 h-[50%] w-[50%] animate-spin mt-3" />
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                          </AlertDialogContent>
                        </AlertDialog>  
      
      
 <Card>
      <div className="mx-2 my-2">

      <div className="mb-2 mt-0 flex items-center">
  <div className="flex-grow">
    <Badge variant="secondary">
      {/* <Link href={``} className="text-gray-600 group text-xs hover:text-blue-500 cursor-pointer relative block"> */}
        {product.brand}
        {/* <span className="absolute font-normal bottom-5 left-1/2 transform -translate-x-1/2 w-max px-2 py-1 text-xs bg-black text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
          View store
        </span> */}
      {/* </Link> */}
    </Badge>
  </div>
  {/* {product.topSales && (
  <div className="ml-2"> 
  <Badge variant="outline" className="bg-emerald-700 text-white">Best sell</Badge>
</div>
  )} */}
</div>

        <Link
        onClick={openDialog}
        className={cn(
          'invisible  cursor-pointer group/main',
          {
            'visible animate-in fade-in-5': isVisible,
          }
        )}
        href={`/fripMarket/ProductView/${product.id}`}>
          <div className="border-2 overflow-hidden rounded-2xl">
          <NextImage
           src={product.image[0]}   
           alt={product.title}
           width={1000}
           height={1000}
           className="transition-transform duration-500 transform hover:scale-150"
           />
          </div>
        </Link>

        <div className="flex mt-2 ml-3 items-center justify-between">
    <div>
        <Label>{product.title}</Label>
        <p className="text-sm text-gray-600">{product.category}</p>
    </div>
        {/* add to fav list icon */}
    <div onClick={saveToFavList} className="relative group rounded-full p-2  text-gray-600 cursor-pointer ">
        <Heart className={`${isFavSaved ? 'text-red-600 fill-current' : 'text-gray-600 hover:text-red-600'}`} />
        <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-max px-2 py-1 text-xs bg-black text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
        {isFavSaved ? 'Saved!' : 'Save in fav list'}
        </span>
    </div>
    
    </div>


      <div className="mt-1 flex items-center justify-between">
        <div className="ml-2">
        <div className="font-bold rounded-xl text-blue-600 text-md">
          {(product.price).toFixed(2)} TND
        </div>
        </div>
        {/* add to cart list icon */}
        <Link onClick={openDialog} href={`/fripMarket/ProductView/${product.id}`}>
        <div className="relative group rounded-full p-2  text-gray-600 cursor-pointer ">
          <ShoppingBag className='text-gray-600 hover:text-blue-600' />
          <span className="absolute bottom-4 right-2 transform -translate-x-1/2 w-max px-2 py-1 text-xs bg-black text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            Add to cart
          </span>
          </div> 
        </Link>
      </div>    
        </div>
    </Card>
             
    </>
      

    )
  }
}

const ProductPlaceholder = () => {
  return (
    <div className='flex flex-col'>
      <div className='rounded-2xl mb-2 mt-4'>
        <Skeleton className='h-4 w-20' />
      </div>
      <div className=' overflow-hidden rounded-2xl'>
        <Skeleton className='h-[340px] w-[275px]' />
      </div>
      <div className='mx-3'>
        <Skeleton className='h-4 w-36 mt-3' />
        <Skeleton className='h-4 w-24 mt-2' />
      </div>
      <div className='ml-2'>
        <Skeleton className='h-6 w-20 mt-4' />
      </div>
    </div>
  )
}

export default ProductListing