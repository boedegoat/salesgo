import { useState } from "react";
import Head from "next/head";
import classNames from "classnames";

// Icons
import Home from "@mui/icons-material/Home";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import KeyboardDoubleArrowLeft from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRight from "@mui/icons-material/KeyboardDoubleArrowRight";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import Person from "@mui/icons-material/Person";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import Settings from "@mui/icons-material/Settings";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import Store from "@mui/icons-material/Store";
import StoreOutlined from "@mui/icons-material/StoreOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";

// Components
import { PageLink, RippleButton } from "@/components";
import NotificationMenu from "./NotificationMenu";
import NavLink from "./NavLink";

interface Props {
    title: string;
    children: React.ReactNode;
}

const CMSContainer = ({ title, children }: Props) => {
    const [navMinimized, setNavMinimized] = useState(false);
    const [notifEl, setNotifEl] = useState<null | HTMLElement>(null);

    return (
        <main className="bg-slate-50">
            <Head>
                <title>{`${title} - SalesGo CMS`}</title>
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
                    <RippleButton
                        className="px-2 rounded-full py-1 self-start mb-6"
                        onClick={() => setNavMinimized(!navMinimized)}
                    >
                        {navMinimized ? (
                            <KeyboardDoubleArrowRight />
                        ) : (
                            <KeyboardDoubleArrowLeft />
                        )}
                    </RippleButton>

                    {/* PAGE LINKS */}
                    <div className="flex flex-col">
                        <NavLink
                            active={true}
                            href="/overview"
                            label="Overview"
                            icon={HomeOutlined}
                            activeIcon={Home}
                            navMinimized={navMinimized}
                        />
                        <NavLink
                            active={false}
                            href="/stores"
                            label="Toko"
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
                            label="Pengaturan"
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
                <div className="w-full px-20 py-11 h-screen overflow-auto">
                    <header className="flex items-center justify-between mb-10">
                        <h1 className="font-bold text-xl">{title}</h1>
                        <div className="flex items-center space-x-4">
                            {/* NOTIFICATIONS */}
                            <button
                                className="btn btn-sm"
                                onClick={(e) => setNotifEl(e.currentTarget)}
                            >
                                <NotificationsOutlined fontSize="medium" />
                                <span className="ml-1">5</span>
                            </button>
                            <NotificationMenu
                                notifEl={notifEl}
                                onClose={() => setNotifEl(null)}
                            />

                            {/* AVATAR */}
                            <div className="dropdown dropdown-end">
                                <RippleButton
                                    tabIndex={0}
                                    className="flex items-center space-x-2 rounded-full px-2 py-1 font-semibold"
                                >
                                    <div className="avatar online">
                                        <div className="w-9 rounded-full">
                                            <img src="https://mui.com/static/images/avatar/1.jpg" />
                                        </div>
                                    </div>
                                    <span className="max-w-[10.5ch] truncate">
                                        Bhremada Fevreano
                                    </span>
                                    <span className="badge bg-teal-500 border-none">
                                        Admin
                                    </span>
                                </RippleButton>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-[999]"
                                >
                                    <li>
                                        <PageLink href="#">Profile</PageLink>
                                    </li>
                                    <li>
                                        <button>Sign Out</button>
                                    </li>
                                </ul>
                            </div>

                            {/* <AvatarMenu
                                avatarEl={avatarEl}
                                onClose={() => setAvatarEl(null)}
                            /> */}
                        </div>
                    </header>
                    <div className="space-y-14">{children}</div>
                </div>
            </div>
        </main>
    );
};

export default CMSContainer;
