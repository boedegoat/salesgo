import { MenuAlt2Icon, MoonIcon } from "@heroicons/react/outline";
import { MoonIcon as MoonIconSolid } from "@heroicons/react/solid";
import { useDarkMode } from "@/hooks";

const Header = () => {
    const { theme, toggleTheme } = useDarkMode();

    return (
        <header className="wrapper my-5 flex items-center justify-between space-x-5">
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
