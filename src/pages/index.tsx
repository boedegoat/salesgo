import { OfficeBuildingIcon as OfficeBuildingIconSolid } from "@heroicons/react/solid";
import { useStateMachine } from "little-state-machine";
import Image from "next/image";
import { Container, PageLink } from "@/components";
import { isObjectFilled } from "@/utils/object";
import { useMounted } from "@/hooks";

const Home = () => {
    const mounted = useMounted();
    const { state } = useStateMachine();
    const { admin, company } = state.registerCompany.formData;

    return (
        <Container wrapper title="Sales Tracker" noBottomNav>
            {/* top section */}
            <section className="md:mt-16 flex flex-col md:flex-row text-center md:text-left">
                <div className="relative w-full h-[200px] md:h-auto md:max-w-[600px]">
                    <Image
                        src="/images/illustration/colaboration.svg"
                        layout="fill"
                    />
                </div>
                <div className="mt-8 md:mt-0 md:ml-20">
                    <h1 className="text-4xl md:text-5xl font-bold dark:text-white">
                        Ga perlu lagi <br /> ribet-ribet{" "}
                        <br className="md:hidden" /> ngurusin{" "}
                        <br className="hidden md:block" /> sales
                    </h1>
                    <p className="mt-3 text-sm md:text-base max-w-[50ch] mx-auto">
                        Tampilan yang simple 🎨 dan dilengkapi dengan
                        fitur-fitur unggulan ⚡ membuat semua aktifitas sales
                        menjadi lebih produktif dari sebelumnya 👍
                    </p>
                    <div className="my-6">
                        {mounted && (
                            <PageLink
                                href="/register-company"
                                className="w-full md:w-max px-5 md:px-7 gradient-button flex items-center justify-center"
                            >
                                <OfficeBuildingIconSolid className="w-5 h-5 mr-2" />{" "}
                                {isObjectFilled(admin) ||
                                isObjectFilled(company)
                                    ? "Lanjutkan Pendaftaran"
                                    : "Daftarkan perusahaan Anda"}
                            </PageLink>
                        )}
                        <div className="mt-10 text-slate-500 md:text-left">
                            Sudah Punya Akun ?{" "}
                            <PageLink
                                href="/auth/signin"
                                className="font-semibold border-teal-500 rounded-xl text-teal-400 hover:underline"
                            >
                                Masuk
                            </PageLink>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    );
};

export default Home;
