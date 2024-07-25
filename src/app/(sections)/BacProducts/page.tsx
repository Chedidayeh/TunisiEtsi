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
import ProductsSearch from "@/components/fripMarket/ProductsSearch";
import HeroSection from "@/components/bacProducts/HeroSection";
import { BacProductAnimation } from "@/components/bacProducts/BacProductAnimation";




export default function Page() {


  
  return (
    <>


    {/* hero section */}


    <HeroSection/>


    <section className='bg-muted/50 border-2 rounded-2xl border-slate-50 w-[90%] mx-auto my-8'>
        <div className='py-4 mx-auto text-center flex flex-col w-full items-center'>
          <h1 className='text-2xl font-bold tracking-tight  sm:text-3xl'>
          Discover the best <span className="text-yellow-400">Products</span>
          </h1>
          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
            With TunisiEtsi Bac Edition !
          </p>

          <div className='flex flex-col sm:flex-row gap-4'>
            <Link href={"/BacProducts/ProductView"}>
            <Button variant='link'>
            Browse Now &rarr;
            </Button>
            </Link>
          </div>

  {/* frip product annimation */}
          <BacProductAnimation />

        </div>





      </section>

      
    </>
  )
}

