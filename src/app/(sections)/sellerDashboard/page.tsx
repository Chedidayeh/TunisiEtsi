/* eslint-disable react/no-unescaped-entities */
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Heart,
  Menu,
  Package2,
  Search,
  Shirt,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import Link from "next/link";

import { cn } from "@/lib/utils";
import { getStoreByUserId, getUnreadNotificationsForStore, getUser } from "@/actions/actions";
import React from "react"
import OrderedDesigns from "@/components/sellerDashboard/OrderedDesigns"
import OrderedProducts from "@/components/sellerDashboard/OrderedProducts"








const Page =  async () => {


  const user = await getUser()
  if(!user) return
  const store = await getStoreByUserId(user!.id!)
  const notifications = await getUnreadNotificationsForStore(store.id)

  return (
    <>


  
         <h1 className="text-2xl font-semibold">Seller Dashboard</h1>
         {notifications.length > 0 && (
         <Link href={"/sellerDashboard/notifications"}><Button variant={"link"}>You Have {notifications.length} unread notifications</Button></Link>
         )}

            <div className="flex flex-col items-center">
                  <div className="flex justify-center items-center top-[0%]">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={store!.logoUrl!} alt="store" className="rounded-full border-2" />
                      <AvatarFallback>Logo</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-center font-extrabold text-xl text-blue-600 mt-3">{store.storeName}</div>
                  <div className="mt-3">


                  </div>
              </div>


   


      <div className="flex flex-col gap-5 w-full">

    <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">



          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{store.revenue.toFixed(2)} TND</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Shirt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{store.products.length} products</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Sales
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{store.totalSales} sales</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total likes
                </CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{store.totalLikes} likes</div>
            </CardContent>
          </Card>


          <OrderedProducts/>

          <OrderedDesigns/>

      
    </section>



    <section className={cn(' grid grid-cols-1 p-11 gap-4 transition-all lg:grid-cols-4')}>
</section>

  </div>

  </>
  );
}

export default Page;