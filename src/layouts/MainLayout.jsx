import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
    return (
    <div className="bg-[#121212] min-h-screen flex font-instrument">
      <Sidebar /> 
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
    );
}