/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
// Indicates this file is a client-side component in Next.js

"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import NextImage from 'next/image'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {  ChangeEvent, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import {  CircleDollarSign, CreditCard, Eye, Heart, Loader2, OctagonAlert, PenTool, SquarePen, Tags, Trash2 } from 'lucide-react';
import Link from 'next/link';
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarIcon } from "@radix-ui/react-icons"
 
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { db } from '@/db';
import { deleteProduct, updateProduct } from './actions';
import { useRouter } from 'next/navigation';
import { Product } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/components/ui/use-toast";
import ImageSlider from "@/components/PodProducts/ImageSlider";
import LoadingState from "@/components/LoadingState";
interface ProductViewProps {
  sellerProductsData: Product[];
  }


const ProductView = ({
  sellerProductsData,
  }: ProductViewProps) => {
        const router = useRouter();
        const { toast } = useToast()

        
        // serach and sort filter
        const [searchQuery, setSearchQuery] = useState('');
        const [sortOption, setSortOption] = useState('');

        const [newTitle, setnewTitle] = useState("");
        const [newProfit, setNewProfit] = useState<number>(1);
        const [isClicked, setIsClicked] = useState(false);
        const [selectedProduct, setSelectedProduct] = useState<Product>();
        const [open, setOpen] = useState<boolean>(false);

        

        const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = parseFloat(event.target.value);
          setNewProfit(newValue);
        };



              const [isEditOpen , setIsEditOpen] = useState(false)
              const handleSave = async (productId : string , basePrice : number) => {
                  try {
                    setOpen(true)
                      await updateProduct({productId,newTitle,basePrice,newProfit})
                      setnewTitle("")
                      setNewProfit(1)
                      toast({
                          title: 'Product Was Successfully Updated',
                          variant: 'default',
                        });
                        setOpen(false)
                        setIsEditOpen(false)
                        router.refresh()
                  } catch (error) {
                    setIsEditOpen(false)
                    setOpen(false)
                      console.error('Error updating Product:', error);
                      toast({
                          title: 'Something went wrong',
                          description: 'There was an error on our end. Please try again.',
                          variant: 'destructive',
                      });
                  }
              };


              const [isDeleteOpen , setIsDeleteOpen] = useState(false)
              const handleDelete = async (productId : string) => {
                  try {
                    setOpen(true)

                      const res = await deleteProduct(productId)
                      if(res){
                        setOpen(false)
                        toast({
                          title: 'Product Was Successfully Deleted',
                          variant: 'default',
                        });
                        setIsDeleteOpen(false)
                        router.refresh()
                      }
                      else{
                        setOpen(false)
                        setIsDeleteOpen(false)
                        toast({
                          title: 'Product has associated order items and can not be deleted',
                          variant: 'destructive',
                        });
                        router.refresh()
                      }
                      
                  } catch (error) {
                    setIsDeleteOpen(false)
                    setOpen(false)
                      console.error('Error updating Product:', error);
                      toast({
                          title: 'Something went wrong',
                          description: 'There was an error on our end. Please try again.',
                          variant: 'destructive',
                      });
                  }
              };
        
                
                // search and sort filter
                
                const filteredProduct = sellerProductsData.filter((design) => {
                  const lowerCaseQuery = searchQuery.toLowerCase();
                  const lowerCaseName = design.title.toLowerCase();
                  const tagsMatch = design.tags && design.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery));
                  return lowerCaseName.includes(lowerCaseQuery) || (design.tags && tagsMatch);
                });
              
                if (sortOption === 'sales') {
                  filteredProduct.sort((a, b) => b.totalSales - a.totalSales);
                } else if (sortOption === 'likes') {
                  filteredProduct.sort((a, b) => b.likes - a.likes);
                } else if (sortOption === 'price') {
                  filteredProduct.sort((a, b) => b.price - a.price);
                } else if (sortOption === 'views') {
                  filteredProduct.sort((a, b) => b.price - a.price);
                }

                const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
                  setSearchQuery(e.target.value);
                };

                const handleSortChange = (e: string) => {
                    setSortOption(e);
                };





                




  return (

    <>



  <p className="text-sm text-gray-700 mb-2">SellerDashboard/All Products</p>
  <h1 className="text-2xl font-semibold mb-8">All Products</h1>


  <Card className="col-span-full" x-chunk="dashboard-01-chunk-4">
  <CardHeader className="px-4 sm:px-7">
    <div className="ml-0 sm:ml-5 mt-2">
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        {/* Sorting select */}
        <Select value={sortOption} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full sm:w-[180px] bg-gray-100">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort By</SelectLabel>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="likes">Likes</SelectItem>
              <SelectItem value="views">Views</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          type="search"
          className="w-full sm:w-[50%] bg-gray-100"
          placeholder="Search for your products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <Link href="/sellerDashboard/createProduct">
          <Button
            className="w-full sm:w-auto mb-4 mt-0"
            type="submit"
            loadingText="Redirecting"
            isLoading={isClicked}
            disabled={isClicked}
            onClick={() => setIsClicked(true)}
            variant="default"
          >
            Create Product
            <PenTool className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
      <p className="text-gray-600 text-sm">
        <span className="text-blue-600 font-medium">Guide :</span> Refresh Page to view newly added products!
      </p>
      <p className="text-gray-600 text-sm">
        <span className="text-blue-600 font-medium">Guide :</span> Awaiting Action = Product status will be revealed after review!
      </p>
    </div>
  </CardHeader>
  <hr className="border-t border-gray-300 mb-5" />
  <CardContent>
    {sellerProductsData.length === 0 && (
      <>
        <h1 className="text-center text-3xl font-bold col-span-full">You don't have any Products for now!</h1>
        <div className="flex justify-center items-center mt-4">
          <NextImage alt="" src="/upload.png" width={900} height={900} />
        </div>
      </>
    )}

    {filteredProduct.length === 0 && sellerProductsData.length !== 0 ? (
      <>
        <h1 className="text-center text-3xl font-bold col-span-full">
          No Product found by that
          <span className="text-purple-800"> Title</span>!
        </h1>
        <div className="flex justify-center items-center mt-4">
          <NextImage alt="" src="/upload.png" width={900} height={900} />
        </div>
      </>
    ) : (
      <>
        <div className="relative mt-5 grid grid-cols-1 mb-20 pb-20">
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {/* Product Cards */}
            {filteredProduct.map((product, index) => (
                  <>
                    <div key={index} className="relative aspect-square">
                      <ImageSlider
                        urls={[
                          ...(product.croppedFrontProduct ?? []),
                          ...(product.croppedBackProduct ?? []),
                        ]}
                      />

                      {/* Badges */}
                      <div className="absolute top-2 right-2 px-2 py-1 z-10 rounded">
                        {product.isProductAccepted && (
                          <Badge className="bg-green-700 text-white px-2 py-1 rounded">
                            Accepted
                          </Badge>
                        )}
                        {product.isProductRefused && (
                          <Badge className="bg-red-500 text-white px-2 py-1 rounded">
                            Refused
                          </Badge>
                        )}
                        {!product.isProductAccepted && !product.isProductRefused && (
                          <Badge className="bg-gray-500 text-white px-2 py-1 rounded">
                            Awaiting Action
                          </Badge>
                        )}
                      </div>

                      <div className="absolute top-2 left-2 px-2 py-1 z-10 rounded">
                        <Badge variant="secondary" className="bg-gray-200">
                          <CircleDollarSign className="mr-2 h-4 w-4 text-green-800 opacity-70" />
                          <span className="text-xs text-gray-600">{product.price} TND</span>
                        </Badge>
                      </div>

                      <div className="absolute bottom-8 left-0 right-0 z-10 text-center">
                        <Badge variant="secondary" className="bg-gray-200">
                          {product.title}
                        </Badge>
                      </div>

                      <div
                        className="z-10 cursor-pointer border rounded-lg border-gray-700 p-1
                          absolute bottom-2 left-3 mt-1 mr-1 
                          text-gray-700 hover:text-blue-500 hover:border-blue-500  
                          transform 
                          hover:scale-110 hover:rotate-6 transition duration-200"
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsEditOpen(true);
                        }}
                      >
                        <SquarePen />
                      </div>

                      <div
                        className="z-10 cursor-pointer border rounded-lg border-gray-700 p-1
                          absolute bottom-2 right-3 mt-1 mr-1 
                          text-gray-700 hover:text-red-500 hover:border-red-500  
                          transform 
                          hover:scale-110 hover:rotate-6 transition duration-200"
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsDeleteOpen(true);
                        }}
                      >
                        <Trash2 />
                      </div>

                      
                    </div>
                  </>

            ))}
          </div>
        </div>
      </>
    )}
  </CardContent>
</Card>



      {selectedProduct && (

        <>
        {/* Edit product */}
        <AlertDialog open={isEditOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Edit Your Product</AlertDialogTitle>
              <AlertDialogDescription className='flex flex-col'>
                <div>
                  Title: <span className='text-gray-700 font-semibold'>{selectedProduct.title}</span>
                </div>
                <div>
                  Price: <span className='text-gray-700 font-semibold'>{selectedProduct.price} TND</span>
                </div>
                <div>
                  Base Price: <span className='text-gray-700 font-semibold'>{selectedProduct.basePrice} TND</span>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="productTitle" className="text-right">
                  New Title
                </Label>
                <Input
                  id="productTitle"
                  onChange={(e) => setnewTitle(e.target.value)}
                  maxLength={20}
                  placeholder="Choose a new title"
                  className="col-span-3"
                />
                <Label htmlFor="productPrice" className="text-right">
                  Your Profit
                </Label>
                <Input
                  id="productPrice"
                  type="number"
                  defaultValue={1}
                  min={1}
                  max={20}
                  onChange={handlePriceChange}
                  className="col-span-1"
                />
                <p className="text-xs">Older profit: {selectedProduct.sellerProfit} TND</p>
              </div>
            </div>
            <AlertDialogFooter>
              <div className='flex'>
                <Label className='mr-10'>
                  <span className="text-green-700 font-bold">
                    New Final Price: {selectedProduct.basePrice + newProfit} TND
                  </span>
                </Label>
              </div>
              <AlertDialogCancel onClick={()=>setIsEditOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={newTitle === ""}
                onClick={() => handleSave(selectedProduct.id, selectedProduct.basePrice)}
              >
                Save
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete product */}
        <AlertDialog open={isDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader className="flex flex-col items-center">
              <div className="text-red-500 mb-2">
                <OctagonAlert className='' />
              </div>
              <AlertDialogTitle className="text-xl font-bold text-center">
                Are you absolutely sure you want to delete your product?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
                It will permanently remove your product from our MarketPlace.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={()=>setIsDeleteOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(selectedProduct.id)}
                className='bg-red-500 hover:bg-red-500'
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </>        
        )}

<LoadingState isOpen={open} />


                            </>
  
  );
};

export  default ProductView ;

