import { useEffect } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/authToken";
import { auth } from "@/store/authSlice";
import useGlobalState from "./useGlobalState";

const useInitialEmployee = () => {
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
};

export default useInitialEmployee;
