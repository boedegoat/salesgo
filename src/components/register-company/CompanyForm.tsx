import FormWrapper from "./FormWrapper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Input } from "@/components";
import { useEffect, useState } from "react";
import { useStateMachine } from "little-state-machine";

type FormData = {
    name: string;
    country: string;
    address: string;
};

type Country = { text: string };

const schema = yup
    .object({
        name: yup.string().required(),
        country: yup.string().required(),
        address: yup.string().required(),
    })
    .required();

const CompanyForm = ({ step }: { step: number }) => {
    const form = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const { register, formState, getValues, setValue } = form;
    const { errors, isValid } = formState;

    const [countries, setCountries] = useState<Country[]>([]);
    useEffect(() => {
        const fetchCountries = async () => {
            const res = await fetch(
                "https://trial.mobiscroll.com/content/countries.json"
            );
            const countries = await res.json();
            setCountries(countries);
            setValue("country", "Indonesia"); // default country => Indonesia
        };

        fetchCountries();
    }, []);

    const { state } = useStateMachine();
    const { formData } = state.registerCompany;

    const registerCompany = async () => {
        alert("register company");
        console.log(formData);
    };

    return (
        <FormWrapper
            title="Lengkapi data perusahaan"
            description="Silahkan isi data perusahaan Anda"
            step={step}
            field="company"
            isValid={isValid}
            data={getValues()}
            onContinue={registerCompany}
        >
            <div className="my-5 space-y-3">
                <Input
                    label="Nama Perusahaan"
                    type={"text"}
                    placeholder="PT Mencari Rezeki"
                    {...register("name")}
                    error={errors.name?.message}
                />

                {/* TODO: create better select with searchbar + add country image */}
                <label className="input-group">
                    <span>Negara</span>
                    <select className="w-full" {...register("country")}>
                        {countries.map((country) => (
                            <option key={country.text} value={country.text}>
                                {/* <img
                                    src="https://img.mobiscroll.com/demos/flags/AF.png"
                                    alt=""
                                /> */}
                                {country.text}
                            </option>
                        ))}
                        {errors.country && (
                            <small className="text-red-500 text-xs">
                                {errors.country.message}
                            </small>
                        )}
                    </select>
                </label>

                <Input
                    label="Alamat Perusahaan"
                    type={"text"}
                    placeholder="Jalan in aja dulu No. 10, Tangerang Selatan"
                    {...register("address")}
                    error={errors.address?.message}
                />
            </div>
        </FormWrapper>
    );
};

export default CompanyForm;
