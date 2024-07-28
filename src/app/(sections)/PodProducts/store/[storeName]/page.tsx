/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
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
  OctagonAlert,
} from 'lucide-react'
import Link from 'next/link'
import { db } from '@/db'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {  fetchProductsByCategory, getUser } from '@/actions/actions'
import ProductsByCategory from './StoreView'
import StoreView from './StoreView'
import PerkSection from '@/components/PodProducts/PerkSection'
import { getDesignsByStoreId, getStoreProductsAndDesigns } from './actions'


interface PageProps {
  params: {
    storeName: string
  }
}


export default async function Page({ params }: PageProps) {
  const { storeName } = params
  const decodedCategory = decodeURIComponent(storeName)
  const user = await getUser()
  const store = await getStoreProductsAndDesigns(decodedCategory)  
  const storeDesigns = await getDesignsByStoreId(store?.id ?? "")
  return (
    <>

          {/* store section */}
          {store ? (

            <>
              <section className='border-t border-gray-200 w-full mx-auto' >
                <div className='w-[85%] mx-auto'>
                <StoreView  
                     store={store!}
                     user={user!}
                     designs={storeDesigns!}
                />
                </div>
              </section>

            </>

            ) : (
              <>
                      <AlertDialog open={true} >
    <AlertDialogContent>
    <AlertDialogHeader className="flex flex-col items-center">
        <div className="text-red-500 mb-2">
            <OctagonAlert className=''/>
        </div>
        <AlertDialogTitle className="text-xl font-bold text-center">
            No Store found ! 
        </AlertDialogTitle>
        <AlertDialogDescription>
            Please return to the home page !
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Link  href="/PodProducts" ><Button variant="link">
                  Return
                    </Button>
                    </Link>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
              </>
            )}
              
          

    </>
  )
}

