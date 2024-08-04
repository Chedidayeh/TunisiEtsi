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
import { FripProductAnimation } from "@/components/fripMarket/FripProductAnimation";
import { BacProductAnimation } from "@/components/bacProducts/BacProductAnimation";




export default async function Page() {

  
  return (
    <>

    {/* hero section */}
    <div className='py-20 mt-2 mx-auto text-center flex flex-col w-[80%] rounded-2xl items-center bg-center 
    bg-[url("/bgBanner.png")]'>
  <h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
    Discover Your Unique{' '}
    <span className='text-blue-600'>
      Clothing Style
    </span>
  </h1>
  <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
    With TunisiEtsi !
  </p>
</div>



<section className='bg-muted/50 border-2 rounded-2xl dark:border-slate-50 border-slate-500 w-[90%] mx-auto my-8'>

</section>

<section className='bg-muted/50 border-2 rounded-2xl dark:border-slate-50 border-slate-500  w-[90%] mx-auto my-8'>
<div className='flex flex-col items-center justify-center mt-2'>
    <p className='mt-4 text-sm max-w-prose text-muted-foreground'>
      Discover our Pod Styled collection!
    </p>
    <div className='mt-2'>
      <Link href={"/PodProducts"}>
        <Button variant='link'>
          Browse Now &rarr;
        </Button>
      </Link>
    </div>
  </div>
    <Marquee>
  <div className='flex flex-wrap justify-center my-4'>
    <NextImage src={"/trending3.jpeg"} className='rounded-2xl mx-4' width={300} height={300} alt=''/>
    <NextImage src={"/trending2.jpeg"} className='rounded-2xl mx-4' width={300} height={300} alt=''/>
    <NextImage src={"/trending5.png"} className='rounded-2xl mx-4' width={300} height={300} alt=''/>
    <NextImage src={"/trending1.jpeg"} className='rounded-2xl mx-4' width={300} height={300} alt=''/>
    <NextImage src={"/trending4.png"} className='rounded-2xl mx-4' width={300} height={300} alt=''/>
  </div>
  </Marquee>
</section>


<section className='bg-muted/50 border-2 rounded-2xl dark:border-slate-50 border-slate-500 w-[90%] mx-auto my-8'>
<div className='flex flex-col items-center justify-center mt-2'>
    <p className='mt-4 text-sm max-w-prose text-muted-foreground'>
      Discover our unique Bac collection!
    </p>
    <div className='mt-2'>
      <Link href={"/MarketPlace/bacEdition"}>
        <Button variant='link'>
          Browse Now &rarr;
        </Button>
      </Link>
    </div>
  </div>
    <BacProductAnimation />
</section>


<section className='bg-muted/50 border-2 rounded-2xl dark:border-slate-50 border-slate-500 w-[90%] mx-auto my-8'>
<div className='flex flex-col items-center justify-center mt-2'>
    <p className='mt-4 text-sm max-w-prose text-muted-foreground'>
      Discover our unique Frip collection!
    </p>
    <div className='mt-2'>
      <Link href={"/fripMarket"}>
        <Button variant='link'>
          Browse Now &rarr;
        </Button>
      </Link>
    </div>
  </div>
    <FripProductAnimation />
</section>



      
    </>
  )
}

