/* eslint-disable @next/next/no-async-client-component */
'use server'


import { db } from '@/db';
import { error } from 'console';
import DesignConfigurator from './DesignConfigurator';
import { getAllCategories } from '@/actions/actions';
import { BackBorder, Category, Color, FrontBorder, Size } from '@prisma/client';



interface PageProps {
  searchParams: {
    [key: string]: string  | undefined
  }
}


const Page = async ({ searchParams }: PageProps) => {
  const categories = await getAllCategories()

  const { category , index } = searchParams;

  const selectedCat = categories[parseInt(index!)];

  const product = getCategoryByLabel(category? category : "Oversized Tshirts");

  function getCategoryByLabel(label: string) {
    return categories.find(category => category.label === label);
  }
  
  const sellersDesigns = await db.sellerDesign.findMany({
    where: { 
      isDesignForSale : true,
      isDesignAccepted : true,
    },
    include : {
      store : true
    }
  });

    if(!sellersDesigns){
    throw error ("there's no sellersDesigns");
    }

  


  return (

   <DesignConfigurator
    SellersDesignsData={sellersDesigns}
    product={product!}
    selectedCategory = {selectedCat}
  />
  
  );
};

export  default Page ;

