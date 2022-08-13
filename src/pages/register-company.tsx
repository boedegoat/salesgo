import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useStateMachine } from "little-state-machine";
import { MenuIcon } from "@heroicons/react/outline";
import { Container } from "@/components";
import {
    AdminGeneralForm,
    AdminPasswordForm,
} from "@/components/register-company";
import { useMounted } from "@/hooks";

// TODO: create form flow -> admin data, admin password, company data
// TODO: use react-hook-form for handling forms
const RegisterCompany = () => {
    const { theme } = useTheme();
    const { state } = useStateMachine();
    const { step, totalStep } = state.registerCompany;
    const mounted = useMounted();

    useEffect(() => {
        if (!mounted) return;
        document.getElementById(step.toString())?.scrollIntoView({
            behavior: "smooth",
        });
    }, [step, mounted]);

    return (
        <Container
            noBottomNav
            noHeader
            title="Daftar Perusahaan"
            className="h-screen bg-center bg-cover flex"
            style={{
                backgroundImage: `url(/images/illustration/register-company${
                    theme === "dark" ? "-night" : ""
                }.jpg)`,
            }}
        >
            <div className="bg-white dark:bg-slate-900 w-[50%] p-12 rounded-tr-2xl rounded-br-2xl shadow-2xl overflow-auto scrollbar-hide">
                <h1 className="font-bold text-3xl dark:text-white">
                    Daftarkan Perusahaan Anda
                </h1>

                {/* PROGRESS BAR */}
                {mounted && (
                    <div className="mt-5 bg-slate-100 rounded-full">
                        <div
                            style={{
                                width: `${(step / totalStep) * 100}%`,
                            }}
                            className="bg-teal-500 rounded-full text-[10px] text-white font-semibold flex items-center justify-start pl-2 transition-all"
                        >
                            {step}/{totalStep}
                        </div>
                    </div>
                )}

                {/* FORMS */}
                <div className="overflow-hidden">
                    <div className="flex space-x-10">
                        <AdminGeneralForm step={1} />
                        <AdminPasswordForm step={2} />
                    </div>
                </div>
            </div>

            {/* TOP RIGHT MENU BUTTON */}
            <div className="p-12 w-[50%]">
                <button className="block ml-auto bg-slate-700 dark:bg-slate-900 shadow-2xl hover:bg-slate-600 dark:hover:bg-slate-700 p-3 rounded-2xl">
                    <MenuIcon className="w-6 h-6 text-white" />
                </button>
            </div>
        </Container>
    );
};

export default RegisterCompany;
