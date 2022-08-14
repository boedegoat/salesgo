import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormWrapper from "./FormWrapper";
import { Input, RoleBadge } from "@/components";
import { useGlobalState } from "@/hooks";

type FormData = {
    password: string;
    passwordConfirmation: string;
};

const schema = yup
    .object({
        password: yup
            .string()
            .required("Harap masukkan password")
            .min(8, "Password minimal 8 karakter"),
        passwordConfirmation: yup
            .string()
            .oneOf([yup.ref("password"), null], "Password harus sama"),
    })
    .required();

const AdminPasswordForm = ({ step }: { step: number }) => {
    const form = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const { register, formState, getValues, setValue } = form;
    const { errors, isValid } = formState;

    const { state } = useGlobalState();
    const { password, passwordConfirmation } =
        state.registerCompany.formData.admin;

    useEffect(() => {
        setValue("password", password, { shouldValidate: Boolean(password) });
        setValue("passwordConfirmation", passwordConfirmation, {
            shouldValidate: Boolean(passwordConfirmation),
        });
    }, []);

    return (
        <FormWrapper
            title="Masukkan password"
            description={
                <>
                    Silahkan masukkan password <RoleBadge>Admin</RoleBadge>{" "}
                    perusahaan Anda
                </>
            }
            step={step}
            field="admin"
            isValid={isValid}
            data={getValues()}
        >
            <div className="my-5 space-y-3">
                <Input
                    label="Password"
                    type={"password"}
                    {...register("password")}
                    error={errors.password?.message}
                />
                <Input
                    label="Password Confirmation"
                    type={"password"}
                    {...register("passwordConfirmation")}
                    error={errors.passwordConfirmation?.message}
                />
            </div>
        </FormWrapper>
    );
};

export default AdminPasswordForm;
