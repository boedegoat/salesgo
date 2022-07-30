import Image from "next/image";
import { FormEventHandler, useState } from "react";
import { Container } from "@/components";

const SignIn = () => {
    const [method, setMethod] = useState<"User ID" | "Nomor HP">("User ID");

    const toggleMethod = () => {
        setMethod(method === "User ID" ? "Nomor HP" : "User ID");
    };

    const signInHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
    };

    return (
        <Container
            title="Masuk"
            wrapper="mobile"
            className="text-center"
            noBottomNav
        >
            <Image
                src="/images/illustration/signin.svg"
                width={300}
                height={200}
            />
            <h2 className="mt-3 text-3xl font-bold dark:text-white">
                Tak kenal maka tak sayang
            </h2>
            <p className="mt-1">
                Silahkan masuk menggunakan User ID dari perusahaan atau nomor hp
                anda
            </p>
            <form className="mt-5" onSubmit={signInHandler}>
                <div className="space-y-3">
                    <label className="input-group">
                        {method === "User ID" && (
                            <>
                                <span>User ID</span>
                                <input
                                    type="text"
                                    placeholder="Masukkan User ID Perusahaan"
                                />
                            </>
                        )}
                        {method === "Nomor HP" && (
                            <>
                                <span>Nomor HP</span>
                                <input
                                    type="number"
                                    onWheel={(e) => {
                                        (e.target as HTMLInputElement).blur();
                                    }}
                                    placeholder="Masukkan Nomor HP"
                                />
                            </>
                        )}
                    </label>
                    <label className="input-group">
                        <span>Password</span>
                        <input
                            type="password"
                            placeholder="Masukkan Password"
                        />
                    </label>
                </div>
                <div className="flex items-stretch space-x-2 my-5">
                    <button
                        type="button"
                        onClick={toggleMethod}
                        className="w-full border hover:border-teal-300 hover:text-teal-500 text-slate-400 rounded-xl text-sm font-semibold"
                    >
                        Masuk dengan{" "}
                        {method === "User ID" ? "Nomor HP" : "User ID"}
                    </button>
                    <button type="submit" className="w-full gradient-button">
                        Lanjut &rarr;
                    </button>
                </div>
            </form>
        </Container>
    );
};

export default SignIn;
