import cn from "classnames";
import {
    ChevronDoubleRightIcon,
    ChevronRightIcon,
    LoginIcon,
    MapIcon,
    PlusCircleIcon,
} from "@heroicons/react/outline";
import { PageLink } from "@/components";
import { checkInHandler } from "@/utils/location";

const store = {
    nama: "Toko Bu Antin",
    alamat: "Pondok Aren, Tangerang Selatan",
    mapsLink:
        "https://www.google.co.id/maps/place/Jl.+Carissa+IX+No.28,+Pd.+Jagung+Tim.,+Kec.+Serpong+Utara,+Kota+Tangerang+Selatan,+Banten+15326/@-6.2526441,106.6736765,19z/data=!3m1!4b1!4m12!1m6!3m5!1s0x2e69fb2e7c896979:0xf894de8e5c3dc986!2sGraha+Raya+Bintaro+CLUSTER+CARISSA!8m2!3d-6.2518195!4d106.6737048!3m4!1s0x2e69fbb29cf48b0f:0xbb6e48f8f8664360!8m2!3d-6.2526454!4d106.6742237",
    coords: {
        latitude: -6.2526314018845355,
        longitude: 106.67422235866543,
    },
};

const StoreDestinations = () => {
    return (
        <div className="my-5">
            <div className="flex space-x-4 overflow-auto scrollbar-hide snap-x snap-mandatory">
                {/* TODO: kalo di klik -> tampilin modal */}
                {/* isi modalnya : gambar toko, nama, alamat, pemilik */}
                <div className="w-[91%] snap-start flex-shrink-0 rounded-xl overflow-hidden border">
                    <PageLink
                        href="#"
                        className="h-[150px] flex flex-col p-3 bg-teal-500 text-white"
                    >
                        {/* top header */}
                        <h3 className="font-medium text-teal-50 mb-5 flex items-center justify-between">
                            <span>📍 Kunjungan saat ini</span>
                            <ChevronRightIcon className="w-5 h-5" />
                        </h3>

                        {/* store name */}
                        <h1 className="mt-auto text-2xl font-bold truncate flex items-center">
                            <span>{store.nama}</span>
                            <span className="text-lg text-teal-200 ml-2">
                                (1km)
                            </span>
                        </h1>

                        {/* store address */}
                        <p className="text-teal-50 text-sm">{store.alamat}</p>
                    </PageLink>
                    <div className="p-3 dark:bg-slate-800 flex space-x-2">
                        {/* maps button */}
                        <button
                            onClick={() => {
                                window.open(store.mapsLink, "_blank");
                            }}
                            className={cn(
                                "w-full py-2 flex items-center justify-center font-semibold rounded-lg",
                                "flex-[1] text-slate-600 dark:text-slate-300"
                            )}
                        >
                            <MapIcon className="w-5 h-5 mr-2" /> Maps
                        </button>
                        {/* check in button */}
                        <button
                            onClick={() =>
                                checkInHandler({
                                    destination: store.coords,
                                })
                            }
                            className={cn(
                                "w-full py-2 flex items-center justify-center font-semibold rounded-lg",
                                "flex-[2] bg-teal-100 text-teal-700 dark:bg-slate-700 dark:text-teal-400"
                            )}
                        >
                            <LoginIcon className="w-5 h-5 mr-2" /> Check In
                        </button>
                    </div>
                </div>

                <div className="w-[91%] snap-start flex-shrink-0 rounded-xl overflow-hidden border flex flex-col">
                    <h3 className="p-3 text-base text-slate-800 dark:text-slate-300 font-medium">
                        Ada kendala di {store.nama} ?
                    </h3>
                    <div className="p-3 flex flex-col space-y-2 h-full">
                        <button
                            className={cn(
                                "w-full h-full text-sm py-2 flex items-center justify-center font-semibold rounded-lg",
                                "bg-teal-100 text-teal-700 dark:bg-slate-700 dark:text-teal-400"
                            )}
                        >
                            <ChevronDoubleRightIcon className="w-5 h-5 mr-2" />
                            Lewati Toko
                        </button>
                        <button
                            className={cn(
                                "w-full h-full text-sm py-2 flex items-center justify-center font-semibold rounded-lg",
                                "bg-teal-100 text-teal-700 dark:bg-slate-700 dark:text-teal-400"
                            )}
                        >
                            <PlusCircleIcon className="w-5 h-5 mr-2" />
                            Tambah Toko Baru
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreDestinations;
