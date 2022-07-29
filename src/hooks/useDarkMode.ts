import { useTheme } from "next-themes";
import { useCallback, useMemo } from "react";
import useMounted from "./useMounted";

const useDarkMode = () => {
    const { theme, setTheme, systemTheme } = useTheme();
    const mounted = useMounted();

    const currentTheme = useMemo(
        () => (theme === "system" ? systemTheme : theme),
        [theme, systemTheme]
    );

    const toggleTheme = useCallback(() => {
        if (currentTheme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }, [theme, systemTheme]);

    if (!mounted) return {};
    return { theme: currentTheme, toggleTheme };
};

export default useDarkMode;
