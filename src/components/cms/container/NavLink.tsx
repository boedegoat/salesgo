import { capitalize } from "lodash";
import { twMerge } from "tailwind-merge";
import { PageLink } from "@/components";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface Props {
    href: string;
    label?: string;
    icon: any;
    activeIcon: any;
    active: boolean;
    navMinimized: boolean;
    pages?: any[];
}

const iconClassName = "w-6";

const NavLink = ({
    href,
    icon: Icon,
    activeIcon: ActiveIcon,
    active,
    navMinimized,
    label: propsLabel,
    pages,
}: Props) => {
    const label = propsLabel || capitalize(href.replace("/", ""));

    return (
        <PageLink
            className={twMerge(
                "font-medium text-lg hover:text-teal-500 normal-case hover:bg-transparent",
                active ? "text-teal-500" : "text-slate-500",
                "btn btn-ghost p-0 flex justify-start items-center flex-nowrap"
            )}
            href={`/cms${href}`}
        >
            <div
                className={twMerge(navMinimized && "tooltip tooltip-right")}
                data-tip={label}
            >
                <span className="border border-slate-200/50 shadow-sm rounded-xl flex justify-center items-center p-1.5">
                    {active ? (
                        <ActiveIcon className={iconClassName} />
                    ) : (
                        <Icon className={iconClassName} />
                    )}
                </span>
            </div>
            <div className="ml-3 w-full flex items-center justify-between">
                <span
                    className={twMerge(
                        "whitespace-nowrap transition-opacity",
                        navMinimized ? "opacity-0" : "opacity-100"
                    )}
                >
                    {label}
                </span>
                {pages && (
                    <ChevronRightIcon
                        className={twMerge(
                            "w-5",
                            navMinimized ? "opacity-0" : "opacity-100"
                        )}
                    />
                )}
            </div>
        </PageLink>
    );
};

export default NavLink;
