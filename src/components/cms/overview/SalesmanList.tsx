// Icons
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";

// Components
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";

const columns: GridColDef[] = [
    { field: "id", headerName: "Nomor", width: 50 },
    { field: "name", headerName: "Nama Lengkap", width: 250 },
    {
        field: "totalVisit",
        headerName: "Total Kunjungan",
        type: "number",
        width: 150,
    },
    {
        field: "actualVisit",
        headerName: "Kunjungan Sebenarnya",
        type: "number",
        width: 200,
    },
    {
        field: "percentVisit",
        headerName: "Persentase",
        type: "number",
        width: 120,
        valueGetter: (params) =>
            `${((params.row.actualVisit / params.row.totalVisit) * 100).toFixed(
                1
            )} %`,
    },
    {
        field: "menu",
        headerName: "",
        type: "",
        width: 80,
        renderCell: () => (
            <div className="w-full flex justify-end">
                <IconButton className="">
                    <OpenInNewOutlinedIcon className="text-slate-500 w-5 h-5" />
                </IconButton>
            </div>
        ),
    },
];

const rows = [
    { id: 1, name: "Mang Ujang", totalVisit: 30, actualVisit: 25 },
    { id: 2, name: "Mang Otong", totalVisit: 30, actualVisit: 30 },
    { id: 3, name: "Pak Thrio", totalVisit: 30, actualVisit: 30 },
    { id: 4, name: "Bung Karno", totalVisit: 30, actualVisit: 30 },
    { id: 5, name: "Mang Udin", totalVisit: 30, actualVisit: 20 },
];

const SalesmanList = () => {
    return (
        <div>
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    isRowSelectable={() => false}
                    componentsProps={{
                        cell: {
                            className: "outline-none",
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default SalesmanList;
