"use client"
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { ReactNode } from 'react'
import { Profile } from './Profile'
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
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import clsx from 'clsx'
import {
  BadgeDollarSign,
  Banknote,
  Bell,
  BookOpenCheck,
  FileCode,
  Folder,
  Home,
  HomeIcon,
  LayoutDashboard,
  Loader2,
  Palette,
  PenTool,
  Settings,
  Shirt,
  ShoppingBag,
  ShoppingBasket,
  Store,
  TrendingUp,
  TriangleAlert
} from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef } from "react"
import { FaTasks } from 'react-icons/fa'
import { Button } from "../ui/button"
import router, { useRouter } from "next/navigation"

export default function DashboardSideBar() {
  const pathname = usePathname();
  const router = useRouter()
  return (
    <>

        <Dialog>
          <SheetTrigger className="min-[1024px]:hidden ml-10 p-2 transition">
            <HamburgerMenuIcon />
            <Link href="/dashboard">
              <span className="sr-only">Home</span>
            </Link>
          </SheetTrigger>
          <SheetContent side="left" className='md:w-[25%]'>
            <SheetHeader>
              <Link href="/">
                <SheetTitle className="flex items-center gap-2 font-semibold">TuniPod</SheetTitle>
              </Link>
            </SheetHeader>
            <nav className="grid items-start px-3 py-6 text-sm font-medium">
          <div className="mb-2">
            <Button
              variant="ghost"
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard"
              })}
              onClick={()=>router.push("/sellerDashboard")}
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <LayoutDashboard className="h-3 w-3" />
              </div>
              Dashboard
            </Button>
            </div>

            <div className="mb-2">
            <Button
            variant="ghost"
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard/products"
              })}
              onClick={()=>router.push("/sellerDashboard/products")}
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Shirt className="h-3 w-3" />
              </div>
              Products
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard/orders"
              })}              
              onClick={()=>router.push("/sellerDashboard/orders")}
              variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <ShoppingBasket  className="h-3 w-3" />
              </div>
              Orders
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard/designs"
              })}              
              onClick={()=>router.push("/sellerDashboard/designs")}
              variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Palette className="h-3 w-3" />
              </div>
              Designs
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard/"
              })}             
               onClick={()=>router.push("/sellerDashboard")}
               variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <BadgeDollarSign className="h-3 w-3" />
              </div>
              Wallet
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard/"
              })}              
              onClick={()=>router.push("/sellerDashboard")}            variant="ghost"

            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <TrendingUp className="h-3 w-3" />
              </div>
              Statistics
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard/notifications"
              })}              
              onClick={()=>router.push("/sellerDashboard/notifications")}
              variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Bell className="h-3 w-3" />
              </div>
              Notifications
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard/guide"
              })}              
              onClick={()=>router.push("/sellerDashboard/guide")}            variant="ghost"

            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <BookOpenCheck className="h-3 w-3" />
              </div>
              Guide
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard/"
              })}              
              onClick={()=>router.push("/sellerDashboard")}            variant="ghost"

            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <TriangleAlert className="h-3 w-3" />
              </div>
              Stock
            </Button>
            </div>

            <Separator className="my-3" />

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard/settings"
              })}              
              onClick={()=>router.push("/sellerDashboard/settings")}            variant="ghost"

            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Settings className="h-3 w-3" />
              </div>
              Settings
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard/"
              })}              
              onClick={()=>router.push("/PodProducts")}            variant="ghost"


            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Home className="h-3 w-3" />
              </div>
              MarketPlace
            </Button>
            </div>
          </nav>
          </SheetContent>
        </Dialog>


    <div className="lg:block hidden border-r h-full w-50">
      <div className="flex h-full max-h-screen flex-col gap-2 ">
        <div className="flex-1 text-left overflow-auto py-2 ">
          <nav className="grid items-start px-3 py-2 text-sm font-medium">
          <div className="mb-2">
            <Button
              variant="ghost"
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard"
              })}
              onClick={()=>router.push("/sellerDashboard")}
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <LayoutDashboard className="h-3 w-3" />
              </div>
              Dashboard
            </Button>
            </div>

            <div className="mb-2">
            <Button
            variant="ghost"
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard/products"
              })}
              onClick={()=>router.push("/sellerDashboard/products")}
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Shirt className="h-3 w-3" />
              </div>
              Products
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard/orders"
              })}              
              onClick={()=>router.push("/sellerDashboard/orders")}
              variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <ShoppingBasket  className="h-3 w-3" />
              </div>
              Orders
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard/designs"
              })}              
              onClick={()=>router.push("/sellerDashboard/designs")}
              variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Palette className="h-3 w-3" />
              </div>
              Designs
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard/"
              })}             
               onClick={()=>router.push("/sellerDashboard")}
               variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <BadgeDollarSign className="h-3 w-3" />
              </div>
              Wallet
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard/"
              })}              
              onClick={()=>router.push("/sellerDashboard")}            variant="ghost"

            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <TrendingUp className="h-3 w-3" />
              </div>
              Statistics
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard/notifications"
              })}              
              onClick={()=>router.push("/sellerDashboard/notifications")}
              variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Bell className="h-3 w-3" />
              </div>
              Notifications
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard/guide"
              })}              
              onClick={()=>router.push("/sellerDashboard/guide")}            
              variant="ghost"

            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <BookOpenCheck className="h-3 w-3" />
              </div>
              Guide
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard/"
              })}              
              onClick={()=>router.push("/sellerDashboard")}            variant="ghost"

            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <TriangleAlert className="h-3 w-3" />
              </div>
              Stock
            </Button>
            </div>

            <Separator className="my-3" />

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard/settings"
              })}              
              onClick={()=>router.push("/sellerDashboard/settings")}            variant="ghost"

            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Settings className="h-3 w-3" />
              </div>
              Settings
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/sellerDashboard/"
              })}              
              onClick={()=>router.push("/PodProducts")}            variant="ghost"


            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Home className="h-3 w-3" />
              </div>
              MarketPlace
            </Button>
            </div>
          </nav>
        </div>
      </div>
    </div>
    </>
  )
}
