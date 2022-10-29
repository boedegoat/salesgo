import dynamic from "next/dynamic";
import { useState } from "react";

import { Modal } from "@/components";
import { salesmans } from "@/constants/dummy";
const Map = dynamic(() => import("@/components/cms/home/Map"), {
    ssr: false,
});

const SalesmanList = () => {
    const [salesman, setSalesman] = useState<any>(null);

    return (
        <div>
            <div className="overflow-x-auto rounded-lg w-full shadow-xl shadow-slate-200">
                <table className="table w-full bg-white">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>Nama Lengkap</th>
                            <th>Target Kunjungan</th>
                            <th>Kunjungan Sebenarnya</th>
                            <th>Persentase</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {salesmans.map((salesman) => (
                            <tr
                                key={salesman.id}
                                className="hover cursor-pointer"
                                onClick={() => {
                                    setSalesman(salesman);
                                }}
                            >
                                <td>
                                    <div className="font-bold">
                                        {salesman.name}
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">
                                        {salesman.targetVisit}
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">
                                        {salesman.actualVisit}
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">
                                        {(
                                            (salesman.actualVisit /
                                                salesman.targetVisit) *
                                            100
                                        ).toFixed(1)}{" "}
                                        %
                                    </div>
                                </td>
                                <td>
                                    <button className="btn btn-ghost btn-xs">
                                        details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal
                className="h-[90vh]"
                open={Boolean(salesman)}
                onClose={() => setSalesman(null)}
            >
                <Modal.Header>{salesman?.name}</Modal.Header>
                <Modal.Content className="flex space-x-10">
                    <div className="w-[40%]">
                        <h3 className="font-medium mb-2 text-lg">
                            Toko yang telah dikunjungi hari ini
                        </h3>
                    </div>
                    <div className="w-[60%] h-[60vh]">
                        <h3 className="font-medium mb-2 text-lg">
                            Posisi {salesman?.name} saat ini
                        </h3>
                        <Map />
                    </div>
                </Modal.Content>
            </Modal>
        </div>
    );
};

export default SalesmanList;
