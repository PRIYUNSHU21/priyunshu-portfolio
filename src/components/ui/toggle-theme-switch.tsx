import { motion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useToast } from "@/hooks/use-toast";

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

export const ToggleThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    
    const themeMessages = {
      light: { title: "☀️ Light Mode", description: "Switched to light theme" },
      dark: { title: "🌙 Dark Mode", description: "Switched to dark theme" },
      system: { title: "💻 System Mode", description: "Following your system preference" }
    };
    
    toast({
      title: themeMessages[newTheme].title,
      description: themeMessages[newTheme].description,
      duration: 2000,
    });
  };

  const getSliderPosition = () => {
    switch (theme) {
      case "light": return "justify-start";
      case "dark": return "justify-center"; 
      case "system": 
      default: return "justify-end";
    }
  };

  return (
    <div className="relative flex w-fit items-center rounded-full border border-accent/20 bg-background/80 backdrop-blur-sm shadow-lg">
      <button
        className={`${TOGGLE_CLASSES} ${
          theme === "light" ? "text-white" : "text-muted-foreground hover:text-accent"
        }`}
        onClick={() => handleThemeChange("light")}
      >
        <Sun className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10 hidden sm:inline">Light</span>
      </button>
      
      <button
        className={`${TOGGLE_CLASSES} ${
          theme === "dark" ? "text-white" : "text-muted-foreground hover:text-accent"
        }`}
        onClick={() => handleThemeChange("dark")}
      >
        <Moon className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10 hidden sm:inline">Dark</span>
      </button>
      
      <button
        className={`${TOGGLE_CLASSES} ${
          theme === "system" ? "text-white" : "text-muted-foreground hover:text-accent"
        }`}
        onClick={() => handleThemeChange("system")}
      >
        <Monitor className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10 hidden sm:inline">System</span>
      </button>
      
      <div
        className={`absolute inset-0 z-0 flex ${getSliderPosition()}`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/3 rounded-full bg-gradient-to-r from-accent to-secondary shadow-md"
        />
      </div>
    </div>
  );
};
