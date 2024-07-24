/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client'
import NextImage from 'next/image'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
    OctagonAlert,
    Package2,
    Palette,
    Search,
    Shirt,
    Trash2,
    Users,
    X,
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
  import React, { ChangeEvent, useEffect, useState } from "react"
  import OrderedDesigns from "@/components/sellerDashboard/OrderedDesigns"
  import OrderedProducts from "@/components/sellerDashboard/OrderedProducts"
  import { db } from "@/db"
  import UsersTable from "@/components/adminDashboard/UsersTable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { OrderItem, Product, SellerDesign, Store, User } from "@prisma/client"
import { tree } from "next/dist/build/templates/app-page"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { acceptDesign, deleteStoreById, refuseDesign } from "./actions"
import { Input } from '@/components/ui/input'
import LoadingState from '@/components/LoadingState'
import DesignView from './DesignView'
import ProductView from './ProductView'
  

interface ExtraStore extends Store {
    user : User
    products : Product[]
    designs  : SellerDesign[]
}
  
  
  
interface StoresViewProps {
    stores: ExtraStore[];
  }
  
  const StoresView = ({ stores }: StoresViewProps ) => { 
    const router = useRouter();
    const { toast } = useToast()
    const [isDeleteOpen, setisDeleteOpen] = useState(false);
    const [ storeId , setStoreId] = useState("")


    const handleDelete = async () =>{
        try {
            await deleteStoreById(storeId)
            setisDeleteOpen(false)
            toast({
                title: 'Store Was Successfully Deleted',
                variant: 'default',
              });
            router.refresh()
        } catch (error) {
            setisDeleteOpen(false)
            console.log(error)
            toast({
                title: 'Store Was Not Deleted',
                variant: 'destructive',
              });
        }


    }



    const calculateTotalIncome = () => {
      return stores.reduce((total, store) => total + store.revenue, 0).toFixed(2);
  }


  const [selectedStore, setSelectedStore] = useState<ExtraStore | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleRowClick = (store: ExtraStore, index: number) => {
    if (selectedIndex === index) {
      setSelectedStore(null);
      setSelectedIndex(null);
    } else {
      setSelectedStore(store);
      setSelectedIndex(index);
    }
  };







        // search query for products


    const [open, setOpen] = useState<boolean>(false);

    



  // Search query for stores
  const [storeSearchQuery, setStoreSearchQuery] = useState("");
  const handleStoreSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStoreSearchQuery(event.target.value);
  };

  // Filtered stores based on search query
  const filteredStores = stores.filter(
    (store) =>
      store.id.toLowerCase().includes(storeSearchQuery.toLowerCase()) ||
      store.storeName.toLowerCase().includes(storeSearchQuery.toLowerCase())
  );


    return (
      <>


                          {/* The AlertDialog delete store component  */}
                          <AlertDialog open={isDeleteOpen}>
               <AlertDialogTrigger asChild>
                         </AlertDialogTrigger>
                            <AlertDialogContent>
                                   <AlertDialogHeader className="flex flex-col items-center">
                                       <div className="text-red-500 mb-2">
                                           <OctagonAlert className=''/>
                                               </div>
                                              <AlertDialogTitle className="text-xl font-bold text-center">
                                                 Are you absolutely sure you want to delete this store ?
                                               </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                   This action cannot be undone. 
                                                   It will permanently remove the store from our MarketPlace.<br/><br/>
                                                    </AlertDialogDescription>
                                                   </AlertDialogHeader>
                                                  <AlertDialogFooter>
                                              <AlertDialogCancel onClick={()=>setisDeleteOpen(false)}>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDelete()} 
                                     className='bg-red-500 hover:bg-red-500' >Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                     </AlertDialog> 
  
  <p className="text-sm text-gray-700 mb-2">AdminDashboard/Stores</p>
  <h1 className="text-2xl font-semibold">Manage Stores</h1>
 
  
  
     
  
  
        <div className="flex mt-4 flex-col gap-5 w-full">
  
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
  
  
  
      <Card className="col-span-full" x-chunk="dashboard-01-chunk-4">
        <CardHeader className="flex flex-row items-center bg-muted/50">
          <div className="grid gap-2">
            <CardTitle>Stores</CardTitle>
            <CardDescription>Total: {stores.length}</CardDescription>
            <CardDescription>Total Income: {calculateTotalIncome()} TND</CardDescription>
          </div>
        </CardHeader>
        <CardDescription className='flex items-center justify-center'>
        <div className='mt-2 flex flex-wrap items-center justify-center'>
        <Input
              type="search"
              className='w-full sm:w-1/2 lg:w-[40%] mb-2 sm:mb-0'
              placeholder="Enter the Store Id, name to make a search..."
              value={storeSearchQuery}
              onChange={handleStoreSearchChange}
            /> 
          </div>
        </CardDescription>

        <CardContent>
        <ScrollArea className="w-full mt-8 h-72">
        <Table>
  <TableHeader>
    <TableRow>
      {/* Store Id column */}
      <TableHead className="hidden sm:table-cell">Store Id</TableHead>

      {/* Store Name column */}
      <TableHead>Store Name</TableHead>

      {/* User Name column */}
      <TableHead className="hidden md:table-cell">User Name</TableHead>

      {/* User Phone Number column */}
      <TableHead className="hidden lg:table-cell">User Phone Number</TableHead>

      {/* User Email column */}
      <TableHead className="hidden lg:table-cell">User Email</TableHead>

      {/* Total Products column */}
      <TableHead className="hidden xl:table-cell">Total Products</TableHead>

      {/* Total Designs column */}
      <TableHead className="hidden xl:table-cell">Total Designs</TableHead>

      {/* Total Rejected Elements column */}
      <TableHead>Total Rejected Elements</TableHead>

      {/* Store Profit column */}
      <TableHead className="hidden md:table-cell">Store Profit</TableHead>

      {/* Total Sales column */}
      <TableHead className="hidden lg:table-cell">Total Sales</TableHead>

      {/* Action column */}
      <TableHead>Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {filteredStores.map((store, index) => (
      <TableRow
        key={store.id}
        className={`cursor-pointer ${selectedIndex === index ? 'border-2 border-blue-500' : ''}`}
        onClick={() => handleRowClick(store, index)}
      >
        {/* Store Id cell */}
        <TableCell className="hidden sm:table-cell">{store.id}</TableCell>

        {/* Store Name cell */}
        <TableCell className="text-left">{store.storeName}</TableCell>

        {/* User Name cell */}
        <TableCell className="hidden md:table-cell text-left">{store.user.userType === "SELLER" ? store.user.username : "no user"}</TableCell>

        {/* User Phone Number cell */}
        <TableCell className="hidden lg:table-cell text-left">{store.userPhoneNumber ?? '99999999'}</TableCell>

        {/* User Email cell */}
        <TableCell className="hidden lg:table-cell text-left">{store.user.userType === "SELLER" ? store.user.email : "no user"}</TableCell>

        {/* Total Products cell */}
        <TableCell className="hidden xl:table-cell text-left">{store.products.length}</TableCell>

        {/* Total Designs cell */}
        <TableCell className="hidden xl:table-cell text-left">{store.designs.length}</TableCell>

        {/* Total Rejected Elements cell */}
        <TableCell className="text-left">{store.totalRejectedElements}</TableCell>

        {/* Store Profit cell */}
        <TableCell className="hidden md:table-cell text-left">{store.revenue.toFixed(2)} TND</TableCell>

        {/* Total Sales cell */}
        <TableCell className="hidden lg:table-cell text-left">{store.totalSales}</TableCell>

        {/* Action cell */}
        <TableCell className="text-right">
          <Trash2
            size={20}
            className="cursor-pointer hover:text-red-500"
            onClick={() => {
              setisDeleteOpen(true);
              setStoreId(store.id);
            }}
          />
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

          </ScrollArea>
        </CardContent>
      </Card> 



      <ProductView selectedStore={selectedStore!}/>


      <DesignView selectedStore={selectedStore!} />


      </section>
  
  
  
      <section className={cn(' grid grid-cols-1 p-11 gap-4 transition-all lg:grid-cols-4')}>
  </section>
  
    </div>
  
    <LoadingState isOpen={open} />


    </>
    );
  }
  
  export default StoresView;