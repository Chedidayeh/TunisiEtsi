/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
// Indicates this file is a client-side component in Next.js

"use client"
import NextImage from 'next/image'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { toast, useToast } from '@/components/ui/use-toast'
import {  ChangeEvent, Suspense, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import {  CircleDollarSign, CreditCard, Heart, Loader2, OctagonAlert, SquarePen, Tags, Trash2 } from 'lucide-react';
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
import { deleteDesign, updateDesign } from './actions';
import { useRouter } from 'next/navigation';
import { SellerDesign } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { useMutation } from '@tanstack/react-query';
interface DesignViewProps {
    SellerDesignsData: SellerDesign[];
  }


const DesignView = ({
    SellerDesignsData,
  }: DesignViewProps) => {
        const router = useRouter();
        const { toast } = useToast()


        
        // serach and sort filter
        const [searchQuery, setSearchQuery] = useState('');
        const [sortOption, setSortOption] = useState('');

        const [newName, setNewName] = useState("");
        const [newPrice, setNewPrice] = useState<number>(3);
        const [isClicked, setIsClicked] = useState(false);



              // mutation hook for updating:
              const {mutate : update_Design , isPending: isUpdatePending} = useMutation({
                  mutationFn: updateDesign,
                  onSuccess:()=>{
                    setNewName("")
                    setNewPrice(3)
                    toast({
                      title: 'Design Was Successfully Updated',
                      variant: 'default',
                    });
                    router.refresh()
                  },
                  onError:(error)=>{
                    console.error('Error updating design:', error);
                      toast({
                          title: 'Something went wrong',
                          description: 'There was an error on our end. Please try again.',
                          variant: 'destructive',
                      });
                  }
              })

              const handleDelete = async (designId : string) => {
                try {
                    const res = await deleteDesign(designId)
                    if(res){
                      toast({
                        title: 'Design Was Successfully Deleted',
                        variant: 'default',
                      });
                      router.refresh()
                    }
                    else{
                      toast({
                        title: 'Design has associated order items and can not be deleted',
                        variant: 'destructive',
                      });
                      router.refresh()
                    }
                    
                } catch (error) {
                    console.error('Error updating Product:', error);
                    toast({
                        title: 'Something went wrong',
                        description: 'There was an error on our end. Please try again.',
                        variant: 'destructive',
                    });
                }
            };


                    
                    
                    
                
                // search and sort filter
                
                const filteredDesigns = SellerDesignsData.filter((design) => {
                  const lowerCaseQuery = searchQuery.toLowerCase();
                  const lowerCaseName = design.name.toLowerCase();
                  const tagsMatch = design.tags && design.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery));
                  return lowerCaseName.includes(lowerCaseQuery) || (design.tags && tagsMatch);
                });
              
                if (sortOption === 'sales') {
                  filteredDesigns.sort((a, b) => b.totalSales - a.totalSales);
                } else if (sortOption === 'likes') {
                  filteredDesigns.sort((a, b) => b.likes - a.likes);
                } else if (sortOption === 'price') {
                  filteredDesigns.sort((a, b) => b.price - a.price);
                }

                const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
                  setSearchQuery(e.target.value);
                };

                const handleSortChange = (e: string) => {
                    setSortOption(e);
                };



    // toggle Mode
    const [isDarkMode, setIsDarkMode] = useState(true);
    const handleToggleMode = () => {
      setIsDarkMode((prevMode) => !prevMode);
    };


  return (

    <>
<div>
<p className="text-sm text-gray-700 mb-2">SellerDashboard/All Designs</p>
  <h1 className="text-2xl font-semibold mb-8">All Designs</h1>
  <Card className="col-span-full" x-chunk="dashboard-01-chunk-4">
  <CardHeader className="px-4 md:px-7">
    <div className="ml-2 md:ml-5 mt-2">
      <div className="flex flex-wrap space-x-0 space-y-2 md:space-y-0 md:space-x-4"> {/* Flex container with space between items */}
        {/* Sorting select */}
        <Select value={sortOption} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full md:w-[180px] ">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort By</SelectLabel>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="likes">Likes</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          type="search"
          className="w-full md:w-[50%] "
          placeholder="Search for your design..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Link href="/sellerDashboard/createDesign">
          <Button
            className="w-full md:w-auto mb-4"
            type="submit"
            loadingText='Redirecting'
            isLoading={isClicked}
            disabled={isClicked}
            onClick={() => setIsClicked(true)}
            variant="default"
          >
            Add Design
          </Button>
        </Link>
      </div>

      <p className='text-gray-600 text-sm'><span className='text-blue-600 font-medium'>Guide :</span> Refresh Page to view new added designs!</p>
      <p className='text-gray-600 text-sm'><span className='text-blue-600 font-medium'>Guide :</span> Awaiting Action = Design status will be revealed after review!</p>
      <div className='text-center'>
        <Button variant="default" size="sm" className="w-full md:w-[30%] mt-2" onClick={handleToggleMode}>
          Toggle Mode
        </Button>
      </div>
    </div>
  </CardHeader>
  <hr className="border-t border-gray-300 mb-5" /> {/* Add this line for the header line */}
  <CardContent>
    {SellerDesignsData.length == 0 && (
      <>
        <h1 className="text-center text-3xl font-bold col-span-full">You don't have any Designs for now!</h1>
        <div className="flex justify-center items-center mt-4">
          <NextImage alt="" src="/upload.png" width={900} height={900} />
        </div>
      </>
    )}

    {filteredDesigns.length === 0 && SellerDesignsData.length != 0 ? (
      <>
        <h1 className="text-center text-3xl font-bold col-span-full">No Design found by that<span className='text-purple-800'> Name</span>!</h1>
        <div className="flex justify-center items-center mt-4">
          <NextImage alt="" src="/upload.png" width={900} height={900} />
        </div>
      </>
    ) : (
      <>
        <div className='relative mt-5 grid grid-cols-1 mb-20 pb-20'>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:grid-cols-2">
            {/* designs Cards */}
            {filteredDesigns.map((design, index) => (
              <>
                <HoverCard key={index}>
                  <HoverCardTrigger asChild>
                    <Card
                      x-chunk="dashboard-05-chunk-3"
                      className={cn('lg:rounded-lg shadow-lg', isDarkMode ? 'bg-gray-900' : 'bg-gray-100', 'hover:transform hover:scale-105 transition duration-300')}
                    >
                      <CardHeader className="px-7 relative flex items-center justify-center">
                        <div className="absolute top-2 left-2 right-2 flex justify-between">
                          <Badge className="bg-blue-700 text-white px-2 py-1 rounded">
                            {design.name}
                          </Badge>
                          {design.isDesignAccepted && (
                            <Badge className="bg-green-700 text-white px-2 py-1 rounded">
                              Accepted
                            </Badge>
                          )}
                          {design.isDesignRefused && (
                            <Badge className="bg-red-500 text-white px-2 py-1 rounded">
                              Refused
                            </Badge>
                          )}
                          {!design.isDesignAccepted && !design.isDesignRefused && (
                            <Badge className="bg-gray-500 text-white px-2 py-1 rounded">
                              Awaiting Action
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="relative flex items-center justify-center">
                        <NextImage
                          onContextMenu={(e) => e.preventDefault()}
                          src={design.imageUrl}
                          alt={design.name}
                          width={3000}
                          height={3000}
                          className="rounded-md"
                        />
                      </CardContent>
                      <CardFooter className="relative">
                        {/* Edit design  */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <SquarePen className=" cursor-pointer absolute bottom-2 left-3 mt-1 mr-1 text-gray-400 hover:text-blue-500 transform hover:scale-110 hover:rotate-6 transition duration-200" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Edit Your Design</AlertDialogTitle>
                              <AlertDialogDescription className='flex flex-col'>
                                <div>
                                  Older Name: <span className='text-blue-700 font-semibold ml-4'>{design.name}</span>
                                </div>
                                <div>
                                  Older Price: <span className='text-blue-700 font-semibold ml-6'>{design.price} TND</span>
                                </div>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="DesignName" className="text-right">
                                  New Name
                                </Label>
                                <Input
                                  id="DesignName"
                                  onChange={(e) => setNewName(e.target.value)}
                                  maxLength={37}
                                  placeholder="Choose a new name"
                                  className="col-span-3"
                                />
                                <Label htmlFor="DesignPrice" className="text-right">
                                  New Price
                                </Label>
                                <Input
                                  id="designPrice"
                                  type="number"
                                  defaultValue={newPrice}
                                  min={3}
                                  max={10}
                                  onChange={(e) => setNewPrice(Number(e.target.value))}
                                  className="col-span-1"
                                />
                                <p className="text-xs">older profit: {design.sellerProfit} TND</p>
                              </div>
                            </div>
                            <AlertDialogFooter>
                              <div className='flex'>
                                <Label className='mr-10'>
                                  <span className="text-green-700 font-bold">
                                    Your New Profit : {newPrice - 2} TND
                                  </span>
                                </Label>
                              </div>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                disabled={newName === "" || newPrice === 0 || isUpdatePending}
                                onClick={() => update_Design({ designId: design.id, newName, newPrice })}
                              >
                                {isUpdatePending ? 'Saving...' : 'Save'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        {/* Delete design  */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Trash2 className="cursor-pointer absolute bottom-2 right-3 mt-1 mr-1 text-gray-400 hover:text-red-500 transform hover:scale-110 hover:rotate-6 transition duration-200" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader className="flex flex-col items-center">
                              <div className="text-red-500 mb-2">
                                <OctagonAlert className='' />
                              </div>
                              <AlertDialogTitle className="text-xl font-bold text-center">
                                Are you absolutely sure you want to delete your design?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. 
                                It will permanently remove your design from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(design.id)}
                                className='bg-red-500 hover:bg-red-500'>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </CardFooter>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-50 bg-gray-200">
                    <div className="flex justify-between space-x-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-green-900 pt-2">
                          <CircleDollarSign className="mr-2 h-4 w-4 opacity-70" />{" "}
                          <span className="text-xs text-muted-foreground">{design.price} TND (price)</span>
                        </div>
                        <div className="flex items-center text-red-700 pt-2">
                          <Heart className="mr-2 h-4 w-4 opacity-70" />{" "}
                          <span className="text-xs text-muted-foreground">{design.likes} Likes</span>
                        </div>
                        <div className="flex items-center pt-2">
                          <CreditCard className="mr-2 h-4 w-4 opacity-70" />{" "}
                          <span className="text-xs text-muted-foreground">{design.totalSales} Sales</span>
                        </div>
                        <div className="flex items-center pt-2">
                          <Tags className="mr-2 h-4 w-4 opacity-70" />{" "}
                          <span className="text-xs text-muted-foreground">
                            {design.tags?.join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </>
            ))}
          </div>
        </div>
      </>
    )}
  </CardContent>
  <CardFooter className='relative flex flex-col items-center justify-center' />
</Card>

</div>

                             
 

                            

                            </>
  
  );
};

export  default DesignView ;

