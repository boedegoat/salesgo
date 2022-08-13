/* eslint-disable no-unused-vars */
import "little-state-machine";

declare module "little-state-machine" {
    interface GlobalState {
        registerCompany: {
            formData: {
                admin: any;
                company: any;
            };
            step: number;
            totalStep: number;
        };
    }
}
