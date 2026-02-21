"use client";

import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import ExtendedColors from "../../../../color.config";
import { useEffect, useState } from "react";
import { ImSpinner10 } from "react-icons/im";
import { toast } from "react-toastify";
import useForm from "@/hooks/useForm";
import { login } from "@/api/authentication";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/form/Input";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";

const Login = () => {
  const [isParticipant, setIsParticipant] = useState(true);

  const searchParamObj = useSearchParams();
  const searchParams = {
    redirect: searchParamObj.get("redirect"),
    popup: searchParamObj.get("popup"),
  };

  const Router = useRouter();

  // Forgot password state
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState<1 | 2>(1);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOTP, setForgotOTP] = useState("");
  const [forgotNewPass, setForgotNewPass] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const [form, loading] = useForm({
    handler: async (data) => {
      const { email, password } = data;
      if (email == "" || password == "") {
        throw new Error("Invalid Email or Password");
        return;
      }
      const response = await login({
        ...data,
        mode: isParticipant ? "par" : "ca",
      });
      return response;
    },
    onSuccess: async () => {
      if (searchParams.redirect) {
        Router.back();
      } else {
        Router.push("/profile");
        Router.refresh();
      }
    },
  });

  useEffect(() => {
    if (searchParams.popup) {
      toast.error("Login Required!");
    }
  }, [searchParams.popup]);

  const handleSendOTP = async () => {
    if (!forgotEmail) return toast.error("Please enter your email.");
    setForgotLoading(true);
    try {
      const res = await fetchJSON(reqs.FORGOT_PASSWORD, { method: "POST" }, { email: forgotEmail });
      if (res?.succeed) {
        toast.success("OTP sent to your email!");
        setForgotStep(2);
      } else {
        toast.error(res?.msg || "Email not found.");
      }
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!forgotOTP || !forgotNewPass) return toast.error("Please fill all fields.");
    if (forgotNewPass.length < 6) return toast.error("Password must be at least 6 characters.");
    setForgotLoading(true);
    try {
      const res = await fetchJSON(reqs.RESET_PASSWORD_OTP, { method: "POST" }, { email: forgotEmail, otp: forgotOTP, password: forgotNewPass });
      if (res?.succeed) {
        toast.success("Password reset successful! Please log in.");
        setShowForgot(false);
        setForgotStep(1);
        setForgotEmail("");
        setForgotOTP("");
        setForgotNewPass("");
      } else {
        toast.error(res?.msg || "Invalid or expired OTP.");
      }
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <main className="bg-grid-white/[0.02] relative min-h-screen w-full overflow-hidden bg-primary-650 antialiased md:items-center md:justify-center">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />

      <div className="container-c mb-16 mt-[100px] flex min-h-[calc(100vh_-_100px)] w-full flex-1 flex-col items-center justify-center gap-5 md:flex-row-reverse md:justify-center md:gap-12">
        <div className="flex w-full items-center justify-center lg:w-1/2 lg:justify-start">
          <div className="flex w-full max-w-[550px] flex-col items-center justify-center px-2 md:px-0">

            {!showForgot ? (
              <>
                <h1 className="Bebas GradText mb-10 text-center text-4xl tracking-wide md:text-5xl 2xl:text-6xl">
                  Welcome <br /> Back
                </h1>

                <form
                  ref={form}
                  className="flex w-full flex-col items-center space-y-5"
                >
                  <Input
                    disabled={loading}
                    name="email"
                    label="E-mail"
                    divClass="w-full"
                  />
                  <Input
                    disabled={loading}
                    name="password"
                    label="Password"
                    divClass="w-full"
                    type="password"
                  />
                  <div className="Nunito mt-7 text-center text-sm tracking-wide text-white">
                    <p>
                      <button
                        type="button"
                        onClick={() => setShowForgot(true)}
                        className="text-primary-350 hover:underline"
                      >
                        FORGOT PASSWORD?
                      </button>
                    </p>
                  </div>
                  <button
                    disabled={loading}
                    type="submit"
                    className="btn-prim Nunito flex w-full items-center justify-center rounded-full py-2 text-xl"
                  >
                    {loading ? (
                      <ImSpinner10 className="h-7 w-7 animate-spin" />
                    ) : (
                      "Log In"
                    )}
                  </button>
                  <div className="Nunito mt-7 text-center text-sm tracking-wide text-white">
                    <p>
                      HAVEN&apos;T REGISTERED YET? <br />
                      <Link
                        href="/register"
                        className="text-primary-350 hover:underline"
                      >
                        REGISTER NOW!
                      </Link>
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h1 className="Bebas GradText mb-2 text-center text-4xl tracking-wide md:text-5xl 2xl:text-6xl">
                  Reset <br /> Password
                </h1>
                <p className="Nunito mb-8 text-center text-sm text-white/60">
                  {forgotStep === 1
                    ? "Enter your registered email to receive an OTP."
                    : `Enter the OTP sent to ${forgotEmail} and your new password.`}
                </p>

                <div className="flex w-full flex-col items-center space-y-5">
                  {forgotStep === 1 ? (
                    <>
                      <Input
                        name="forgot_email"
                        label="Registered Email"
                        divClass="w-full"
                        type="email"
                        value={forgotEmail}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setForgotEmail(e.target.value)
                        }
                      />
                      <button
                        type="button"
                        disabled={forgotLoading}
                        onClick={handleSendOTP}
                        className="btn-prim Nunito flex w-full items-center justify-center rounded-full py-2 text-xl"
                      >
                        {forgotLoading ? (
                          <ImSpinner10 className="h-7 w-7 animate-spin" />
                        ) : (
                          "Send OTP"
                        )}
                      </button>
                    </>
                  ) : (
                    <>
                      <Input
                        name="forgot_otp"
                        label="OTP Code"
                        divClass="w-full"
                        placeholder="6-digit OTP from your email"
                        value={forgotOTP}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setForgotOTP(e.target.value)
                        }
                      />
                      <Input
                        name="forgot_newpass"
                        label="New Password"
                        divClass="w-full"
                        type="password"
                        placeholder="Minimum 6 characters"
                        value={forgotNewPass}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setForgotNewPass(e.target.value)
                        }
                      />
                      <button
                        type="button"
                        disabled={forgotLoading}
                        onClick={handleResetPassword}
                        className="btn-prim Nunito flex w-full items-center justify-center rounded-full py-2 text-xl"
                      >
                        {forgotLoading ? (
                          <ImSpinner10 className="h-7 w-7 animate-spin" />
                        ) : (
                          "Reset Password"
                        )}
                      </button>
                    </>
                  )}

                  <div className="Nunito mt-2 text-center text-sm tracking-wide text-white">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgot(false);
                        setForgotStep(1);
                        setForgotEmail("");
                        setForgotOTP("");
                        setForgotNewPass("");
                      }}
                      className="text-primary-350 hover:underline"
                    >
                      ← BACK TO LOGIN
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
