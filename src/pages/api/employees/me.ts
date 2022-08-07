import { checkAuth, handler, sendResponse } from "@/utils/api";

const myEmployeeDataHandler = handler();

myEmployeeDataHandler.get(checkAuth(), async (req, res) => {
    sendResponse(res, {
        message: "Berhasil mendapatkan data pegawai anda",
        employee: req.employee,
    });
});

export default myEmployeeDataHandler;
