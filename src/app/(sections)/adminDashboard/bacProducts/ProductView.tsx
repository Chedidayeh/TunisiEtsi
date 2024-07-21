/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
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
import {  CircleDollarSign, CircleX, CreditCard, Eye, Heart, Loader2, OctagonAlert, PenTool, SquarePen, Tags, Trash2 } from 'lucide-react';
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
import { deleteProduct } from './actions';
import { useRouter } from 'next/navigation';
import { BacProducts, Product } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/components/ui/use-toast";
import LoadingState from "@/components/LoadingState";
import ImageSlider from "@/components/fripMarket/ImageSlider";
interface ProductViewProps {
  bacProducts: BacProducts[];
  }


const ProductView = ({
  bacProducts,
  }: ProductViewProps) => {
        const router = useRouter();
        const { toast } = useToast()

        
        // serach and sort filter
        const [searchQuery, setSearchQuery] = useState('');
        const [sortOption, setSortOption] = useState('');

        const [isClicked, setIsClicked] = useState(false);

                

                const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
                  setSearchQuery(e.target.value);
                };

                const handleSortChange = (e: string) => {
                    setSortOption(e);
                };


                
  // Filter products based on search query
  const filteredProducts = bacProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products based on sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'likes') {
      return b.totalLikes - a.totalLikes
    }
    return 0;
  });



const [open, setOpen] = useState<boolean>(false);


const handleDelete = async (productId: string) => {
  try {
    setOpen(true)
    await deleteProduct(productId);

    toast({
      title: 'Product Deleted',
      description: 'Your product has been deleted successfully.',
    });

    setOpen(false); // Close modal or perform other actions after successful delete

  } catch (error) {
    console.error('Error during deletion:', error);

    toast({
      title: 'Something went wrong',
      description: 'Error during deletion. Please try again.',
      variant: 'destructive',
    });

    setOpen(false); // Close modal or perform other actions on error
  }
};


  return (

    <>



  <p className="text-sm text-gray-700 mb-2">adminDashboard/bacProducts</p>
  <h1 className="text-2xl font-semibold">All Products</h1>

  <div className="mt-4">
  <Card className="col-span-full" x-chunk="dashboard-01-chunk-4">
    <CardHeader className="px-7">
      <div className="ml-5 mt-2">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"> {/* Flex container with space between items */}
          {/* Sorting select */}
          <Select
            value={sortOption}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-full sm:w-[180px] bg-gray-100">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort By</SelectLabel>
                <SelectItem value="likes">Likes</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            type="search"
            className="w-full sm:w-[50%] bg-gray-100"
            placeholder="Search for your products by title..."
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <Link href="/adminDashboard/bacProducts/addBacProduct">
            <Button
              className="mb-4 mt-0 w-full sm:w-auto"
              type="submit"
              loadingText="Redirecting"
              isLoading={isClicked}
              disabled={isClicked}
              onClick={() => setIsClicked(true)}
              variant="default"
            >
              Add Product
              <PenTool className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
        <p className='text-gray-600 text-sm mt-4 sm:mt-2'>
          <span className='text-blue-600 font-medium'>Guide :</span> Refresh Page to view new added products!
        </p>
      </div>
    </CardHeader>
    <hr className="border-t border-gray-300 mb-5" /> {/* Add this line for the header line */}
    <CardContent>
      {bacProducts.length == 0 && (
        <>
          <h1 className="text-center text-3xl font-bold col-span-full">You don't have any Products for now!</h1>
          <div className="flex justify-center items-center mt-4">
            <NextImage
              alt=""
              src="/upload.png"
              width={900}
              height={900}
            />
          </div>
        </>
      )}

      <>
        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ml-2 md:ml-10 mt-6">
        {sortedProducts.map((product, index) => (
            <div key={index} className='flex-shrink-0 mb-20'>
              <div className='aspect-square'>
                <ImageSlider urls={product.image} />
                <div className="text-center">
                  <Badge>{product.title}</Badge>
                  <CircleX onClick={() => handleDelete(product.id)} className="h-6 w-6 ml-1 inline-block hover:text-red-500 cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    </CardContent>
    <CardFooter className='relative flex flex-col items-center justify-center' />
  </Card>
</div>



                             
 
  <LoadingState isOpen={open} />

                            

                            </>
  
  );
};

export  default ProductView ;

