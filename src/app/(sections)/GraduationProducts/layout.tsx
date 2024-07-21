import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "@/app/globals.css";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";
import { StoreProvider } from "@/store/StoreProvider";
import Navbar from "@/components/HomeNavBar";
import HomeNavBar from "@/components/HomeNavBar";
const recursive = Recursive({ subsets: ["latin-ext"] });


export const metadata: Metadata = {
  title: "TunisiEtsi",
  description: "Tunisian Platfrom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  


  return (


 
        <div className='flex-1 flex flex-col h-full'>
          <HomeNavBar/>
            {children}
          </div>

  );
}
