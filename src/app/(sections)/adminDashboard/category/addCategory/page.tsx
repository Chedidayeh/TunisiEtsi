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
import { saveCategoryData } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";





const Page = () => {
  const router = useRouter();
  const { toast } = useToast()


  
  const [label, setLabel] = useState("");
  const [href, setHref] = useState("");
  const [value, setValue] = useState("");
  const [price, setPrice] = useState("");
  const [colors, setColors] = useState([
    { label: "", value: "", tw: "", frontImageUrl: "", backImageUrl: "" },
  ]);
  const [frontBorders, setFrontBorders] = useState([
    { label: "", value: "" },
  ]);
  const [backBorders, setBackBorders] = useState([
    { label: "", value: "" },
  ]);

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const availableSizes = [
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
    { label: "XL", value: "xl" },
    { label: "XXL", value: "xxl" },
  ];

  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };



  const handleAddColor = () => {
    setColors([
      ...colors,
      { label: "", value: "", tw: "", frontImageUrl: "", backImageUrl: "" },
    ]);
  };

  const handleRemoveColor = (index: number) => {
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
  };

  const handleAddFrontBorder = () => {
    setFrontBorders([...frontBorders, { label: "", value: "" }]);
  };

  const handleAddBackBorder = () => {
    setBackBorders([...backBorders, { label: "", value: "" }]);
  };

  const handleRemoveFrontBorder = (index: number) => {
    const newFrontBorders = frontBorders.filter((_, i) => i !== index);
    setFrontBorders(newFrontBorders);
  };

  const handleRemoveBackBorder = (index: number) => {
    const newBackBorders = backBorders.filter((_, i) => i !== index);
    setBackBorders(newBackBorders);
  };



  const handleSaveCategory = async () => {
    if (label ==="" || href  ==="" || value ==="" || price  ==="" || colors[0].label ==="" || selectedSizes.length === 0 || frontBorders[0].label  ==="" || backBorders[0].label  ==="" ) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {

      const selectedSizesData = availableSizes.filter((size) =>
        selectedSizes.includes(size.value)
      );
      setOpen(true)
      const categoryData = {
        label,
        href,
        value,
        price : parseInt(price),
        colors,
        sizes: selectedSizesData,
        frontBorders,
        backBorders,
      }
      
      const res = await saveCategoryData(categoryData)
      if(res){
        toast({
          title: "Category was Saved",
          variant: "default",
        });
        setOpen(false)
  
      }
      else {
        toast({
          title: "Category was not Saved",
          variant: "destructive",
        });
        setOpen(false)

  
      }
      
    } catch (error) {
      console.log(error)
      toast({
          title: "Saving failed",
          variant: "destructive",
        }); 
      setOpen(false)
    }
   
  };


  const [open, setOpen] = useState<boolean>(false);



  return (
    <>

      <p className="text-sm text-gray-700 mb-2">AdminDashboard/AddCategory</p>
      <h1 className="text-2xl font-semibold">Adding Categories</h1>


      <div className="grid grid-cols-2 gap-4 mt-4">

            {/* category details */}
            <Card className="col-span-full" x-chunk="dashboard-01-chunk-4">
              <CardHeader>
                <CardTitle>Category Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="label">Label</Label>
                    <Input
                      id="label"
                      type="text"
                      className="w-full"
                      placeholder="Oversized Tshirts"
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="href">Href</Label>
                    <Input
                      id="href"
                      type="text"
                      className="w-full"
                      placeholder="/MarketPlace/category/Oversized Tshirts"
                      value={href}
                      onChange={(e) => setHref(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="value">Value</Label>
                    <Input
                      id="value"
                      type="text"
                      className="w-full"
                      placeholder="/front_oversize_tshirt_black.jpg"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      className="w-full"
                      placeholder="Category price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* category colors */}
            <Card className="col-span-full" x-chunk="dashboard-01-chunk-4">
              <CardHeader>
                <CardTitle>Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[10%]">Label</TableHead>
                      <TableHead className="w-[10%]">Value</TableHead>
                      <TableHead className="w-[12%]">Tw</TableHead>
                      <TableHead>FrontImageUrl</TableHead>
                      <TableHead>BackImageUrl</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {colors.map((color, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-semibold">
                          <Input
                            type="text"
                            placeholder="Black"
                            value={color.label}
                            onChange={(e) => {
                              const newColors = [...colors];
                              newColors[index].label = e.target.value;
                              setColors(newColors);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            placeholder="black"
                            value={color.value}
                            onChange={(e) => {
                              const newColors = [...colors];
                              newColors[index].value = e.target.value;
                              setColors(newColors);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            placeholder="zinc-900"
                            value={color.tw}
                            onChange={(e) => {
                              const newColors = [...colors];
                              newColors[index].tw = e.target.value;
                              setColors(newColors);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            placeholder="/front_oversize_tshirt_black.jpg"
                            value={color.frontImageUrl}
                            onChange={(e) => {
                              const newColors = [...colors];
                              newColors[index].frontImageUrl = e.target.value;
                              setColors(newColors);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            placeholder="/back_oversize_tshirt_black.jpg"
                            value={color.backImageUrl}
                            onChange={(e) => {
                              const newColors = [...colors];
                              newColors[index].backImageUrl = e.target.value;
                              setColors(newColors);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <X
                            className="text-gray-600 hover:text-red-500 cursor-pointer"
                            onClick={() => handleRemoveColor(index)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Button size="sm" variant="ghost" className="gap-1" onClick={handleAddColor}>
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add Color
                </Button>
              </CardFooter>
            </Card>

            {/* category sizes */}
            <Card className="col-span-full" x-chunk="dashboard-01-chunk-4">
              <CardHeader>
                <CardTitle>Sizes</CardTitle>
              </CardHeader>
              <CardContent>
                <ToggleGroup type="multiple" variant="outline">
                  {availableSizes.map((size) => (
                    <ToggleGroupItem
                      key={size.value}
                      value={size.value}
                      onClick={() => handleSizeToggle(size.value)}
                      className={selectedSizes.includes(size.value) ? 'bg-blue-200' : ''}
                    >
                      {size.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </CardContent>
            </Card>

            {/* front borders */}
            <Card className="col-span-full" x-chunk="dashboard-01-chunk-4">
              <CardHeader>
                <CardTitle>Front Borders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50%]">Label</TableHead>
                      <TableHead className="w-[50%]">Value</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {frontBorders.map((border, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-semibold">
                          <Input
                            type="text"
                            placeholder="top"
                            value={border.label}
                            onChange={(e) => {
                              const newFrontBorders = [...frontBorders];
                              newFrontBorders[index].label = e.target.value;
                              setFrontBorders(newFrontBorders);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            placeholder="23%"
                            value={border.value}
                            onChange={(e) => {
                              const newFrontBorders = [...frontBorders];
                              newFrontBorders[index].value = e.target.value;
                              setFrontBorders(newFrontBorders);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <X
                            className="text-gray-600 hover:text-red-500 cursor-pointer"
                            onClick={() => handleRemoveFrontBorder(index)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Button size="sm" variant="ghost" className="gap-1" onClick={handleAddFrontBorder}>
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add front border
                </Button>
              </CardFooter>
            </Card>

            {/* back borders */}
            <Card className="col-span-full" x-chunk="dashboard-01-chunk-4">
              <CardHeader>
                <CardTitle>Back Borders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50%]">Label</TableHead>
                      <TableHead className="w-[50%]">Value</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {backBorders.map((border, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-semibold">
                          <Input
                            type="text"
                            placeholder="top"
                            value={border.label}
                            onChange={(e) => {
                              const newBackBorders = [...backBorders];
                              newBackBorders[index].label = e.target.value;
                              setBackBorders(newBackBorders);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            placeholder="23%"
                            value={border.value}
                            onChange={(e) => {
                              const newBackBorders = [...backBorders];
                              newBackBorders[index].value = e.target.value;
                              setBackBorders(newBackBorders);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <X
                            className="text-gray-600 hover:text-red-500 cursor-pointer"
                            onClick={() => handleRemoveBackBorder(index)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Button size="sm" variant="ghost" className="gap-1" onClick={handleAddBackBorder}>
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add back border
                </Button>
              </CardFooter>
            </Card>

            <div className="flex justify-start items-start">
            {/* Save Category Button */}
            <Button size="sm" onClick={handleSaveCategory}>
              Save Category
            </Button>
            </div>

            </div>

      <LoadingState isOpen={open} />

    </>
  );
};

export default Page;
