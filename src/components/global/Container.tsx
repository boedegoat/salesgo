import Head from "next/head";
import cn from "classnames";
import Header from "./Header";

interface Props {
    children: React.ReactNode;
    title?: string;
    wrapper?: boolean;
    className?: string;
}

const Container = ({ children, title, wrapper, className }: Props) => {
    return (
        <main>
            <Head>
                <title>{title}</title>
            </Head>
            <Header />
            <div className={cn(wrapper && "wrapper", className)}>
                {children}
            </div>
        </main>
    );
};

export default Container;
