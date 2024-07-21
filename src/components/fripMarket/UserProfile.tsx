
import { CircleUserRound, ShoppingBasket, UserRoundCheck, UserRoundCog, UserRoundPlus, UserRoundX } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
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
import { User } from "@prisma/client"
import Link from "next/link"




const UserProfile = ({ user } : {user : User})=>{



    return (
        <>
                
                <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {user ? (
          <UserRoundCheck className="text-green-600" />
          ):(
          <UserRoundX className="text-red-600" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-56 mt-2 mr-2">
        <DropdownMenuLabel>
          {user ? (
          <p>My Account</p>
          ):(
            <p>No Account</p>
          )}
          </DropdownMenuLabel>
        {user ? (
          <>
            <p className="text-xs ml-2 text-gray-500">{user.email}</p>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
            <DropdownMenuItem>
            <Link href='/fripMarket/userOrders' className="flex justify-between items-center w-full">
                <span>Your Orders</span>
                <ShoppingBasket size={16} />
              </Link>
            </DropdownMenuItem>            
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href='/api/auth/logout' className="flex justify-between items-center w-full">
                <span>Sign out</span>
                <UserRoundX size={15} />
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>        
          <DropdownMenuSeparator />
            <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link 
              href='/auth/sign-up'
              className="flex justify-between items-center w-full">
                <span>Sign Up</span>
                <UserRoundPlus size={15} />
              </Link>
            </DropdownMenuItem>              
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link 
              href='/auth/sign-in'
              className="flex justify-between items-center w-full">
                <span>Sign In</span>
                <UserRoundCheck size={15} />
              </Link>
            </DropdownMenuItem>            
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>

        </>






    )

}

export default UserProfile