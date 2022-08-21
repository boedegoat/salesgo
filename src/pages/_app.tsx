import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { GlobalCssPriority, OfflineIndicator } from "@/components";
import "@/styles/globals.css";

import { store, persistor } from "../store";
import { createWrapper } from "next-redux-wrapper";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";
import { useGlobalState } from "@/hooks";
import { auth } from "@/store/authSlice";
import { getAccessToken } from "@/utils/authToken";

const MyApp = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) => {
    return (
        <ThemeProvider enableSystem attribute="class">
            <PersistGate loading={null} persistor={persistor}>
                <Toaster />
                <OfflineIndicator />
                <GlobalCssPriority>
                    <MyComponent {...{ Component, ...pageProps }} />
                </GlobalCssPriority>
            </PersistGate>
        </ThemeProvider>
    );
};

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);

const MyComponent = ({ Component, pageProps }: AppProps) => {
    const { dispatch } = useGlobalState();

    useEffect(() => {
        const getInitialEmployee = async () => {
            try {
                dispatch(auth.setStatus("loading"));
                const accessToken = await getAccessToken();

                if (!accessToken) {
                    dispatch(auth.setStatus("unauthenticated"));
                    return;
                }

                const { data } = await axios.get("/api/employees/me", {
                    headers: {
                        authorization: `Bearer ${accessToken}`,
                    },
                });

                dispatch(auth.setEmployee(data.employee));
            } catch (err) {
                console.log({ err });
                dispatch(auth.setStatus("unauthenticated"));
            }
        };

        getInitialEmployee();
    }, []);

    return <Component {...pageProps} />;
};
