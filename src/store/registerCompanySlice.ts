import { createSlice } from "@reduxjs/toolkit";

export interface RegisterCompanyState {
    formData: {
        admin: any;
        company: any;
    };
    step: number;
    totalStep: number;
}

const initialState: RegisterCompanyState = {
    formData: {
        admin: {},
        company: {},
    },
    step: 1,
    totalStep: 3,
};

export const registerCompanySlice = createSlice({
    name: "registerCompany",
    initialState,
    reducers: {
        setAdminData: (state, action) => {
            state.formData.admin = {
                ...state.formData.admin,
                ...action.payload,
            };
        },
        setCompanyData: (state, action) => {
            state.formData.company = {
                ...state.formData.company,
                ...action.payload,
            };
        },
        toNextStep: (state) => {
            state.step += 1;
        },
        toPrevStep: (state) => {
            state.step -= 1;
        },
    },
});

// Action creators are generated for each case reducer function
export const registerCompany = registerCompanySlice.actions;

export default registerCompanySlice.reducer;
