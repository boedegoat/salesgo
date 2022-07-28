import NextLink, { LinkProps } from "next/link";

interface Props extends LinkProps {
    className?: string;
    children?: React.ReactNode;
}

const Link = ({ className, children, ...props }: Props) => {
    return (
        <NextLink {...props}>
            <a className={className}>{children}</a>
        </NextLink>
    );
};

export default Link;
