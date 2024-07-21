/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
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
import { RegisterSchema } from "../../schemas"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Icons } from "@/components/Icons"
import { ArrowRight } from "lucide-react"
const EmailVerifiedView = ({status} : {status : string}) => {
  

  return (
    <>
      <div className='container relative flex pt-40 flex-col items-center justify-center lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <img src="/email-verification-icon.png" className='h-20 w-20' />
            {status === "success" && (

              <>
            <h1 className='text-2xl font-semibold tracking-tight'>
                Email successfully verified !
            </h1>

            <Link
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
              href='/auth/sign-in'>
                Try to Sign-in
              <ArrowRight className='h-4 w-4' />
            </Link>

              </>
                )}

            {status === "error" && (

            <>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Please make sure to verify you email !
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

export default EmailVerifiedView