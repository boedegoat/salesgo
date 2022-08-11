import { Container, Input, PageLink } from "@/components";
import { useTheme } from "next-themes";
import { MenuIcon } from "@heroicons/react/outline";

// TODO: create form flow -> admin data, admin password, company data
// TODO: use react-hook-form for handling forms
const RegisterCompany = () => {
    const { theme } = useTheme();

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
            <div className="bg-white dark:bg-slate-900 w-[50%] p-12 rounded-tr-2xl rounded-br-2xl shadow-2xl">
                <h1 className="font-bold text-3xl dark:text-white">
                    Daftarkan Perusahaan Anda
                </h1>

                <div className="mt-5">
                    {/* PROGRESS BAR */}
                    <div className="bg-slate-100 rounded-full">
                        <div
                            style={{
                                width: `${(1 / 3) * 100}%`,
                            }}
                            className="bg-teal-500 rounded-full text-[10px] text-white font-semibold flex items-center justify-start pl-2"
                        >
                            1/3
                        </div>
                    </div>

                    <div className="mt-3">
                        <h2 className="text-lg font-semibold">
                            Lengkapi Data Admin Perusahaan
                        </h2>

                        <p className="mt-1">
                            Silahkan isi data diri yang akan digunakan sebagai{" "}
                            <span className="bg-orange-500 text-white font-semibold px-1 py-0.5 rounded-md border-b-4 border-b-orange-700">
                                Admin
                            </span>{" "}
                            perusahaan Anda
                        </p>
                    </div>
                </div>

                <form>
                    <div className="my-5 space-y-3">
                        <Input
                            label="Nama"
                            placeholder="Hamid Jaja"
                            type={"text"}
                        />
                        <Input
                            label="Email"
                            placeholder="hamid@gmail.com"
                            type={"email"}
                        />
                        <Input
                            label="Nomor Telefon"
                            placeholder="081284xxxxxxxxx"
                            type={"tel"}
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]"
                        />
                    </div>

                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>
                            Saya setuju dengan{" "}
                            <PageLink
                                href={"#"}
                                className="font-medium text-teal-500"
                            >
                                Syarat dan Ketentuan
                            </PageLink>{" "}
                            yang berlaku
                        </span>
                    </label>
                </form>

                <div className="mt-5">
                    <button className="gradient-button px-6">Lanjut</button>
                    <PageLink href="/" className="px-6">
                        Batal
                    </PageLink>
                </div>
            </div>

            <div className="p-12 w-[50%]">
                <button className="block ml-auto bg-slate-700 dark:bg-slate-900 shadow-2xl hover:bg-slate-600 dark:hover:bg-slate-700 p-3 rounded-2xl">
                    <MenuIcon className="w-6 h-6 text-white" />
                </button>
            </div>
        </Container>
    );
};

export default RegisterCompany;
