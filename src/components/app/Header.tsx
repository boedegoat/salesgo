import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { MoonIcon } from "@heroicons/react/24/outline";
import { MoonIcon as MoonIconSolid } from "@heroicons/react/24/solid";
import { useDarkMode } from "@/hooks";
import { PageLink } from "@/components";

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
            className={twMerge(
                "sticky top-0 z-[999] bg-white dark:bg-slate-900/30 dark:backdrop-blur",
                scrolled && "shadow-sm"
            )}
        >
            <div className="wrapper py-5 flex items-center justify-between space-x-5">
                {/* {router.asPath !== "/" ? (
                    // back button
                    <button className="text-slate-400" onClick={router.back}>
                        <ChevronLeftIcon className="w-7 h-7" />
                    </button>
                ) : (
                    // menu button
                    <button className="text-slate-400">
                        <MenuAlt2Icon className="w-7 h-7" />
                    </button>
                )} */}
                <PageLink href="/" className="font-semibold">
                    🔍 Sales Tracker
                </PageLink>

                {/* toggle darkmode button */}
                <button className="text-slate-400" onClick={toggleTheme}>
                    {theme === "dark" ? (
                        <MoonIconSolid className="w-7 h-7 text-teal-500" />
                    ) : (
                        <MoonIcon className="w-7 h-7" />
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;
