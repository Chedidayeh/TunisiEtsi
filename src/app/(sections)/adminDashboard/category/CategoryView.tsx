'use client'

import Image from "next/image"
import { MoreHorizontal, OctagonAlert } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Category, Color , Size } from "@prisma/client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { deleteCategoryAndAssociated } from "./actions"

interface CatWithInfos extends Category {
    colors : Color[]
    sizes : Size[]
}

interface CatProps {
    categories : CatWithInfos[]
}

const CategoryView: React.FC<CatProps> = ({ categories }) => {
  const router = useRouter();
  const { toast } = useToast()
  const [isDeleteOpen, setisDeleteOpen] = useState(false);
  const [ catId , setCatId] = useState("")
  
  const deleteCat = async () => {

    try {

      const res = await deleteCategoryAndAssociated(catId)

      if(res){
        toast({
          title: "Category was deleted",
          variant: "default",
        });
        setisDeleteOpen(false)
  
      }
      else {
        toast({
          title: "Category was not deleted",
          variant: "destructive",
        });
        setisDeleteOpen(false)

  
      }
      
    } catch (error) {
      console.log(error)
      toast({
          title: "deleting failed",
          variant: "destructive",
        }); 
        setisDeleteOpen(false)
    }

  }
  return (
    <>

                            {/* The AlertDialog delete design component  */}
                            <AlertDialog open={isDeleteOpen}>
               <AlertDialogTrigger asChild>
                         </AlertDialogTrigger>
                            <AlertDialogContent>
                                   <AlertDialogHeader className="flex flex-col items-center">
                                       <div className="text-red-500 mb-2">
                                           <OctagonAlert className=''/>
                                               </div>
                                              <AlertDialogTitle className="text-xl font-bold text-center">
                                                 Are you absolutely sure you want to delete this category ?
                                               </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                   This action cannot be undone. 
                                                   It will permanently remove the category from our MarketPlace.<br/><br/>
                                                    </AlertDialogDescription>
                                                   </AlertDialogHeader>
                                                  <AlertDialogFooter>
                                              <AlertDialogCancel onClick={()=>setisDeleteOpen(false)}>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => deleteCat()} 
                                     className='bg-red-500 hover:bg-red-500' >Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                     </AlertDialog>

<p className="text-sm text-gray-700 mb-2">AdminDashboard/Category</p>
<h1 className="text-2xl font-semibold">Manage Categories</h1>

<Link href="/adminDashboard/category/addCategory" className="mt-4"><Button variant={"link"}>Add Category</Button></Link>


    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>
          Total : {}
        </CardDescription>
      </CardHeader>
      <CardContent>
      <Table>
  <TableHeader>
    <TableRow>
      {/* Category Id column */}
      <TableHead className="hidden sm:table-cell">Category Id</TableHead>

      {/* Category Label column */}
      <TableHead>Category Label</TableHead>

      {/* Category Price column */}
      <TableHead>Category Price</TableHead>

      {/* Category Colors column */}
      <TableHead className="hidden md:table-cell">Category Colors</TableHead>

      {/* Category Sizes column */}
      <TableHead className="hidden lg:table-cell">Category Sizes</TableHead>

      {/* Action column */}
      <TableHead>Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {categories.map((category) => (
      <TableRow key={category.id}>
        {/* Category Id cell */}
        <TableCell className="hidden sm:table-cell">{category.id}</TableCell>

        {/* Category Label cell */}
        <TableCell>{category.label}</TableCell>

        {/* Category Price cell */}
        <TableCell>{category.price.toFixed(2)} TND</TableCell>

        {/* Category Colors cell */}
        <TableCell className="hidden md:table-cell">
          {category.colors.map((color) => (
            <Badge key={color.id} className="mr-1">
              {color.label}
            </Badge>
          ))}
        </TableCell>

        {/* Category Sizes cell */}
        <TableCell className="hidden lg:table-cell">
          {category.sizes.map((size) => (
            <Badge key={size.id} className="mr-1">
              {size.label}
            </Badge>
          ))}
        </TableCell>

        {/* Action cell */}
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-haspopup="true"
                size="icon"
                variant="ghost"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => {
                setCatId(category.id);
                setisDeleteOpen(true);
              }}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

      </CardContent>
      <CardFooter>

      </CardFooter>
    </Card>


    </>
  )
}

export default CategoryView