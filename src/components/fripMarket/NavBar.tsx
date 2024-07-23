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
import { getAllCategories, getAllFripCategories, getUser } from '@/actions/actions'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import MaxWidthWrapper from '../MaxWidthWrapper'
import UserProfile from './UserProfile'

const Navbar = async () => {

  const categories = await getAllFripCategories()
  const user = await getUser()
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
            <SheetContent side="left" className='w-[40%]'>
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
                <Link href="/fripMarket/ProductView" className={buttonVariants({
              size: 'sm',
              variant: 'ghost',
              className: "hover:text-green-500"
            })}>
              <GalleryHorizontalEnd size={15} className='mr-1' />
              All Products
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
                    <Link
                      key={category}
                      href={`/fripMarket/category/${category}`}
                      className={buttonVariants({
                        size: 'sm',
                        variant: 'ghost',
                      })}
                    >
                      {category}
                    </Link>
                  ))
                ) : (
                  <DropdownMenuItem disabled>No data for now!</DropdownMenuItem>
                )}
              </DropdownMenuContent>


                </DropdownMenu>

                </DialogClose>

                <DialogClose>
                <Link href="/fripMarket/favList" className={buttonVariants({
              size: 'sm',
              variant: 'ghost',
              className: "hover:text-red-500"
            })}>
              <Heart size={15} className='mr-1' />
              Fav List
            </Link>
                </DialogClose>

                <DialogClose>
                <Link href="/fripMarket/cart" className={buttonVariants({
              size: 'sm',
              variant: 'ghost',
              className: "hover:text-blue-500"
            })}>
              <ShoppingCart size={15} className='mr-1' />
              Cart
            </Link>
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

            <Link href="/fripMarket/ProductView" className={buttonVariants({
              size: 'sm',
              variant: 'ghost',
              className: "hover:text-green-500"
            })}>
              <GalleryHorizontalEnd size={15} className='mr-1' />
              All Products
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
                <Link
                  key={category}
                  href={`/fripMarket/category/${category}`}
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  {category}
                </Link>
              ))
            ) : (
              <DropdownMenuItem disabled>No data for now!</DropdownMenuItem>
            )}
          </DropdownMenuContent>

        </DropdownMenu>


            <div className='h-8 w-px bg-zinc-200 hidden sm:block' />

            <Link href="/fripMarket/favList" className={buttonVariants({
              size: 'sm',
              variant: 'ghost',
              className: "hover:text-red-500"
            })}>
              <Heart size={15} className='mr-1' />
              Fav List
            </Link>

            <Link href="/fripMarket/cart" className={buttonVariants({
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
            <UserProfile user={user!} />
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
