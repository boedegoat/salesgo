import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from "react";
import classNames from "classnames";
import PageLink, { PageLinkProps } from "./Link";

interface DropdownProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    toggler: React.ReactNode;
    children: React.ReactNode;
    contentClassName?: string;
}

interface ItemProps {
    children: React.ReactNode;
    icon?: any;
}

type ButtonItemProps = ItemProps &
    DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >;

type PageLinkItemProps = ItemProps & PageLinkProps;

const Dropdown = ({
    toggler,
    children,
    className,
    contentClassName,
    ...divProps
}: DropdownProps) => {
    return (
        <div className={classNames("dropdown", className)} {...divProps}>
            {toggler}
            <div
                className={classNames(
                    "dropdown-content flex flex-col bg-white w-52 z-[999999] rounded-xl p-2 shadow",
                    contentClassName
                )}
            >
                {children}
            </div>
        </div>
    );
};

const itemClassName =
    "w-full text-left p-2 hover:bg-slate-100 rounded-lg flex items-center";
const itemIconClassName = "w-5 h-5 mr-2";

const ButtonItem = ({
    children,
    className,
    icon: Icon,
    ...btnProps
}: ButtonItemProps) => {
    return (
        <button className={classNames(itemClassName, className)} {...btnProps}>
            <Icon className={itemIconClassName} />
            {children}
        </button>
    );
};

const PageLinkItem = ({
    children,
    className,
    icon: Icon,
    ...pageLinkProps
}: PageLinkItemProps) => {
    return (
        <PageLink
            className={classNames(itemClassName, className)}
            {...pageLinkProps}
        >
            <Icon className={itemIconClassName} />
            {children}
        </PageLink>
    );
};

Dropdown.ButtonItem = ButtonItem;
Dropdown.PageLinkItem = PageLinkItem;

export default Dropdown;
