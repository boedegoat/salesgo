import NextLink, { LinkProps } from "next/link";

export interface PageLinkProps extends LinkProps {
    className?: string;
    children?: React.ReactNode;
}

const Link = ({ className, children, ...props }: PageLinkProps) => {
    return (
        <NextLink {...props}>
            <a className={className}>{children}</a>
        </NextLink>
    );
};

export default Link;
