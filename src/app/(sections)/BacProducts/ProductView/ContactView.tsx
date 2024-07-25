import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import {
  Button,
  buttonVariants,
} from '@/components/ui/button'
import { Product } from '@prisma/client'
import {
  ArrowDownToLine,
  CheckCircle,
  Facebook,
  Headset,
  Instagram,
  Leaf,
  Mail,
  Pencil,
  Phone,
  Search,
  Truck,
} from 'lucide-react'

const ContactView = ()=>{
    const perks = [
        {
          name: '+216 56 027 257',
          Icon: Phone,

        },
        {
          name: 'Jebali Collection',
          Icon: Facebook,

        },
        {
          name: '@Jebali_Collection',
          Icon: Instagram,

        },
        {
          Icon: Mail,
          name: 'info@jebalicollection.com',
          
        }
      ]

    return (
        <section className='border-t border-gray-200 bg-muted/50'>
          <div className='text-center mt-4'>
        <h1 className='text-1xl font-bold tracking-tight  sm:text-2xl'>
            Contact {' '}
            <span className='text-yellow-500'>
            Info
            </span>
          </h1>
          </div>

        <MaxWidthWrapper className='py-4'>
          <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0'>
            {perks.map((perk) => (
              <div
                key={perk.name}
                className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
                <div className='md:flex-shrink-0 flex justify-center'>
                  <div className='h-16 w-16 flex items-center border-2 justify-center rounded-xl hover:bg-yellow-100 text-yellow-500'>
                    {<perk.Icon className='w-1/3 h-1/3' />}
                  </div>
                </div>

                <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                  <h3 className='text-base font-medium '>
                    {perk.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    )

}

export default ContactView