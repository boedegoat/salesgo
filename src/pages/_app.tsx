import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

// Boring redux stuff
import { createWrapper as createReduxWrapper } from "next-redux-wrapper";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store";

// Others
import { OfflineIndicator } from "@/components";
import { useInitialEmployee } from "@/hooks";
import "@/styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
    useInitialEmployee();

    return (
        <ThemeProvider enableSystem attribute="class">
            <PersistGate loading={null} persistor={persistor}>
                <Toaster />
                <OfflineIndicator />
                <Component {...pageProps} />
            </PersistGate>
        </ThemeProvider>
    );
};

const appWrapper = createReduxWrapper(() => store);
export default appWrapper.withRedux(App);
