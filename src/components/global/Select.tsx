import {
    DetailedHTMLProps,
    forwardRef,
    ForwardedRef,
    ReactNode,
    SelectHTMLAttributes,
} from "react";
import { twMerge } from "tailwind-merge";

interface Props
    extends DetailedHTMLProps<
        SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
    > {
    label: string;
    containerClassName?: string;
    error?: string;
    children: ReactNode;
}

{
    /* TODO: create better select with searchbar */
}

const Select = forwardRef(
    (
        {
            label,
            className,
            containerClassName,
            error,
            children,
            ...props
        }: Props,
        ref: ForwardedRef<HTMLSelectElement>
    ) => {
        return (
            <label className={twMerge("input-group", containerClassName)}>
                <span>{label}</span>
                <select {...props} ref={ref}>
                    {children}
                </select>
                {error && (
                    <small className="text-red-500 text-xs">{error}</small>
                )}
            </label>
        );
    }
);

export default Select;
