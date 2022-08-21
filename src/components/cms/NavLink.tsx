import { PageLink } from "@/components";
import classNames from "classnames";
import { capitalize } from "lodash";
import Tooltip from "@mui/material/Tooltip";

interface Props {
    href: string;
    label?: string;
    icon: any;
    activeIcon: any;
    active: boolean;
    navMinimized: boolean;
}

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
            className={classNames(
                "py-3 font-medium text-lg hover:text-teal-500 flex items-center",
                active ? "text-teal-500" : "text-slate-500"
            )}
            href={`/cms${href}`}
        >
            {navMinimized ? (
                <Tooltip
                    title={label}
                    arrow
                    placement="right"
                    componentsProps={{
                        tooltip: "bg-teal-500 text-white",
                        arrow: "bg-teal-500",
                    }}
                >
                    <span className="border border-slate-200/50 shadow-sm rounded-xl flex justify-center items-center p-1.5">
                        {active ? <ActiveIcon /> : <Icon />}
                    </span>
                </Tooltip>
            ) : (
                <span className="border border-slate-200/50 shadow-sm rounded-xl flex justify-center items-center p-1.5">
                    {active ? <ActiveIcon /> : <Icon />}
                </span>
            )}
            {!navMinimized && <span className="ml-3">{label}</span>}
        </PageLink>
    );
};

export default NavLink;
