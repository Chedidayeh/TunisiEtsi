/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Loader2, MousePointerClick, RocketIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import Confetti from 'react-dom-confetti'
import { Input } from '@/components/ui/input'
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { addStore, fetchName } from "./actions"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"

const Page = () => {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || ''
  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  useEffect(() => setShowConfetti(true), [])
  const router = useRouter()
  router.forward()

  const { toast } = useToast()
  const MAX_FILE_SIZE = 4 * 1024 * 1024;
  const [logo, setLogo] = useState<string>("");
  const [logoFile, setlogoFile] = useState<File>();
  const [storeName, setStoreName] = useState<string>('')
  const [termsAccepted, setTermsAccepted] = useState(false);


  const{mutate : create , isPending} = useMutation({
    mutationFn:addStore,
    onSuccess:()=>{
      toast({
        title: 'Your Store is successfully created!',
        description: 'Try to SignIn again',
        variant: 'default',
      });

      router.push("/api/auth/redirectNewSeller")
      router.refresh()
    },
    onError:(error)=>{
      console.log(error)
      toast({
        title: 'Something went wrong',
        description: 'There was an error on our end. Please try again.',
        variant: 'destructive',
      });
      return
      
    }
  })

 
  const createStore=async ()=>{
      const isValid = await fetchName(storeName)
      if(!isValid) {
        toast({
          title: 'Your Store Name is already in use!',
          description: 'Please choose another store name.',
          variant: 'destructive',
        });
        return 
      }



        if(!logoFile) return
        const logoPath = await uploadDesign(logoFile)
        create({storeName ,logoPath , phoneNumber});
      


  }



  // Event handler for terms checkbox change
  const handleTermsCheckboxChange = () => {
    if(!termsAccepted){
    setTermsAccepted(true);
  }
  else{
    setTermsAccepted(false);
  }
  };


                // Function to handle Front file upload
              const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                const file = event.target.files && event.target.files[0];
                if (file) {
                  if (file.size > MAX_FILE_SIZE) {
                    toast({
                      title: 'File size exceeds the limit.',
                      description: 'Please choose a file equal or smaller than 4MB.',
                      variant: 'destructive',
                    });

                  } else {
                    setlogoFile(file)

                    const reader = new FileReader();
                    reader.onload = (e) => {
                      if (e.target) { 

                        const dataUrl = e.target.result as string;
                        const image = new Image();

                        image.onload = () => {
                          setLogo(dataUrl);
                        };

                        image.src = dataUrl;
                      }
                    };
                    reader.readAsDataURL(file);

                    

                  }
                }
                
              };


              const tags = Array.from({ length: 10 }).map(
                (_, i, a) => `Bla.${a.length + i}`
              )


              // function to upload the seller design in uploads folder
              const uploadDesign = async (file : File) =>{
                if (!file) {
                  console.log('No file selected.');
                  return;
                }

                try {
                  const data = new FormData()
                  data.set('file', file)

                  const res = await fetch('/api/uploadSellerStoreImg', {
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
                      description: 'Error during seller front design upload. Please try again.',
                      variant: 'destructive',
                  });
                    return null;
                  }
                } catch (e) {
                  // Handle network errors or other exceptions
                  console.error('Error during seller front design upload:', e)
                  toast({
                    title: 'Something went wrong',
                    description: 'Error during seller front design upload. Please try again.',
                    variant: 'destructive',
                });
                }
              } 



              // check phone number length
              const [phoneNumber, setPhoneNumber] = useState("");
              const [phoneNumberError, setPhoneNumberError] = useState('');
              const inputClassName = phoneNumberError ? 'border-red-500' : (phoneNumber ? 'border-green-500' : '');
              const handlePhoneNumberBlur = () => {
                if (phoneNumber.length !== 8) {
                  setPhoneNumberError('Phone number must be 8 digits long.');
                } else {
                  setPhoneNumberError('');
                }
              };

              const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                const phoneNumberValue = event.target.value;
                  setPhoneNumber(phoneNumberValue);
              };

  return (
    <>

<AlertDialog open={isPending}>
    <AlertDialogTrigger asChild>
    </AlertDialogTrigger>
    <AlertDialogContent className="flex flex-col items-center">
      <AlertDialogHeader className="flex flex-col items-center">
        <AlertDialogTitle className="text-2xl text-blue-700 font-bold text-center">
          Creating Your Store !
        </AlertDialogTitle>
        <AlertDialogDescription className="flex flex-col items-center">
          After that try to SignIn again.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <Loader2 className="text-blue-700 h-[15%] w-[15%] animate-spin mt-3" />
      </AlertDialogContent>
  </AlertDialog>




              <div
              aria-hidden='true'
              className='pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center'>
              <Confetti
                active={showConfetti}
                config={{ elementCount: 100, spread: 50 }}
              />
            </div>

    <div className='bg-white'>
      <div className='mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <div className='max-w-xl'>
          <p className='text-base font-medium text-primary'>Work With Us !</p>
          <h1 className='mt-2 text-4xl font-bold tracking-tight sm:text-5xl'>
            Create Your Own Store!
          </h1>
          <div className='mt-2 flex items-center text-base text-zinc-500'>
              <RocketIcon className="h-4 w-4 mr-2 text-primary" />
              <p>
                Unleash your amazing ideas and turn them into reality.
              </p>
            </div>
        </div>

        <div className='mt-10 border-t col-span-2 flex flex-col border-zinc-200'>
          <div className='mt-10 flex space-y-3 flex-col'>
            <h4 className='font-semibold text-zinc-900'>
              1- Choose your store Name : 
            </h4>
            <Input 
            type='text' 
            maxLength={20} 
            placeholder='Store Name must be unique !'
            className='border-gray-300 w-[50%]'
            onChange={(e) => {
              setStoreName(e.target.value)
            }}/>
          </div>

          <div className='mt-10 flex space-y-3 flex-col'>
            <h4 className='font-semibold text-zinc-900'>
              2- Add your phone number : 
            </h4>
            <Input 
                id="phoneNumber" 
                type="number" 
                pattern="\d{8}"
                onBlur={handlePhoneNumberBlur}
                placeholder="99 999 999" 
                onChange={handlePhoneNumberChange}
                className={`${inputClassName} focus:ring-0  w-[50%] focus:border-green-500`}
                required 
              />
              {phoneNumberError && (
                <p className="text-sm text-red-500 mt-1">
                  {phoneNumberError}
                </p>
              )}
          </div>

          <div className='mt-10 flex flex-col space-y-3'>
          <div className="flex items-center">
            <h4 className="font-semibold text-zinc-900">
                3- Upload your store Logo:
            </h4>
          </div>
              <Input 
                type="file" 
                accept="image/*" 
                onChange={handleLogoChange}                
                className='border-gray-300 w-[50%] text-gray-600'
                />
                              <p className="ml-2 text-xs text-gray-600">Minimum Size: 200px * 200px</p>

            </div>
            <div className='flex flex-col-2 flex-row mt-4'>
            <Avatar className="w-[20%] h-[20%] rounded-full border bg-gray-100 border-black overflow-hidden">
            <AvatarImage
                src={logo ? logo : "https://github.com/shadcn.png"}                 
                alt="" />
              </Avatar>
            </div>
           </div>

        <Separator className="my-8"/>

           <div className="items-center justify-center flex">
         <h4 className="font-semibold text-zinc-900">
        Make Sure to Read our Selling Terms and Policy !
          </h4>
          </div>

           <div className="items-center justify-center flex">
    <ScrollArea className="h-72 w-[60%] rounded-md border mt-6">
        <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Terms</h4>
            {tags.map((tag) => (
                <>
                    <div key={tag} className="text-sm">
                        {tag}
                    </div>
                    <Separator className="my-2" />
                </>
            ))}
        </div>
    </ScrollArea>
</div>


           <div className="flex items-center justify-center mt-8 space-x-2">
            <Checkbox id="terms"
            onClick={handleTermsCheckboxChange}                          
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>

            <div className=" flex justify-end items-end mt-[10%]">
            <div>
            <p className="mr-3 mb-2 text-sm text-gray-700">Done ? What are waiting for !</p>
            </div>
            <Button disabled={isPending || !logoFile || storeName==="" || !termsAccepted || phoneNumber.length != 8}
              onClick={createStore} className="w-[30%]">Create Store Now
              <MousePointerClick className="ml-2"/>
            </Button>
            </div>
      </div>
    </div>
    </>
  )
}

export default Page


