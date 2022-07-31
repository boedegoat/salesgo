import bcrypt from "bcrypt";

export const hashPassword = async (plainPassword: string) => {
    const salt = await bcrypt.genSalt();
    console.log({ salt });
    return bcrypt.hash(plainPassword, salt);
};

export const comparePassword = async (
    plainPassword: string,
    hashedPassword: string
) => {
    return bcrypt.compare(plainPassword, hashedPassword);
};
