/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client'
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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
    CircleUser,
    CloudDownload,
    CreditCard,
    DollarSign,
    Eye,
    Heart,
    Loader2,
    Menu,
    OctagonAlert,
    Package2,
    Palette,
    Search,
    Shirt,
    Trash2,
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
  import React, { ChangeEvent, useEffect, useRef, useState } from "react"
  import OrderedDesigns from "@/components/sellerDashboard/OrderedDesigns"
  import OrderedProducts from "@/components/sellerDashboard/OrderedProducts"
  import { db } from "@/db"
  import UsersTable from "@/components/adminDashboard/UsersTable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ClientDesign, FripOrder, FripOrderItem, Order, OrderItem, Product, SellerDesign, Store, User } from "@prisma/client"
import { tree } from "next/dist/build/templates/app-page"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { TooltipProvider } from "@/components/ui/tooltip"
import { deleteOrderById } from "./actions"
  
  



interface ExtraOrders extends FripOrder {
    orderItems : FripOrderItem[]
    user : User
}
  
  
interface OrderViewProps {
    orders: ExtraOrders[]
  }
  
  const OrderView = ({ orders }: OrderViewProps ) => { 
    const router = useRouter();
    const { toast } = useToast()


    const [searchQuery, setSearchQuery] = useState('');
    const [filterCriteria, setFilterCriteria] = useState('');
    const [filteredOrders, setFilteredOrders] = useState(orders);
  
    useEffect(() => {
      let updatedOrders = [...orders];
  
      if (searchQuery) {
        const lowercasedQuery = searchQuery.toLowerCase();
        updatedOrders = updatedOrders.filter(order =>
          order.id.toLowerCase().includes(lowercasedQuery) ||
          (order.clientName && order.clientName.toLowerCase().includes(lowercasedQuery)) ||
          order.phoneNumber.includes(lowercasedQuery)
        );
      }
  
      if (filterCriteria) {
        updatedOrders = updatedOrders.filter(order => {
          if (filterCriteria === 'CONFIRMED') {
            return order.type === 'CONFIRMED';
          } else if (filterCriteria === 'NOT_CONFIRMED') {
            return order.type === 'NOT_CONFIRMED';
          } else if (filterCriteria === 'CANCELED') {
            return order.type === 'CANCELED';
          } else if (filterCriteria === 'DELIVERED') {
            return order.status === 'DELIVERED';
          } else if (filterCriteria === 'Paid') {
            return order.isPaid === true;
          } else if (filterCriteria === 'NOT_Paid') {
            return order.isPaid === false;
          }
          return true;
        });
      }
  
      setFilteredOrders(updatedOrders);
    }, [searchQuery, filterCriteria, orders]);
  
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    };
  
    const handleFilterChange = (value: string) => {
      setFilterCriteria(value);
    };




    const [isDeleteOpen, setisDeleteOpen] = useState(false);
    const [ orderId , setorderId] = useState("")
    const handleDelete = async () =>{
        try {
            await deleteOrderById(orderId)
            setisDeleteOpen(false)
            toast({
                title: 'order Was Successfully Deleted',
                variant: 'default',
              });
            router.refresh()
        } catch (error) {
            setisDeleteOpen(false)
            console.log(error)
            toast({
                title: 'order Was Not Deleted',
                variant: 'destructive',
              });
        }
    }





    const [selectedOrder, setSelectedOrder] = useState<ExtraOrders | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleRowClick = (order: ExtraOrders, index: number) => {
      if (selectedIndex === index) {
        setSelectedOrder(null);
        setSelectedIndex(null);
      } else {
        setSelectedOrder(order);
        setSelectedIndex(index);
      }
    };



    

  // to trigger the alert dialog
  const alertDialogTriggerRef = useRef<HTMLButtonElement>(null);
  const alertDialogCancelRef = useRef<HTMLButtonElement>(null);

    
                // function will trigger the dialog
                const openDialog = () => {
                  if (alertDialogTriggerRef.current) {
                    alertDialogTriggerRef.current.click();
                  }
                };

                // function will cancel the dialog
                const closeDialog = () => {
                  if (alertDialogCancelRef.current) {
                    alertDialogCancelRef.current.click();
                  }
                };


    return (
      <>


                      {/* The AlertDialog component */}
                      <AlertDialog>
                          <AlertDialogTrigger asChild ref={alertDialogTriggerRef}>
                            <button className="hidden">Hidden Trigger</button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader className="flex flex-col items-center">
                              <div></div>
                              <AlertDialogTitle className="text-2xl text-blue-700 font-bold text-center">
                                Loading the order items!
                              </AlertDialogTitle>
                              <AlertDialogDescription className="flex flex-col items-center">
                                This will take a moment.
                                {/* Replace Loader2 with your loader component */}
                                <Loader2 className="text-blue-700 h-[50%] w-[50%] animate-spin mt-3" />
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogCancel className="hidden" ref={alertDialogCancelRef}>Cancel</AlertDialogCancel>
                          </AlertDialogContent>
                        </AlertDialog>  




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
                                                 Are you absolutely sure you want to delete this order ?
                                               </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                   This action cannot be undone. 
                                                   It will permanently remove the order from our server.<br/><br/>
                                                    </AlertDialogDescription>
                                                   </AlertDialogHeader>
                                                  <AlertDialogFooter>
                                              <AlertDialogCancel onClick={()=>setisDeleteOpen(false)}>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDelete()} 
                                     className='bg-red-500 hover:bg-red-500' >Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                     </AlertDialog> 
  
  
  <p className="text-sm text-gray-700 mb-2">AdminDashboard/FripProducts/orders</p>
           <h1 className="text-2xl font-semibold">Manage Orders</h1>
  
  
  
     
  
  
        <div className="flex mt-4 flex-col gap-5 w-full">
  
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-1 xl:grid-cols-1">
  
  
  
      <Card className="xl:col-span-4" x-chunk="dashboard-01-chunk-4">
        <CardHeader className="flex flex-row items-center bg-muted/50">
          <div className="grid gap-2">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Total: {orders.length}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>


        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-center mt-2">
          <Input
            type="search"
            className="w-full sm:w-[50%] bg-gray-100"
            placeholder="Enter the order Id , client Name , client Phone Number to make a search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />          
          <Select onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px] bg-gray-100">
              <SelectValue placeholder="Filter By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select</SelectLabel>
                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                <SelectItem value="NOT_CONFIRMED">Not Confirmed</SelectItem>
                <SelectItem value="CANCELED">Canceled</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px] bg-gray-100">
              <SelectValue placeholder="Filter By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select</SelectLabel>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="NOT_Paid">Not Paid</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="mt-4 w-full h-96">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden sm:table-cell">Order Id</TableHead>
                  <TableHead className="hidden xl:table-cell">Order Status</TableHead>
                  <TableHead className="hidden xl:table-cell">Order Type</TableHead>
                  <TableHead>Creation Date</TableHead>
                  <TableHead className="hidden xl:table-cell">Is Order Paid</TableHead>
                  <TableHead className="hidden xl:table-cell">Total Items</TableHead>
                  <TableHead className="hidden xl:table-cell">Order Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {filteredOrders.map((order , index) => (
                  <TableRow
                  key={order.id}
                  className={`cursor-pointer ${selectedIndex === index ? 'border-2 border-blue-500' : ''}`}
                  onClick={() => handleRowClick(order, index)}
                >
                    <TableCell className="hidden xl:table-cell">{order.id}</TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <Badge className={`${{
                              'PROCESSING': 'bg-blue-700',
                              'DELIVERED': 'bg-green-700',
                              'REFUSED': 'bg-red-700',
                              'CANCELED': 'bg-red-700'
                            }[order.status]} hover:bg-gray-700`}>
                              {order.status}
                        </Badge>
                      </TableCell>
                    <TableCell className="hidden xl:table-cell">
                    <Badge className={`${order.type === 'CONFIRMED' ? 'bg-green-700' : order.type === 'NOT_CONFIRMED' ? 'bg-orange-400' : order.type === 'CANCELED' ? 'bg-red-700' : 'bg-gray-700'} hover:bg-gray-700`}>
                      {order.type}
                    </Badge>
                      </TableCell>
                      <TableCell>
                       {new Date(order.createdAt).toLocaleString()}
                      </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <Badge className={`${order.isPaid ? 'bg-green-700' :  'bg-red-700'} hover:bg-gray-700`}>
                    {order.isPaid ? "Is Paid" : "Not Paid"}
                      </Badge>
                      </TableCell>
                    <TableCell className="hidden xl:table-cell">{order.orderItems?.length || 0} items</TableCell>
                    <TableCell className="hidden xl:table-cell">{(order.amount).toFixed(2)} TND</TableCell>
                    <TableCell>
                    <TooltipProvider>
                    {/* View Icon */}
                    <div className="flex items-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Eye
                            onClick={() => {
                              openDialog()
                              router.push(`/adminDashboard/fripProducts/orders/orderDetails/${order.id}`)
                            }}
                            className="cursor-pointer hover:text-blue-500"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View</p>
                        </TooltipContent>
                      </Tooltip>

                      {/* Delete Icon */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Trash2
                            onClick={() => {
                              setisDeleteOpen(true);
                              setorderId(order.id)
                            }}
                            className="cursor-pointer hover:text-red-500 ml-2"
                          />
                        </TooltipTrigger>
                        <TooltipContent className="bg-red-500">
                          <p>Delete</p>
                        </TooltipContent>
                      </Tooltip>

                    </div>
                  </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>  


      {selectedOrder && (
      <Card className="col-span-full" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-col md:flex-row items-center">
          <div className="grid gap-2">
             <CardTitle className="font-extrabold">Order Infos :</CardTitle>
             <CardDescription>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mt-2">
                          <div>
                             <p className="font-bold">Order Id:</p>
                             <p className="text-xs">{selectedOrder?.id}</p>
                         </div>
                         <div>
                             <p className="font-bold">Order Status:</p>
                             <p><Badge className={`${{
                               'PROCESSING': 'bg-blue-700',
                               'DELIVERED': 'bg-green-700',
                               'REFUSED': 'bg-red-700',
                               'CANCELED': 'bg-red-700'
                             }[selectedOrder.status]} hover:bg-gray-700`}>
                               {selectedOrder.status}
                         </Badge></p>
                         </div>
                         <div>
                             <p className="font-bold">Order Type:</p>
                             <p><Badge className={`${selectedOrder.type === 'CONFIRMED' ? 'bg-green-700' : selectedOrder.type === 'NOT_CONFIRMED' ? 'bg-orange-400' : selectedOrder.type === 'CANCELED' ? 'bg-red-700' : 'bg-gray-700'} hover:bg-gray-700`}>
                             {selectedOrder.type}
                             </Badge>
                         </p>
                         </div>
                         <div>
                             <p className="font-bold">Is Order Paid:</p>
                             <p><Badge className={`${selectedOrder.isPaid ? 'bg-green-700' :  'bg-red-700'} hover:bg-gray-700`}>
                            {selectedOrder.isPaid ? "Is Paid" : "Not Paid"}
                      </Badge></p>
                         </div>
                         <div>
                             <p className="font-bold">Client Name:</p>
                             <p>{selectedOrder.clientName}</p>
                         </div>
                         <div>
                             <p className="font-bold">Client Email:</p>
                             <p>{selectedOrder.user.email}</p>
                         </div>
                         <div>
                             <p className="font-bold">Client Phone Number:</p>
                             <p>{selectedOrder?.phoneNumber}</p>
                         </div>
                         <div>
                             <p className="font-bold">Shipping Address:</p>
                             <p>{selectedOrder.shippingAddress}</p>
                         </div>
                         <div>
                             <p className="font-bold">order Amount:</p>
                             <p>{selectedOrder.amount} TND</p>
                         </div>
                     </div>
                 </CardDescription>
 
           </div>
         </CardHeader>
       </Card>
      )}
        


      </section>
  
  
  
      <section className={cn(' grid grid-cols-1 p-11 gap-4 transition-all lg:grid-cols-4')}>
  </section>
  
    </div>
  
    </>
    );
  }
  
  export default OrderView;