/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client'

import * as React from "react"
import Link from 'next/link'

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useTransition } from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Icons } from "@/components/Icons"
import { ArrowRight, Loader } from "lucide-react"
import { updatePass } from "./actions"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { User } from "@prisma/client"

const passwordSchema = z.string().min(8,{
  message: 'At least 8 characters required !'
})



const ResetPassView = ({status , user} : {status : string , user? : User}) => {
  const router = useRouter()
  const { toast } = useToast()
  const [passwordError, setpasswordError] = useState("");
  const [passwordsuccess, setpasswordsuccess] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const [newPassword, setNewPassword] = useState(""); // State for storing new password

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };
  
  const handleSubmit = async () => {
    try {
      passwordSchema.parse(newPassword);
      setpasswordError("");
      setisLoading(true)
      const res = await updatePass(user?.id!,newPassword)
      if(res){
        setpasswordsuccess("Your password has been updated successfully !");
        toast({
          title: 'Password updated',
          description: 'Your password has been updated successfully! Try to sign In again',
          variant: 'default',
        }); 
        router.push("/auth/sign-in")
      }
      else{      
        setisLoading(false)
        setpasswordError("Something went wrong !")
      }


    } catch (e) {
      if (e instanceof z.ZodError) {
        setpasswordError(e.errors[0].message);
        return
      }
      setisLoading(false)
      console.log(e)
    }
  };

  return (
    <>
      <div className='container relative flex pt-40 flex-col items-center justify-center lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <img src="/resetPasswordIcon.png" className='h-20 w-20' />
            {status === "success" && (

              <>
            <h1 className='text-2xl font-semibold tracking-tight'>
                Reset Your Password !
            </h1>

            <div className="flex flex-col items-center justify-center">
            <div className="mb-2">
                <Label>User Email: <span className="text-blue-700">{user?.email}</span></Label>
              </div>
              <div className="mb-2">
                <Label>New Password:</Label>
              </div>
              <div>
                <Input
                  placeholder="********"
                  type="password" 
                  className=""
                  value={newPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="mt-2">
              <FormError message={passwordError}  />
              <FormSuccess message={passwordsuccess}  />
              </div>

              <Button disabled={isLoading} onClick={handleSubmit} className="mt-2">
              {isLoading ? (<Loader className="animate-spin"/>) 
              : ("Reset Password")}               
                </Button>
            </div>

              </>
                )}

            {status === "error" && (

            <>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Please make sure to check your emails !
            </h1>
            </>
              )}

              {status === "noUser" && (

              <>
              <h1 className='text-2xl font-semibold tracking-tight'>
                No User found !
              </h1>
              <Link
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
              href='/auth/sign-up'>
                Try to Sign-Up
              <ArrowRight className='h-4 w-4' />
            </Link>
              </>
                )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassView