"use client";

import { useState } from "react";
import Image from "next/image";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [signInPending, setSignInPending] = useState(false);
  const [signUpPending, setSignUpPending] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setSignInPending(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/dashboard",
      email: form.email,
      password: form.password,
    });

    if (result?.error) {
      setSignInPending(false);
      setError("Invalid email or password");
    } else {
      toast.success("Signed in successfully!", {
        description: "Redirecting to dashboard...",
        duration: 2000,
      });

      setTimeout(() => {
        setSignInPending(false);
        router.push(result.url || "/dashboard");
      }, 500);
    }
  };

  const handleCreateAcc = async (e) => {
    e.preventDefault();
    setSignUpPending(true);
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setSignUpPending(false);

    const data = await res.json();
    if (!res.ok) {
      setError(data?.error || "Something went wrong");
      return;
    }

    toast.success("Account created successfully!", {
      description: "Redirecting to dashboard...",
      duration: 2000,
    });

    setTimeout(async () => {
      const result = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
        callbackUrl: "/dashboard",
      });

      setSignUpPending(false);

      if (result?.error) {
        setError("Account created but failed to sign in");
      } else {
        router.push(result.url || "/dashboard");
      }
    }, 500);
  };

  return (
    <div className="relative h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden">
      <Image
        src="/images/1355218.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-20"
      />

      <main className="z-10 flex flex-col gap-[32px] row-start-2 items-center justify-center w-full">
        <div className="backdrop-blur-sm bg-[#1a1a2e]/70 border border-[#0ff]/20 text-white rounded-2xl shadow-[0_0_30px_#0ff5] flex w-full max-w-lg transition-all duration-300">
          <div className="p-5 w-full">
            <div className="text-left font-bold text-3xl tracking-wide">
              <span className="text-[#ff00cc]">Saar</span>
              <span className="text-[#00ffff]">Lekh</span>
            </div>

            <div className="py-10 flex flex-col items-center text-center w-full">
              <h2 className="text-3xl font-bold text-[#00ffff] mb-2">
                Sign in
              </h2>
              <div className="border-2 w-10 border-[#ff00cc] inline-block mb-4 rounded"></div>

              {!!error && (
                <div
                  className="flex items-center w-64 bg-red-600 text-white text-sm px-4 py-2 rounded-xl mb-4 space-x-2 shadow-[0_0_5px_rgba(255,0,0,0.5)]"
                >
                  <TriangleAlert className="flex-shrink-0" size={18} />
                  <span className="break-words">{error}</span>
                </div>
              )}

              <div className="flex flex-col items-center">
                <div className="bg-[#0f1533]/80 w-64 p-2 flex items-center mb-4 rounded-xl border border-[#ff00cc]/30 shadow-[0_0_10px_#ff00cc50]">
                  <FaRegEnvelope className="text-[#ff00cc] m-2" />
                  <input
                    type="email"
                    name="email"
                    disabled={signInPending || signUpPending}
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="outline-none text-sm flex-1 bg-transparent text-white placeholder-[#ffb3e6]"
                  />
                </div>

                <div className="bg-[#0f1533]/80 w-64 p-2 flex items-center mb-4 rounded-xl border border-[#ff00cc]/30 shadow-[0_0_10px_#ff00cc50]">
                  <MdLockOutline className="text-[#ff00cc] m-2" />
                  <input
                    type="password"
                    name="password"
                    disabled={signInPending || signUpPending}
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="outline-none text-sm flex-1 bg-transparent text-white placeholder-[#ffb3e6]"
                  />
                </div>

                <button
                  onClick={handleSignIn}
                  disabled={signInPending}
                  className="border-2 border-[#00ffff] text-[#00ffff] rounded-full px-12 py-2 inline-block font-semibold hover:bg-[#00ffff] hover:text-[#0f0c29] transition-all duration-300 shadow-[0_0_15px_#00ffff90] mt-3"
                >
                  {signInPending ? "Signing in..." : "Sign in"}
                </button>

                <p className="mt-4 text-[#cccccc] text-sm"> Or </p>

                <button
                  onClick={handleCreateAcc}
                  disabled={signUpPending}
                  className="border-2 border-[#ff00cc] text-[#ff00cc] rounded-full px-12 py-2 inline-block font-semibold hover:bg-[#ff00ff] hover:text-[#0f0c29] transition-all duration-300 shadow-[0_0_15px_#ff00cc90] mt-4"
                >
                  {signUpPending ? "Creating..." : "Create account"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
