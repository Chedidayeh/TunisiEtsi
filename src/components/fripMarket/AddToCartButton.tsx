'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { FripProducts, Product, User } from '@prisma/client'
import { useToast } from '../ui/use-toast'
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
import { addFripProductToCart } from '@/actions/actions'
const AddToCartButton = ({
  user,
  product,
  size,
}: {
  user :  User
  product: FripProducts
  size : string
}) => {
  const { toast } = useToast()

    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    useEffect(() => {
      const timeout = setTimeout(() => {
        setIsSuccess(false)
      }, 2000)

      return () => clearTimeout(timeout)
    }, [isSuccess])
  
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
      const result = await addFripProductToCart(product.id,user.id,price,category,size,product.image)
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
          title: 'You already added this product to your cart!',
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
