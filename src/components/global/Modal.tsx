import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { createContext, useContext } from "react";
import {
    Modal as DaisyModal,
    ModalProps as DaisyModalProps,
} from "react-daisyui";
import { twMerge } from "tailwind-merge";

interface ModalProps extends DaisyModalProps {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
}

interface ModalChildProps {
    children: React.ReactNode;
    className?: string;
}

const ModalContext = createContext({} as CustomObject);
const useModalContext = () => useContext(ModalContext);

const Modal = ({
    children,
    open,
    onClose,
    className,
    ...modalProps
}: ModalProps) => {
    return (
        <DaisyModal
            {...modalProps}
            open={open}
            onClickBackdrop={onClose}
            className={twMerge(
                "bg-white rounded-2xl shadow w-11/12 max-w-5xl overflow-hidden",
                className
            )}
        >
            <ModalContext.Provider value={{ onClose }}>
                {children}
            </ModalContext.Provider>
        </DaisyModal>
    );
};

const Header = ({ children, ...props }: ModalChildProps) => {
    const { onClose } = useModalContext();

    return (
        <DaisyModal.Header
            {...props}
            className={twMerge(
                "font-bold p-5 sticky top-0 bg-white shadow-sm z-[9999] flex items-center justify-between",
                props.className
            )}
        >
            {children}
            <button
                onClick={onClose}
                className="btn btn-ghost btn-sm hover:bg-slate-200"
            >
                <XMarkIcon className="w-5" />
            </button>
        </DaisyModal.Header>
    );
};

const Content = ({ children, ...props }: ModalChildProps) => {
    return (
        <DaisyModal.Body
            {...props}
            className={twMerge("p-5 h-full overflow-auto", props.className)}
        >
            {children}
        </DaisyModal.Body>
    );
};

Modal.Header = Header;
Modal.Content = Content;

export default Modal;
