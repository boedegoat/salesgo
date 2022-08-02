import { LocationMarkerIcon } from "@heroicons/react/outline";
import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Loader from "./Loader";

type Service = ("auth" | "geolocation")[];
type ComponentType = NextComponentType<NextPageContext, any, {}>;

const Needs =
    (services: Service, Component: ComponentType) =>
    // eslint-disable-next-line react/display-name
    (props: any) => {
        const [isLocationEnabled, setIsLocationEnabled] = useState<
            boolean | null
        >(null);

        useEffect(() => {
            let timeout: NodeJS.Timeout;

            if (services.includes("geolocation")) {
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
            }

            return () => {
                clearTimeout(timeout);
            };
        }, []);

        if (services.includes("geolocation")) {
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
                            <LocationMarkerIcon className="text-teal-500 w-20 h-20 mb-5 animate-bounce" />
                        }
                        message="Please turn on your location to continue"
                    />
                );
            }
        }

        return <Component {...props} />;
    };

export default Needs;
