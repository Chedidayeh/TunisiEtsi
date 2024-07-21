/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client'

import * as React from "react"
import Link from 'next/link'
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
import { Button, buttonVariants } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { useEffect, useState, useTransition } from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { LoginSchema } from "../schemas"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { useToast } from "@/components/ui/use-toast"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { Icons } from "@/components/Icons"
import { ArrowRight, Loader } from "lucide-react"
import { login, resetPassword } from "./actions"
import { useRouter } from "next/navigation"
import { getUserByEmail } from "@/userData/user"
const emailSchema = z.string().email("Invalid email address");

const Page = () => {


  const router = useRouter()
  const [refreshCount, setRefreshCount] = useState(0);
  
  useEffect(() => {
    if (refreshCount < 1) {
      const timer = setTimeout(() => {
        setRefreshCount(refreshCount + 1);
        router.refresh();
      }, 1000); // Delay of 1 second between refreshes, adjust as needed

      return () => clearTimeout(timer);
    }
  }, [refreshCount, router]);
  
  const isSeller = false
  const [isResetPassword , setisResetPassword] = useState<boolean>(false)
  const [resetPassEmail, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailsuccess, setEmailSuccess] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const [error , setError] = useState<string>("")
  const [success , setSuccess] = useState<string>("")
  const [isPending , stratTranstion ] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof LoginSchema>) {

    stratTranstion(()=> {
      login(values)
      .then((data)=>{
        setError(data?.error);
        setSuccess(data?.success);
      })
    })
  }

  const handleSubmit = async () => {
    try {
      emailSchema.parse(resetPassEmail);
      setEmailError("");
      const user = await getUserByEmail(resetPassEmail)
      if(!user){
        setEmailError("No account found with this email !")
        return
      }
      setisLoading(true)
      const res = await resetPassword(user)
      if(res){
        setEmailSuccess("Password reset link sent to your email !")
        setisLoading(false)
      }


    } catch (e) {
      if (e instanceof z.ZodError) {
        setEmailError(e.errors[0].message);
        return
      }
      setisLoading(false)
      console.log(e)
    }
  };










  return (
    <>
                                  <AlertDialog open={isResetPassword}>
                                       <AlertDialogTrigger asChild>
                                        </AlertDialogTrigger>
                                            <AlertDialogContent className=" flex flex-col items-center justify-center">
                                            <div className="text-2xl text-blue-700 font-bold text-center">
                                            Reset your password !
                                            </div>
                                            <AlertDialogDescription className="flex flex-col items-center">
                                            Enter your email to get your link.
                                          </AlertDialogDescription>
                                              <div className="flex items-center justify-center">
                                              <Input disabled={false}
                                              placeholder="example@gmail.com"
                                              onChange={(e) => setEmail(e.target.value)}
                                              value={resetPassEmail}
                                              type="email" 
                                              className="bg-gray-100"/>
                                              </div>
                                              <FormError message={emailError}  />
                                              <FormSuccess message={emailsuccess}  />

                                         <AlertDialogFooter>
                                      
                                     <AlertDialogCancel onClick={()=>{
                                      setEmailError("")
                                      setEmailSuccess("")
                                      setEmail("")
                                      setisLoading(false)
                                      setisResetPassword(false)}}>
                                     Close</AlertDialogCancel>
                                     <AlertDialogAction disabled={isLoading} onClick={handleSubmit}>
                                      {isLoading ? (<Loader className="animate-spin"/>) 
                                      : ("Sent link")}
                                      </AlertDialogAction>

                                       </AlertDialogFooter>
                                        </AlertDialogContent>
                                  </AlertDialog>



      <div className='container relative flex pt-10 pb-10 flex-col items-center justify-center lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <img src="/signIn.png" className="w-[30%] h-[30%] " alt="" />
            <h1 className='text-2xl font-semibold tracking-tight'>
              Sign in to your {isSeller ? 'seller' : ''}{' '}
              account
            </h1>

            <Link
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
              href='/auth/sign-up'>
              Don&apos;t have an account?
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>

          <div className='grid gap-6'>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className='grid gap-2 space-y-2'>
              <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input disabled={isPending}
                        placeholder="example@gmail.com"
                         {...field} 
                         type="email" 
                         className="bg-gray-100"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input disabled={isPending}
                              placeholder="********" 
                              {...field} 
                              type="password" 
                              className="bg-gray-100"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
              </div>
              <FormError message={error}  />
              <FormSuccess message={success}  />
              <Button 
              disabled={isPending} 
              loadingText="Logging You" 
              isLoading={isPending} 
              className="w-full" 
              type="submit"
              >
                Login
              </Button>

            </form>
            </Form>
            <Button onClick={()=>setisResetPassword(true)} 
              variant="link">
                Forgot your password ?
                </Button>
            <div className='relative'>
              <div
                aria-hidden='true'
                className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  or
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page