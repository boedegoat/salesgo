import { useTheme } from "next-themes";
import { Bars3Icon as MenuIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components";
import {
    AdminGeneralForm,
    AdminPasswordForm,
    CompanyForm,
} from "@/components/register-company";
import { useGlobalState } from "@/hooks";
import { useMediaQuery } from "usehooks-ts";

const RegisterCompany = () => {
    const { theme } = useTheme();
    const isMobile = useMediaQuery("(max-width: 768px)");

    const { state } = useGlobalState();
    const { step, totalStep } = state.registerCompany;

    return (
        <Container
            noBottomNav
            noHeader
            title="Daftar Perusahaan"
            className="md:h-screen bg-center bg-cover flex flex-col-reverse md:flex-row"
            style={{
                backgroundImage: `url(/images/illustration/register-company${
                    theme === "dark" ? "-night" : ""
                }.jpg)`,
                backgroundPosition:
                    isMobile && theme === "dark" ? "700px -250px" : "auto",
            }}
        >
            <div className="bg-white dark:bg-slate-900 md:w-[50%] p-5 md:p-12 rounded-tl-2xl rounded-tr-2xl md:rounded-tl-none md:rounded-br-2xl shadow-2xl overflow-auto scrollbar-hide">
                <h1 className="font-bold text-3xl dark:text-white">
                    Daftarkan Perusahaan Anda
                </h1>

                {/* PROGRESS BAR */}
                <div className="mt-5 bg-slate-100 rounded-full">
                    <div
                        style={{
                            width: `${(step / totalStep) * 100}%`,
                        }}
                        className="bg-teal-500 rounded-full text-[10px] text-white font-semibold flex items-center justify-start pl-2 transition-all duration-300"
                    >
                        {step}/{totalStep}
                    </div>
                </div>

                {/* FORMS */}
                <div className="overflow-hidden">
                    <div
                        className="flex"
                        style={{
                            transform: `translateX(-${(step - 1) * 100}%)`,
                        }}
                    >
                        <AdminGeneralForm />
                        <AdminPasswordForm />
                        <CompanyForm />
                    </div>
                </div>
            </div>

            {/* TOP RIGHT MENU BUTTON */}
            <div className="p-5 md:p-12 pb-32 md:w-[50%]">
                <button className="block ml-auto bg-slate-700 dark:bg-slate-900 shadow-2xl hover:bg-slate-600 dark:hover:bg-slate-700 p-3 rounded-2xl">
                    <MenuIcon className="w-6 h-6 text-white" />
                </button>
            </div>
        </Container>
    );
};

export default RegisterCompany;
