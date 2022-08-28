import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { PageLink } from "@/components";

const NotFoundPage = () => {
    const router = useRouter();

    return (
        <div className="p-5 text-center h-screen flex flex-col items-center justify-center">
            <Head>
                <title>Page Not Found - SalesGo</title>
            </Head>
            <h1 className="text-7xl font-black">404</h1>
            <div className="mt-2 text-lg">
                <p>Sepertinya anda nyasar 😵</p>
                <p>
                    Tidak ada halaman di url{" "}
                    <span className="bg-slate-200 text-slate-700 font-semibold py-1 px-2 rounded-xl">
                        {router.asPath}
                    </span>
                </p>
            </div>
            <PageLink
                href="/"
                className="inline-block bg-teal-500 hover:bg-teal-400 transition-colors text-white font-semibold py-2 px-5 mt-10 rounded-xl"
            >
                Balik ke Halaman Utama
            </PageLink>
        </div>
    );
};

export default NotFoundPage;
