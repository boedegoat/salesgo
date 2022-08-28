import { CSSProperties } from "react";
import Head from "next/head";
import {
    BuildingStorefrontIcon as StoreIcon,
    HomeIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";
import Header from "./Header";

interface Props {
    children: React.ReactNode;
    title?: string;
    wrapper?: boolean | "mobile";
    className?: string;
    noBottomNav?: boolean;
    noHeader?: boolean;
    style?: CSSProperties;
}

const bottomNavButtons = [
    {
        Icon: HomeIcon,
        label: "Home",
    },
    {
        Icon: StoreIcon,
        label: "List Toko",
    },
    {
        Icon: UserIcon,
        label: "Profile",
    },
];

const Container = ({
    children,
    title,
    wrapper,
    className,
    noHeader,
    noBottomNav,
    style,
}: Props) => {
    return (
        <main>
            <Head>
                <title>{title}</title>
            </Head>
            {!noHeader && <Header />}
            <div
                className={twMerge(
                    wrapper === true && "wrapper",
                    wrapper === "mobile" && "wrapper-mobile",
                    className
                )}
                style={style}
            >
                {children}
            </div>

            {!noBottomNav && (
                <>
                    <div className="pt-20"></div>
                    <div className="fixed w-full bottom-0 left-0 h-[40px] pb-1 bg-white dark:bg-slate-900">
                        <div className="wrapper-mobile">
                            <nav className="bg-white -translate-y-8 h-[60px] border p-3 rounded-2xl flex items-center shadow-lg">
                                {bottomNavButtons.map((btn) => (
                                    <button
                                        key={btn.label}
                                        className="w-full flex flex-col justify-center items-center text-slate-500/70 dark:text-slate-400"
                                    >
                                        <btn.Icon className="w-5 h-5" />
                                        <span className="text-[10px] mt-0.5 font-medium">
                                            {btn.label}
                                        </span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
};

export default Container;
