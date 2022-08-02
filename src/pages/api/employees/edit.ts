import { checkAuth, handler, sendResponse } from "@/utils/api";
import db from "@/utils/db";
import { hashPassword } from "@/utils/hash";

const editEmployee = handler();

editEmployee.put(checkAuth(), async (req, res) => {
    const { name, email, password, phoneNumber, employeeId } = req.body;

    // TODO: check each unique field (email, phoneNumber) is aready exist or not

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

export default editEmployee;
