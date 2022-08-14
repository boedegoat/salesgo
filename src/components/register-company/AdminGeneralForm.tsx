// Admin General Form
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, PageLink, RoleBadge } from "@/components";
import FormWrapper from "./FormWrapper";
import { useGlobalState } from "@/hooks";

type FormData = {
    name: string;
    email: string;
    phoneNumber: string;
    termsOfService: boolean;
};

const schema = yup
    .object({
        name: yup.string().required("Harap masukkan nama lengkap anda"),
        email: yup
            .string()
            .required("Harap masukkan email anda")
            .email("Harap masukkan email yang valid"),
        phoneNumber: yup
            .string()
            .required("Harap masukkan nomor telefon anda")
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                "Harap masukkan nomor telefon yang valid"
            )
            .min(8, "Nomor telefon minimal 8 angka"),
        termsOfService: yup.bool().oneOf([true]).required(),
    })
    .required();

const AdminGeneralForm = () => {
    const form = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const { register, formState, watch, getValues, setValue } = form;
    const { errors, isValid, dirtyFields } = formState;

    const [isEmailUnique, setIsEmailUnique] = useState(false);
    const [isPhoneNumberUnique, setIsPhoneNumberUnique] = useState(false);

    const { state } = useGlobalState();
    const { name, email, phoneNumber, termsOfService } =
        state.registerCompany.formData.admin;

    function isFieldValid<K extends keyof FormData>(field: K) {
        return dirtyFields[field] && !errors[field];
    }

    useEffect(() => {
        setValue("name", name, { shouldValidate: Boolean(name) });
        setValue("email", email, { shouldValidate: Boolean(email) });
        setValue("phoneNumber", phoneNumber, {
            shouldValidate: Boolean(phoneNumber),
        });
        setValue("termsOfService", termsOfService, {
            shouldValidate: Boolean(termsOfService),
        });
    }, []);

    useEffect(() => {
        const subscription = watch((value) => {
            if (value.email && isFieldValid("email") && !isEmailUnique) {
                console.log("check email unique");
                setIsEmailUnique(true);
                // TODO: set logic for checking is email unique
            }
            if (
                value.phoneNumber &&
                isFieldValid("phoneNumber") &&
                !isPhoneNumberUnique
            ) {
                console.log("check phone number unique");
                setIsPhoneNumberUnique(true);
                // TODO: set logic for checking is phoneNumber unique
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, errors, isEmailUnique, isPhoneNumberUnique]);

    return (
        <FormWrapper
            title="Lengkapi Data Admin Perusahaan"
            description={
                <>
                    Silahkan isi data diri yang akan digunakan sebagai{" "}
                    <RoleBadge>Admin</RoleBadge> perusahaan Anda
                </>
            }
            isValid={isValid}
            field={"admin"}
            data={getValues()}
            onContinue={() => alert("Silahkan cek email anda untuk verifikasi")}
        >
            <div className="my-5 space-y-3">
                <Input
                    label="Nama Lengkap"
                    placeholder="Budi"
                    type={"text"}
                    {...register("name")}
                    error={errors.name?.message}
                />
                <Input
                    label="Email"
                    placeholder="budi@gmail.com"
                    type={"email"}
                    {...register("email")}
                    error={errors.email?.message}
                />
                <Input
                    label="Nomor Telefon"
                    placeholder="081284xxxxxxxx"
                    type={"tel"}
                    {...register("phoneNumber")}
                    error={errors.phoneNumber?.message}
                />
            </div>

            <label className="flex items-center pl-1">
                <input
                    type="checkbox"
                    className="mr-2"
                    {...register("termsOfService")}
                />
                <span>
                    Saya setuju dengan{" "}
                    <PageLink href={"#"} className="font-medium text-teal-500">
                        Syarat dan Ketentuan
                    </PageLink>{" "}
                    yang berlaku
                </span>
            </label>
        </FormWrapper>
    );
};

export default AdminGeneralForm;
