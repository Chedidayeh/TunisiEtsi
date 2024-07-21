
import { CATEGORIES } from "@/validators/option-validator";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Metadata } from 'next'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// function will return the sizes of the selected product
export function getSizeList(category : string) {
  // Find the category object in the CATEGORIES options array
  const categoryObj = CATEGORIES.options.find(option => option.label === category);

  // If the category object is found, return the sizes array
  if (categoryObj) {
    return categoryObj.sizes.map(size => size.value);
  } else {
    // If category not found, return null or handle the error accordingly
    return null;
  }
}


export function constructMetadata({
  title = 'TuniPod - Custom High-Quality T-Shirts',
  description = 'Create custom high-quality T-shirts in seconds',
  image = '/thumbnail.png',
  icons = '/favicon.ico',
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@chedidayeh',
    },
    icons,
    metadataBase: new URL("https://tunipod.vercel.app/")
  }
}





