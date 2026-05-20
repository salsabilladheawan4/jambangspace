import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout({ userRole, userName, onLogout }) {
    return (
    <div className="bg-[#121212] min-h-screen flex font-instrument">
      {/* Meneruskan properti ke komponen anak */}
      <Sidebar userRole={userRole} onLogout={onLogout} /> 
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userRole={userRole} userName={userName} />
        <div className="flex-1 overflow-y-auto px-10 pb-10">
          <Outlet />
        </div>
      </div>
    </div>
    );
}