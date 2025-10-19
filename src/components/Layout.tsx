import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full bg-white dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;