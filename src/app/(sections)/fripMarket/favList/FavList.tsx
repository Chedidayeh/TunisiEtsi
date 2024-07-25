/* eslint-disable @next/next/no-img-element */
'use client'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Link from 'next/link'
import { FripProducts, Product, Store, User } from '@prisma/client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import ProductListing from "@/components/fripMarket/ProductListing"
import { Slider } from "@/components/ui/slider"


interface ProductReelProps {
  products? : FripProducts[]
  user : User
  brands : string[]
  categories : string[]

}
const FavList = ({ products, user , brands ,  categories }: ProductReelProps) => {
 


  const [sortBy, setSortBy] = useState<string>('');
  const [sortByCategory, setSortByCategory] = useState<string>('');
  const [sortByBrand, setSortByBrand] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 40]);
  const [sliderInitialized, setSliderInitialized] = useState<boolean>(false); // Flag for slider interaction

  // Memoize the sorted products to avoid unnecessary computations
  const sortedProducts = useMemo(() => {
    return [...(products || [])].sort((a, b) => {
      switch (sortBy) {
        case 'low':
          return a.price - b.price;
        case 'high':
          return b.price - a.price;
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [products, sortBy]);
  
  // Memoize the filtered products to avoid unnecessary computations
  const filteredProducts = useMemo(() => {
    let result = sortedProducts;
  
    if (sortByCategory) {
      result = result.filter((product) =>
        product.category.toLowerCase().includes(sortByCategory.toLowerCase())
      );
    }
  
    if (sortByBrand) {
      result = result.filter((product) =>
        product.brand.toLowerCase().includes(sortByBrand.toLowerCase())
      );
    }

    if (sliderInitialized) { // Apply price range filter only if slider is interacted with
      result = result.filter((product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
    }
  
    return result;
  }, [sortedProducts, sortByCategory, sortByBrand, priceRange, sliderInitialized]);
  
  const handleSortChange = (event: string) => {
    setSortBy(event);
    setCurrentPage(1); // Reset to first page on sort change
  };
  
  const handleCategorySortChange = (event: string) => {
    setSortByCategory(event);
    setCurrentPage(1); // Reset to first page on sort change
  };
  
  const handleBrandSortChange = (event: string) => {
    setSortByBrand(event);
    setCurrentPage(1); // Reset to first page on sort change
  };



  const handlePriceRangeChange = (value: string) => {
    const ranges: { [key: string]: [number, number] } = {
      '1-10': [1, 10],
      '10-20': [10, 20],
      '20-40': [20, 40]
    };
    setPriceRange(ranges[value]);
    setSliderInitialized(true)
    setCurrentPage(1); // Reset to first page on price range change
  };




        // Pagination 
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 16; // Display products per page

    const paginatedProducts = useMemo(() => {
      const start = (currentPage - 1) * itemsPerPage;
      return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage, itemsPerPage]);
  
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };

    const renderPaginationItems = () => {
      const paginationItems = [];

      // Less than or equal to 10 pages
      if (totalPages <= 2) {
        for (let i = 1; i <= totalPages; i++) {
          paginationItems.push(
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(i);
                }}
                isActive={currentPage === i}
                style={{ cursor: 'pointer' }}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      } 

      // More than 10 pages:
      else {

          // Start ellipsis logic
        if (currentPage > 3) {
          paginationItems.push(
            <PaginationItem key={1}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(1);
                }}
                style={{ cursor: 'pointer' }}
              >
                1
              </PaginationLink>
            </PaginationItem>,
            <PaginationEllipsis key="start-ellipsis" />
          );
        }


    // Middle pages logic
        const startPage = Math.max(2, currentPage - 2);
        const endPage = Math.min(totalPages - 1, currentPage + 2);
  
        for (let i = startPage; i <= endPage; i++) {
          paginationItems.push(
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(i);
                }}
                isActive={currentPage === i}
                style={{ cursor: 'pointer' }}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }


    // End ellipsis logic
        if (currentPage < totalPages - 2) {
          paginationItems.push(
            <PaginationEllipsis key="end-ellipsis" />,
            <PaginationItem key={totalPages}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(totalPages);
                }}
                style={{ cursor: 'pointer' }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          );
        }
      }
  
      return paginationItems;
    };

  return (
    <section className='py-4'>
     
     <div className='bg-muted/50 rounded-xl py-10 mx-auto text-center flex flex-col items-center max-w-1xl'>
          <h1 className='text-4xl font-bold tracking-tight  sm:text-5xl'>
            Your{' '}
            <span className='text-purple-600'>
            FavList
            </span>
          </h1>
          <p className='mt-2 text-sm text-muted-foreground'>
              Enjoy shopping
            </p>    

            <div className="flex flex-col">
            <div className="flex flex-col gap-2 md:flex-row">
            <div className="mt-3 flex-1">
        <Select onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px] ">
                <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Select</SelectLabel>
                    <SelectItem value="high">Highst Price</SelectItem>
                    <SelectItem value="low">Lowest Price</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select> 
    </div>
    <div className="mt-3 flex-1">
            <Select onValueChange={handleCategorySortChange}>
            <SelectTrigger className="w-[180px] ">
                <SelectValue placeholder="Filter By Category" />
            </SelectTrigger>
            <SelectContent>
            <SelectGroup>
                    <SelectLabel>Select</SelectLabel>
                    {categories.map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
            </SelectContent>
        </Select> 
    </div>
    <div className="mt-3 flex-1">
            <Select onValueChange={handleBrandSortChange}>
            <SelectTrigger className="w-[180px] ">
                <SelectValue placeholder="Filter By Brand" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Select</SelectLabel>
                    {brands.map((brand, index) => (
                    <SelectItem key={index} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectGroup>
            </SelectContent>
        </Select> 
    </div>
    <div className="mt-3 flex-1">
    <Select onValueChange={handlePriceRangeChange}>
    <SelectTrigger className="w-[180px] ">
      <SelectValue placeholder="Select Price Range" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Select Price Range</SelectLabel>
        <SelectItem value="1-10">1 TND - 10 TND</SelectItem>
        <SelectItem value="10-20">10 TND - 20 TND</SelectItem>
        <SelectItem value="20-40">20 TND - 40 TND</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
    </div>
            </div>

            <div className="mt-4 text-gray-600 text-sm flex-1">
    <div className="mt-4">Price Range: {priceRange[0]} TND - {priceRange[1]} TND</div>
    </div>
  <div className="mt-3 text-gray-600 text-sm">
    Total Products found: {paginatedProducts.length}
  </div>
    </div>

              
            </div>

            <div className='relative my-4'>

            {paginatedProducts.length === 0 ? (
              <div className='flex h-full flex-col items-center justify-center space-y-1'>
                <div
                  aria-hidden='true'
                  className='relative mb-4 h-40 w-40 text-muted-foreground'>
                  <img
                    src='/hippo-empty-cart.png'
                    loading='eager'
                    alt='empty shopping cart hippo'
                  />
                </div>
                <h3 className='font-semibold text-2xl'>
                  Your FavList is empty
                </h3>
                <p className='text-muted-foreground text-center'>
                  Whoops! Nothing to show here yet.
                </p>
                <Link href="/MarketPlace" className='text-blue-600 text-sm'>
                Add items to your FavList
                </Link>
              </div>
            ) : (
              <>
            
        <div className=' w-full grid 
              lg:grid-cols-4 
              md:grid-cols-2 
              sm:grid-cols-1
              gap-y-10
              sm:gap-x-8  
              md:gap-y-10
              lg:gap-x-4'>

            {paginatedProducts?.map((product, index) => (
              <ProductListing
                user={user}
                key={`product-${index}`}
                product={product}
                index={index+1}
              />
            ))} 

          </div>


          <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  className={currentPage === 1 ? 'disabled' : ''}
                  aria-disabled={currentPage === 1}
                  style={{ cursor: currentPage === 1 ? 'default' : 'pointer' }}
                />
              </PaginationItem>
              {renderPaginationItems()}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? 'disabled' : ''}
                  aria-disabled={currentPage === totalPages}
                  style={{ cursor: currentPage === totalPages ? 'default' : 'pointer' }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        </>
            )}

   
      </div>
    </section>
  )


  
}




export default FavList