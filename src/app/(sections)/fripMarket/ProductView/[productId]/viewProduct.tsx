/* eslint-disable @next/next/no-img-element */
"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { db } from '@/db'
import { FripProducts, Product, SellerDesign, Store, User } from '@prisma/client'
import { ArrowDown, Check, Shield } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { ChangeEvent, useEffect, useState } from 'react'
import React from 'react'
import { CATEGORIES } from '@/validators/option-validator'
import { getSizeList } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import ProductDimenetions from "@/components/PodProducts/ProductDimenetions"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ViewDesign from "@/components/PodProducts/ViewDesign"
import LoadingState from "@/components/LoadingState"
import ProductReel from "@/components/fripMarket/ProductReel"
import ImageSlider from "@/components/fripMarket/ImageSlider"
import AddToCartButton from "@/components/fripMarket/AddToCartButton"

  

const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/fripMarket' },
  { id: 2, name: 'Products', href: '/fripMarket/ProductView' },
]


interface ViewProductProps {
  product: FripProducts;
  user? : User
  categoryProducts:FripProducts[]
}
const ViewProduct: React.FC<ViewProductProps> = ({ product , user ,categoryProducts }) => {



  const [open, setOpen] = useState<boolean>(false);



  return (
<>
<LoadingState isOpen={open} />



    <MaxWidthWrapper>


      <div className='py-10 mx-auto text-center flex flex-col items-center max-w-1xl'>
          <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                Product{' '}
            <span className='text-blue-600'>
              Details
            </span>
          </h1>
        </div>




        <div className=' border-gray-400 border-2 rounded-2xl mx-auto max-w-2xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
         

        <div className='mt-4 lg:col-end-2 lg:row-span-2 lg:mt-0 lg:self-center'>
        <div className='aspect-square rounded-lg my-4 mx-10'>
        <ImageSlider urls={product.image} />
  </div>


          </div>


          {/* Product Details */}
          <div className='py-10 lg:max-w-lg lg:self-end'>
          <div className="flex justify-between items-center sm:mt-10 lg:mt-4">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={breadcrumb.href}
                      className="font-medium text-sm text-muted-foreground hover:text-gray-900">
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300">
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <Separator className='mt-2 w-[80%]' />


             <div className='flex items-center mt-2'>
                <div className='text-muted-foreground border-gray-300 '>
                  Brand : <span className='cursor-pointer hover:text-blue-700'>
                    <Link
                    href={`#`}>
                    {product.brand}
                    </Link>
                    </span>
                </div>
                <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                  Category : <span className='cursor-pointer hover:text-blue-700'>
                    <Link
                    href={`#`}>
                    {product.category}
                    </Link>
                    </span>
                </div>
              </div>

              <Separator className='mt-2 w-[80%]'/>


 

            <section className='mt-2'>
            

            <div className='mt-4'>
              <p className=' text-xl font-bold tracking-tight'>
                {product.title}
              </p>
            </div>

              {/* if the product is sold or not */}
              <div className='flex items-center mt-2'>
                <p className=' text-gray-900'>
                <span className='text-xl font-bold text-blue-700'>{(product.price).toFixed(2)} TND 
                <div className="ml-2">
                <Badge variant="outline" className="bg-blue-700 text-white">Available</Badge>
              </div>
              </span>
                </p>
              </div>
              

              <Separator className='mt-2 '/>

              <div className='mt-6'>
              <Label >
                Size : <p className="text-lg text-gray-600">{product.size}</p>
             </Label>
            </div>
            </section>
                      {/* add to cart part */}
          <div className='mt-10 lg:col-start-1 lg:row-end-2 lg:max-w-lg lg:self-start'>
            <div>
              <div className='mt-10 flex justify-center items-center'>
                <AddToCartButton 
                user = {user!}
                product={product}
                size={product.size}
                 />
              </div>
              <div className="flex justify-center items-center mt-2">
              <Link href="/fripMarket/cart">
              <Button onClick={()=>setOpen(true)} variant="link" className="flex justify-center items-center">
                View Cart
              </Button>
              </Link>
              </div>

       
              
             
              <div className=' text-center'>
                <div className='group inline-flex text-sm text-medium'>
                  <Shield
                    aria-hidden='true'
                    className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400'
                  />
                  <span className='text-muted-foreground hover:text-gray-700'>
                    Payment at delivery
                  </span>
                </div>
              </div>
            </div>
          </div>
          </div>

          
        </div>
        
      <ProductReel
        user={user!}
        href={`/fripMarket/category/${product.category}`}
        title={`Similar ${product.category}`}
        products={categoryProducts}
        subtitle={`Browse similar ${product.category} just like '${product.title}'`}
      />

    </MaxWidthWrapper>


    </>
  )
}

export default ViewProduct