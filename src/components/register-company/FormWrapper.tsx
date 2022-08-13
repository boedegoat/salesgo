import FormButtons from "./FormButtons";

interface Props {
    children: React.ReactNode;
    title: string;
    description: any;
    isValid: boolean;
    onContinue: () => void;
}

const FormWrapper = ({
    children,
    title,
    description,
    isValid,
    onContinue,
}: Props) => {
    return (
        <div className="flex-shrink-0 w-full">
            {/* TOP SECTION */}
            <div className="mt-5">
                <div className="mt-3">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className="mt-1">{description}</p>
                </div>
            </div>

            {/* FORM */}
            <form>
                <>{children}</>
                <FormButtons canContinue={isValid} onContinue={onContinue} />
            </form>
        </div>
    );
};

export default FormWrapper;
