"use client"
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { ReactNode } from 'react'
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
  Layers3,
  LayoutDashboard,
  LayoutGrid,
  Loader2,
  Palette,
  PenTool,
  Settings,
  Shirt,
  ShoppingBag,
  ShoppingBasket,
  Sparkles,
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
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard"
              })}
              onClick={()=>router.push("/adminDashboard")}
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
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/stores"
              })}
              onClick={()=>router.push("/adminDashboard/stores")}
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Store className="h-3 w-3" />
              </div>
              Manage Stores
            </Button>
            </div>

            <div className="mb-2">
            <Button
            variant="ghost"
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/products"
              })}
              onClick={()=>router.push("/adminDashboard/products")}
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Shirt className="h-3 w-3" />
              </div>
              Manage Products
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/orders"
              })}              
              onClick={()=>router.push("/adminDashboard/orders")}
              variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <ShoppingBasket  className="h-3 w-3" />
              </div>
              Manage Orders
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/designs"
              })}              
              onClick={()=>router.push("/adminDashboard/designs")}
              variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Palette className="h-3 w-3" />
              </div>
              Manage Designs
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/stock"
              })}              
              onClick={()=>router.push("/adminDashboard/stock")}
              variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Layers3 className="h-3 w-3" />
              </div>
              Manage Stock
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/category"
              })}              
              onClick={()=>router.push("/adminDashboard/category")}
              variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <LayoutGrid className="h-3 w-3" />
              </div>
              Manage Categories
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/bacProducts"
              })}              
              onClick={()=>router.push("/adminDashboard/bacProducts")}
              variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Sparkles className="h-3 w-3" />
              </div>
              Bac Products
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/bacProducts"
              })}              
              onClick={()=>router.push("/adminDashboard/fripProducts")}
              variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Sparkles className="h-3 w-3" />
              </div>
              Frip Products
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/notifications"
              })}              
              onClick={()=>router.push("/adminDashboard/notifications")}
              variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Bell className="h-3 w-3" />
              </div>
              Send Notification
            </Button>
            </div>

            <Separator className="my-3" />

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/"
              })}              
              onClick={()=>router.push("/adminDashboard")}            variant="ghost"

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
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/"
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



    <div className="lg:block hidden border-r h-full w-full">
      <div className="flex h-full max-h-screen flex-col gap-2 ">
        <div className="flex-1 text-left overflow-auto py-2 ">
          <nav className="grid items-start px-3 py-2 text-sm font-medium">
          <div className="mb-2">
            <Button
              variant="ghost"
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard"
              })}
              onClick={()=>router.push("/adminDashboard")}
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
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/stores"
              })}
              onClick={()=>router.push("/adminDashboard/stores")}
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Store className="h-3 w-3" />
              </div>
              Manage Stores
            </Button>
            </div>

            <div className="mb-2">
            <Button
            variant="ghost"
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/products"
              })}
              onClick={()=>router.push("/adminDashboard/products")}
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Shirt className="h-3 w-3" />
              </div>
              Manage Products
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/orders"
              })}              
              onClick={()=>router.push("/adminDashboard/orders")}
              variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <ShoppingBasket  className="h-3 w-3" />
              </div>
              Manage Orders
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/designs"
              })}              
              onClick={()=>router.push("/adminDashboard/designs")}
              variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Palette className="h-3 w-3" />
              </div>
              Manage Designs
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/stock"
              })}              
              onClick={()=>router.push("/adminDashboard/stock")}
              variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Layers3 className="h-3 w-3" />
              </div>
              Manage Stock
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/category"
              })}              
              onClick={()=>router.push("/adminDashboard/category")}
              variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <LayoutGrid className="h-3 w-3" />
              </div>
              Manage Categories
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/bacProducts"
              })}              
              onClick={()=>router.push("/adminDashboard/bacProducts")}
              variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Sparkles className="h-3 w-3" />
              </div>
              Bac Products
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/bacProducts"
              })}              
              onClick={()=>router.push("/adminDashboard/fripProducts")}
              variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Sparkles className="h-3 w-3" />
              </div>
              Frip Products
            </Button>
            </div>

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/notifications"
              })}              
              onClick={()=>router.push("/adminDashboard/notifications")}
              variant="ghost"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Bell className="h-3 w-3" />
              </div>
              Send Notification
            </Button>
            </div>


            <Separator className="my-3" />

            <div className="mb-2">
            <Button
              className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-blue-600 dark:text-zinc-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/"
              })}              
              onClick={()=>router.push("/adminDashboard")}            variant="ghost"

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
                "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-blue-600  transition-all hover:text-blue-600 dark:bg-blue-600 dark:text-blue-600 dark:hover:text-blue-600": pathname === "/adminDashboard/"
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
