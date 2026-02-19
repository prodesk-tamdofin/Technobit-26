"use client";

import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import ExtendedColors from "../../../../color.config";
import Input from "@/components/ui/form/Input";
import useForm from "@/hooks/useForm";
import { register } from "@/api/authentication";
import Link from "next/link";
import { AiOutlineUserAdd } from "react-icons/ai";
import Select from "@/components/ui/form/Select";
import Checkbox from "@/components/ui/form/Checkbox";
import Loading from "@/components/ui/LoadingWhite";
import { mailRegex } from "@/utils/validations";
import { useRouter } from "next/navigation";
import { CLASSES } from "@/data/classes";

const COLLEGES = [
  { value: "BNMPC", label: "Birshreshtha Noor Mohammad Public College" },
  { value: "BMARPC", label: "Birshreshtha Munshi Abdur Rouf Public College" },
];

const Register = () => {
  const Router = useRouter();
  const [form, loading] = useForm({
    handler: async (data) => {
      if (!mailRegex.test(data?.email.trim())) {
        throw new Error(
          "Please use a popular email provider like Gmail, Outlook, Yahoo, or iCloud.",
        );
      } else if (
        data?.password.trim().length < 8
      ) {
        throw new Error(
          "Password must be at least 8 characters.",
        );
      } else if (data?.password.trim() !== data?.cpassword.trim()) {
        throw new Error("Password and Confirm Password Aren't same.");
      } else if (!data?.agreed) {
        throw new Error("You haven't agreed to terms and conditions.");
      } else {
        // Auto-fill institute from college selection
        if (data?.college) {
          const selectedCollege = COLLEGES.find(c => c.value === data.college);
          data.institute = selectedCollege?.label || data.college;
        }
        // Auto-generate username from email
        data.userName = data.email.split('@')[0] + '_' + Date.now();
        // Set default address if empty
        if (!data.address) {
          data.address = 'N/A';
        }
        // Set default image
        data.image = '';
        
        const response = await register(data);
        return response;
      }
    },
    successMsg: "You successfully registered! Redirecting to events...",
    onSuccess: () => {
      Router.push("/events");
      Router.refresh();
    },
  });

  return (
    <main className="bg-grid-white/[0.02] relative min-h-screen w-full overflow-hidden bg-primary-650 antialiased md:mb-10 md:items-center md:justify-start">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />

      <div className="container-c flex flex-col items-center justify-center gap-20 py-[81px] md:flex-row">
        <form
          className="grid w-full max-w-[800px] flex-1 grid-cols-1 gap-5"
          ref={form}
        >
          <div className="mt-16 flex w-full items-center justify-center gap-1.5 text-center">
            <AiOutlineUserAdd className="text-primary h-16 w-16 text-primary-150" />
            <div className="flex flex-col items-start justify-start gap-0.5">
              <p className="text-lg font-semibold text-primary-200">Technobit'26</p>
              <h1 className="GradText text-5xl">Registration</h1>
            </div>
          </div>
          <p className="mb-5 text-center text-white/80">
            Register for Technobit'26 - BNMPC IT Club. Fill in your details to participate!
          </p>

          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-4">
            {/* Full Name */}
            <Input
              label="Full Name"
              name="fullName"
              id="name"
              placeholder="Your Full Name"
              type="text"
              divClass="md:col-span-4"
              required
            />

            {/* Roll Number */}
            <Input
              label="Roll Number"
              name="roll"
              id="roll"
              placeholder="Your Roll Number"
              type="text"
              divClass="md:col-span-2"
              required
            />

            {/* Class */}
            <Select
              label="Class"
              name="className"
              id="class"
              heading="Select Your Class"
              divClass="md:col-span-2"
              options={CLASSES}
              required
            />

            {/* Section (Optional) */}
            <Input
              label="Section (Optional)"
              name="section"
              id="section"
              placeholder="e.g., A, B, C"
              type="text"
              divClass="md:col-span-2"
            />

            {/* College Selection */}
            <Select
              label="College"
              name="college"
              id="college"
              heading="Select Your College"
              divClass="md:col-span-4"
              options={COLLEGES}
              required
            />

            {/* Email */}
            <Input
              label="Email ID"
              name="email"
              id="email"
              placeholder="your@email.com"
              type="email"
              divClass="md:col-span-2"
              required
            />

            {/* WhatsApp Number */}
            <Input
              label="WhatsApp Number"
              name="phone"
              id="whatsapp"
              placeholder="01XXXXXXXXX"
              type="tel"
              divClass="md:col-span-2"
              required
            />

            {/* Facebook Profile URL (Optional) */}
            <Input
              label="Facebook Profile URL (Optional)"
              name="fb"
              id="facebook"
              placeholder="https://facebook.com/yourprofile"
              type="url"
              divClass="md:col-span-4"
            />

            {/* Hidden fields for backend compatibility */}
            <input type="hidden" name="address" value="N/A" />

            {/* Password */}
            <Input
              label="Password"
              name="password"
              id="password"
              placeholder="Min. 8 characters"
              type="password"
              divClass="md:col-span-2"
              required
            />

            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              name="cpassword"
              id="cpassword"
              placeholder="Re-enter Password"
              type="password"
              divClass="md:col-span-2"
              required
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              name="agreed"
              label=""
              divClass="mt-1"
              required
            />
            <label htmlFor="terms" className="text-sm text-white/70">
              I agree to the{" "}
              <Link href="/terms" className="text-primary-200 hover:underline">
                terms and conditions
              </Link>{" "}
              and understand that my information will be used for event
              registration and communication purposes.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-prim w-full py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loading /> : "Register Now"}
          </button>

          {/* Login Link */}
          <p className="text-center text-white/70">
            Already registered?{" "}
            <Link href="/login" className="text-primary-200 hover:underline font-semibold">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
