import { checkAuth, handler, sendResponse } from "@/utils/api";
import db from "@/utils/db";
import { hashPassword } from "@/utils/hash";

const employeeIdHandler = handler();

// EDIT EMPLOYEE
employeeIdHandler.put(checkAuth(), async (req, res) => {
    const { name, email, password, phoneNumber, employeeId } = req.body;

    const data: CustomObject = {
        name,
        email,
        phoneNumber,
        employeeId,
    };

    if (password) {
        data.password = await hashPassword(password);
    }

    // eslint-disable-next-line no-unused-vars
    const { password: p, ...updatedEmployee } = await db.employee.update({
        where: {
            id: req.employee.id,
        },
        data,
    });

    sendResponse(res, {
        message: "Akun berhasil diedit",
        employee: updatedEmployee,
    });
});

export default employeeIdHandler;
