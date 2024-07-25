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
import View from './View'
import { fetchNewProducts, fetchProducts, getAllPodProductsCategories, getUser } from '@/actions/actions'
import PerkSection from '@/components/PodProducts/PerkSection'





export default async function Page() {
  const products = await fetchProducts();
  const user = await getUser()
  const categories = await getAllPodProductsCategories()

  return (
    <>

          {/* new Released section */}
              <section className='border-t border-gray-200  w-full mx-auto' >
                <div className='w-[85%] mx-auto'>
                <View
                     user={user!}
                     products={products!}
                     categories={categories}
                />
                </div>
              </section>
          

    </>
  )
}

