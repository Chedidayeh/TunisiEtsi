/* eslint-disable @next/next/no-img-element */
'use client'  // Indicates this file is a client-side component in Next.js
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
import NextImage from 'next/image'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { useToast } from '@/components/ui/use-toast'
import {  useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup } from '@headlessui/react';
import { Input } from '@/components/ui/input';
import React from 'react';
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import { CATEGORIES } from '@/validators/option-validator';
import { useDispatch } from 'react-redux';
import { RootState } from '@/store/reducers/reducers';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { CircleCheckBig, CircleDollarSign, FileText, FolderPen, Loader2, Receipt, SquareArrowOutUpRight, Tags } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { toPng } from 'html-to-image';
import { tree } from 'next/dist/build/templates/app-page';
import { SingleImageDropzone } from '@/components/sellerDashboard/SingleImageDropzone';
import { Separator } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import { addDesignToDb, getUser } from './actions';






const Page =  () => {

    // to trigger the alert dialog
    const alertDialogTriggerRef = useRef<HTMLButtonElement>(null);
    const alertDialogCancelRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast()
  const MAX_FILE_SIZE = 16 * 1024 * 1024; // 16 MB



  const [isDesignUploaded , setisDesignUploaded] = useState(false)
  const [file, setFile] = useState<File>();
  const [isAdding , setisAdding] =useState(false)
  const [designwidth, setdesignwidth] = React.useState<number>(0);
  const [designheight, setdesignheight] = React.useState<number>(0);
  const [designName , setName ] = React.useState<string>("");
  const [designPrice , setDesignPrice] = useState(3) 
  const  sellerProfit =  designPrice-2
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState('');
  const router = useRouter();



        // Function to handle deign upload
      const handleFileChange = (file : File) => {
        if (file) {
          if (file.size > MAX_FILE_SIZE) {
            toast({
              title: 'File size exceeds the limit.',
              description: 'Please choose a file equal or smaller than 15MB.',
              variant: 'destructive',
            });
          } else {
            setisDesignUploaded(true)            
            const reader = new FileReader();

            reader.onload = (e) => {
              if (e.target) {
                const image = new Image();
                image.onload = () => {
                  setdesignwidth(image.width);
                  setdesignheight(image.height);
                };
                image.src = e.target.result as string;
              }
            };
      
            reader.readAsDataURL(file);
          }
        }
      };





    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(event.target.value);
        setDesignPrice(newValue);
    };

    







          // tag code
            const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              setInputTag(e.target.value);
                  };

           const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (inputTag.trim() !== '' && tags.length < 10) {
                const newTag = inputTag.trim();
                if (!tags.includes(newTag) && newTag.length <= 10) {
                  setTags([...tags, newTag]);
                }
                setInputTag('');
              }
            }
          };
          const handleTagClick = (tagToRemove:string) => {
            setTags(tags.filter((tag) => tag !== tagToRemove));
          };







          // final adding function
    const handleAddClick = async () => {
      if (!file) {
        console.log('No file selected.');
        toast({
          title: 'No Uploaded Design Found',
          description: 'Please try again.',
          variant: 'destructive',
      });
        return;
      }
    
      try {
        const store = await getUser()
        if(store){
          openDialog()
        setisAdding(true)
        const data = new FormData()
        data.set('file', file)
    
        const res = await fetch('/api/uploadSellerDesigns', {
          method: 'POST',
          body: data
        })
    
        // handle the error
        if (!res.ok) throw new Error(await res.text())
    
        // Parse response JSON
        const result = await res.json()
    
        // Check if success
        if (result.success) {
          const path = result.filePath
          const id =await addDesignToDb(store ,path , designwidth , designheight , designName , designPrice ,sellerProfit, tags  );
          toast({
            title: 'Design Was Successfully Added',
            description: 'Refrech the page.',
            variant: 'default',
          });
          router.push("/sellerDashboard/designs")
        } else {
          setisAdding(false)
          closeDialog()
          // Handle error if success is false
          console.error('File upload failed:', result.error)
          toast({
            title: 'Something went wrong',
            description: 'There was an error on our end. Please try again.',
            variant: 'destructive',
        });
        }

        }
        else{
          setisAdding(false)
          closeDialog()
        toast({
          title: 'No seller Found',
          description: 'You need to login !',
          variant: 'destructive',
      });

        }
        
      } catch (e) {
        setisAdding(false)
        closeDialog()
        // Handle network errors or other exceptions
        console.error('Error during file upload:', e)
        toast({
          title: 'Something went wrong',
          description: 'There was an error on our end. Please try again.',
          variant: 'destructive',
      });
      }
    };

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
      <p className="text-sm text-gray-700 mb-2">SellerDashboard/Create Design</p>
        <h1 className="text-2xl font-semibold">Create Designs</h1>


              <div className='relative mt-5 grid grid-cols-1  mb-20 pb-20'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:grid-cols-2">


                <Card x-chunk="dashboard-05-chunk-3" className={cn(' lg:rounded-2xl shadow-lg')}>
                        <CardHeader className="px-5">

                        </CardHeader>
                        <CardContent className="items-center space-y-6 grid" >                          
                        <div className="space-y-2">
                        <h3>1-Upload a Design:</h3>
                        <p className="text-xs text-zinc-500 ml-5">PNG, JPG, JPEG max (15MB)</p>
                        <p className="text-xs text-zinc-500 ml-5">(3000px*3000px)</p>

                        <div className="flex justify-center">
                          <SingleImageDropzone
                            className="border border-blue-800"
                            width={200}  
                            height={200}  
                            value={file}  
                            onChange={(file) => {  
                              setFile(file);  
                              if (file) { 
                                handleFileChange(file);
                              }
                              else setisDesignUploaded(false);
                            }}
                          />
                        </div>
                      </div>

                              <>
                              <h3>2-Fill Design Details:</h3>
                              <div className="ml-5 mt-3 text-blue-800">

                              <div className='flex'>
                                <FolderPen className="h-4 w-4"/>
                                <Label className='ml-2'>Design Name*:</Label>
                              </div>
                              <div className="mt-4 mb-4">
                                <Input  
                                onChange={(e) => setName(e.target.value)}
                                disabled={!isDesignUploaded} 
                                required maxLength={15} 
                                className='border-blue-600 text-black bg-gray-100' 
                                placeholder='Add a unique name' 
                                type='text'/>
                              </div>

                            {/* tags */}
                            <div>
                            <div className='flex items-center'>
                              <Tags className='h-4 w-4' />
                              <Label className='ml-2'>Tags*:</Label>
                              <p className='text-xs text-zinc-500 ml-5'>Click On the tag to remove it!</p>

                            </div>
                            <div className='mt-4 mb-4'>
                              <Input
                                disabled={!isDesignUploaded}
                                required
                                className='border-blue-600 text-black bg-gray-100'
                                placeholder='Hit enter to Add tags | max (10)'
                                type='text'
                                value={inputTag}
                                onChange={handleInputChange}
                                onKeyDown={handleInputKeyDown}
                              />
                            </div>
                            <div>
                              {tags.map((tag, index) => (
                                <div
                                  key={index}
                                  className='inline-block bg-gray-200 rounded-2xl px-2 mb-4 py-1 m-1 cursor-pointer'
                                  onClick={() => handleTagClick(tag)}
                                >
                                  {tag}
                                </div>
                              ))}
                            </div>
                          </div>


                              <div className='flex'>
                                <CircleDollarSign className="h-4 w-4"/>
                                <Label className='ml-2'>Design Price*:</Label>
                                <p className='text-xs text-zinc-500 ml-5'>Design Price: ( {designPrice} TND )</p>
                                <p className='text-xs text-zinc-500 ml-5'>Your Profit: ( {sellerProfit} TND  )</p>
                              </div>                              
                              <div className="mt-4 mb-4">
                                <Input 
                                onChange={handlePriceChange} 
                                disabled={!isDesignUploaded}
                                defaultValue={3} 
                                min={3}
                                max={10}
                                className='border-blue-600   text-black bg-gray-100' 
                                type='number'/>
                              </div>
                              </div>

                              </>
                        </CardContent>
                        <CardFooter className="flex items-center space-x-4 justify-center">

                              {/* The AlertDialog component */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild ref={alertDialogTriggerRef}>
                            <button className="hidden">Hidden Trigger</button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader className="flex flex-col items-center">
                              <AlertDialogTitle className="text-2xl text-blue-700 font-bold text-center">
                                Saving Your Design!
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


                        <Button
                          loadingText="Adding"
                          size='default'
                          isLoading={isAdding}
                          disabled={isAdding || !isDesignUploaded || designName==="" || tags.length ===0}
                          onClick={handleAddClick}>
                          Add To Store
                          <span className="ml-1"><CircleCheckBig/></span>
                        </Button>
                      </CardFooter>
                      </Card>


                      <Card x-chunk="dashboard-05-chunk-3" className={cn(' lg:rounded-2xl shadow-lg')}>
                  <CardHeader className="px-7">
                        </CardHeader>
                    <CardContent className="relative flex items-center justify-center">
                          <NextImage
                            src="/salesman.png"
                            alt="Product"
                            width={500}
                            height={500}
                            className="rounded-md"
                            />     
              </CardContent>
              <CardFooter>
                  </CardFooter>
                  </Card>           

                              </div>
                            </div>
                            

                            </>
  
  );
};

export  default Page ;

