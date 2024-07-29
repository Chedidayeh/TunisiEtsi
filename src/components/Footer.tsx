import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'

const Footer = () => {
  return (
    <footer className='h-20 relative'>
      <MaxWidthWrapper>
      <div className='border-t border-gray-200 my-2' style={{ backgroundColor: '#FC8EAC' }} />

      <div className='p-4'>

<div className='flex mb-4 flex-col md:flex-row md:justify-between justify-center items-center space-y-4 md:space-y-0 md:space-x-4'>
  <div className='text-center md:text-left'>
    <p className='text-sm text-muted-foreground mx-4'>
      <span className='text-blue-500'>TunisiEtsi</span> is a vibrant Tunisian platform that 
      empowers exceptional designers to unleash their creativity with our cutting-edge 
      print-on-demand services. But that’s not all—we offer a range of features beyond 
      POD to elevate your fashion experience. From exclusive collections to personalized 
      shopping experiences, we provide top-notch clothing quality and innovative solutions 
      to meet all your style needs. Join us at TunisiEtsi, where your designs come to life, 
      and discover a world of fashion that goes beyond the ordinary.
    </p>
  </div>
</div>

<div className='flex flex-col md:flex-row md:justify-between justify-center items-center space-y-4 md:space-y-0 md:space-x-4'>
  <div className='text-center md:text-left'>
    <p className='text-sm text-muted-foreground mx-4'>
      &copy; {new Date().getFullYear()}. All rights reserved. TunisiEtsi.tn
    </p>
  </div>

  <div className='flex items-center justify-center'>
    <div className='flex flex-col md:flex-row md:space-x-8'>
      <Link href='#' className='text-sm text-muted-foreground hover:text-gray-600 mx-2'>
        Terms
      </Link>
      <Link href='#' className='text-sm text-muted-foreground hover:text-gray-600 mx-2'>
        Selling Policy
      </Link>
      <Link href='#' className='text-sm text-muted-foreground hover:text-gray-600 mx-2'>
        Privacy Policy
      </Link>
      <Link href='#' className='text-sm text-muted-foreground hover:text-gray-600 mx-2'>
        Cookie Policy
      </Link>
    </div>
  </div>
</div>
</div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer