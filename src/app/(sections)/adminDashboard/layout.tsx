
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import DashboardSideBar from "@/components/adminDashboard/DashboardSideBar";
import "@/app/globals.css";
import SideBar from "@/components/adminDashboard/SideBar";
import NavBar from "@/components/adminDashboard/NavBar";


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