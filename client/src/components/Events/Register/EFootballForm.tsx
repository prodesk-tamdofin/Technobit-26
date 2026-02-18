"use client";
import React from "react";
import Input from "@/components/ui/form/Input";
import Select from "@/components/ui/form/Select";

interface EFootballFormProps {
  fee: number;
  user: any;
}

const colleges = ["BNMPC", "BMARPC"];
const classes = ["VI", "VII", "VIII", "IX", "X", "XI", "XII"];

const EFootballForm = ({ fee, user }: EFootballFormProps) => {
  return (
    <div className="space-y-6">
      {/* Player Info */}
      <div className="p-5 rounded-xl bg-emerald-600/20 border border-emerald-400/20">
        <h3 className="text-lg font-semibold text-emerald-300 mb-4">⚽ Player Information</h3>
        <p className="text-white/60 text-sm mb-4">Auto-filled from your profile. Edit if needed.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="playerName" label="Full Name" defaultValue={user?.fullName} required />
          <Input name="teamName" label="Dream Team Name" required placeholder="Your eFootball team name" />
          <Select
            name="playerClass"
            label="Class"
            values={classes}
            labels={classes}
            defaultValue={user?.className}
            required
          />
          <Select
            name="collegeName"
            label="College Name"
            values={colleges}
            labels={colleges}
            defaultValue={user?.college}
            required
          />
          <Input name="email" label="Email" type="email" defaultValue={user?.email} required />
          <Input name="whatsapp" label="WhatsApp Number" defaultValue={user?.whatsapp || user?.phone} required placeholder="01XXXXXXXXX" />
          <Input name="facebook" label="Facebook Profile/ID" defaultValue={user?.fb} placeholder="Facebook profile URL or username" />
        </div>
      </div>

      {/* Payment Section */}
      <div className="p-5 rounded-xl bg-pink-600/20 border border-pink-400/20">
        <div className="flex items-center gap-3 mb-4">
          <img
            src="https://play-lh.googleusercontent.com/1CRcUfmtwvWxT2g-xJF8s9_btha42TLi6Lo-qVkVomXBb_citzakZX9BbeY51iholWs"
            alt="bKash"
            className="w-10 h-10 rounded-lg"
          />
          <div>
            <p className="text-pink-200 font-semibold">bKash Payment Required</p>
            <p className="text-white/60 text-sm">Registration Fee: ৳{fee}</p>
          </div>
        </div>

        <div className="mb-4 p-3 rounded-lg bg-primary-700/50 border border-primary-500/30">
          <p className="text-white/80 text-sm mb-1">Send ৳{fee} to this bKash number:</p>
          <p className="text-pink-300 font-mono text-lg font-bold">01XXXXXXXXX</p>
          <p className="text-white/50 text-xs mt-1">Use &quot;Send Money&quot; option in bKash</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="bkashNumber" label="Your bKash Number" placeholder="01XXXXXXXXX" required />
          <Input name="transactionId" label="Transaction ID (TrxID)" placeholder="e.g., ABC123XYZ" required />
        </div>
      </div>
    </div>
  );
};

export default EFootballForm;
