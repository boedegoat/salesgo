import React from "react";
import { PageLink } from "@/components";

const Progress = () => {
    return (
        <div>
            <PageLink
                href="#"
                className="block mt-2 p-3 pt-2 border rounded-xl"
            >
                <div className="text-slate-500 text-sm font-medium">
                    Progressmu hari ini &rarr;
                </div>
                <div className="mt-2 h-4 bg-slate-100 rounded-lg">
                    <div className="h-full w-[30%] bg-teal-500 rounded-lg flex items-center">
                        <span className="ml-2 text-[10px] font-bold text-white">
                            1/3
                        </span>
                    </div>
                </div>
            </PageLink>
        </div>
    );
};

export default Progress;
