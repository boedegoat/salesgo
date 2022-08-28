import { Employee } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Status = "loading" | "unauthenticated" | "authenticated" | "forbiden";

interface EmployeeAuth {
    status: Status;
    employee: Omit<Employee, "password">;
}

const initialState = {} as EmployeeAuth;

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<Status>) => {
            state.status = action.payload;
        },
        setEmployee: (state, action) => {
            state.status = "authenticated";
            state.employee = action.payload;
        },
    },
});

export const auth = authSlice.actions;

export default authSlice.reducer;
