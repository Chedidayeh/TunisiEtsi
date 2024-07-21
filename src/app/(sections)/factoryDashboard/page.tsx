/* eslint-disable react/no-unescaped-entities */
'use server'

import {
  Activity,
  ArrowUpRight,
  CircleCheck,
  CircleUser,
  CircleX,
  CreditCard,
  DollarSign,
  Heart,
  Menu,
  Package2,
  PackageCheck,
  Palette,
  Search,
  Shirt,
  ShoppingBasket,
  Store,
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
import { fetchProducts, getAllOrder, getOrder, getUser } from "@/actions/actions";
import React from "react"
import OrderedDesigns from "@/components/sellerDashboard/OrderedDesigns"
import OrderedProducts from "@/components/sellerDashboard/OrderedProducts"
import { db } from "@/db"
import UsersTable from "@/components/adminDashboard/UsersTable"
import { ScrollArea } from "@/components/ui/scroll-area"



async function getTotalCounts() {
  const [confirmedOrdersCount, deliveredOrdersCount, canceledOrdersCount , totalOrdersCount] = await Promise.all([
    db.order.count({where : { type : "CONFIRMED"}}),
    db.order.count({where : { status : "DELIVERED"}}),
    db.order.count({where : { status : "CANCELED"}}),
    db.order.count()
  ]);

  return {
    confirmedOrdersCount,
    deliveredOrdersCount,
    canceledOrdersCount,
    totalOrdersCount
  };
}





const Page =  async () => {

    const count = await getTotalCounts()
    const orders = await getAllOrder()


  return (
    <>


  
         <h1 className="text-2xl font-semibold">Factory Dashboard</h1>



   


      <div className="flex mt-4 flex-col gap-5 w-full">

    <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">



          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Confirmed Orders
              </CardTitle>
              <CircleCheck className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count.confirmedOrdersCount} orders</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Delivered Orders
              </CardTitle>
              <PackageCheck className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count.deliveredOrdersCount} orders</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Canceled Orders
              </CardTitle>
              <CircleX className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count.canceledOrdersCount} orders</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
                </CardTitle>
              <ShoppingBasket className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count.totalOrdersCount} orders</div>
            </CardContent>
          </Card>


          <Card className="col-span-full" x-chunk="dashboard-01-chunk-4">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Total: {orders ? orders.length : 0}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
        <ScrollArea className="w-full h-72">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden sm:table-cell">Order Id</TableHead>
                  <TableHead className="hidden sm:table-cell">Order Status</TableHead>
                  <TableHead>Order Type</TableHead>
                  <TableHead>Order Creation Date</TableHead>
                  <TableHead>Is Order Printed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders !== null && (
                orders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell className="hidden sm:table-cell">{order.id}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className={`${{
                               'PROCESSING': 'bg-blue-700',
                               'DELIVERED': 'bg-green-700',
                               'REFUSED': 'bg-red-700',
                               'CANCELED': 'bg-red-700'
                             }[order.status]} hover:bg-gray-700`}>
                               {order.status}
                         </Badge>
                         </TableCell>
                    <TableCell>
                      <Badge className={`${order.type === 'CONFIRMED' ? 'bg-green-700' : order.type === 'NOT_CONFIRMED' ? 'bg-orange-400' : order.type === 'CANCELED' ? 'bg-red-700' : 'bg-gray-700'} hover:bg-gray-700`}>
                             {order.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}</TableCell>
                    <TableCell>
                      <Badge className={`${order.printed ? 'bg-green-700' :  'bg-red-700'} hover:bg-gray-700`}>
                            {order.printed ? "Is Printed" : "Not Printed"}
                      </Badge>
                    </TableCell>
                    </TableRow>
                ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>  

      
    </section>



    <section className={cn(' grid grid-cols-1 p-11 gap-4 transition-all lg:grid-cols-4')}>
</section>

  </div>

  </>
  );
}

export default Page;