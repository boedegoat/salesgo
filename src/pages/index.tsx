import { MenuAlt2Icon, MoonIcon } from "@heroicons/react/outline";
import { MoonIcon as MoonIconSolid } from "@heroicons/react/solid";
import { Container } from "@/components";
import { useDarkMode } from "@/hooks";

const Home = () => {
    const { theme, toggleTheme } = useDarkMode();

    return (
        <Container title="Home" wrapper>
            <header className="mt-5">
                {/* top */}
                <div className="flex items-center justify-between space-x-5">
                    <button className="text-slate-400">
                        <MenuAlt2Icon className="w-7 h-7" />
                    </button>

                    {/* toggle darkmode */}
                    <button className="text-slate-400" onClick={toggleTheme}>
                        {theme === "dark" ? (
                            <MoonIconSolid className="w-7 h-7 text-teal-500" />
                        ) : (
                            <MoonIcon className="w-7 h-7" />
                        )}
                    </button>
                </div>

                {/* greetings */}
                <div className="mt-5">
                    <h3 className="font-semibold text-lg">
                        Selamat Pagi Bhremada 👋
                    </h3>
                </div>
            </header>
        </Container>
    );
};

export default Home;
