import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";

import { CMSContainer } from "@/components/cms";
import { SalesmanList } from "@/components/cms/overview";

const CMSHome = () => {
    return (
        <CMSContainer title="Overview">
            {/* SUMMARY SECTION */}
            <section className="flex space-x-8">
                <div className="space-y-8 w-[40%]">
                    {/* TOTAL SALESMAN VISIT */}
                    <div className="p-8 rounded-xl shadow-xl shadow-slate-200">
                        <div className="font-semibold text-lg">
                            <LocationOnIcon className="mr-1" />
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
                        <div className="font-semibold text-lg">
                            <GroupIcon className="mr-1" />
                            Total Salesman
                        </div>
                        <div className="text-5xl font-bold mt-1">5</div>
                    </div>
                </div>
                <div className="w-full rounded-xl flex items-center justify-center shadow-xl shadow-slate-200">
                    Google Map
                </div>
            </section>

            {/* SALESMAN LIST */}
            <section>
                <div>
                    <div className="font-semibold text-xl mb-5">
                        Daftar Salesman
                    </div>
                    <SalesmanList />
                </div>
            </section>
        </CMSContainer>
    );
};

export default CMSHome;
