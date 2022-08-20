import Head from "next/head";
import NavLink from "./NavLink";

// Icons
import Home from "@mui/icons-material/Home";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import KeyboardDoubleArrowLeft from "@mui/icons-material/KeyboardDoubleArrowLeft";
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
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";

interface Props {
    title: string;
    children: React.ReactNode;
}

const CMSContainer = ({ title, children }: Props) => {
    return (
        <main className="bg-slate-50">
            <Head>
                <title>{`${title} - SalesGo Dashboard`}</title>
            </Head>
            <div className="flex overflow-hidden">
                {/* NAVIGATION */}
                <nav className="flex flex-col w-[30%] h-screen px-10 py-11 border-r-2 border-slate-100 overflow-auto">
                    {/* TOP PART */}
                    <div className="mb-6 flex justify-between">
                        {/* MINIMIZE NAV BUTTON */}
                        <IconButton>
                            <KeyboardDoubleArrowLeft />
                        </IconButton>
                        {/* NOTIFICATION BUTTON */}
                        <IconButton>
                            <Badge
                                badgeContent={4}
                                componentsProps={{
                                    badge: {
                                        className: "bg-teal-500 text-white",
                                    },
                                }}
                            >
                                <NotificationsOutlined />
                            </Badge>
                        </IconButton>
                    </div>

                    {/* PAGE LINKS */}
                    <div className="flex flex-col">
                        <NavLink
                            active={true}
                            href="/home"
                            icon={HomeOutlined}
                            activeIcon={Home}
                        />
                        <NavLink
                            active={false}
                            href="/stores"
                            icon={StoreOutlined}
                            activeIcon={Store}
                        />
                        <NavLink
                            active={false}
                            href="/users"
                            icon={PersonOutlined}
                            activeIcon={Person}
                        />
                        <NavLink
                            active={false}
                            href="/settings"
                            icon={SettingsOutlined}
                            activeIcon={Settings}
                        />
                    </div>

                    {/* DARK MODE TOGGLER */}
                    <div className="relative p-1 rounded-full bg-slate-200 w-max mt-auto flex items-center">
                        <button className="relative z-10 flex items-center justify-center p-1 text-teal-500">
                            <LightModeOutlined fontSize="small" />
                        </button>
                        <button className="relative z-10 flex items-center justify-center p-1 text-slate-500">
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
