import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/hooks/use-theme"
import { useToast } from "@/hooks/use-toast"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme)
    
    const themeMessages = {
      light: { title: "☀️ Light Mode", description: "Switched to light theme" },
      dark: { title: "🌙 Dark Mode", description: "Switched to dark theme" },
      system: { title: "💻 System Mode", description: "Following your system preference" }
    }
    
    toast({
      title: themeMessages[newTheme].title,
      description: themeMessages[newTheme].description,
      duration: 2000,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="relative overflow-hidden bg-background/80 backdrop-blur-sm border-accent/20 hover:bg-accent/10 hover:border-accent/40 transition-all duration-300 group shadow-sm dark:bg-white/90 dark:border-white/20 dark:hover:bg-white dark:hover:border-white/40"
        >
          {/* Sun Icon */}
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-accent group-hover:text-accent/80 dark:text-gray-700 dark:group-hover:text-gray-800" />
          
          {/* Moon Icon */}
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-accent group-hover:text-accent/80 dark:text-gray-700 dark:group-hover:text-gray-800" />
          
          {/* Subtle Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md dark:from-gray-100/20 dark:to-gray-200/20" />
          
          <span className="sr-only">Toggle theme (Ctrl+Shift+T)</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="bg-background/95 backdrop-blur-sm border-accent/20 shadow-lg dark:bg-white/95 dark:border-white/20"
      >
        <DropdownMenuItem 
          onClick={() => handleThemeChange("light")}
          className="cursor-pointer hover:bg-accent/10 transition-colors duration-200 focus:bg-accent/10 dark:hover:bg-gray-100 dark:focus:bg-gray-100"
        >
          <Sun className="mr-2 h-4 w-4 text-accent dark:text-gray-700" />
          <span className={theme === "light" ? "font-semibold text-foreground dark:text-gray-800" : "text-muted-foreground dark:text-gray-600"}>
            Light
          </span>
          {theme === "light" && (
            <div className="ml-auto w-2 h-2 bg-accent dark:bg-gray-700 rounded-full animate-pulse" />
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleThemeChange("dark")}
          className="cursor-pointer hover:bg-accent/10 transition-colors duration-200 focus:bg-accent/10 dark:hover:bg-gray-100 dark:focus:bg-gray-100"
        >
          <Moon className="mr-2 h-4 w-4 text-accent dark:text-gray-700" />
          <span className={theme === "dark" ? "font-semibold text-foreground dark:text-gray-800" : "text-muted-foreground dark:text-gray-600"}>
            Dark
          </span>
          {theme === "dark" && (
            <div className="ml-auto w-2 h-2 bg-accent dark:bg-gray-700 rounded-full animate-pulse" />
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleThemeChange("system")}
          className="cursor-pointer hover:bg-accent/10 transition-colors duration-200 focus:bg-accent/10 dark:hover:bg-gray-100 dark:focus:bg-gray-100"
        >
          <Monitor className="mr-2 h-4 w-4 text-accent dark:text-gray-700" />
          <span className={theme === "system" ? "font-semibold text-foreground dark:text-gray-800" : "text-muted-foreground dark:text-gray-600"}>
            System
          </span>
          {theme === "system" && (
            <div className="ml-auto w-2 h-2 bg-accent dark:bg-gray-700 rounded-full animate-pulse" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
