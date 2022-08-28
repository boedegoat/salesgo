import { ButtonHTMLAttributes, DetailedHTMLProps, useRef } from "react";
import { useRipple, RippleOptions } from "react-use-ripple";

type ExtendedProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> &
    RippleOptions;

interface Props extends ExtendedProps {}

const RippleButton = ({
    children,
    rippleColor = "rgba(0,0,0,0.1)",
    rippleSize,
    animationLength = 500,
    excludedRefs,
    ...btnProps
}: Props) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    useRipple(btnRef, {
        rippleColor,
        rippleSize,
        animationLength,
        excludedRefs,
    });

    return (
        <button ref={btnRef} {...btnProps}>
            {children}
        </button>
    );
};

export default RippleButton;
