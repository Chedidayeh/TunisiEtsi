
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import DashboardSideBar from "@/components/sellerDashboard/DashboardSideBar";
import SideBar from "@/components/sellerDashboard/SideBar";
import NavBar from "@/components/sellerDashboard/NavBar";


const Layout = ({ children }: { children: ReactNode }) => {
    return (
      <>
         <div className="grid min-h-screen w-full md:grid-cols-[210px_1fr]"> {/* Updated grid columns */}
        <SideBar />
           <div className="flex flex-col">
        <NavBar />
        <div className="p-8">
        {children}
        </div>
        </div>
        </div>
    </>
  );
}

export default Layout