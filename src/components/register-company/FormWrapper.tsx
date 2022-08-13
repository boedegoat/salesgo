import { GlobalState, useStateMachine } from "little-state-machine";
import { PageLink } from "@/components";
import { FormEventHandler } from "react";

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

type SetFormDataPayload = { field: "admin" | "company"; data: any };

const setFormData = (
    state: GlobalState,
    { field, data }: SetFormDataPayload
): GlobalState => {
    const newFormData = { ...state.registerCompany.formData };

    newFormData[field] = {
        ...newFormData[field],
        ...data,
    };

    return {
        ...state,
        registerCompany: {
            ...state.registerCompany,
            formData: newFormData,
        },
    };
};

const toNextStep = (state: GlobalState): GlobalState => {
    return {
        ...state,
        registerCompany: {
            ...state.registerCompany,
            step: state.registerCompany.step + 1,
        },
    };
};

const toPrevStep = (state: GlobalState): GlobalState => {
    return {
        ...state,
        registerCompany: {
            ...state.registerCompany,
            step: state.registerCompany.step - 1,
        },
    };
};

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
    const { actions } = useStateMachine({
        setFormData,
        toNextStep,
        toPrevStep,
    });

    const onContinue: FormEventHandler = (e) => {
        e.preventDefault();
        actions.setFormData({ field, data });
        actions.toNextStep();
        customOnContinue && customOnContinue();
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
                <div className="mt-5">
                    <button
                        className="gradient-button px-6"
                        disabled={!isValid}
                        type={"submit"}
                    >
                        Lanjut
                    </button>
                    {step === 1 ? (
                        <PageLink href="/" className="px-6">
                            Batal
                        </PageLink>
                    ) : (
                        <button
                            onClick={() => actions.toPrevStep()}
                            type={"button"}
                            className="px-6"
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
