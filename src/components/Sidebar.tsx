import { NavLink } from "react-router-dom";
import { LayoutDashboard, User, Settings, BookText } from "lucide-react";
import { cn } from "@/lib/utils";

const SidebarLink = ({
  to,
  icon,
  children,
}: {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 transition-all hover:bg-gray-200 dark:hover:bg-gray-700",
          isActive && "bg-gray-200 dark:bg-gray-700 font-semibold"
        )
      }
    >
      {icon}
      {children}
    </NavLink>
  );
};

export const Sidebar = () => {
  return (
    <aside className="hidden md:flex md:w-64 flex-shrink-0 bg-gray-100 dark:bg-gray-800 p-4 flex-col">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold">TodoApp</h1>
      </div>
      <nav className="space-y-2">
        <SidebarLink to="/" icon={<LayoutDashboard size={20} />}>
          Dashboard
        </SidebarLink>
        <SidebarLink to="/profile" icon={<User size={20} />}>
          Profile
        </SidebarLink>
        <SidebarLink to="/diary" icon={<BookText size={20} />}>
          Diary
        </SidebarLink>
        <SidebarLink to="/settings" icon={<Settings size={20} />}>
          Settings
        </SidebarLink>
      </nav>
    </aside>
  );
};