/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState } from "react";
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image'
import {
  CircleArrowLeft,
  CircleArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import Link from "next/link";

const guideImages = [
  '/guide1.png',
  '/guide2.png',
  '/guide3.png',
  '/guide4.png',
  '/guide5.png',
];

const Page = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === guideImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? guideImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <h1 className="text-2xl font-semibold">User Guide</h1>
      <div className="flex flex-col gap-5 w-full">
        <section>
          <div className='mx-auto mt-10 mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50'>
            <p className='text-sm font-semibold text-gray-700'>
              You're all set!
            </p>
          </div>
          <div className="flex items-center justify-center">
            <h1 className='max-w-xl text-2xl font-bold md:text-1xl lg:text-2xl'>
              Follow our Guide{' '}
              <span className='text-purple-600'>to get started</span>{' '}
              in seconds.
            </h1>
          </div>

          <div className='mx-auto max-w-6xl px-6 lg:px-8'>
              <div className='mt-2 flow-root sm:mt-10'>
                <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                  <Image
                    src={"/user guide.png"}
                    alt='guide preview'
                    width={1620}
                    height={613}
                    quality={100}
                    className='rounded-md bg-white  object-fill shadow-2xl ring-1 ring-gray-900/10'
                  />
                </div>
              </div>
            </div>

          {/* Product section */}
          <div className='mx-auto mb-32 mt-20 max-w-5xl sm:mt-20'>
            <div className='mb-12 px-6 lg:px-8'>
              <div className='mx-auto max-w-2xl sm:text-center'>
                <h2 className='mt-2 font-bold text-3xl text-gray-900 sm:text-2xl'>
                  1-Product Creation
                </h2>
              </div>
            </div>

            {/* Steps */}
            <ol className='my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0'>
              <li className='md:flex-1'>
                <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-blue-600'>
                    Step 1
                  </span>
                  <span className='text-xl font-semibold'>
                    Choose a category
                  </span>
                  <span className='mt-2 text-zinc-700'>
                    Click on the select button !
                  </span>
                </div>
              </li>
              <li className='md:flex-1'>
                <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-blue-600'>
                    Step 2
                  </span>
                  <span className='text-xl font-semibold'>
                    Select either front or back or both designs to add
                  </span>
                  <span className='mt-2 text-zinc-700'>
                    Make sure to customize you designs on the product.Hold the blue edge to resize!
                  </span>
                </div>
              </li>
              <li className='md:flex-1'>
                <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-blue-600'>
                    Step 3
                  </span>
                  <span className='text-xl font-semibold'>
                    Fill the product details
                  </span>
                  <span className='mt-2 text-zinc-700'>
                    Make sure to select the colors and add some tags and add your profit.
                  </span>
                </div>
              </li>
            </ol>
            <div className='flex items-center justify-center mt-4'>
              <Button variant={"link"} className='mr-4 flex items-center' onClick={handlePrevious}>
                <CircleArrowLeft size={13} className='mr-1 inline-flex' />Previous
              </Button>
              <Button variant={"link"} className='ml-4 flex items-center' onClick={handleNext}>
                Next<CircleArrowRight size={13} className='ml-1 inline-flex' />
              </Button>
            </div>
            <div className='mx-auto max-w-6xl px-6 lg:px-8'>
              <div className='mt-2 flow-root sm:mt-10'>
                <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                  <Image
                    src={guideImages[currentImageIndex]}
                    alt='guide preview'
                    width={1920}
                    height={913}
                    quality={100}
                    className='rounded-md bg-white  object-fill shadow-2xl ring-1 ring-gray-900/10'
                  />
                </div>
              </div>
            </div>
            <div className='flex items-center justify-center mt-10'>
              <Link href={"/sellerDashboard/createProduct"}>
              <Button variant={"default"}>
                Get Started
              </Button>
              </Link>

            </div>
          </div>
        </section>

        <section className={cn('grid grid-cols-1 p-11 gap-4 transition-all lg:grid-cols-4')}>
        </section>
      </div>
    </>
  );
}

export default Page;
