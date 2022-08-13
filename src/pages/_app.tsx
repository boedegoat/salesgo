import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { createStore, StateMachineProvider } from "little-state-machine";
import { OfflineIndicator } from "@/components";
import "@/styles/globals.css";

if (typeof window !== "undefined") {
    createStore(
        {
            registerCompany: {
                formData: {
                    admin: {},
                    company: {},
                },
                step: 1,
                totalStep: 3,
            },
        },
        {
            name: "global-state",
            storageType: localStorage,
        }
    );
}

const MyApp = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) => {
    return (
        <ThemeProvider enableSystem attribute="class">
            <StateMachineProvider>
                <OfflineIndicator />
                <MyComponent {...{ Component, ...pageProps }} />
            </StateMachineProvider>
        </ThemeProvider>
    );
};

export default MyApp;

const MyComponent = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
};
