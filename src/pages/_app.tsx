import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { OfflineIndicator } from "@/components";
import "@/styles/globals.css";

import { store, persistor } from "../store";
import { createWrapper } from "next-redux-wrapper";
import { PersistGate } from "redux-persist/integration/react";

const MyApp = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) => {
    return (
        <ThemeProvider enableSystem attribute="class">
            <PersistGate loading={null} persistor={persistor}>
                <OfflineIndicator />
                <MyComponent {...{ Component, ...pageProps }} />
            </PersistGate>
        </ThemeProvider>
    );
};

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);

const MyComponent = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
};
