export const isObjectFilled = (obj: CustomObject) => {
    const values = Object.values(obj);

    if (values.length === 0) return false;

    return values.every((value) => {
        return typeof value !== "undefined";
    });
};
