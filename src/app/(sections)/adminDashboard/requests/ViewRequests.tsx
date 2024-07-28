'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {  PaymentRequest, Store, User } from "@prisma/client";
import { ChangeEvent, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import LoadingState from "@/components/LoadingState";
import { deletePaymentRequestById } from "./actions";
import D17 from "./D17";
import { Input } from "@/components/ui/input";


interface ExtraStore extends Store {
  user : User
}

interface ExtraPaymentRequest extends PaymentRequest {
  store : ExtraStore
}


interface ViewProps {
  paymentRequests: ExtraPaymentRequest[];
}

const ViewRequests = ({ paymentRequests }: ViewProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast()
  
  
  const [filterBy, setFilterBy] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRequests, setfilteredRequests] = useState(paymentRequests);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    let updatedPaymentRequests = [...paymentRequests];

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      updatedPaymentRequests = updatedPaymentRequests.filter(request =>
        request.store.storeName.toLowerCase().includes(lowercasedQuery) ||
        request.store.user.username.toLowerCase().includes(lowercasedQuery)
      );
    }

    if (filterBy) {
      updatedPaymentRequests = updatedPaymentRequests.filter(request => {
        if (filterBy === 'APPROVED') {
          return request.status === "APPROVED";
        } else if (filterBy === 'PENDING') {
          return request.status === "PENDING";
        } else if (filterBy === 'REJECTED') {
          return request.status === "REJECTED";
        }
        return true;
      });
    }

    setfilteredRequests(updatedPaymentRequests);
  }, [searchQuery, filterBy, paymentRequests]);

  const [activeTab, setActiveTab] = useState('D17');
  const handleTabChange = (value : string) => {
    setActiveTab(value);
  };


  return (
    <>

      <p className="text-sm text-gray-700 mb-2">AdminDashboard/Requestes</p>
      <h1 className="text-2xl font-semibold mb-8">All Requests</h1>
      <Card>
        <CardHeader>
          <CardTitle>Requests</CardTitle>
          <CardDescription>Total : {paymentRequests.length}</CardDescription>
        </CardHeader>
        <CardContent>
        <div className="flex justify-center items-center">
          <Tabs defaultValue="D17" className="w-full sm:w-[500px]" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="D17">D17</TabsTrigger>
          <TabsTrigger value="Flouci">Flouci</TabsTrigger>
          <TabsTrigger value="Bank">Bank Deposit</TabsTrigger>
            </TabsList>
          </Tabs>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center my-4 space-y-4 sm:space-y-0 sm:space-x-4">
            <Input
              type="search"
              className="w-full sm:w-[50%]"
              placeholder="Search by store name or user name..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Select onValueChange={(value) => setFilterBy(value)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  <SelectItem value="APPROVED">APPROVED</SelectItem>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="REJECTED">REJECTED</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>


    {activeTab === 'D17' && (
      <div className="mt-4">
        <D17 paymentRequests={filteredRequests} />
      </div>
    )}


        </CardContent>
      </Card>

<LoadingState isOpen={open} />

    </>
  );
};

export default ViewRequests;
