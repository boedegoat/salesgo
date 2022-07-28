import { useTheme } from "next-themes";
import { useCallback } from "react";

const useDarkMode = () => {
    const { theme, setTheme, systemTheme } = useTheme();

    const toggleTheme = useCallback(() => {
        const currentTheme = theme === "system" ? systemTheme : theme;

        if (currentTheme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }, [theme, systemTheme]);

    return { theme, toggleTheme };
};

export default useDarkMode;
