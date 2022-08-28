import { useState } from "react";
import Head from "next/head";
import classNames from "classnames";

// Icons
import {
    ArrowLeftOnRectangleIcon,
    UserIcon,
    BellIcon,
    HomeIcon as HomeIconOutlined,
    BuildingStorefrontIcon as StoreIconOutlined,
    UserGroupIcon as UserGroupIconOutlined,
    Cog6ToothIcon as SettingsIconOutlined,
} from "@heroicons/react/24/outline";
import {
    HomeIcon,
    ChevronLeftIcon,
    BuildingStorefrontIcon as StoreIcon,
    UserGroupIcon,
    Cog6ToothIcon as SettingsIcon,
} from "@heroicons/react/24/solid";

// Components
import { RippleButton, Dropdown } from "@/components";
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
                        "flex flex-col h-screen py-11 border-r-2 border-slate-100 transition-all ease-out",
                        navMinimized ? "px-3" : "px-10"
                    )}
                    style={{ width: navMinimized ? "5%" : "30%" }}
                >
                    {/* TOP PART */}
                    {/* MINIMIZE NAV BUTTON */}
                    <div
                        className="tooltip tooltip-right self-start mb-6"
                        data-tip={navMinimized ? "Expand" : "Minimize"}
                    >
                        <RippleButton
                            className="px-2 rounded-full py-2"
                            onClick={() => setNavMinimized(!navMinimized)}
                        >
                            <ChevronLeftIcon
                                className={classNames(
                                    "w-6 transform transition-transform ease-out",
                                    navMinimized ? "rotate-180" : "rotate-0"
                                )}
                            />
                        </RippleButton>
                    </div>

                    {/* PAGE LINKS */}
                    <div className="flex flex-col">
                        <NavLink
                            active={true}
                            href="/overview"
                            label="Overview"
                            icon={HomeIconOutlined}
                            activeIcon={HomeIcon}
                            navMinimized={navMinimized}
                        />
                        <NavLink
                            active={false}
                            href="/stores"
                            label="Toko"
                            icon={StoreIconOutlined}
                            activeIcon={StoreIcon}
                            navMinimized={navMinimized}
                        />
                        <NavLink
                            active={false}
                            href="/users"
                            icon={UserGroupIconOutlined}
                            activeIcon={UserGroupIcon}
                            navMinimized={navMinimized}
                        />
                        <NavLink
                            active={false}
                            href="/settings"
                            label="Pengaturan"
                            icon={SettingsIconOutlined}
                            activeIcon={SettingsIcon}
                            navMinimized={navMinimized}
                        />
                    </div>

                    {/* DARK MODE TOGGLER */}
                    {/* <div className="relative p-1 rounded-full bg-slate-200 w-max mt-auto flex items-center">
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
                    </div> */}
                </nav>

                {/* BODY */}
                <div className="w-full px-20 py-11 h-screen overflow-auto">
                    <header className="flex items-center justify-between mb-10">
                        <h1 className="font-bold text-xl">{title}</h1>
                        <div className="flex items-center space-x-4">
                            {/* NOTIFICATIONS */}
                            <button
                                className="btn btn-sm flex items-center"
                                onClick={(e) => setNotifEl(e.currentTarget)}
                            >
                                <BellIcon className="w-6" />
                                <span className="ml-1">5</span>
                            </button>
                            {/* TODO: change notifmenu */}
                            <NotificationMenu
                                notifEl={notifEl}
                                onClose={() => setNotifEl(null)}
                            />

                            {/* AVATAR */}
                            <Dropdown
                                className="dropdown-end"
                                toggler={
                                    <RippleButton className="flex items-center space-x-2 rounded-full px-2 py-1 font-semibold">
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
                                }
                            >
                                <Dropdown.PageLinkItem href="#" icon={UserIcon}>
                                    Profile
                                </Dropdown.PageLinkItem>
                                <Dropdown.ButtonItem
                                    icon={ArrowLeftOnRectangleIcon}
                                >
                                    Sign Out
                                </Dropdown.ButtonItem>
                            </Dropdown>
                        </div>
                    </header>
                    <div className="space-y-14">{children}</div>
                </div>
            </div>
        </main>
    );
};

export default CMSContainer;
