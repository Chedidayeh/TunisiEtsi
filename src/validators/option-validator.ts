// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-rose-950 border-rose-950
// bg-purple-950 border-purple-950
// bg-green-950 border-green-950
// bg-white-950 border-white-950


import { Variant } from 'framer-motion';

export const COLORS = [
  { label: 'Black', value: 'black', tw: 'zinc-900' },
  {
    label: 'Blue',
    value: 'blue',
    tw: 'blue-950',
  },
  { label: 'Rose', value: 'rose', tw: 'rose-950' },
] as const

export const SIZES = {
  name: 'sizes',
  options: [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
    { label: 'XL', value: 'xl' },
    { label: 'XXL', value: 'xxl' },
  ],
} as const;

export const CATEGORIES = {
  name: 'categories',
  options: [
    { 
      label: 'Oversized Tshirts', 
      href : '/MarketPlace/category/Oversized Tshirts',
      value: "/front_oversize_tshirt_black.jpg", 
      colors: [
        { label: 'Black', value: 'black', tw: 'zinc-900', frontImageUrl: '/front_oversize_tshirt_black.jpg' ,backImageUrl: '/back_oversize_tshirt_black.jpg'  },
        { label: 'Blue', value: 'blue', tw: 'blue-950', frontImageUrl: '/front_oversize_tshirt_blue.jpg',backImageUrl: '/back_oversize_tshirt_blue.jpg'   },
        { label: 'White', value: 'white', tw: 'white-950', frontImageUrl: '/front_oversize_tshirt_white.jpg',backImageUrl: '/back_oversize_tshirt_white.jpg'  }
      ], 
      price: 10 ,
      sizes: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'XL', value: 'xl' },
        { label: 'XXL', value: 'xxl' },
      ], 
      frontBorder :  [
        { label: 'top', value: "23%" },
        { label: 'bottom', value: "26%" },
        { label: 'right', value: "28%" },
        { label: 'left', value: "26%" },

      ], 
      backBorder :  [
        { label: 'top', value: "21%" },
        { label: 'bottom', value: "21%" },
        { label: 'right', value: "25%" },
        { label: 'left', value: "29%" },
      ],
    },
    { 
      label: 'Hoodies',
      href : '/MarketPlace/category/Hoodies',
      value: "/front_hoodie_black.jpg", 
      colors: [
        { label: 'Black', value: 'black', tw: 'zinc-900', frontImageUrl: '/front_hoodie_black.jpg', backImageUrl: '/back_hoodie_black.jpg' },
        { label: 'Green', value: 'green', tw: 'green-950', frontImageUrl: '/front_hoodie_green.jpg', backImageUrl: '/back_hoodie_green.jpg' },
        { label: 'Purple', value: 'purple', tw: 'purple-950', frontImageUrl: '/front_hoodie_purple.jpg', backImageUrl: '/back_hoodie_purple.jpg'}
      ], 
      price: 15 ,
      sizes: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'XL', value: 'xl' },
      ] ,
      frontBorder :  [
        { label: 'top', value: "37%" },
        { label: 'bottom', value: "35%" },
        { label: 'right', value: "33%" },
        { label: 'left', value: "33%" },
      ],
      backBorder :  [
        { label: 'top', value: "34%" },
        { label: 'bottom', value: "23%" },
        { label: 'right', value: "33%" },
        { label: 'left', value: "33%" },

      ],
    },
    
  ],
} as const;




export const MODELS = {
  name: 'models',
  options: [
    {
      label: 'iPhone X',
      value: 'iphonex',
    },
    {
      label: 'iPhone 11',
      value: 'iphone11',
    },
    {
      label: 'iPhone 12',
      value: 'iphone12',
    },
    {
      label: 'iPhone 13',
      value: 'iphone13',
    },
    {
      label: 'iPhone 14',
      value: 'iphone14',
    },
    {
      label: 'iPhone 15',
      value: 'iphone15',
    },
  ],
} as const



