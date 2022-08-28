import { useEmployee } from "@/hooks";
import { auth } from "@/store/authSlice";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { Role } from "@prisma/client";
import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "./Loader";

type Services = {
    auth?: { role: Role };
    geolocation?: boolean;
};
type ComponentType = NextComponentType<NextPageContext, any, {}>;

const Needs =
    (services: Services, Component: ComponentType) =>
    // eslint-disable-next-line react/display-name
    (props: any) => {
        if (services.auth) {
            const { employee, status, dispatch } = useEmployee();
            const router = useRouter();

            const { role } = services.auth;

            useEffect(() => {
                if (status === "unauthenticated") {
                    router.replace("/auth/signin");
                }
                if (status === "authenticated") {
                    const roles = Object.values(Role);
                    if (
                        role &&
                        roles.indexOf(employee.role) > roles.indexOf(role)
                    ) {
                        dispatch(auth.setStatus("forbiden"));
                    }
                }
            }, [status]);

            if (status === "loading") {
                return <Loader message="Authorizing" />;
            }

            if (status === "forbiden") {
                return (
                    <Loader message="You are not allowed to access this page" />
                );
            }
        }

        if (services.geolocation) {
            const [isLocationEnabled, setIsLocationEnabled] = useState<
                boolean | null
            >(null);

            useEffect(() => {
                let timeout: NodeJS.Timeout;

                const checkLocation = () => {
                    navigator.geolocation.getCurrentPosition(
                        // turned on
                        () => {
                            setIsLocationEnabled(true);
                            clearTimeout(timeout);
                        },
                        // error occured
                        () => {
                            setIsLocationEnabled(false);
                            timeout = setTimeout(checkLocation, 1000);
                        }
                    );
                };

                checkLocation();

                return () => {
                    clearTimeout(timeout);
                };
            }, []);

            if (isLocationEnabled === null)
                return (
                    <Head>
                        <title>Checking location...</title>
                    </Head>
                );
            if (isLocationEnabled === false) {
                return (
                    <Loader
                        Icon={
                            <MapPinIcon className="text-teal-500 w-20 h-20 mb-5 animate-bounce" />
                        }
                        message="Please turn on your location to continue"
                    />
                );
            }
        }

        return <Component {...props} />;
    };

export default Needs;
