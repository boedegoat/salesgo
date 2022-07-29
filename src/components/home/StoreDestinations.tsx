import cn from "classnames";
import { ChevronRightIcon, LoginIcon, MapIcon } from "@heroicons/react/outline";
import { PageLink } from "@/components";

const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    unit: "K" | "N"
) => {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
        dist = dist * 1.609344;
    }
    if (unit == "N") {
        dist = dist * 0.8684;
    }
    return dist;
};

const checkInHandler = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const coords = {
                    current: {
                        latitude,
                        longitude,
                    },
                    destination: {
                        // sma pj
                        // latitude: -6.276715755672075,
                        // longitude: 106.69677039951125,

                        // carissa
                        latitude: -6.2526314018845355,
                        longitude: 106.67422235866543,
                    },
                };

                // TODO: refactor this func to use object parameter instead
                const distanceKm = getDistance(
                    coords.current.latitude,
                    coords.current.longitude,
                    coords.destination.latitude,
                    coords.destination.longitude,
                    "K" // km
                );

                const arrived = distanceKm <= 0.1;

                console.log({
                    distanceKm,
                    arrived,
                    current: coords.current,
                    destination: coords.destination,
                });

                alert(
                    arrived
                        ? "Check in berhasil"
                        : "Anda belum ada di tujuan toko"
                );
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("User denied the request for Geolocation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        alert("The request to get user location timed out.");
                        break;
                    default:
                        alert("An unknown error occurred.");
                        break;
                }
            },
            {
                enableHighAccuracy: true,
            }
        );
    } else {
        alert("geolocation is not supported");
    }
};

const actionButtons = [
    {
        label: "Maps",
        Icon: MapIcon,
        className: "flex-[1] text-slate-600 dark:text-slate-300",
    },
    {
        label: "Check In",
        Icon: LoginIcon,
        className:
            "flex-[2] bg-teal-100 text-teal-700 dark:bg-slate-700 dark:text-teal-400",
        onClick: checkInHandler,
    },
];

const StoreDestinations = () => {
    return (
        <div className="mt-5 pl-5">
            <div className="flex pb-10 space-x-4 overflow-auto scrollbar-hide snap-x snap-mandatory">
                {/* TODO: kalo di klik -> tampilin modal */}
                {/* isi modalnya : gambar toko, nama, alamat, pemilik */}
                <div className="w-[91%] snap-start flex-shrink-0 rounded-xl overflow-hidden shadow-xl">
                    <PageLink
                        href="#"
                        className="h-[150px] flex flex-col p-3 bg-teal-500 text-white"
                    >
                        <h3 className="font-medium text-teal-50 mb-5 flex items-center justify-between">
                            <span>📍 Kunjungan saat ini (1/3)</span>
                            <ChevronRightIcon className="w-5 h-5" />
                        </h3>
                        <h1 className="mt-auto text-2xl font-bold truncate">
                            Toko Biasa Saja Namun Rejeki Luar Biasa
                        </h1>
                        <p className="text-teal-50 text-sm">
                            Pondok Aren, Tangerang Selatan
                        </p>
                    </PageLink>
                    <div className="p-3 dark:bg-slate-800 flex space-x-2">
                        {actionButtons.map((action) => (
                            <button
                                onClick={action.onClick}
                                key={action.label}
                                className={cn(
                                    "w-full py-2 flex items-center justify-center font-semibold rounded-lg",
                                    action.className
                                )}
                            >
                                <action.Icon className="w-5 h-5 mr-2" />{" "}
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* <div className="w-[91%] snap-start flex-shrink-0 rounded-xl overflow-hidden shadow-xl">
                    <PageLink
                        href="#"
                        className="h-[150px] flex flex-col p-3 bg-teal-500 text-white"
                    >
                        <h3 className="font-medium text-teal-50 mb-5 flex items-center justify-between">
                            <span>📍 Kunjungan (2/3)</span>
                            <ChevronRightIcon className="w-5 h-5" />
                        </h3>
                        <h1 className="mt-auto text-2xl font-bold truncate">
                            Toko Biasa Saja Namun Rejeki Luar Biasa
                        </h1>
                        <p className="text-teal-50 text-sm">
                            Pondok Aren, Tangerang Selatan
                        </p>
                    </PageLink>
                    <div className="p-3 dark:bg-slate-800 flex space-x-2">
                        {actionButtons.slice(0, 1).map((action) => (
                            <button
                                key={action.label}
                                className={cn(
                                    "w-full py-2 flex items-center justify-center font-semibold rounded-lg",
                                    action.className
                                )}
                            >
                                <action.Icon className="w-5 h-5 mr-2" />{" "}
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-[91%] snap-start flex-shrink-0 rounded-xl overflow-hidden shadow-xl">
                    <PageLink
                        href="#"
                        className="h-[150px] flex flex-col p-3 bg-teal-500 text-white"
                    >
                        <h3 className="font-medium text-teal-50 mb-5 flex items-center justify-between">
                            <span>📍 Kunjungan terakhir (3/3)</span>
                            <ChevronRightIcon className="w-5 h-5" />
                        </h3>
                        <h1 className="text-2xl font-bold mt-auto">
                            Toko Mang Ujang
                        </h1>
                        <p className="text-teal-50 text-sm">
                            Pondok Aren, Tangerang Selatan
                        </p>
                    </PageLink>
                    <div className="p-3 dark:bg-slate-800 flex space-x-2">
                        {actionButtons.slice(0, 1).map((action) => (
                            <button
                                key={action.label}
                                className={cn(
                                    "w-full py-2 flex items-center justify-center font-semibold rounded-lg",
                                    action.className
                                )}
                            >
                                <action.Icon className="w-5 h-5 mr-2" />{" "}
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default StoreDestinations;
