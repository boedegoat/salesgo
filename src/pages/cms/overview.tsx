import dynamic from "next/dynamic";

import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";

import { CMSContainer } from "@/components/cms";
import { SalesmanList } from "@/components/cms/overview";
import { useState } from "react";
import { MapPinIcon, UserGroupIcon } from "@heroicons/react/20/solid";

const Map = dynamic(() => import("@/components/cms/overview/Map"), {
    ssr: false,
});

const Overview = () => {
    const [date, setDate] = useState<Date | null>(new Date());

    return (
        <CMSContainer title="Overview">
            {/* SUMMARY SECTION */}
            <section className="flex space-x-8">
                <div className="space-y-8 w-[40%]">
                    {/* TOTAL SALESMAN VISIT */}
                    <div className="p-8 rounded-xl shadow-xl shadow-slate-200">
                        <div className="font-semibold text-lg flex items-center">
                            <MapPinIcon className="w-5 mr-1" />
                            Total Kunjungan
                        </div>
                        <div className="text-5xl font-bold mt-1">
                            135{" "}
                            <span className="text-lg text-slate-500">/150</span>
                        </div>
                        <div className="font-medium mt-3">
                            <span className="text-teal-500">76%</span> vs target
                        </div>
                    </div>
                    {/* SALESMAN TOTAL */}
                    <div className="p-8 rounded-xl shadow-xl shadow-slate-200">
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

                    <DatePicker
                        label="Tanggal"
                        value={date}
                        onChange={(newDate) => {
                            setDate(newDate);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </div>
                <SalesmanList />
            </section>
        </CMSContainer>
    );
};

export default Overview;
