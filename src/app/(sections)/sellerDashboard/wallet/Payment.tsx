'use client'
import NextImage from 'next/image'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store, PaymentRequest } from '@prisma/client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import D17 from './D17'

interface ExtraStore extends Store {
  paymentRequest : PaymentRequest[]
}

interface Props {
    store : ExtraStore
  }
const Payment = ({ store } : Props) => {


    const [activeTab, setActiveTab] = useState('D17');
    const handleTabChange = (value : string) => {
      setActiveTab(value);
    };


    
  return (
    <>


<div className="flex justify-center items-center">
  <Tabs defaultValue="D17" className="w-full sm:w-[500px]" onValueChange={handleTabChange}>
  <TabsList className="grid w-full grid-cols-3">
  <TabsTrigger value="D17">D17</TabsTrigger>
  <TabsTrigger value="Flouci">Flouci</TabsTrigger>
  <TabsTrigger value="Bank">Bank Deposit</TabsTrigger>
    </TabsList>
  </Tabs>
  </div>


  {activeTab === "D17" && (
    <D17 store={store} />
  )}

  {activeTab === "Flouci" && (
    <>
          <div className="mt-4 flex items-center justify-center">
        <NextImage
          alt="flouci logo"
          className="aspect-square w-44 rounded-md border-2 object-cover"
          height={1000}
          src="/flouci.png"
          width={1000}
        />
      </div>

      <div className="mt-4 space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
        <div className="w-full sm:w-1/2">
          <Label>Account Holder* :</Label>
          <Input
            className="w-full mt-1"
            type="text"
            placeholder="Foulen ben foulen"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Label>Bank Account* :</Label>
          <Input
            className="w-full mt-1"
            type="text"
            placeholder="RIB"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Label>Requested Amount* :</Label>
          <Input
            className="w-full mt-1"
            type="number"
            placeholder="Max 100 TND per Week  "
          />
        </div>
      </div>

      <div className='flex items-center justify-center my-6'>
            <Button>Request Payment</Button>
            </div>
    </>
    
  )}

  {activeTab === "Bank" && (
    <>
          <div className="mt-4 flex items-center justify-center">
        <NextImage
          alt="bank image"
          className="aspect-square w-44 rounded-md border-2"
          height={1000}
          src="/bank.jpg"
          width={1000}
        />
      </div>

      <div className="mt-4 space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
        <div className="w-full sm:w-1/2">
          <Label>Bank Name* :</Label>
          <Input
            className="w-full mt-1"
            type="text"
            placeholder="Exemple: BIAT"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Label>Account Number* :</Label>
          <Input
            className="w-full mt-1"
            type="text"
            placeholder="RIB"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Label>Account Holder* :</Label>
          <Input
            className="w-full mt-1"
            type="text"
            placeholder="Foulen ben foulen"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Label>Requested Amount* :</Label>
          <Input
            className="w-full mt-1"
            type="number"
            placeholder="Max 100 TND per Week  "
          />
        </div>
      </div>

      <div className='flex items-center justify-center my-6'>
            <Button>Request Payment</Button>
            </div>
    </>
    
  )}




   
        




  
  </>
  )
}

export default Payment
