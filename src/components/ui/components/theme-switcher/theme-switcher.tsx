import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/primitives";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export function ThemeSwitcher() {
  const availableThemes = ["default", "ocean", "forest"] as const;
  const [themeName, setThemeName] =
    useState<(typeof availableThemes)[number]>("default");
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Theme:</span>
        <Select
          value={themeName}
          onValueChange={(name) =>
            setThemeName(name as (typeof availableThemes)[number])
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            {availableThemes.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleMode}
        aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
      >
        {mode === "light" ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
