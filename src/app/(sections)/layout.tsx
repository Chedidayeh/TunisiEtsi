import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "../globals.css";
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


    <html lang="en">
      <body className={recursive.className}>
      <StoreProvider>
      <main className='flex flex-col min-h-[calc(100vh-3.5rem-1px)]'>
        <div className='flex-1 flex flex-col h-full'>
           <Providers>
           {children}
           <Footer/>
            <Toaster/>
            </Providers>
          </div>
        </main> 
      </StoreProvider>
      </body>
    </html>

  );
}
