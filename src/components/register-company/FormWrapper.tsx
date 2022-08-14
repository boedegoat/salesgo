import { FormEventHandler } from "react";
import { PageLink } from "@/components";
import { registerCompany as rc } from "@/store/registerCompanySlice";
import { useGlobalState } from "@/hooks";

interface Props {
    children: React.ReactNode;
    title: string;
    description: any;
    isValid: boolean;
    field: "admin" | "company";
    data: CustomObject;
    step: number;
    onContinue?: () => void;
}

const FormWrapper = ({
    children,
    title,
    description,
    isValid,
    field,
    data,
    step,
    onContinue: customOnContinue,
}: Props) => {
    const { state, dispatch } = useGlobalState();
    const { totalStep } = state.registerCompany;

    const onContinue: FormEventHandler = async (e) => {
        e.preventDefault();

        if (field === "admin") {
            dispatch(rc.setAdminData(data));
        }
        if (field === "company") {
            dispatch(rc.setCompanyData(data));
        }

        customOnContinue && (await customOnContinue());

        if (step !== totalStep) {
            dispatch(rc.toNextStep());
        }
    };

    return (
        <div className="flex-shrink-0 w-full" id={step.toString()}>
            {/* TOP SECTION */}
            <div className="mt-5">
                <div className="mt-3">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className="mt-1">{description}</p>
                </div>
            </div>

            {/* FORM */}
            <form onSubmit={onContinue}>
                <>{children}</>

                {/* BUTTONS */}
                <div className="mt-5 flex flex-col text-center md:flex-row">
                    <button
                        className="gradient-button px-6"
                        disabled={!isValid}
                        type={"submit"}
                    >
                        {step !== totalStep
                            ? "Lanjut"
                            : "Selesaikan Pendaftaran"}
                    </button>

                    {step === 1 ? (
                        <PageLink
                            href="/"
                            className="px-6 py-6 md:py-0 text-slate-500 font-semibold flex items-center justify-center"
                        >
                            Batal
                        </PageLink>
                    ) : (
                        <button
                            onClick={() => dispatch(rc.toPrevStep())}
                            type={"button"}
                            className="px-6 py-6 md:py-0 text-slate-500 font-semibold flex items-center justify-center"
                        >
                            Kembali
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default FormWrapper;
