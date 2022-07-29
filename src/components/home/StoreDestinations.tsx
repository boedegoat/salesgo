import cn from "classnames";
import { ChevronRightIcon, LoginIcon, MapIcon } from "@heroicons/react/outline";
import { PageLink } from "@/components";

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
    },
];

const StoreDestinations = () => {
    return (
        <div className="mt-5 pl-5">
            <div className="flex pb-10 space-x-4 overflow-auto scrollbar-hide snap-x snap-mandatory">
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
                </div>
            </div>
        </div>
    );
};

export default StoreDestinations;
