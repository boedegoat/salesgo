import { useState } from "react";
import Head from "next/head";

// Icons
import {
    ArrowLeftOnRectangleIcon,
    UserIcon,
    BellIcon,
    BuildingStorefrontIcon as StoreIconOutlined,
    UserGroupIcon as UserGroupIconOutlined,
    Cog6ToothIcon as SettingsIconOutlined,
    Squares2X2Icon as Squares2X2IconOutlined,
} from "@heroicons/react/24/outline";
import {
    Squares2X2Icon,
    BuildingStorefrontIcon as StoreIcon,
    UserGroupIcon,
    Bars3Icon,
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

    return (
        <main>
            <Head>
                <title>{`${title} - SalesGo CMS`}</title>
            </Head>
            <div className="overflow-hidden flex flex-col h-screen">
                {/* HEADER */}
                <header className="bg-white px-6 py-3 flex justify-between items-center shadow-lg shadow-slate-100">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setNavMinimized(!navMinimized)}
                            className="btn btn-circle btn-ghost btn-sm"
                        >
                            <Bars3Icon className="w-6" />
                        </button>
                        <h1 className="font-bold">⚡SalesGo</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* NOTIFICATIONS */}
                        <Dropdown className="dropdown-end">
                            <Dropdown.Toggler>
                                <div className="indicator">
                                    <span className="indicator-item badge badge-sm badge-secondary">
                                        3
                                    </span>
                                    <button className="btn btn-ghost btn-xs btn-circle flex items-center">
                                        <BellIcon className="w-5" />
                                    </button>
                                </div>
                            </Dropdown.Toggler>
                            <Dropdown.Content className="w-[450px]">
                                <NotificationMenu />
                            </Dropdown.Content>
                        </Dropdown>

                        {/* AVATAR */}
                        <Dropdown className="dropdown-end">
                            <Dropdown.Toggler>
                                <RippleButton className="flex items-center space-x-2 rounded-full px-2 py-1 font-semibold">
                                    <div className="avatar online">
                                        <div className="w-6 rounded-full">
                                            <img src="https://mui.com/static/images/avatar/1.jpg" />
                                        </div>
                                    </div>
                                    <span className="max-w-[10.5ch] truncate text-sm">
                                        Bhremada Fevreano
                                    </span>
                                    <span className="badge bg-primary border-none text-xs">
                                        Admin
                                    </span>
                                </RippleButton>
                            </Dropdown.Toggler>
                            <Dropdown.Content>
                                <Dropdown.PageLinkItem href="#" icon={UserIcon}>
                                    Profile
                                </Dropdown.PageLinkItem>
                                <Dropdown.ButtonItem
                                    icon={ArrowLeftOnRectangleIcon}
                                >
                                    Sign Out
                                </Dropdown.ButtonItem>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>
                <div className="flex h-full">
                    {/* NAVIGATION */}
                    <nav
                        className="flex flex-col h-full py-10 border-r-2 border-slate-100 transition-all ease-out px-6"
                        style={{ width: navMinimized ? "7%" : "24%" }}
                    >
                        {/* PAGE LINKS */}
                        <div className="flex flex-col space-y-7">
                            <NavLink
                                active={true}
                                href="/overview"
                                label="Overview"
                                icon={Squares2X2IconOutlined}
                                activeIcon={Squares2X2Icon}
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
                    </nav>

                    {/* BODY */}
                    <div className="w-full overflow-auto rounded-l-2xl">
                        <header className="flex p-10 pb-0 items-center justify-between">
                            <h1 className="font-bold text-3xl">{title}</h1>
                        </header>
                        <div className="space-y-14 p-10 mb-20">{children}</div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CMSContainer;
