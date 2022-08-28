import "@/styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { createWrapper } from "next-redux-wrapper";
import { PersistGate } from "redux-persist/integration/react";

import { auth } from "@/store/authSlice";
import { useGlobalState } from "@/hooks";
import { getAccessToken } from "@/utils/authToken";
import { OfflineIndicator } from "@/components";
import { store, persistor } from "../store";

const MyApp = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) => {
    return (
        <ThemeProvider enableSystem attribute="class">
            <PersistGate loading={null} persistor={persistor}>
                <Toaster />
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
