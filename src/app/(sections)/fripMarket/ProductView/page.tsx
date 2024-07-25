/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import {
  Button,
  buttonVariants,
} from '@/components/ui/button'
import { Product } from '@prisma/client'
import {
  ArrowDownToLine,
  CheckCircle,
  Leaf,
} from 'lucide-react'
import Link from 'next/link'
import { db } from '@/db'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { fetchNewProducts, getAllFripBrands, getAllFripCategories, getUser } from '@/actions/actions'
import PerkSection from '@/components/PodProducts/PerkSection'
import { getAllProducts } from './actions'
import FripView from './FripView'





export default async function Page() {
  const products = await getAllProducts();
  const user = await getUser()
  const categories = await getAllFripCategories()
  const brands = await getAllFripBrands()
  return (
    <>

          {/* bac products section */}
              <section className='border-t border-gray-200 w-full mx-auto' >
                <div className='w-[85%] mx-auto'>
                <FripView
                     user={user!}
                     products={products!}
                     categories={categories}
                     brands={brands}
                />
                </div>
              </section>
          

    </>
  )
}

