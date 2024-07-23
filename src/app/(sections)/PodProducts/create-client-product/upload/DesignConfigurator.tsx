/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
'use client' 
 
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"


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
import {  ChangeEvent, useEffect, useRef, useState } from 'react';
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


import { RootState } from '@/store/reducers/reducers';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check, ChevronsUpDown, CircleCheckBig, CircleDollarSign, FileText, FolderPen, Loader, Loader2, MousePointerClick, Receipt, Smile, Tags } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toPng } from 'html-to-image';
import { SingleImageDropzone } from '@/components/sellerDashboard/SingleImageDropzone';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { savePreOrderB, savePreOrderF, savePreOrderFB1, savePreOrderFB2, savePreOrderFBClient, savePreOrderFBSeller } from "./actions"
import { getAllCategories, getUser } from "@/actions/actions"
import Link from "next/link"
import { BackBorder, Category, Color, FrontBorder, Size, User } from "@prisma/client"
import LoadingState from "@/components/LoadingState"
import { getUserPreOrder } from "../preview/actions"
import { useUploadThing } from "@/lib/uploadthing"
import ProgressState from "@/components/ProgressState"



interface SellersDesignsData {
  id: string;
  width: number ;
  height: number;
  imageUrl: string;
  name: string;
  price: number;
  likes : number;
  tags : string[]
  storeName : string
}

interface DesignConfiguratorProps {
  SellersDesignsData: SellersDesignsData[];
  product : fetchedCat ;
  selectedCategory : fetchedCat
}

interface fetchedCat extends Category {
  colors : Color[]
  sizes : Size[]
  frontBorders : FrontBorder[]
  backBorders : BackBorder[]
}

const DesignConfigurator: React.FC<DesignConfiguratorProps> = ({ SellersDesignsData , product , selectedCategory  }) => {

  const [categories, setCategories] = React.useState<fetchedCat[]>([])
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        setOpen(true)
        const data = await getAllCategories()
        setCategories(data)
      } catch (error) {
        setOpen(false)
        console.log(error)

      } finally {
        setOpen(false)
      }
    }

    fetchCategories()
  }, [])


  const { toast } = useToast()
  const router = useRouter();
  const [selectedP, setSelectedProduct] = useState(selectedCategory ? selectedCategory : product )

      // Define the types for the options state
      const [options, setOptions] = useState<{
        color: (typeof selectedP.colors)[number]; // Use typeof to infer the type of elements in the colors array
        size: (typeof selectedP.sizes)[number];
      }>({
        color: selectedP.colors[0], // Set the initial color based on the first element of the colors array
        size: selectedP.sizes[0],
      });


  const [selectedCat, setSelectedCat] = React.useState<number | null>(null);

  // to capture the mockups
  let FrontcontainerRef= useRef<HTMLDivElement>(null)
  let BackcontainerRef= useRef<HTMLDivElement>(null)

  const [isBorderHidden, setIsBorderHidden] = useState(true);
  const [isBackBorderHidden, setisBackBorderHidden] = useState(true);



  const [selectedCatColors, setselectedCatColors] = useState<Color>(selectedP.colors[0]); // to change the category colors
  const MAX_FILE_SIZE = 15 * 1024 * 1024;


  // design  width and height
  const [Frontwidth, setFrontwidth] = React.useState<number>(3000);
  const [Frontheight, setFrontheight] = React.useState<number>(3000);
  const [Backwidth, setBackwidth] = React.useState<number>(3000);
  const [Backheight, setBackheight] = React.useState<number>(3000);


  const [selectedFrontDesignId, setselectedFrontDesignId] = useState<string>("");
  const [selectedBackDesignId, setselectedBackDesignId] = useState<string>("");
  const [selectedFrontDesign, setselectedFrontDesign] = useState<string>("");
  const [selectedBackDesign, setselectedBackDesign] = useState<string>("");
  const [selectedFrontIndex, setSelectedFrontIndex] = useState<Number | null>(null);
  const [selectedBackIndex, setSelectedBackIndex] = useState<Number | null>(null);

  

  // switch
  const [addFrontDesign, setAddFrontDesign] = useState(true);
  const [addBackDesign, setAddBackDesign] = useState(false);

  // order Data
  const [selectedColor, setSelectedColor] = useState(selectedP.colors[0].label);
  const [frontDesignPrice, setFrontDesignPrice] = useState(0);
  const [backDesignPrice, setBackDesignPrice] = useState(0);
  const [clientFrontDesignPrice, setclientFrontDesignPrice] = useState(0);
  const [clientBackDesignPrice, setclientBackDesignPrice] = useState(0);
  const selectedSize = options.size.label;
  const [quantity, setQuantity] = useState(1);
  const totalPrice = (selectedP.price + frontDesignPrice + backDesignPrice + clientFrontDesignPrice + clientBackDesignPrice )  * quantity
  const productPrice = selectedP.price + frontDesignPrice + backDesignPrice + clientFrontDesignPrice + clientBackDesignPrice




  const [FrontDesignFile, setFrontDesignFile] = useState<File>();
  const [BackDesignFile, setBackDesignFile] = useState<File>();



  // dahsed border dimentions:
  // front :
  const [frontBorderTop , setfrontborderTop] = useState(selectedP.frontBorders[0].value)
  const [frontBorderBottom , setfrontBorderBottom] = useState(selectedP.frontBorders[1].value)
  const [frontBorderRight , setfrontBorderRight] = useState(selectedP.frontBorders[2].value)
  const [frontBorderLeft , setfrontBorderLeft] = useState(selectedP.frontBorders[3].value)
  // Back :
  const [backBorderTop , setbackborderTop] = useState(selectedP.backBorders[0].value)
  const [backBorderBottom , setbackBorderBottom] = useState(selectedP.backBorders[1].value)
  const [backBorderRight , setbackBorderRight] = useState(selectedP.backBorders[2].value)
  const [backBorderLeft , setbackBorderLeft] = useState(selectedP.backBorders[3].value)








  const handleCatClick = (index: number , category : fetchedCat ) => {
    // border for front design
    setfrontborderTop(category.frontBorders[0].value)
    setfrontBorderBottom(category.frontBorders[1].value)
    setfrontBorderRight(category.frontBorders[2].value)
    setfrontBorderLeft(category.frontBorders[3].value)


    // border for back design
    setbackborderTop(category.backBorders[0].value)
    setbackBorderBottom(category.backBorders[1].value)
    setbackBorderRight(category.backBorders[2].value)
    setbackBorderLeft(category.backBorders[3].value)

    setSelectedProduct(category)
    setselectedCatColors(category.colors[0])
    setSelectedCat(prevState => prevState === index ? null : index);
    }



  function View (){
    setIsBorderHidden(true);
  }

  function notView (){
    setIsBorderHidden(false);
  }

  function ViewBack (){
    setisBackBorderHidden(true)
  }

  function notViewBack (){
    setisBackBorderHidden(false)
  }



  // Function to handle Front file upload
const handleFileChange = (file : File) => {
  if (file) {
    if (file.size > MAX_FILE_SIZE) {
      setFrontDesignFile(undefined)
      toast({
        title: 'File size exceeds the limit.',
        description: 'Please choose a file equal or smaller than 15MB.',
        variant: 'destructive',
      });

    } else {

      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) { 

          const dataUrl = e.target.result as string;
          const image = new Image();

          image.onload = () => {
            const { width, height } = image;
            setFrontwidth(width);
            setFrontheight(height);
            setIsBorderHidden(false);
            setselectedFrontDesign(dataUrl);
            setFrontDesignPrice(0)
            setclientFrontDesignPrice(2)
            setSelectedFrontIndex(null);

          };

          image.src = dataUrl;
        }
      };
      reader.readAsDataURL(file);

      

    }
  }
  
};

  // Function to handle Back file upload
  const handleBackFileChange = (file : File) => {
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setBackDesignFile(undefined)
        toast({
          title: 'File size exceeds the limit.',
          description: 'Please choose a file equal or smaller than 15MB.',
          variant: 'destructive',
        });
  
      } else {
  
        const reader = new FileReader();
  
        reader.onload = (e) => {
          if (e.target) { 
  
            const dataUrl = e.target.result as string;
            const image = new Image();
  
            image.onload = () => {
              const { width, height } = image;
              setBackwidth(width);
              setBackheight(height);
              setisBackBorderHidden(false);
              setselectedBackDesign(dataUrl);
              setBackDesignPrice(0)
              setclientBackDesignPrice(2)
              setSelectedBackIndex(null)
            };
  
            image.src = dataUrl;
          }
        };
        reader.readAsDataURL(file);
  
        
  
      }
    }
  };


      // change color
    const handleColorChange = (color :any ) => {
      setselectedCatColors(color);
      setSelectedColor(color.label)    
    };

      //set quantity and update price
    const updatePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuantity(parseInt(e.target.value, 10));
    };



      //switch 
    const handleFrontSwitchChange = () => {
      setAddFrontDesign(!addFrontDesign);
      setFrontDesignPrice(0)
      setclientFrontDesignPrice(0)
      setSelectedFrontIndex(null)
      setselectedFrontDesignId("")
      setselectedFrontDesign("")
      setIsBorderHidden(true);
    };

    const handleBackSwitchChange = () => {
      setAddBackDesign(!addBackDesign);
      setBackDesignPrice(0)
      setclientBackDesignPrice(0)
      setSelectedBackIndex(null)
      setselectedBackDesignId("")
      setselectedBackDesign("")
      setisBackBorderHidden(true);

    };




    const handleFrontClick = (design: SellersDesignsData, index: number) => {
      if (selectedFrontIndex === index) {
        // If the clicked design is already selected, deselect it
        setSelectedFrontIndex(null);
        setselectedFrontDesign("");
        setFrontwidth(3000);
        setFrontheight(3000);
        setIsBorderHidden(true);
        setFrontDesignPrice(0);
        setselectedFrontDesignId("");
      } else {
        // Select the clicked design
        setSelectedFrontIndex(index);
        setselectedFrontDesign(design.imageUrl);
        setFrontwidth(design.width);
        setFrontheight(design.height);
        setIsBorderHidden(false);
        setFrontDesignPrice(design.price);
        setclientFrontDesignPrice(0)
        setselectedFrontDesignId(design.id);
      }
    };
    

    const handleBackClick = (design: SellersDesignsData, index: number) => {
      if (selectedBackIndex === index) {
        // If the clicked design is already selected, deselect it
        setSelectedBackIndex(null);
        setselectedBackDesign("");
        setBackwidth(3000);
        setBackheight(3000);
        setisBackBorderHidden(true);
        setBackDesignPrice(0);
        setselectedBackDesignId("");
      } else {
        // Select the clicked design
        setSelectedBackIndex(index);
        setselectedBackDesign(design.imageUrl);
        setBackwidth(design.width);
        setBackheight(design.height);
        setisBackBorderHidden(false);
        setBackDesignPrice(design.price);
        setclientBackDesignPrice(0)
        setselectedBackDesignId(design.id);
      }
    };
    


    // toggle Mode
    const [isDarkMode, setIsDarkMode] = useState(true);
    const handleToggleMode = () => {
      setIsDarkMode((prevMode) => !prevMode);
    };



      // search query
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };
  
    const filteredDesigns = SellersDesignsData.filter((design) =>
      design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      design.storeName.toLowerCase().includes(searchQuery.toLowerCase())

    );

    
  

    const [uploadProgress, setUploadProgress] = useState<number>(0)


    const { startUpload, isUploading } = useUploadThing('imageUploader', {
      onUploadProgress: (progressEvent) => {
        setUploadProgress(progressEvent);
        },
    });






                // function to upload the Captured Product
                const uploadCapturedMockup = async (file : File) =>{
                  if (!file) {
                    console.log('No file selected.');
                    return;
                  }
                
                  try {
                    const data = new FormData()
                    data.set('file', file)
                
                    const res = await fetch('/api/uploadCapturedOrder', {
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
                      return path as string;    
                    
                    } else {
                      // Handle error if success is false
                      console.error('File upload failed:', result.error)
                      return null;
                    }
                  } catch (e) {
                    // Handle network errors or other exceptions
                    console.error('Error during file upload:', e)
                  }
              }

            // function to transform base64 To Blob to get the file from blob
            function base64ToBlob(base64: string, mimeType: string) {
              const byteCharacters = atob(base64)
              const byteNumbers = new Array(byteCharacters.length)
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i)
              }
              const byteArray = new Uint8Array(byteNumbers)
              return new Blob([byteArray], { type: mimeType })
            }

              // function to upload the cleint design in uploads folder
              const uploadDesign = async (file : File) =>{
                if (!file) {
                  console.log('No file selected.');
                  return;
                }

                try {
                  const data = new FormData()
                  data.set('file', file)

                  const res = await fetch('/api/uploadClientDesigns', {
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
                    return path;    
                  
                  } else {
                    // Handle error if success is false
                    console.error('File upload failed:', result.error)
                    toast({
                      title: 'Something went wrong',
                      description: 'Error during client design upload. Please try again.',
                      variant: 'destructive',
                  });
                    return null;
                  }
                } catch (e) {
                  // Handle network errors or other exceptions
                  console.error('Error during client design upload:', e)
                  toast({
                    title: 'Something went wrong',
                    description: 'Error during client design upload. Please try again.',
                    variant: 'destructive',
                });
                }
              } 
              
              
     




                

                const savePreOrder = async () => {
                  try {
                    const user = await getUser();
                    const checkPreOrder = await getUserPreOrder(user!.id);
                    if (checkPreOrder) {
                      showToast(
                        'You already made a preOrder!',
                        'You either confirm or delete that preOrder to make a new one!',
                        'destructive'
                      );
                      return;
                    }
                    setIsBorderHidden(true);
                    setisBackBorderHidden(true);
                
                    // Handle different design conditions
                    if (addFrontDesign && !addBackDesign) {
                      await handleFrontDesign(user!);
                    } else if (addBackDesign && !addFrontDesign) {
                      await handleBackDesign(user!);
                    } else if (addFrontDesign && addBackDesign) {
                      await handleBothDesigns(user!);
                    }
                  } catch (error) {
                    console.error(error);
                    showToast('Error!', 'Please try again later!', 'destructive');
            
                  }
                };
                
                const handleFrontDesign = async (user : User) => {
                  const img = document.querySelector(".front-product") as HTMLImageElement;
                  img.src = selectedCatColors.frontImageUrl;
                
                  if (frontDesignPrice === 0) {
                    const uploadedFile = await startUpload([FrontDesignFile!]);
                    const frontDesignPath = uploadedFile![0].url
                    await saveCapturedFrontDesign(user, frontDesignPath, 'front', false);
                  } else {
                    const design = document.querySelector(".front-design") as HTMLImageElement;
                    if (design) {
                      design.src = selectedFrontDesign;
                    }        
                    await saveCapturedFrontDesign(user, selectedFrontDesignId, 'front', true);
                  }
                };
                
                const handleBackDesign = async (user : User) => {
                  const img = document.querySelector(".back-product") as HTMLImageElement;
                  img.src = selectedCatColors.backImageUrl;
                
                  if (backDesignPrice === 0) {
                    const uploadedFile = await startUpload([BackDesignFile!]);
                    const backDesignPath = uploadedFile![0].url
                    await saveCapturedBackDesign(user, backDesignPath, 'back', false);
                  } else {
                    const design = document.querySelector(".back-design") as HTMLImageElement;
                    if (design) {
                    design.src = selectedBackDesign;
                    }        
                    await saveCapturedBackDesign(user, selectedBackDesignId, 'back', true);
                  }
                };
                
                const handleBothDesigns = async (user: User) => {
                  const frontImg = document.querySelector(".front-product") as HTMLImageElement;
                  frontImg.src = selectedCatColors.frontImageUrl;
                  const backImg = document.querySelector(".back-product") as HTMLImageElement;
                  backImg.src = selectedCatColors.backImageUrl;
            
                  if (frontDesignPrice === 0 && backDesignPrice !== 0) {
                    const uploadedFile = await startUpload([FrontDesignFile!]);
                    const frontDesignPath = uploadedFile![0].url
                    const design = document.querySelector(".back-design") as HTMLImageElement;
                    if (design) {
                      design.src = selectedBackDesign;
                    }
                    const paths = await saveCapturedBothDesigns();
                    const result = await savePreOrderFB1(user?.id!,frontDesignPath,selectedBackDesignId,totalPrice,productPrice,quantity,selectedColor,selectedSize,selectedP.label,paths)
                    handleSaveResult(result);
                  }
                  else if (frontDesignPrice !== 0 && backDesignPrice === 0) {
                    const uploadedFile = await startUpload([BackDesignFile!]);
                    const backDesignPath = uploadedFile![0].url
                    const design = document.querySelector(".front-design") as HTMLImageElement;
                    if (design) {
                      design.src = selectedFrontDesign;
                      } 
                    const paths = await saveCapturedBothDesigns();
                    const result = await savePreOrderFB2(user?.id!,backDesignPath,selectedFrontDesignId,totalPrice,productPrice,quantity,selectedColor,selectedSize,selectedP.label,paths)
                    handleSaveResult(result);
                  }
                  else if (frontDesignPrice !== 0 && backDesignPrice !== 0) {
                    const designFront = document.querySelector(".front-design") as HTMLImageElement;
                    if (designFront) {
                      designFront.src = selectedFrontDesign;
                      }
                    const designBack = document.querySelector(".back-design") as HTMLImageElement;
                    if (designBack) {
                      designBack.src = selectedBackDesign;
                        }
                    const paths = await saveCapturedBothDesigns();
                    const result = await savePreOrderFBSeller(user?.id!,selectedFrontDesignId,selectedBackDesignId,totalPrice,productPrice,quantity,selectedColor,selectedSize,selectedP.label,paths)
                    handleSaveResult(result);
                  }
                  else if (frontDesignPrice === 0 && backDesignPrice === 0) {

                    const uploadedFile1 = await startUpload([FrontDesignFile!]);
                    const frontDesignPath = uploadedFile1![0].url

                    const uploadedFile2 = await startUpload([BackDesignFile!]);
                    const backDesignPath = uploadedFile2![0].url


                    const paths = await saveCapturedBothDesigns();
                    const result = await savePreOrderFBClient(user?.id!,frontDesignPath,backDesignPath,totalPrice,productPrice,quantity,selectedColor,selectedSize,selectedP.label,paths)
                    handleSaveResult(result);
                  }
                
                };
                
            
                const saveCapturedFrontDesign = async (user : User, designPath : string, designType : string, isSellerDesign : boolean) => {
                  const containerRef = designType === 'front' ? FrontcontainerRef : BackcontainerRef;
                  const dataUrl = await toPng(containerRef.current!, { cacheBust: false, pixelRatio: 5 });
                
                  const file = getFile(dataUrl);
                  const uploadedFile = await startUpload([file!]);
                  const capturedProductPath = uploadedFile![0].url
                  const paths = [capturedProductPath!];
                
                  const result = await savePreOrderF(user?.id!, designPath, totalPrice,productPrice, quantity, selectedColor, selectedSize, selectedP.label, paths, isSellerDesign);
                
                  handleSaveResult(result);
                };
            
            
                const saveCapturedBackDesign = async (user : User, designPath : string, designType : string, isSellerDesign : boolean) => {
                  const containerRef = designType === 'front' ? FrontcontainerRef : BackcontainerRef;
                  const dataUrl = await toPng(containerRef.current!, { cacheBust: false, pixelRatio: 5 });
                
                  const file = getFile(dataUrl);
                  const uploadedFile = await startUpload([file!]);
                  const capturedProductPath = uploadedFile![0].url
                  const paths = [capturedProductPath!];
                
                  const result = await savePreOrderB(user?.id!, designPath, totalPrice,productPrice, quantity, selectedColor, selectedSize, selectedP.label, paths, isSellerDesign);
                
                  handleSaveResult(result);
                };
                
            
                const saveCapturedBothDesigns = async () => {
                  const frontDataUrl = await toPng(FrontcontainerRef.current!, { cacheBust: false, pixelRatio: 5 });
                  const backDataUrl = await toPng(BackcontainerRef.current!, { cacheBust: false, pixelRatio: 5 });
                
                  const frontFile = getFile(frontDataUrl);
                  const backFile = getFile(backDataUrl);
                

                  const uploadedFile1 = await startUpload([frontFile!]);
                  const frontCapturedPath = uploadedFile1![0].url
                  const uploadedFile2 = await startUpload([backFile!]);
                  const backCapturedPath = uploadedFile2![0].url
                
                  return [frontCapturedPath!, backCapturedPath!];
                };
                
                const handleSaveResult = (result : any) => {
                  if (result.success) {
                    showToast('Great!', 'PreOrder Saved successfully.', 'default');
                    router.push("/PodProducts/create-client-product/preview?preOrderId=" + result.preOrderId);
                  } else {
                    showToast('Error', 'Failed to Save preOrder! Please try again later.', 'destructive');
                  }
                };
                
                const showToast = (title : string, description : string, variant : any) => {
                  toast({ title, description, variant });
                };
                
                const getFile = (dataUrl : string) => {
                  const base64Data = dataUrl.split(',')[1];
                  const blob = base64ToBlob(base64Data, 'image/png');
                  return new File([blob], `order.png`, { type: 'image/png' });
                };
























  return (

    <>
    <LoadingState isOpen={open} />
    <ProgressState isOpen={isUploading} progress={uploadProgress} />








              <div className='relative mt-5 grid grid-cols-1  mb-20 pb-20'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:grid-cols-2">

                          {/* first card */}
                     <Card x-chunk="dashboard-05-chunk-3" className={cn(' lg:rounded-2xl shadow-lg')}>
                        <CardHeader className="py-2">
                        </CardHeader>
                        <CardContent className="items-center space-y-6 grid" >                          

                            



                                 {/* Switch component front */}
                                  <div className="flex items-center mt-4 space-x-2">
                                <Switch id="front" defaultChecked={addFrontDesign} onClick={handleFrontSwitchChange } />
                                <Label htmlFor="front">Add Front Design</Label>
                               </div>

                                {/* Switch component back */}
                              <div className="flex items-center mt-4 space-x-2">
                                <Switch  id="back" defaultChecked={addBackDesign} onClick={handleBackSwitchChange } />
                                <Label htmlFor="back">Add Back Design</Label>
                               </div>

                               {(addFrontDesign || addBackDesign)  && (

                                <>

                                {/* category selection */}
                                <h3>Change Category :</h3>
                             <div className="ml-5">
                                <Sheet>
                              <SheetTrigger asChild>
                                <Button variant="secondary">Select</Button>
                              </SheetTrigger>
                              <SheetContent side="bottom" >
                                <SheetHeader>
                                  <SheetTitle>Select Category</SheetTitle>
                                  <SheetDescription>
                                  </SheetDescription>
                                </SheetHeader>

                                <div className="grid grid-cols-6 gap-1  bg-gray-900/5">
                                    {categories.map((category, index) => (
                                      <Card onClick={() => handleCatClick (index , category )} 
                                      key={index} className={cn("border w-48", selectedCat === index && "border-primary")}>
                                        <CardContent className="flex flex-col items-center justify-center p-2">
                                          <img 
                                            src={category.value} 
                                            alt={category.label} 
                                            className="mb-2" 
                                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
                                          />
                                          <div className="flex flex-wrap justify-center gap-2">
                                            <Badge variant="secondary">{category.label}</Badge>
                                            <Badge variant="secondary">{category.price} TND</Badge>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </div>

                                <SheetFooter>
                                  <SheetClose asChild>
                                  </SheetClose>
                                </SheetFooter>
                              </SheetContent>
                              </Sheet>
                              </div>

                              <div className='space-y-2'>
                                <h3>Upload a Design:</h3>
                                <p className='text-xs text-zinc-500 ml-5'>PNG, JPG, JPEG max (15MB)</p>
                                <p className='text-xs text-zinc-500 ml-5'>One Design will cost 2 TND !</p>
                                <div className="flex justify-center space-x-4">

                                    {/* front design input */}
                                {addFrontDesign && (
                                    <>
                                  <div>
                                  <SingleImageDropzone
                                    className="border border-blue-800"
                                    width={200}
                                    height={200}
                                    value={FrontDesignFile}
                                    onChange={(file) => {
                                      setFrontDesignFile(file);
                                      setclientFrontDesignPrice(2)
                                      if (!file) {
                                        setFrontDesignPrice(0)
                                        setclientFrontDesignPrice(0)
                                        setIsBorderHidden(true);
                                        setselectedFrontDesign("");
                                        setSelectedFrontIndex(null);
                                      }
                                      if (file) {
                                        handleFileChange(file);
                                      }
                                    }}
                                  />
                                  </div>

                                  </>
                                )}

                                  {/* back design input */}
                                  {addBackDesign && (
                                        <>
                                        <div>
                                        <SingleImageDropzone
                                        className="border border-blue-800"
                                        width={200}
                                        height={200}
                                        value={BackDesignFile}
                                        onChange={(file) => {
                                          setBackDesignFile(file);
                                          setclientBackDesignPrice(2)
                                          if (!file) {
                                            setBackDesignPrice(0)
                                            setclientBackDesignPrice(0)
                                            setisBackBorderHidden(true);
                                            setselectedBackDesign("");
                                            setSelectedBackIndex(null)
                                          }
                                          if (file) {
                                            handleBackFileChange(file);
                                          }
                                        }}
                                        />
                                        </div>

                                        </>
                                        )}

                                </div>
                              </div>


                              {filteredDesigns.length > 0 && (
                          <>
                            <h3>Or choose an Existing design:</h3>

                              <div className="flex items-center justify-center">
                              <Button variant="secondary" size="sm" className="w-[30%]" onClick={handleToggleMode}>
                              Toggle Mode
                            </Button>                              
                            </div>
                            <div>
                            <Input type="text" placeholder="Search for a design by name or by store name..." value={searchQuery} onChange={handleSearchChange} />
                            </div>
                            
                            {addFrontDesign && (

                              <>

                            <div className="flex items-center justify-center">
                            Front design
                            </div>


                              {/* designs scroll area */}
                              <ScrollArea 
                              className={cn(
                                'relative h-96 flex-1 my-16 w-full rounded-xl p-2 ring-1 ring-inset ring-gray-900 lg:rounded-2xl flex justify-center flex-col items-center',
                                isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
                              )}
                              >
                              <div className="grid grid-cols-3 gap-3 p-2">
                                {filteredDesigns.map((design, index) => (
                                  <div key={index} className="flex flex-col items-center">
                                    <div
                                      className={`border rounded-md p-1 cursor-pointer ${selectedFrontIndex === index ? 'border-blue-500' : ''}`}
                                      onClick={() => handleFrontClick(design,index)}
                                    >
                                      <Badge variant={`${selectedFrontIndex === index ? 'default' : 'secondary' }`}>
                                        {design.price}TND
                                      </Badge>
                                      <NextImage
                                        alt={`Product image ${index + 1}`}
                                        className="aspect-square w-full rounded-md object-cover"
                                        height={1000}
                                        src={design.imageUrl}
                                        width={1000}
                                      />
                                    </div>
                                    <Badge variant={`${selectedFrontIndex === index ? 'default' : 'secondary' }`}>{design.name}</Badge>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>

                            </>

                            )}

                            {addBackDesign && (

                            <>

                            <div className="flex items-center justify-center">
                            Back design
                            </div>

                              {/* designs scroll area */}
                              <ScrollArea 
                              className={cn(
                                'relative h-96 flex-1 my-16 w-full rounded-xl p-2 ring-1 ring-inset ring-gray-900 lg:rounded-2xl flex justify-center flex-col items-center',
                                isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
                              )}
                              >
                              <div className="grid grid-cols-3 gap-3 p-2">
                                {filteredDesigns.map((design, index) => (
                                  <div key={index} className="flex flex-col items-center">
                                    <div
                                      className={`border rounded-md p-1 cursor-pointer ${selectedBackIndex === index ? 'border-blue-500' : ''}`}
                                      onClick={() => handleBackClick(design,index)}
                                    >
                                       <Badge variant={`${selectedBackIndex === index ? 'default' : 'secondary' }`}>
                                        {design.price}TND
                                      </Badge>
                                      <NextImage
                                        alt={`Product image ${index + 1}`}
                                        className="aspect-square w-full rounded-md object-cover"
                                        height={1000}
                                        src={design.imageUrl}
                                        width={1000}
                                      />
                                    </div>
                                    <Badge variant={`${selectedBackIndex === index ? 'default' : 'secondary' }`}>{design.name}</Badge>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>

                            </>

                              )}
                           </>
                          )}

                              </>
                              )}




                        </CardContent>
                        <CardFooter className="flex items-center justify-center">

                               {(addFrontDesign || addBackDesign)  && (

                                <>

                              {/* order details */}
                            <div className="flex-1 text-center"> 
                                <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="secondary">Order Details</Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 ">
                                <div className='flex flex-col gap-6'>

                              {/* colors */}
                              <RadioGroup
                                value={options.color}
                                onChange={(val) => {
                                  setOptions((prev) => ({
                                    ...prev,
                                    color: val,
                                  }));
                                  handleColorChange(val); // Call handleColorChange to update the selected color
                                }}
                              >
                                <Label>Color: {options.color.label}</Label>
                                <div className='mt-3 flex items-center space-x-3'>
                                  {selectedP.colors.map((color: Color) => ( // Use selectedProduct.colors instead of colors
                                    <RadioGroup.Option
                                      key={color.label}
                                      value={color}
                                      className={({ active, checked }) =>
                                        cn(
                                          'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent',
                                          {
                                            [`border-${color.tw}`]: active || checked,
                                          }
                                        )
                                      }
                                    >
                                      <span
                                        className={cn(
                                          `bg-${color.tw}`,
                                          'h-8 w-8 rounded-full border border-black border-opacity-10'
                                        )}
                                      />
                                    </RadioGroup.Option>
                                  ))}
                                </div>
                              </RadioGroup>


                              <div className='relative flex flex-col gap-3 w-full'>

                                  {/* Size   */}
                              <Label>Size</Label>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant='outline'
                                    role='combobox'
                                    className='w-full justify-between'>
                                    {options.size.label}
                                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  {selectedP.sizes.map((size: Size) => (
                                    <DropdownMenuItem
                                      key={size.value}
                                      className={cn(
                                        'flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100',
                                        {
                                          'bg-zinc-100': size.label === options.size.label,
                                        }
                                      )}
                                      onClick={() => {
                                        setOptions((prev) => ({ ...prev, size }));
                                      }}>
                                      <Check
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          size.label === options.size.label ? 'opacity-100' : 'opacity-0'
                                        )}
                                      />
                                      {size.label}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>

                              {/* Quantity   */}
                              <Label>Quantity ( Min : 1 , Max : 5 )</Label>
                              <Input type="number" value={quantity} onChange={updatePrice} min={1} max={5} />
                            </div>


                            </div>


                            <div className="text-center">
                            <div className="mb-4 mt-4">
                                <Button
                                  disabled={!((addFrontDesign && selectedFrontDesign !== "") 
                                    || !addFrontDesign) 
                                    || !((addBackDesign && selectedBackDesign !== "") 
                                    || !addBackDesign)}
                                  onClick={savePreOrder}
                                  size='default'
                                  className='w-full'>
                                  Pass To Order Confirmation
                                  <ArrowRight className='h-5 w-5 ml-1.5 inline' />
                                </Button>
                              </div>
                              <div>
                                <Badge variant="outline" className="text-base"> {/* Adjust text size using text-lg class */}
                                  <span className="text-gray-600">Total: { totalPrice.toFixed(2) } TND</span> 
                                </Badge>
                              </div>
                            </div>

                           
                            


                                  </PopoverContent>
                                </Popover>

                                <Link href="/PodProducts/create-client-product/preview">
                            <Button variant="link">See Order Preview</Button>
                            </Link>

                                </div>

                                </>
                               )}



                      </CardFooter>
                      </Card>



     


                    {(addFrontDesign || addBackDesign) && (

                    <Card x-chunk="dashboard-05-chunk-3" className={cn(' lg:rounded-2xl shadow-lg')}>
                    <CardHeader className="px-7 flex flex-col items-center justify-center">

                            <RadioGroup
                              value={options.color}
                              onChange={(val) => {
                                setOptions((prev) => ({
                                  ...prev,
                                  color: val,
                                }));
                                handleColorChange(val);
                              }}
                            >
                                <div className="flex items-center justify-center mt-3">
                              <Label className=''>Color: {options.color.label}</Label>
                              </div>
                              <div className='mt-3 flex items-center space-x-3'>
                                {selectedP.colors.map((color: Color) => (
                                  <RadioGroup.Option
                                    key={color.label}
                                    value={color}
                                    className={({ active, checked }) =>
                                      cn(
                                        'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent',
                                        {
                                          [`border-${color.tw}`]: active || checked,
                                        }
                                      )
                                    }
                                  >
                                    <span
                                      className={cn(
                                        `bg-${color.tw}`,
                                        'h-8 w-8 rounded-full border border-black border-opacity-10'
                                      )}
                                    />
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup>

                          </CardHeader>
                      <CardContent >

                      { addFrontDesign  &&(

                        <>
                      <div className="text-center">
                        <h1 className='text-3xl font-extrabold'>Front Design</h1>
                      </div>
                      <div className='w-full h-px bg-zinc-200 my-5' />

                      <div ref={FrontcontainerRef}  className="relative">
                            <NextImage
                              src={selectedCatColors?.frontImageUrl || "" }
                              alt="Product"
                              width={3000}
                              height={3000}
                              className="rounded-2xl front-product"
                            />
                            <div className="absolute inset-0 rounded-2xl border-2">
                            <div 
                            style={{ top: frontBorderTop , bottom : frontBorderBottom , right : frontBorderRight , left: frontBorderLeft }} 
                            className={cn(`absolute  overflow-hidden ${!isBorderHidden ? 'rounded-md border-2 border-dashed border-gray-400' : ''}`)}>
                            <Rnd
                            default={{
                              x: 5,
                              y: 40,
                              height: Frontwidth /15,
                              width: Frontheight / 15,
                            }}
                            lockAspectRatio       
                            className={cn("absolute z-50", { 'border-[3px] border-primary': !isBorderHidden })}
                          >
                            <div className='relative w-full h-full'>
                              {selectedFrontDesign && (
                                <NextImage
                                  src={selectedFrontDesign}
                                  fill
                                  alt='your image'
                                  className='pointer-events-none front-design cursor-grab'
                                />
                              )}
                            </div>
                          </Rnd>
                            </div>
                            </div>

                          </div>

                                <div className="text-center">
                                  <Button className='mt-4'
                                    onMouseDown={View}
                                    onMouseUp={notView}
                                    disabled={!selectedFrontDesign} 
                                    >
                                    Hold to Preview
                                    <MousePointerClick className='ml-1'/>
                                  </Button>
                                </div>

                    <div className='w-full h-px bg-zinc-200 my-5' />
                    </>
                      )}


                      { addBackDesign  &&(

                        <>
                            <div className="text-center">
                              <h1 className='text-3xl font-extrabold'>Back Design</h1>
                              </div>
                            <div className='w-full h-px bg-zinc-200 my-5' />

                      <div ref={BackcontainerRef} className="relative">
                                <NextImage
                                  src={selectedCatColors?.backImageUrl || ""}
                                  alt="Product"
                                  width={3000}
                                  height={3000}
                                  className="rounded-2xl back-product "
                                />
                                <div className="absolute inset-0 rounded-2xl border-2">
                                <div 
                                style={{ top: backBorderTop , bottom : backBorderBottom , right : backBorderRight , left: backBorderLeft }} 
                                className={cn(`absolute  overflow-hidden ${!isBackBorderHidden ? 'rounded-md border-2 border-dashed border-gray-400' : ''}`)}>
                                <Rnd
                                default={{
                                  x: 5,
                                  y: 40,
                                  height: Backwidth /15,
                                  width: Backheight / 15,
                                }}
                                lockAspectRatio       
                                className={cn("absolute z-50", { 'border-[3px] border-primary': !isBackBorderHidden })}
                              >
                                <div className='relative w-full h-full'>
                                  {selectedBackDesign && (
                                    <NextImage
                                      src={selectedBackDesign}
                                      fill
                                      alt='your image'
                                      className='pointer-events-none cursor-grab back-design'
                                    />
                                  )}
                                </div>
                              </Rnd>
                                </div>
                                </div>

                          </div>

                                <div className="text-center">
                                      <Button className='mt-4'
                                        onMouseDown={ViewBack}
                                        onMouseUp={notViewBack}
                                        disabled={!selectedBackDesign} 
                                      >
                                        Hold to Preview
                                      <MousePointerClick className='ml-1'/>
                                      </Button>
                                    </div>
                          </>
                      )}

                    </CardContent>
                    <CardFooter className='relative flex flex-col items-center justify-center'>
                                <div className="text-center text-2xl">
                                  <Label className='text-lg'>
                                    <span className="text-blue-600 ">Guide</span>: Hold one of the blue edges and drag to resize
                                  </Label>
                                </div>
                    </CardFooter>
                    </Card>


                    )}





    

                              </div>
                            </div>
                            

                            </>
  
  );
};

export  default DesignConfigurator ;

