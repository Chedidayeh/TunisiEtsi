'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Product, User } from '@prisma/client'
import { useToast } from '../ui/use-toast'
import { addProductToCart, checkProductInCart, getUser } from '@/actions/actions'
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
import { Loader2 } from 'lucide-react'
const AddToCartButton = ({
  user,
  product,
  size,
  color,
  quantity,
  index,
}: {
  user :  User
  product: Product
  size : string
  color : string
  quantity : number
  index : number
}) => {
  const { toast } = useToast()
    const [isCartSaved, setisCartSaved] = useState<boolean>(false)

    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    useEffect(() => {
      const timeout = setTimeout(() => {
        setIsSuccess(false)
      }, 2000)

      return () => clearTimeout(timeout)
    }, [isSuccess])
  
    const productImgs = getProductImages(product.croppedFrontProduct[index],product.croppedBackProduct[index])
    const price = product.price
    const category = product.category
  



  const saveToCartProducts = async () =>{

    try {
      if (!user) {
        toast({
          title: 'No logged in user found !',
          description: 'Try to login first!',
          variant: 'destructive',
        });
        return;
      }
  
      openDialog()
      const result = await addProductToCart(product.id,user.id,price,category,size,color,quantity,productImgs)
      if(result){
      closeDialog()
      setIsSuccess(true)
      toast({
        title: 'Product added to cart !',
        description: '',
        variant: 'default',
      });
      return
      }
      if(!result) {
        closeDialog()
        toast({
          title: 'You already added this product to your cart !',
          description: 'try to change the color or the size or other detail to continue',
          variant: 'destructive',
        });
        return

      }
  
      
    } catch (error) {
      closeDialog()
      console.error('Error saving product to cart:', error);
      toast({
        title: 'Error saving product to cart!',
        description: 'Please try again later.',
        variant: 'destructive',
      });
      return
    }
    

  }


  function getProductImages(frontImg?: string | null, backImg?: string | null): string[] {
    const images: string[] = [];
  
    if (frontImg !== null && frontImg !== undefined) {
      images.push(frontImg);
    }
  
    if (backImg !== null && backImg !== undefined) {
      images.push(backImg);
    }
  
    return images;
  }
    

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
                                Adding to cart!
                              </AlertDialogTitle>
                              <AlertDialogDescription className="flex flex-col items-center">
                                This will take a moment.
                                <Loader2 className="text-blue-700 h-[50%] w-[50%] animate-spin mt-3" />
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogCancel className="hidden" ref={alertDialogCancelRef}>Cancel</AlertDialogCancel>
                          </AlertDialogContent>
                        </AlertDialog>  

    <Button
      disabled={size===""}
      onClick={saveToCartProducts}
      size='lg'
      variant={'default'}
      className='w-[60%]'>
      {isSuccess ? 'Added !' : 'Add to cart'}
    </Button>

      </>

      
    )


}

export default AddToCartButton
