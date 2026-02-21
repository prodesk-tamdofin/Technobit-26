"use client";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import Input from "@/components/ui/form/Input";
import Loading from "@/components/ui/LoadingWhite";
import UserContext from "@/context/UserContext";
import useForm from "@/hooks/useForm";
import React, { useContext } from "react";

const EditProfileModal = ({
  editEventHandler,
}: {
  editEventHandler: () => void;
}) => {
  const userData = useContext(UserContext);
  const [form, loading] = useForm({
    handler: async (data) => {
      const updateData = {
        fullName: data.fullName,
        phone: data.phone,
        fb: data.fb || null,
        section: data.section || null,
      };

      const response = await fetchJSON(
        reqs.UPDATE_PROFILE,
        { method: "POST", credentials: "include" },
        updateData,
      );

      if (!response.succeed) {
        throw new Error(response.msg || "Failed to update profile");
      }

      editEventHandler();
      setTimeout(() => window.location.reload(), 500);
    },
    successMsg: "Profile Updated Successfully!",
  });

  return (
    <div className="mx-auto max-h-[80vh] w-full max-w-2xl space-y-6 overflow-y-auto rounded-xl border-primary-550 bg-primary-650 p-6 pb-10 text-white/80 shadow-lg">
      <p className="text-center text-3xl font-bold text-secondary-200">
        Edit Profile
      </p>

      <form className="flex flex-col-reverse gap-6" ref={form}>
        {/* Buttons */}
        <div className="flex h-full w-full flex-col items-center justify-end gap-2 sm:flex-row">
          <button
            onClick={() => {
              editEventHandler();
              form.current?.reset();
            }}
            type="button"
            className="w-full rounded-3xl bg-red-500 px-7 py-3 text-white hover:bg-red-400 sm:w-auto md:px-9"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center gap-2 rounded-3xl bg-primary-400 px-7 py-3 text-white hover:bg-primary-500 disabled:opacity-50 sm:w-auto md:px-9"
          >
            {loading ? <Loading /> : "Save Changes"}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Full Name */}
          <Input
            type="text"
            label="Full Name"
            name="fullName"
            required
            defaultValue={userData.fullName}
            divClass="md:col-span-2"
          />

          {/* WhatsApp / Phone */}
          <Input
            type="tel"
            label="WhatsApp Number"
            name="phone"
            required
            defaultValue={userData.phone}
            divClass="md:col-span-2"
          />

          {/* Section */}
          <Input
            type="text"
            label="Section (Optional)"
            name="section"
            placeholder="e.g., A, B, C"
            defaultValue={userData.section || ""}
          />

          {/* Facebook */}
          <Input
            type="url"
            label="Facebook Profile (Optional)"
            name="fb"
            placeholder="https://facebook.com/yourprofile"
            defaultValue={userData.fb || ""}
          />

          {/* Read-only Info */}
          <div className="rounded-lg bg-primary-700/50 p-3 md:col-span-2">
            <p className="mb-2 text-sm text-white/60">
              Cannot be changed
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-white/50">Roll</p>
                <p className="font-mono text-white/80">{userData.roll}</p>
              </div>
              <div>
                <p className="text-white/50">Class</p>
                <p className="text-white/80">{userData.className}</p>
              </div>
              <div>
                <p className="text-white/50">College</p>
                <p className="text-white/80">{userData.college}</p>
              </div>
              <div>
                <p className="text-white/50">Institute</p>
                <p className="text-white/80">{userData.institute}</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfileModal;
