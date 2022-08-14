import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormWrapper from "./FormWrapper";
import { Input, Select } from "@/components";
import { useGlobalState } from "@/hooks";

type FormData = {
    name: string;
    province: string;
    city: string;
    district: string;
    village: string;
    postalCode: string;
    address: string;
};

type Location = { nama: string; id: number };

const schema = yup
    .object({
        name: yup.string().required("Mohon masukkan nama perusahaan"),
        province: yup.string().required("Mohon masukkan Provinsi"),
        city: yup.string().required("Mohon masukkan Kota/Kabupaten"),
        district: yup.string().required("Mohon masukkan Kecamatan"),
        village: yup.string().required("Mohon masukkan Kelurahan"),
        postalCode: yup
            .string()
            .required("Harap masukkan kode pos")
            .matches(/^[0-9]{5}$/, "Mohon masukkan kode pos yang valid"),
        address: yup.string().required("Mohon masukkan alamat perusahaan"),
    })
    .required();

const getProvinces = async () => {
    const res = await fetch(
        "https://dev.farizdotid.com/api/daerahindonesia/provinsi"
    );
    return (await res.json()).provinsi;
};

const getCities = async (provinceId: number) => {
    const res = await fetch(
        `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${provinceId}`
    );
    return (await res.json()).kota_kabupaten;
};

const getDistricts = async (cityId: number) => {
    const res = await fetch(
        `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${cityId}`
    );
    return (await res.json()).kecamatan;
};

const getVillages = async (villageId: number) => {
    const res = await fetch(
        `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${villageId}`
    );
    return (await res.json()).kelurahan;
};

const CompanyForm = ({ step }: { step: number }) => {
    const form = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const { register, formState, getValues, watch } = form;
    const { errors, isValid } = formState;

    const [provinces, setProvinces] = useState<Location[]>([]);
    const [cities, setCities] = useState<Location[]>([]);
    const [districts, setDistricts] = useState<Location[]>([]);
    const [villages, setVillages] = useState<Location[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setProvinces(await getProvinces());
        };

        fetchData();

        // prevent user close/reload the tab
        const confirmExit = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
        };

        window.addEventListener("beforeunload", confirmExit);

        return () => {
            window.removeEventListener("beforeunload", confirmExit);
        };
    }, []);

    useEffect(() => {
        const subs = watch(async (value) => {
            if (value.province) {
                const provinceId = provinces.find(
                    ({ nama }) => nama === value.province
                )!.id;
                setCities(await getCities(provinceId));
            }

            if (value.city) {
                const cityId = cities.find(
                    ({ nama }) => nama === value.city
                )!.id;
                setDistricts(await getDistricts(cityId));
            }

            if (value.district) {
                const districtId = districts.find(
                    ({ nama }) => nama === value.district
                )!.id;
                setVillages(await getVillages(districtId));
            }
        });

        return () => subs.unsubscribe();
    }, [watch, provinces, cities, districts]);

    const { state } = useGlobalState();
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

                <Select
                    label="Provinsi"
                    {...register("province")}
                    error={errors.province?.message}
                >
                    <option value="">Pilih Provinsi</option>
                    {provinces.map((province) => (
                        <option key={province.id} value={province.nama}>
                            {province.nama}
                        </option>
                    ))}
                </Select>

                <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5">
                    {cities.length > 0 && (
                        <Select
                            containerClassName="md:w-[50%]"
                            label="Kota/Kabupaten"
                            {...register("city")}
                            error={errors.city?.message}
                        >
                            <option value="">Pilih Kota/Kabupaten</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.nama}>
                                    {city.nama}
                                </option>
                            ))}
                        </Select>
                    )}

                    {districts.length > 0 && (
                        <Select
                            containerClassName="md:w-[50%]"
                            label="Kecamatan"
                            {...register("district")}
                            error={errors.district?.message}
                        >
                            <option value="">Pilih Kecamatan</option>
                            {districts.map((district) => (
                                <option key={district.id} value={district.nama}>
                                    {district.nama}
                                </option>
                            ))}
                        </Select>
                    )}
                </div>

                <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5">
                    {villages.length > 0 && (
                        <Select
                            containerClassName="md:w-[50%]"
                            label="Kelurahan"
                            {...register("village")}
                            error={errors.village?.message}
                        >
                            <option value="">Pilih Kelurahan</option>
                            {villages.map((village) => (
                                <option key={village.id} value={village.nama}>
                                    {village.nama}
                                </option>
                            ))}
                        </Select>
                    )}

                    {getValues().village && (
                        <Input
                            containerClassName="md:w-[50%]"
                            label="Kode Pos"
                            type={"text"}
                            placeholder="12345"
                            {...register("postalCode")}
                            error={errors.postalCode?.message}
                        />
                    )}
                </div>

                {getValues().postalCode && (
                    <Input
                        label="Alamat Perusahaan"
                        type={"text"}
                        placeholder="Jalan in aja dulu No. 10, Tangerang Selatan"
                        {...register("address")}
                        error={errors.address?.message}
                    />
                )}
            </div>
        </FormWrapper>
    );
};

export default CompanyForm;
