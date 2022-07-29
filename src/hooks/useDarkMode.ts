import { useTheme } from "next-themes";
import { useCallback } from "react";
import useMounted from "./useMounted";

const useDarkMode = () => {
    const { theme, setTheme, systemTheme } = useTheme();
    const mounted = useMounted();

    const toggleTheme = useCallback(() => {
        const currentTheme = theme === "system" ? systemTheme : theme;

        if (currentTheme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }, [theme, systemTheme]);

    if (!mounted) return {};
    return { theme, toggleTheme };
};

export default useDarkMode;
