import { capitalize } from "lodash";
import { twMerge } from "tailwind-merge";
import { PageLink } from "@/components";

interface Props {
    href: string;
    label?: string;
    icon: any;
    activeIcon: any;
    active: boolean;
    navMinimized: boolean;
}

const iconClassName = "w-6";

const NavLink = ({
    href,
    icon: Icon,
    activeIcon: ActiveIcon,
    active,
    navMinimized,
    label: propsLabel,
}: Props) => {
    const label = propsLabel || capitalize(href.replace("/", ""));

    return (
        <PageLink
            className={twMerge(
                "py-3 font-medium text-lg hover:text-teal-500 flex items-center",
                active ? "text-teal-500" : "text-slate-500"
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
            {!navMinimized && <span className="ml-3">{label}</span>}
        </PageLink>
    );
};

export default NavLink;
