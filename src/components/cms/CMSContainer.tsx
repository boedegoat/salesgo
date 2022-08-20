import { useState } from "react";
import Head from "next/head";
import classNames from "classnames";
import NavLink from "./NavLink";

// Icons
import Home from "@mui/icons-material/Home";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import KeyboardDoubleArrowLeft from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRight from "@mui/icons-material/KeyboardDoubleArrowRight";
// import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import Person from "@mui/icons-material/Person";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import Settings from "@mui/icons-material/Settings";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import Store from "@mui/icons-material/Store";
import StoreOutlined from "@mui/icons-material/StoreOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";

// Components
// import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";

interface Props {
    title: string;
    children: React.ReactNode;
}

const CMSContainer = ({ title, children }: Props) => {
    const [navMinimized, setNavMinimized] = useState(false);

    return (
        <main className="bg-slate-50">
            <Head>
                <title>{`${title} - SalesGo Dashboard`}</title>
            </Head>
            <div className="flex overflow-hidden">
                {/* NAVIGATION */}
                <nav
                    className={classNames(
                        "flex flex-col h-screen py-11 border-r-2 border-slate-100 overflow-x-hidden overflow-y-auto transition-all ease-out",
                        navMinimized ? "px-3" : "px-10"
                    )}
                    style={{ width: navMinimized ? "5%" : "30%" }}
                >
                    {/* TOP PART */}
                    {/* MINIMIZE NAV BUTTON */}
                    <IconButton
                        className="self-start !mb-6"
                        onClick={() => setNavMinimized(!navMinimized)}
                    >
                        {navMinimized ? (
                            <KeyboardDoubleArrowRight />
                        ) : (
                            <KeyboardDoubleArrowLeft />
                        )}
                    </IconButton>

                    {/* PAGE LINKS */}
                    <div className="flex flex-col">
                        <NavLink
                            active={true}
                            href="/home"
                            icon={HomeOutlined}
                            activeIcon={Home}
                            navMinimized={navMinimized}
                        />
                        <NavLink
                            active={false}
                            href="/stores"
                            icon={StoreOutlined}
                            activeIcon={Store}
                            navMinimized={navMinimized}
                        />
                        <NavLink
                            active={false}
                            href="/users"
                            icon={PersonOutlined}
                            activeIcon={Person}
                            navMinimized={navMinimized}
                        />
                        <NavLink
                            active={false}
                            href="/settings"
                            icon={SettingsOutlined}
                            activeIcon={Settings}
                            navMinimized={navMinimized}
                        />
                    </div>

                    {/* DARK MODE TOGGLER */}
                    <div className="relative p-1 rounded-full bg-slate-200 w-max mt-auto flex items-center">
                        <button className="relative z-10 flex items-center justify-center p-1 text-teal-500">
                            <LightModeOutlined fontSize="small" />
                        </button>
                        <button
                            className={classNames(
                                "relative z-10 items-center justify-center p-1 text-slate-500",
                                navMinimized ? "hidden" : "flex"
                            )}
                        >
                            <DarkModeOutlined fontSize="small" />
                        </button>
                        <div className="absolute rounded-full bg-white w-7 h-7 shadow-sm transition-transform ease-out transform translate-x-0"></div>
                    </div>
                </nav>

                {/* BODY */}
                <div className="w-full px-20 py-11 overflow-auto">
                    {children}
                </div>
            </div>
        </main>
    );
};

export default CMSContainer;
