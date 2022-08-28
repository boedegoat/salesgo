import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from "react";
import classNames from "classnames";
import PageLink, { PageLinkProps } from "./Link";

interface DropdownProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    toggler: React.ReactNode;
    children: React.ReactNode;
}

const Dropdown = ({
    toggler,
    children,
    className,
    ...divProps
}: DropdownProps) => {
    return (
        <div className={classNames("dropdown", className)} {...divProps}>
            {toggler}
            <div className="dropdown-content flex flex-col bg-white w-52 z-[999] rounded-xl p-2 shadow">
                {children}
            </div>
        </div>
    );
};

interface ButtonItemProps
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    children: React.ReactNode;
}

const ButtonItem = ({ children, className, ...btnProps }: ButtonItemProps) => {
    return (
        <button
            className={classNames(
                "w-full text-left p-2 hover:bg-slate-100 rounded-lg",
                className
            )}
            {...btnProps}
        >
            {children}
        </button>
    );
};

interface PageLinkItemProps extends PageLinkProps {
    children: React.ReactNode;
}

const PageLinkItem = ({
    children,
    className,
    ...pageLinkProps
}: PageLinkItemProps) => {
    return (
        <PageLink
            className={classNames(
                "w-full text-left p-2 hover:bg-slate-100 rounded-lg",
                className
            )}
            {...pageLinkProps}
        >
            {children}
        </PageLink>
    );
};

Dropdown.ButtonItem = ButtonItem;
Dropdown.PageLinkItem = PageLinkItem;

export default Dropdown;
