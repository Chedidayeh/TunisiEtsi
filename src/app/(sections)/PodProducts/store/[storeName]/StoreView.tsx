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
import { Product, SellerDesign, User } from '@prisma/client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ProductListing from "@/components/PodProducts/ProductListing"
import { useEffect, useMemo, useState } from "react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Heart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Store} from '@prisma/client'
import { checkUserLike, updateStoreLikes } from "./actions"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface StoreDetails extends Store {
  products: Productswithstore[];
  designs: SellerDesign[];
}

interface Productswithstore extends Product {
  store : Store
}
interface ProductReelProps {
  store : StoreDetails
  user : User

}
const StoreView = ({ store, user }: ProductReelProps) => {
  
  const products = store?.products
  const { toast } = useToast()
  const router = useRouter()
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 40]);
  const [sliderInitialized, setSliderInitialized] = useState<boolean>(false); // Flag for slider interaction

  // Sorting function based on sortBy criteria
  const [sortBy, setSortBy] = useState<string>(''); // State for selected sort option
  const [sortByCategory, setSortByCategory] = useState<string>("");

  const sortedProducts = useMemo(() => {
    return [...(products || [])].sort((a, b) => {    switch (sortBy) {
      case 'low':
        return a.price - b.price;
        case 'high':
        return b.price - a.price;
      case 'likes':
        return b.likes - a.likes;
      case 'sales':
        return b.totalSales - a.totalSales; 
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

    if (sliderInitialized) { // Apply price range filter only if slider is interacted with
      result = result.filter((product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
    }
  
  
    return result;
  }, [sortedProducts, sortByCategory, priceRange, sliderInitialized]);
  const handleSortChange = (event: string) => {
    setSortBy(event); 
    setCurrentPage(1); // Reset to first page on sort change

  };


  const handleCategorySortChange = (event: string) => {
    setSortByCategory(event);
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




    // manage likes :
    const [liked, setLiked] = useState(false);

    useEffect(() => {
      // Function to check if the store is liked by the user (optional)
      const checkIfLiked = async () => {
        try {
          const response = await checkUserLike(store!.id , user.id)
          console.log(response)
          setLiked(response);
        } catch (error) {
          console.error('Error checking if liked:', error);
        }
      };
  
      checkIfLiked();
    }, );


    const handleLikeClick = async () => {
      if (!user) {
        toast({
          title: 'No logged in user found !',
          description: 'Try to login first!',
          variant: 'destructive',
        });
        return;
      }
      try {
        await updateStoreLikes(store?.id!, user.id, !liked)  
        setLiked(!liked);
        toast({
          title: !liked ? 'Store liked' : 'Store unliked',
          description: '',
          variant: 'default',
        }); 
        router.refresh()
        return
      } catch (error) {
        console.error('Error updating likes:', error);
      }
    };


  return (

    
    <section className='py-4'>
     
     <div className='py-10 bg-muted/50 rounded-xl mx-auto text-center flex flex-col items-center max-w-1xl'>

     <div className="flex flex-col items-center text-center">
  <Avatar className="shadow-2xl shadow-blue-200 w-[40%] h-[40%] sm:w-[30%] sm:h-[30%] md:w-[20%] md:h-[20%] lg:w-[10%] lg:h-[10%] rounded-full border bg-gray-100 border-black overflow-hidden">
    <AvatarImage
      src={store?.logoUrl!}
      alt=""
    />
  </Avatar>
  <h1 className="text-xl mt-4 font-bold tracking-tight sm:text-xl">
    <span className="text-blue-600">
      {store?.storeName}{' '}
    </span>
  </h1>
  <p className="mt-2 text-sm text-muted-foreground">
    {store?.storeBio}
  </p>
</div>



     



            <div className="flex flex-col">
  <div className="flex flex-col gap-2 md:flex-row md:items-center">
    <div className="mt-3 flex-1">
      <Select onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px] ">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select</SelectLabel>
            <SelectItem value="high">Highest Price</SelectItem>
            <SelectItem value="low">Lowest Price</SelectItem>
            <SelectItem value="likes">Most Liked</SelectItem>
            <SelectItem value="sales">Most Selled</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div className="mt-3 flex-1">
      <Select onValueChange={handleCategorySortChange}>
        <SelectTrigger className="w-[180px] ">
          <SelectValue placeholder="Sort By Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select</SelectLabel>
            <SelectItem value="Oversized Tshirts">Oversized Tshirts</SelectItem>
            <SelectItem value="Hoodies">Hoodies</SelectItem>
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
    <div className="mt-2 flex justify-center md:mt-3 md:ml-2 md:flex-none">
        <div
      className={`h-10 w-10 group cursor-pointer flex items-center justify-center rounded-full 
        ${liked ? 'bg-pink-50 text-red-700' : 'bg-pink-50 text-gray-700'} hover:text-red-700`}
      onClick={handleLikeClick}
    >
      <Heart className={`w-1/2 h-1/2 ${liked ? 'fill-current text-red-700' : ''}`} />
    </div>
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
            {paginatedProducts.length > 0 && (
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




export default StoreView