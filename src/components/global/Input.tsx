import {
    DetailedHTMLProps,
    InputHTMLAttributes,
    forwardRef,
    ForwardedRef,
} from "react";
import { twMerge } from "tailwind-merge";

interface Props
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    label: string;
    containerClassName?: string;
    error?: string;
}

const Input = forwardRef(
    (
        { label, className, containerClassName, error, ...props }: Props,
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <label className={twMerge("input-group", containerClassName)}>
                <span>{label}</span>
                <input {...props} ref={ref} />
                {error && (
                    <small className="text-red-500 text-xs">{error}</small>
                )}
            </label>
        );
    }
);

export default Input;
