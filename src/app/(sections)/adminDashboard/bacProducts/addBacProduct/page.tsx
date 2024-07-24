'use client'

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LoadingState from "@/components/LoadingState";
import { saveInDb } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { SingleImageDropzone } from "@/components/sellerDashboard/SingleImageDropzone";

const Page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const [files, setFiles] = useState<(File | undefined)[]>([undefined, undefined, undefined, undefined]);
  const isButtonDisabled = files.every(file => !file);
  const [title, setTitle] = useState<string>("");


  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (index: number, file: File | undefined) => {
    const newFiles = [...files];
    newFiles[index] = file;
    setFiles(newFiles);
  };




const handleAddProducts = async () => {
    setOpen(true)
    // Filter out undefined files
    const filteredFiles = files.filter(file => file !== undefined) as File[];
    const uploadPromises = filteredFiles.map(file => uploadDesign(file));

    try {
      const uploadPaths = await Promise.all(uploadPromises);

      await saveInDb(uploadPaths, title);

      toast({
        title: 'Products Added',
        description: 'Your products have been added successfully.',
      });
      setOpen(false)
      setFiles([undefined, undefined, undefined, undefined])


    } catch (error) {
      console.error('Error during file uploads:', error);
      toast({
        title: 'Something went wrong',
        description: 'Error during file uploads. Please try again.',
        variant: 'destructive',
      });
      setOpen(false)
    }
  };




                // function to upload the seller design in uploads folder
                const uploadDesign = async (file : File) =>{
                  if (!file) {
                    console.log('No file selected.');
                    return;
                  }
  
                  try {
                    const data = new FormData()
                    data.set('file', file)
  
                    const res = await fetch('/api/uploadBacProducts', {
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
                        description: 'Error during bac product upload. Please try again.',
                        variant: 'destructive',
                    });
                      return null;
                    }
                  } catch (e) {
                    // Handle network errors or other exceptions
                    console.error('Error during bac product upload:', e)
                    toast({
                      title: 'Something went wrong',
                      description: 'Error during bac product upload. Please try again.',
                      variant: 'destructive',
                  });
                  }
                } 

  return (
    <>

      <p className="text-sm text-gray-700 mb-2">AdminDashboard/AddBacProduct</p>
      <h1 className="text-2xl font-semibold">Adding Products</h1>

      <div className="flex min-h-screen w-full flex-col bg-muted/40 mt-4">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex gap-3 flex-wrap justify-center">
                <Label htmlFor="label" className="w-full text-center">Add Title</Label>
                <Input
               type="search"
                className="w-full sm:w-[50%] mb-1"
                placeholder="Type the title..."
                value={title}
                onChange={handleTitleChange}
                /> 
                  <Label htmlFor="label" className="w-full text-center mb-4">Add Images</Label>
                  {files.map((file, index) => (
                    <SingleImageDropzone
                      key={index}
                      className="border border-blue-800"
                      width={200}
                      height={200}
                      value={file}
                      onChange={(file) => handleFileChange(index, file)}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
            <Button size="sm" onClick={handleAddProducts} disabled={isButtonDisabled}>
            Add Products
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <LoadingState isOpen={open} />


    </>
  );
};

export default Page;
