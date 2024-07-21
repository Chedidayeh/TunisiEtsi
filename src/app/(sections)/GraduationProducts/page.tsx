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
import HeroSection from "@/components/GraduationProducts/HeroSection";




export default function Page() {

  
  return (
    <>




    {/* hero section */}


    <HeroSection/>
      
    </>
  )
}

