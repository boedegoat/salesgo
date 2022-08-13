import { PageLink } from "@/components";

interface FormButtonsProps {
    canContinue: boolean;
    onContinue?: () => void;
}

const FormButtons = ({ canContinue, onContinue }: FormButtonsProps) => {
    return (
        <div className="mt-5">
            <button
                className="gradient-button px-6"
                disabled={!canContinue}
                type={"submit"}
                onClick={onContinue}
            >
                Lanjut
            </button>
            <PageLink href="/" className="px-6">
                Batal
            </PageLink>
        </div>
    );
};

export default FormButtons;
