/* eslint-disable @next/next/no-img-element */
'use client'
import NextImage from 'next/image'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Link from 'next/link'
import { Product, SellerDesign, User } from '@prisma/client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ProductListing from "@/components/PodProducts/ProductListing"
import { useEffect, useMemo, useState } from "react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Heart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Store} from '@prisma/client'
import { checkUserLike, updateStoreLikes } from "./actions"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from '@/components/ui/badge'
import ProductsView from './ProductsView'
import DesignView from './DesignView'

interface StoreDetails extends Store {
  products: Productswithstore[];
}

interface Productswithstore extends Product {
  store : Store
}
interface ProductReelProps {
  store : StoreDetails
  user : User
  designs : SellerDesign[]

}
const StoreView = ({ store, user , designs }: ProductReelProps) => {
  

    const [activeTab, setActiveTab] = useState('Products');
    const handleTabChange = (value : string) => {
      setActiveTab(value);
    };


  return (

    
    <section className='py-4'>
     
     <div className='py-10 bg-muted/50 rounded-xl mx-auto text-center flex flex-col items-center max-w-1xl'>

     <div className="flex flex-col items-center text-center">
  <Avatar className="shadow-2xl shadow-blue-200 w-[40%] h-[40%] sm:w-[30%] sm:h-[30%] md:w-[20%] md:h-[20%] lg:w-[10%] lg:h-[10%] rounded-full border bg-gray-100 border-black overflow-hidden">
    <AvatarImage
      src={store?.logoUrl!}
      alt=""
    />
  </Avatar>
  <h1 className="text-xl mt-4 font-bold tracking-tight sm:text-xl">
    <span className="text-blue-600">
      {store?.storeName}{' '}
    </span>
  </h1>
  <p className="mt-2 text-sm text-muted-foreground">
    {store?.storeBio}
  </p>
</div>


<div className="mt-4 items-center justify-center flex">
            <Tabs defaultValue="Products" className="w-full sm:w-[500px]" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Products">Store Products</TabsTrigger>
          <TabsTrigger value="Designs">Store Designs</TabsTrigger>
        </TabsList>
      </Tabs>

          </div>
     
          </div>


          {activeTab === 'Products' && (
            <div className='mt-2'>
            <ProductsView store={store} user={user} />
            </div>
            )}

          {activeTab === 'Designs' && (
            <div className='mt-2'>
            <DesignView store={store} user={user} designs={designs} />
            </div>
            )}




    </section>
  )


  
}




export default StoreView