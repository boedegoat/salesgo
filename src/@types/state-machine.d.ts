/* eslint-disable no-unused-vars */
import "little-state-machine";

declare module "little-state-machine" {
    interface GlobalState {
        registerCompany: {
            formData: {
                admin: CustomObject;
                company: CustomObject;
            };
            step: number;
            totalStep: number;
        };
    }
}
