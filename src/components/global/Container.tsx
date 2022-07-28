import Head from "next/head";
import cn from "classnames";

interface Props {
    children: React.ReactNode;
    title?: string;
    wrapper?: boolean;
}

const Container = ({ children, title, wrapper }: Props) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                {/* TODO: add meta tags... */}
            </Head>
            <main className={cn(wrapper && "wrapper")}>{children}</main>
        </>
    );
};

export default Container;
