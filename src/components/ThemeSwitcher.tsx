import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={theme === "light" ? "secondary" : "ghost"}
        onClick={() => setTheme("light")}
        className="flex items-center gap-2"
      >
        <Sun size={16} /> Light
      </Button>
      <Button
        variant={theme === "dark" ? "secondary" : "ghost"}
        onClick={() => setTheme("dark")}
        className="flex items-center gap-2"
      >
        <Moon size={16} /> Dark
      </Button>
      <Button
        variant={theme === "system" ? "secondary" : "ghost"}
        onClick={() => setTheme("system")}
      >
        System
      </Button>
    </div>
  );
}