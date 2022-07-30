import Head from "next/head";
import { PacmanLoader } from "react-spinners";

interface Props {
    message?: string;
    Icon?: any;
}

const Loader = ({ message = "Loading", Icon }: Props) => {
    const LoaderIcon = Icon ?? (
        <PacmanLoader
            color="#14b8a6"
            cssOverride={{
                marginBottom: 50,
            }}
        />
    );

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <Head>
                <title>{message}</title>
            </Head>
            {LoaderIcon}
            <h4 className="font-medium">{message}</h4>
        </div>
    );
};

export default Loader;
