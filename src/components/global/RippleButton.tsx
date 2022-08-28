import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import useRipple, { Options as RippleOptions } from "use-ripple-hook";

interface Props
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    options?: RippleOptions;
}

const RippleButton = ({ children, options, ...btnProps }: Props) => {
    const [ripple, event] = useRipple({
        color: "rgba(0,0,0,0.11)",
        duration: 500,
        ...options,
    });

    return (
        <button {...btnProps} ref={ripple} onMouseDown={event}>
            {children}
        </button>
    );
};

export default RippleButton;
