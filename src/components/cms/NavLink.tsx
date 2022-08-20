import { PageLink } from "@/components";
import classNames from "classnames";
import { capitalize } from "lodash";

interface Props {
    href: string;
    icon: any;
    activeIcon: any;
    active: boolean;
}

const NavLink = ({
    href,
    icon: Icon,
    activeIcon: ActiveIcon,
    active,
}: Props) => {
    return (
        <PageLink
            className={classNames(
                "py-3 font-medium text-lg hover:text-teal-500 flex items-center",
                active ? "text-teal-500" : "text-slate-500"
            )}
            href={`/cms${href}`}
        >
            <span className="border border-slate-200/50 shadow-sm rounded-xl mr-3 flex justify-center items-center p-1.5">
                {active ? <ActiveIcon /> : <Icon />}
            </span>
            <span>{capitalize(href.replace("/", ""))}</span>
        </PageLink>
    );
};

export default NavLink;
