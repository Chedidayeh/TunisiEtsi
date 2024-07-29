import type { Metadata } from "next";
import "@/app/globals.css"
import Navbar from "@/components/PodProducts/NavBar";
import SearchBar from "@/components/PodProducts/SearchBar";
import Footer from "@/components/Footer";

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
            <Navbar/>
            <SearchBar/>
            {children}
            <Footer/>
           </div>

  );
}
