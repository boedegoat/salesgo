import cn from "classnames";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface Props
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    label: string;
    containerClassName?: string;
}

const Input = ({ label, className, containerClassName, ...props }: Props) => {
    return (
        <label className={cn("input-group", containerClassName)}>
            <span>{label}</span>
            <input {...props} />
        </label>
    );
};

export default Input;
