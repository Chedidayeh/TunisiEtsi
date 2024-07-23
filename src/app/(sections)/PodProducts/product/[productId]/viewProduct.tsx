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
import AddToCartButton from '@/components/PodProducts/AddToCartButton'
import ImageSlider from '@/components/PodProducts/ImageSlider'
import ProductReel from '@/components/PodProducts/ProductReel'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { db } from '@/db'
import { Product, SellerDesign, Store, User } from '@prisma/client'
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

  

const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Products', href: '/products' },
]

interface Productswithstore extends Product {
  store : Store
}
interface ViewProductProps {
  product: Productswithstore;
  frontdesign : string
  backdesign : string
  user? : User
  categoryProducts:Productswithstore[]
}
const ViewProduct: React.FC<ViewProductProps> = ({ product , frontdesign , backdesign , user ,categoryProducts }) => {


  let designs = [
    frontdesign,
    backdesign
  ].filter(url => url != null);


  function interleaveArrays(arr1 : string[], arr2 : string[]) {
    const maxLength = Math.max(arr1.length, arr2.length);
    const result = [];

    for (let i = 0; i < maxLength; i++) {
        if (i < arr1.length) {
            result.push(arr1[i]);
        }
        if (i < arr2.length) {
            result.push(arr2[i]);
        }
    }

    return result;
}

const combinedUrls = interleaveArrays(product.croppedFrontProduct, product.croppedBackProduct);



  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);



  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
      setQuantity(newQuantity);
    };


  const handleColorChange = (color : string, index : number) => {
    setSelectedColor(color);
    setSelectedColorIndex(index);
  };

  const [selectedSize, setSelectedSize] = useState<string>("");
  const selectedSizes = getSizeList(product.category) as string[];

  const handleSizeChange = (event: string) => {
    setSelectedSize(event);
  };


  const [open, setOpen] = useState<boolean>(false);



  return (
<>
<LoadingState isOpen={open} />



    <MaxWidthWrapper>


      <div className='py-10 mx-auto text-center flex flex-col items-center max-w-1xl'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                Product{' '}
            <span className='text-blue-600'>
              Details
            </span>
          </h1>
        </div>




        <div className='bg-white border-gray-400 border-2 rounded-xl mx-auto max-w-2xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
           {/* Product images */}
           <div className='mt-4 lg:col-end-2 lg:row-span-2 lg:mt-0 lg:self-center'>
            <div className='aspect-square rounded-lg'>
              <ImageSlider urls={combinedUrls} />
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
            <div className="flex items-center flex-col">
              <div className="mb-1"> {/* Adding margin bottom for separation */}
                <ViewDesign designs={designs}/>
              </div>
              <Link href={`/PodProducts/create-client-product/upload?category=${product.category}`} >
                <Button variant="link">try other designs</Button>
              </Link>
            </div>
          </div>

          <Separator className='mt-2 w-[80%]' />


             <div className='flex items-center mt-2'>
                <div className='text-muted-foreground border-gray-300 '>
                  Store : <span className='cursor-pointer hover:text-blue-700'>
                    <Link
                    href={`/MarketPlace/store/${product.store.storeName}`}>
                    {product.store.storeName}
                    </Link>
                    </span>
                </div>
                <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                  Category : <span className='cursor-pointer hover:text-blue-700'>
                    <Link
                    href={`/MarketPlace/category/${product.category}`}>
                    {product.category}
                    </Link>
                    </span>
                </div>
              </div>

              <Separator className='mt-2 w-[80%]'/>


 

            <section className='mt-2'>
            

            <div className='mt-4'>
              <p className=' text-xl font-bold tracking-tight text-gray-900'>
                {product.title}
              </p>
            </div>

              <div className='flex items-center mt-2'>
                <p className=' text-gray-900'>
                <span className='text-xl font-bold text-blue-700'>{(product.price).toFixed(2)} TND {product.topSales && (
                <div className="ml-2"> {/* Added margin for separation */}
                <Badge variant="outline" className="bg-emerald-700 text-white">Best sell</Badge>
              </div>
                )}
              </span>
                </p>
              </div>
              
              <div className='mt-4 space-y-6'>
                <p className='text-base text-muted-foreground'>
                Product Description: <br/>
                  <span className="text-xs">{product.description}</span>
                </p>
              </div>

              <Separator className='mt-2 '/>

              <div className='mt-6 flex items-center'>
              <Label htmlFor="username" className="text-left">
                Select Size :
             </Label>
             <div className='ml-3'>
             <Select value={selectedSize} onValueChange={handleSizeChange}>
            <SelectTrigger className="w-[180px] bg-gray-100">
              <SelectValue placeholder="Select a size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a size</SelectLabel>
                {selectedSizes.map((size, index) => (
                  <SelectItem key={index} value={size}>{size}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
             </Select>

             </div>
             <div className="ml-2">
              <p className="text-gray-600 text-sm">view product dimentions </p>
             </div>
             <ArrowDown className="text-gray-400 h-5"/>
            </div>



              <div className='mt-6 flex items-center'>
              <Label htmlFor="username" className="text-left">
                Select Quantity :
             </Label>
             <div className='ml-3'>
             <Input type='number'           
              onChange={handleQuantityChange}  // Handle change
              className='bg-gray-100' 
              defaultValue={1} min={1} max={5}/>
             </div>
             </div>


             <div className='mt-6 flex items-center'>
              <Label htmlFor="username" className="text-left">
                Select Color :
             </Label>
             <div className='ml-3'>
             <RadioGroup value={selectedColor} onValueChange={(value) => {
                const index = product.colors.indexOf(value);
                handleColorChange(value, index);
              }}>
                {product.colors.map((color, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={color} 
                      id={`r${index}`} 
                    />
                    <Label htmlFor={`r${index}`}>{color}</Label>
                  </div>
                ))}
              </RadioGroup>  
              </div>
             </div>
            </section>
                      {/* add to cart part */}
          <div className='mt-10 lg:col-start-1 lg:row-end-2 lg:max-w-lg lg:self-start'>
            <div>
              <div className='mt-10 flex justify-center items-center'>
                <AddToCartButton 
                user = {user!}
                product={product}
                size={selectedSize}
                color={selectedColor}
                quantity={quantity}
                index={selectedColorIndex} 
                 />
              </div>
              <div className="flex justify-center items-center mt-2">
              <Link href="/PodProducts/cart">
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
        
      <ProductDimenetions
        title={`Product Dimentions`}
        subtitle={`Choose your product size carefully`}
      />




      <ProductReel
        user={user!}
        href={`/PodProducts/category/${product.category}`}
        title={`Similar ${product.category}`}
        products={categoryProducts}
        subtitle={`Browse similar high-quality ${product.category} just like '${product.title}'`}
      />
    </MaxWidthWrapper>


    </>
  )
}

export default ViewProduct