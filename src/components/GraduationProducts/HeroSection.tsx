import React from 'react'
import ImageSlider from '../PodProducts/ImageSlider'
import NextImage from 'next/image'

const HeroSection = () => {

  return (
    <section className='w-[70%] mx-auto my-4'>
    <div className='flex justify-center'>
        <NextImage src={"/GraduationBanner.png"} className='rounded-2xl w-full' width={3000} height={3000} alt=''/>
    </div>
    </section>

  )
}

export default HeroSection
