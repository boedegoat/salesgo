import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { OfflineIndicator } from "@/components";

const MyApp = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) => {
    return (
        <ThemeProvider enableSystem attribute="class">
            <OfflineIndicator />
            <MyComponent {...{ Component, ...pageProps }} />
        </ThemeProvider>
    );
};

export default MyApp;

const MyComponent = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
};
