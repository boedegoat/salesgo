const salesmans = [
    { id: 1, name: "Mang Ujang", targetVisit: 30, actualVisit: 25 },
    { id: 2, name: "Mang Otong", targetVisit: 30, actualVisit: 30 },
    { id: 3, name: "Pak Thrio", targetVisit: 30, actualVisit: 30 },
    { id: 4, name: "Bung Karno", targetVisit: 30, actualVisit: 30 },
    { id: 5, name: "Mang Udin", targetVisit: 30, actualVisit: 20 },
];

const SalesmanList = () => {
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
                                    alert(salesman.name);
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
                    {/* <!-- foot --> */}
                    {/* <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot> */}
                </table>
            </div>
        </div>
    );
};

export default SalesmanList;
