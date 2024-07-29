/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Marquee from "react-fast-marquee";

import ProductReel from '@/components/PodProducts/ProductReel'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import {
  Button,
  buttonVariants,
} from '@/components/ui/button'
import { Product } from '@prisma/client'
import {
  ArrowDownToLine,
  CheckCircle,
  Headset,
  Leaf,
  Pencil,
  Search,
  Truck,
} from 'lucide-react'
import Link from 'next/link'
import { db } from '@/db'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import SearchQuery from '@/components/PodProducts/SearchQuery'
import PerkSection from '@/components/PodProducts/PerkSection'
import { fetchBestSellingProducts, fetchNewProducts, getUser } from '@/actions/actions'
import NextImage from 'next/image'
import HeroSection from "@/components/fripMarket/HeroSection";
import ProductsSearch from "@/components/fripMarket/ProductsSearch";
import { FripProductAnimation } from "@/components/fripMarket/FripProductAnimation";




export default function Page() {

  
  return (
    <>




    {/* hero section */}


    <HeroSection/>

    <div className="py-4 mx-auto text-center flex flex-col w-full items-center ">

    <h1 className='text-2xl font-bold tracking-tight  sm:text-3xl'>
      لوج على القطعة الي 
      <span className='text-blue-600'> تواتيك
      </span>
    </h1>
    <p className='mt-3 text-md max-w-prose text-muted-foreground'>
      With TunisiEtsi Frip Market !
    </p>


    <div className='flex flex-col sm:flex-row gap-4'>
      <Link href={"/fripMarket/ProductView"}>
        <Button variant='link'>
          Browse Trending &rarr;
        </Button>
      </Link>
    </div>

    <section className="w-[60%]">
    <div className="mt-4 flex items-center justify-center">
      <Marquee>
      <div className="border-2 rounded-md border-gray-400 mx-8 px-4 bg-white">
      <NextImage src={"/nike.png"} alt="" width={70} height={70} />
      </div>
      <div className="border-2 rounded-md border-gray-400 mx-8 px-4 bg-white">
      <NextImage src={"/fila.png"} alt="" width={70} height={70} />
      </div>
      <div className="border-2 rounded-md border-gray-400 mx-8 px-4 bg-white">
      <NextImage src={"/dolce-gabbana.png"} alt="" width={70} height={70} />
      </div>
      <div className="border-2 rounded-md border-gray-400 mx-8 px-4 bg-white">
      <NextImage src={"/puma.png"} alt="" width={70} height={70} />
      </div>
      <div className="border-2 rounded-md border-gray-400 mx-8 px-4 bg-white">
      <NextImage src={"/adidas.png"} alt="" width={70} height={70} />
      </div>
      <div className="border-2 rounded-md border-gray-400 mx-8 px-4 bg-white">
      <NextImage src={"/tommy.png"} alt="" width={70} height={70} />
      </div>
      </Marquee>
    </div>
    </section>

    
    </div>


    <section className='bg-muted/50 border-2 rounded-2xl dark:border-slate-50 border-slate-500 w-[90%] mx-auto my-8'>
  <div className='mx-auto text-center flex flex-col w-full items-center'>
    {/* frip product animation */}
    <FripProductAnimation />
  </div>
</section>





      
    </>
  )
}

