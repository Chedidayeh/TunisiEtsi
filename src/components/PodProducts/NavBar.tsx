import Link from 'next/link'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowRight, CircleDollarSign, GalleryHorizontalEnd, Heart, Home, Shirt, ShoppingCart, UserRoundCog } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { getAllCategories, getAllPodProductsCategories, getUser } from '@/actions/actions'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import MaxWidthWrapper from '../MaxWidthWrapper'
import UserProfile from './UserProfile'

const Navbar = async () => {

  const categories = await getAllPodProductsCategories()
  const user = await getUser()
  const isAdmin = user?.userType === "ADMIN"
  const isUser = user?.userType === "USER"
  const isSeller = user?.userType === "SELLER"
  const isFactoryAdmin = user?.userType === "FACTORY"

  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between'>
          {/* Logo */}
          <div className='ml-4 flex lg:ml-0'>
            <Link href='/' className='flex z-40 font-semibold'>
            Tunisi<span className='text-blue-600'>Etsi</span>
            </Link>
          </div>

          {/* Hamburger Icon for Small Devices */}
          <Dialog>
            <SheetTrigger className="md:hidden">
              <HamburgerMenuIcon />
            </SheetTrigger>
            <SheetContent side="left" className='w-[50%]'>
              {/* Middle Section for small devices */}
              <div className='md:hidden flex flex-col mt-16 space-y-2'>
                <DialogClose>
                <Link href="/" className={buttonVariants({
                  size: 'sm',
                  variant: 'ghost',
                  className: "hover:text-blue-500"
                })}>
                  <Home size={15} className='mr-1' />
                  Home
                </Link>
                </DialogClose>

                <DialogClose>
                <Link href="/PodProducts/ProductsView" className={buttonVariants({
                  size: 'sm',
                  variant: 'ghost',
                  className: "hover:text-orange-500"
                })}>
                  <GalleryHorizontalEnd size={15} className='mr-1' />
                  All Products
                </Link>
                </DialogClose>

                <DialogClose>
                <Link href="/PodProducts/BestSelling" className={buttonVariants({
              size: 'sm',
              variant: 'ghost',
              className: "hover:text-green-500"
            })}>
              <CircleDollarSign size={15} className='mr-1' />
              Best Selling
            </Link>
                </DialogClose>

                <DialogClose>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="hover:text-purple-500">
                    <Shirt size={15} className="mr-1" />
                    Categories
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 mt-3 flex flex-col">
                {categories.length > 0 ? (
                    categories.map((category) => (
                      <Link key={category} href={`/PodProducts/category/${category}`} className={buttonVariants({
                        size: 'sm',
                        variant: 'ghost',
                        })}>{category}
                        </Link>
                    ))
                  ) : (
                    <DropdownMenuItem disabled>No data for now!</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

                </DialogClose>

                <DialogClose>
                <Link href="/PodProducts/favList" className={buttonVariants({
              size: 'sm',
              variant: 'ghost',
              className: "hover:text-red-500"
            })}>
              <Heart size={15} className='mr-1' />
              Fav List
            </Link>
                </DialogClose>

                <DialogClose>
                <Link href="/PodProducts/cart" className={buttonVariants({
              size: 'sm',
              variant: 'ghost',
              className: "hover:text-blue-500"
            })}>
              <ShoppingCart size={15} className='mr-1' />
              Cart
            </Link>
                </DialogClose>

                <DialogClose>
                {isSeller && (
                  <Link
                    href='/sellerDashboard'
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'outline',
                    })}>
                    Seller Dashboard ✨
                  </Link>
                )}
                {isUser && (
                  <Link
                    href='/PodProducts/create-seller-profile'
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'outline',
                    })}>
                    Become a Seller ✨
                  </Link>
                )}
                </DialogClose>

              </div>
            </SheetContent>
          </Dialog>


          {/* Middle Section */}
          <div className='hidden md:flex h-full left-0 items-center space-x-4'>

            <Link href="/" className={buttonVariants({
              size: 'sm',
              variant: 'ghost',
              className: "hover:text-blue-500"
            })}>
              <Home size={15} className='mr-1' />
              Home
            </Link>

            <Link href="/PodProducts/ProductsView" className={buttonVariants({
              size: 'sm',
              variant: 'ghost',
              className: "hover:text-orange-500"
            })}>
              <GalleryHorizontalEnd size={15} className='mr-1' />
              All Products
            </Link>

            <Link href="/PodProducts/BestSelling" className={buttonVariants({
              size: 'sm',
              variant: 'ghost',
              className: "hover:text-green-500"
            })}>
              <CircleDollarSign size={15} className='mr-1' />
              Best Selling
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" className="hover:text-purple-500">
                  <Shirt size={15} className="mr-1" />
                  Categories
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 mt-3 flex flex-col">
              {categories.length > 0 ? (
                    categories.map((category) => (
                      <Link key={category} href={`/PodProducts/category/${category}`} className={buttonVariants({
                        size: 'sm',
                        variant: 'ghost',
                        })}>{category}
                        </Link>

                    ))
                  ) : (
                    <DropdownMenuItem disabled>No data for now!</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
            </DropdownMenu>


            <div className='h-8 w-px bg-zinc-200 hidden sm:block' />

            <Link href="/PodProducts/favList" className={buttonVariants({
              size: 'sm',
              variant: 'ghost',
              className: "hover:text-red-500"
            })}>
              <Heart size={15} className='mr-1' />
              Fav List
            </Link>

            <Link href="/PodProducts/cart" className={buttonVariants({
              size: 'sm',
              variant: 'ghost',
              className: "hover:text-blue-500"
            })}>
              <ShoppingCart size={15} className='mr-1' />
              Cart
            </Link>
          </div>

          {/* Right Section */}
          <div className='hidden md:flex items-center space-x-4'>
            {user && (isSeller || isUser ) && (
              <>
                <div className='h-8 w-px bg-zinc-200 hidden sm:block' />

                {isSeller && (
                  <Link
                    href='/sellerDashboard'
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'outline',
                    })}>
                    Seller Dashboard ✨
                  </Link>
                )}

                {isUser && (
                  <Link
                    href='/PodProducts/create-seller-profile'
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'outline',
                    })}>
                    Become a Seller ✨
                  </Link>
                )}

                <div className='h-8 w-px bg-zinc-200 hidden sm:block' />
              </>
            )}

            {/* User Profile */}
            <UserProfile user={user!} />
            

            {/* create product section */}
            <div className='h-8 w-px bg-zinc-200 hidden sm:block' />
            <Link
              href='/PodProducts/create-client-product/select-category'
              className={buttonVariants({
                size: 'sm',
                className: 'hidden sm:flex items-center gap-1',
              })}>
              Create your product
              <ArrowRight className='ml-1.5 h-5 w-5' />
            </Link>
          </div>

          {/* User Profile for small devices */}
          <div className='md:hidden flex items-center'>
            <UserProfile user={user!} />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
