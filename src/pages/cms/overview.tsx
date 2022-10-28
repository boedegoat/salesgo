import dynamic from "next/dynamic";
import { useState } from "react";
import { format } from "date-fns";
import { MapPinIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

import { CMSContainer } from "@/components/cms";
import { SalesmanList } from "@/components/cms/overview";
const Map = dynamic(() => import("@/components/cms/overview/Map"), {
    ssr: false,
});

const Overview = () => {
    const [date, setDate] = useState(new Date());

    return (
        <CMSContainer title="Overview">
            {/* SUMMARY SECTION */}
            <section className="flex space-x-8">
                <div className="space-y-8 w-[40%]">
                    {/* TOTAL SALESMAN VISIT */}
                    <div className="bg-white p-8 rounded-xl shadow-xl shadow-slate-200">
                        <div className="font-semibold text-lg flex items-center">
                            <MapPinIcon className="w-5 mr-1" />
                            Total Kunjungan
                        </div>
                        <div className="text-5xl font-bold mt-1">
                            135{" "}
                            <span className="text-lg text-slate-500">/150</span>
                        </div>
                        <div className="font-medium mt-3">
                            <span className="text-primary">76%</span> vs target
                        </div>
                    </div>
                    {/* SALESMAN TOTAL */}
                    <div className="bg-white p-8 rounded-xl shadow-xl shadow-slate-200">
                        <div className="font-semibold text-lg flex items-center">
                            <UserGroupIcon className="w-5 mr-1" />
                            Total Salesman
                        </div>
                        <div className="text-5xl font-bold mt-1">5</div>
                    </div>
                </div>
                <div className="w-full rounded-xl flex items-center justify-center shadow-xl shadow-slate-200">
                    <Map />
                </div>
            </section>

            {/* SALESMAN LIST */}
            <section>
                <div className="mb-5 flex justify-between">
                    <div className="font-semibold text-xl">Daftar Salesman</div>

                    <label className="flex items-center space-x-4">
                        <span className="font-medium flex items-center">
                            <CalendarDaysIcon className="w-5 mr-2" /> Tanggal
                        </span>
                        <input
                            type="date"
                            value={format(date, "yyyy-MM-dd")}
                            onChange={(e) => {
                                const selectedDate = new Date(e.target.value);
                                setDate(selectedDate);
                                alert(selectedDate);
                            }}
                            className="rounded-xl focus:ring-teal-500 focus:border-teal-400 cursor-pointer border-slate-300 shadow-sm"
                        />
                    </label>
                </div>
                <SalesmanList />
            </section>
        </CMSContainer>
    );
};

export default Overview;
