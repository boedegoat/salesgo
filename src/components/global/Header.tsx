import { MenuAlt2Icon, MoonIcon } from "@heroicons/react/outline";
import { MoonIcon as MoonIconSolid } from "@heroicons/react/solid";
import { useDarkMode } from "@/hooks";
import { useEffect, useState } from "react";
import cn from "classnames";

const Header = () => {
    const { theme, toggleTheme } = useDarkMode();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const scrollHandler = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", scrollHandler);
        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    return (
        <header
            className={cn(
                "sticky top-0 wrapper bg-white dark:bg-slate-900/30 dark:backdrop-blur py-5 flex items-center justify-between space-x-5",
                scrolled && "shadow-sm"
            )}
        >
            {/* menu button */}
            <button className="text-slate-400">
                <MenuAlt2Icon className="w-7 h-7" />
            </button>

            {/* toggle darkmode button */}
            <button className="text-slate-400" onClick={toggleTheme}>
                {theme === "dark" ? (
                    <MoonIconSolid className="w-7 h-7 text-teal-500" />
                ) : (
                    <MoonIcon className="w-7 h-7" />
                )}
            </button>
        </header>
    );
};

export default Header;
