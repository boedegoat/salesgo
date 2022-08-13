// Admin General Form
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, PageLink } from "@/components";
import FormWrapper from "./FormWrapper";

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
            .email("Harap masukkan email yang valid")
            .required("Harap masukkan email anda"),
        phoneNumber: yup.string().required("Harap masukkan nomor telefon anda"),
        termsOfService: yup.bool().oneOf([true]).required(),
    })
    .required();

const FirstStep = () => {
    const form = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const { register, handleSubmit, formState, watch } = form;
    const { errors, isValid, dirtyFields } = formState;

    const [isEmailUnique, setIsEmailUnique] = useState(false);
    const [isPhoneNumberUnique, setIsPhoneNumberUnique] = useState(false);

    function isFieldValid<K extends keyof FormData>(field: K) {
        return dirtyFields[field] && !errors[field];
    }

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

    const onContinue = handleSubmit((data) => {
        console.log(data);
        console.log(isValid, errors);
    });

    return (
        <FormWrapper
            title="Lengkapi Data Admin Perusahaan"
            description={
                <>
                    Silahkan isi data diri yang akan digunakan sebagai{" "}
                    <span className="bg-orange-500 text-white font-semibold px-1 py-0.5 rounded-md border-b-4 border-b-orange-700">
                        Admin
                    </span>{" "}
                    perusahaan Anda
                </>
            }
            isValid={isValid}
            onContinue={onContinue}
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

            <label className="flex items-center">
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

export default FirstStep;
