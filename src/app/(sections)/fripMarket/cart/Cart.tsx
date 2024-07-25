'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { CartProduct, User } from '@prisma/client'
import { Check, Loader2, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
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
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { createOrderInDb, emptyUserCart, removeProductFromCart } from './actions'
import ImageSlider from '@/components/PodProducts/ImageSlider'
interface FormattedCartProduct {
  cartProductId: string;
  productId: string;
  title?: string;
  price?: number;
  size?: string;
  category?: string;
  productImgs?: string[];
}


interface CartProps {
  products: FormattedCartProduct[];
  user:User
}

const Cart: React.FC<CartProps> = ({ products , user}) => {
  const [cartProducts, setCartProducts] = useState(products? products : [])
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const router = useRouter()
  const fee = 7
  const { toast } = useToast()
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const isValid = name.trim() !== "" && phoneNumber.length===8 && address.trim() !== ""


  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumberValue = event.target.value;
      setPhoneNumber(phoneNumberValue);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

                  // check phone number length
                  const [phoneNumberError, setPhoneNumberError] = useState('');
                  const inputClassName = phoneNumberError ? 'border-red-500' : (phoneNumber ? 'border-green-500' : '');
                  const handlePhoneNumberBlur = () => {
                    if (phoneNumber.length !== 8) {
                      setPhoneNumberError('Phone number must be 8 digits long.');
                    } else {
                      setPhoneNumberError('');
                    }
                  };


                  // save Order function
                  const createOrder = async () => {
                    try {
                      openDialog()
                      const result = await createOrderInDb(user.id,address,name,phoneNumber,orderTotal,cartProducts)


                      if(result.orderId && result.success){
                        await emptyUserCart(user.id)
                        toast({
                          title: 'Order Was Successfully Created',
                          variant: 'default',
                        });
                        router.push("/fripMarket/thank-you?orderId="+result.orderId)
                      }
                      else {
                        closeDialog()
                        toast({
                          title: 'Something went wrong',
                          description: 'There was an error on our end. Please try again.',
                          variant: 'destructive',
                      });
                      }
                      

                    } catch (error) {
                      closeDialog()
                      // Handle network errors or other exceptions
                        console.error('Error during order creating:', error)
                        toast({
                          title: 'Something went wrong',
                          description: 'There was an error on our end. Please try again.',
                          variant: 'destructive',
                      });
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





const removeItem = async (cartProductId : string) =>{
  const updatedProducts = cartProducts.filter(product => product.cartProductId !== cartProductId)
  setCartProducts(updatedProducts)
  try {
    const result = await removeProductFromCart(cartProductId,user.id)
        if(result){
        toast({
          title: 'Product removed from cart !',
          description: '',
          variant: 'default',
        });
        return
        }
  } catch (error) {
    console.log(error)
    toast({
      title: 'Error removing product from cart!',
      description: 'Please try again later.',
      variant: 'destructive',
    });
    return
    
  }

}

const calculateSubtotal = () => {
  return cartProducts.reduce((total, product) => {
    return total + (product.price || 0)
  }, 0)
}

const subtotal = calculateSubtotal()
const orderTotal = subtotal + fee









  return (


    <>


                            {/* The AlertDialog loading component */}
                            <AlertDialog>
                          <AlertDialogTrigger asChild ref={alertDialogTriggerRef}>
                            <button className="hidden">Hidden Trigger</button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader className="flex flex-col items-center">
                              <AlertDialogTitle className="text-2xl text-blue-700 font-bold text-center">
                                Creating Your Order!
                              </AlertDialogTitle>
                              <AlertDialogDescription className="flex flex-col items-center">
                                This will take a moment.
                                {/* Replace Loader2 with your loader component */}
                                <Loader2 className="text-blue-700 h-[50%] w-[50%] animate-spin mt-3" />
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogCancel className="hidden" ref={alertDialogCancelRef}>Cancel</AlertDialogCancel>
                          </AlertDialogContent>
                        </AlertDialog>



    {/* The AlertDialog create order component */}

<AlertDialog open={isConfirmOpen}>
      <AlertDialogTrigger asChild>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Creating your Order</AlertDialogTitle>
          <AlertDialogDescription>
            Please make sure to fill all the necessary details!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Your Name :
            </Label>
            <Input id="name" type="text" className="col-span-3 " value={name} onChange={handleNameChange} />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="phoneNumber">Phone Number:</Label>
            <div className="col-span-3">
              <Input 
                id="phoneNumber" 
                type="number" 
                pattern="\d{8}"
                onBlur={handlePhoneNumberBlur}
                placeholder="99 999 999" 
                onChange={handlePhoneNumberChange}
                className={`${inputClassName} focus:ring-0  focus:border-green-500`}
                required 
              />
              {phoneNumberError && (
                <p className="text-sm text-red-500 mt-1">
                  {phoneNumberError}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-left">
              Your Address:
            </Label>
            <Input id="address" placeholder='Region And City | الولاية و المدينة' maxLength={20} type="text" className="col-span-3 " value={address} onChange={handleAddressChange} />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={()=>setIsConfirmOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={!isValid} 
          onClick={()=>{
            setIsConfirmOpen(false)
            createOrder()
            }}>Confirm Order</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>



        <div className=''>
      <div className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
      <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold tracking-tight  sm:text-4xl'>
            Shopping Cart
          </h1>
        </div>
        <div className='left-2 justify-center items-center flex'>
          <p className='text-md '>Total Items: {cartProducts.length}</p>
        </div>


        <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
          <div
            className={cn('lg:col-span-7', {
              'rounded-lg border-2 border-dashed border-zinc-200 p-12':
              cartProducts.length === 0,
            })}>

            {cartProducts.length === 0 ? (
              <div className='flex h-full flex-col items-center justify-center space-y-1'>
                <div
                  aria-hidden='true'
                  className='relative mb-4 h-40 w-40 text-muted-foreground'>
                  <Image
                    src='/hippo-empty-cart.png'
                    fill
                    loading='eager'
                    alt='empty shopping cart hippo'
                  />
                </div>
                <h3 className='font-semibold text-2xl'>
                  Your cart is empty
                </h3>
                <p className='text-muted-foreground text-center'>
                  Whoops! Nothing to show here yet.
                </p>
                <Link href="/MarketPlace" className='text-blue-600 text-sm'>
                Add items to your cart
                </Link>
              </div>
            ) : null}

            <ul
              className={cn({
                'divide-y divide-gray-200 border-b border-t border-gray-200':
                cartProducts.length > 0,
              })}>
              {cartProducts.map((product) => {

                  return (
                    <li
                      key={product.cartProductId}
                      className='flex py-6 sm:py-10'>
                      <div className='flex-shrink-0 mb-10'>
                        <div className='relative h-52 w-52  xl:h-80 xl:w-80'>
                        <ImageSlider urls={product.productImgs!}/>
                        </div>
                      </div>
                      
                      <div className='ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
                        <div className='relative pr-9  sm:grid sm:grid-cols-1 sm:gap-x-6 sm:pr-0'>
                          <div className='mt-10'>
                            <div className='flex justify-between'>
                              <h3 className='text-lg'>
                                <Link
                                  href={`/MarketPlace/product/${product.productId}`}
                                  className='font-medium hover:text-gray-800'>
                                  {product.title}
                                </Link>
                              </h3>
                            </div>

                            <div className='mt-2 flex text-sm'>
                              <p className='text-muted-foreground'>
                                Category: {product.category}
                              </p>
                            </div>
                            <div className='mt-2 flex text-sm'>
                              <p className='text-muted-foreground'>
                                Size: {product.size}
                              </p>
                            </div>
                            <div className='mt-2'>
                            <p className='mt-1 text-lg font-medium text-blue-600'>
                              Price : {((product.price)?.toFixed(2))} TND
                            </p>
                            </div>
                            
                          </div>

                          <div className='mt-4 sm:mt-0 sm:pr-9 w-20'>
                            <div className='absolute  right-0 top-0'>
                              <Button
                                className='hover:text-red-500 group'
                                aria-label='remove product'
                                onClick={() => removeItem(product.cartProductId)}
                                variant='secondary'>
                                <X
                                  className='h-5 group: w-5 '
                                  aria-hidden='true'
                                />
                                <span className="absolute font-normal bottom-10 left-1/2 transform -translate-x-1/2 w-max px-2 py-1 text-xs bg-black text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                  Remove Item
                                </span>
                              </Button>
                            </div>
                          </div>
                        </div>

                        <p className='flex space-x-2 text-sm '>
                          <X className='h-5 w-5 flex-shrink-0 text-red-500' />
                          <span>
                          No product returns allowed!                          
                          </span>
                        </p>
                      </div>
                    </li>
                  )
                })}
            </ul>
            
          </div>

          <section className='mt-16 rounded-lg border-2 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
            <h2 className='text-lg font-medium '>
              Order summary
            </h2>

            <div className='mt-6 space-y-4'>
              <div className='flex items-center justify-between'>
                <p className='text-sm '>
                  Subtotal
                </p>
                <p className='text-sm font-medium '>
                {subtotal.toFixed(2)} TND
                </p>
              </div>

              <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
              <div className='flex text-sm text-muted-foreground'>
                  <span>Shipping fee</span>
                </div>
                <div className='text-sm font-medium '>
                {fee.toFixed(2)} TND
                </div>
              </div>
              <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                <div className='flex text-sm text-muted-foreground'>
                  <p className='flex space-x-2 text-sm '>
                    <Check className='h-5 w-5 flex-shrink-0 text-green-500' />
                    <span>Delivery time: within 3 days!</span>
                  </p>
                </div>
              </div>

              <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                <div className='text-base font-medium '>
                  Order Total
                </div>
                <div className='text-base font-medium '>
                  {cartProducts.length > 0 ? `${orderTotal.toFixed(2)} TND` : `0 TND`}
                </div>
              </div>
            </div>

            <div className='mt-6'>
              <Button
                disabled={cartProducts.length === 0 }
                onClick={()=> setIsConfirmOpen(true)}
                className='w-full'
                size='lg'>
                Continue
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
    </>

  )
}

export default Cart
