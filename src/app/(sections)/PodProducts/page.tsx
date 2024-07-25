/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

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
import Marquee from 'react-fast-marquee'
import ProductSlider from '@/components/PodProducts/ProductSlider'
import HeroSection from '@/components/PodProducts/HeroSection'




export default async function Page() {
  const newProducts = await fetchNewProducts();
  const bestSellingProducts = await fetchBestSellingProducts();
  const user = await getUser();

  // Ensure products are not null or undefined
  const filteredNewProducts = newProducts ? newProducts.slice(0, 8) : [];
  const filteredBestSellingProducts = bestSellingProducts ? bestSellingProducts.slice(0, 8) : [];
  
  return (
    <>

    <HeroSection/>


        <div className='py-2 mx-auto text-center flex flex-col w-full items-center'>
          <p className='text-lg max-w-prose text-muted-foreground'>
           Powered by TunisiEtsi !
          </p>
        </div>


        <section className='bg-muted/50 border-2 rounded-2xl border-slate-50 w-[90%] mx-auto my-8'>
        <div className='flex flex-col items-center justify-center mt-2'>
    <p className='mt-4 text-sm max-w-prose text-muted-foreground'>
      Discover our Trending Style collection!
    </p>
    <div className='mt-2'>
      <Link href={"/PodProducts/ProductsView"}>
        <Button variant='link'>
          Shop the Collection &rarr;
        </Button>
      </Link>
    </div>
  </div>
          {/* trending products */}
       <ProductSlider 
            user={user!}
            products={filteredNewProducts} />

</section>




      {/* Top selled section */}

      <section className='bg-muted/50 border-2 rounded-2xl border-slate-50 w-[90%] mx-auto my-8'>
      <div className='w-[85%] mx-auto'>
      <ProductReel
            user={user!}
            href='/PodProducts/BestSelling'
            title='Best Selling Products'
            products={filteredBestSellingProducts}
            subtitle='Explore Our Bestselling Products!'
          />
      </div>
      </section>

      {/* Newly released section */}
      <section className='bg-muted/50 border-2 rounded-2xl border-slate-50 w-[90%] mx-auto my-8'>
      <div className='w-[85%] mx-auto'>
      <ProductReel
            user={user!}
            href='/PodProducts/NewlyReleased'
            title='Newly released'
            products={filteredNewProducts}
            subtitle='Explore the new added products !'
          />
      </div>
      </section>


      <PerkSection/>
      
    </>
  )
}

