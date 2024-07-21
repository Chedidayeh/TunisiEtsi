'use server';

import { getUser } from "@/actions/actions";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import SearchedProducts from "./SearchedProducts";
import PerkSection from "@/components/PodProducts/PerkSection";
import { searchProducts } from "./actions";


interface PageProps {
  params: {
    searchQuery: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { searchQuery } = params;

  try {
    const user = await getUser()
    const products = await searchProducts(searchQuery)

    return (
      <>

          {/* best selling section */}
              <section className='border-t border-gray-200 bg-white w-full mx-auto' >
                <div className='w-[85%] mx-auto'>
                <SearchedProducts
                     user={user!}
                     products={products!}
                />
                </div>
              </section>
          


    </>
    )


  } catch (error) {
    

  }
};

export default Page;
