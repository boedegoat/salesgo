// Icons
import {
    HomeIcon as HomeIconOutlined,
    UserGroupIcon as UserGroupIconOutlined,
    Cog6ToothIcon as SetupIconOutlined,
    Squares2X2Icon as Squares2X2IconOutlined,
    BuildingStorefrontIcon as StoreIconOutlined,
} from "@heroicons/react/24/outline";
import {
    HomeIcon,
    UserGroupIcon,
    Cog6ToothIcon as SetupIcon,
    Squares2X2Icon,
    BuildingStorefrontIcon as StoreIcon,
} from "@heroicons/react/24/solid";

export const pages: CMSPage[] = [
    {
        href: "/",
        label: "Home",
        icon: HomeIconOutlined,
        activeIcon: HomeIcon,
    },
    {
        href: "/salesman",
        label: "Salesman",
        icon: UserGroupIconOutlined,
        activeIcon: UserGroupIcon,
        pages: [
            {
                href: "/",
                label: "Overview",
                icon: Squares2X2IconOutlined,
                activeIcon: Squares2X2Icon,
            },
            {
                href: "/manage-stores",
                label: "Atur Toko",
                icon: StoreIconOutlined,
                activeIcon: StoreIcon,
            },
        ],
    },
    {
        href: "/setup",
        label: "Setup",
        icon: SetupIconOutlined,
        activeIcon: SetupIcon,
        pages: [],
    },
];
