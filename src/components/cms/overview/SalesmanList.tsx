import dynamic from "next/dynamic";
import { useState } from "react";
import { Modal } from "@/components";

const salesmans = [
    { id: 1, name: "Mang Ujang", targetVisit: 30, actualVisit: 25 },
    { id: 2, name: "Mang Otong", targetVisit: 30, actualVisit: 30 },
    { id: 3, name: "Pak Thrio", targetVisit: 30, actualVisit: 30 },
    { id: 4, name: "Bung Karno", targetVisit: 30, actualVisit: 30 },
    { id: 5, name: "Mang Udin", targetVisit: 30, actualVisit: 20 },
];

const Map = dynamic(() => import("@/components/cms/overview/Map"), {
    ssr: false,
});

const SalesmanList = () => {
    const [salesman, setSalesman] = useState<any>(null);

    return (
        <div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
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
                    <tbody>
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
