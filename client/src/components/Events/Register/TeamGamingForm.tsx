"use client";
import React from "react";
import Input from "@/components/ui/form/Input";
import Select from "@/components/ui/form/Select";

interface TeamGamingFormProps {
  eventName: string;
  fee: number;
  user: any;
}

const colleges = ["BNMPC", "BMARPC"];
const classes = ["VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const sections = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const TeamGamingForm = ({ eventName, fee, user }: TeamGamingFormProps) => {
  const isPUBG = eventName === "pubg-mobile";
  const isFreeFire = eventName === "free-fire";
  const gameName = isPUBG ? "PUBG Mobile" : "Free Fire";

  return (
    <div className="space-y-6">
      {/* Team Info */}
      <div className="p-5 rounded-xl bg-primary-600/30 border border-primary-400/20">
        <h3 className="text-lg font-semibold text-primary-200 mb-4">Team Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="teamName" label="Team Name" required placeholder="Enter your team name" />
          <Select
            name="teamCollege"
            label="Team College"
            values={colleges}
            labels={colleges}
            required
          />
        </div>
      </div>

      {/* Player 1 - Captain */}
      <div className="p-5 rounded-xl bg-green-600/20 border border-green-400/20">
        <h3 className="text-lg font-semibold text-green-300 mb-4">👑 Player 1 (Captain)</h3>
        <p className="text-white/60 text-sm mb-4">Auto-filled from your profile. You can edit if needed.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="p1_fullName" label="Full Name" defaultValue={user?.fullName} required />
          <Input name="p1_inGameName" label="In-Game Name" required placeholder={`Your ${gameName} name`} />
          <Input name="p1_uid" label="UID" required placeholder="Your game UID" />
          <Input name="p1_email" label="Email" type="email" defaultValue={user?.email} required />
          <Input name="p1_facebook" label="Facebook Profile" defaultValue={user?.fb} placeholder="Facebook profile URL" />
          <Select
            name="p1_class"
            label="Class"
            values={classes}
            labels={classes}
            defaultValue={user?.className}
            required
          />
          <Select
            name="p1_section"
            label="Section"
            values={sections}
            labels={sections}
            defaultValue={user?.section}
            required
          />
          <Input name="p1_roll" label="Roll" defaultValue={user?.roll} required />
        </div>
      </div>

      {/* Players 2-4 */}
      {[2, 3, 4].map((playerNum) => (
        <div key={playerNum} className="p-5 rounded-xl bg-primary-600/20 border border-primary-400/20">
          <h3 className="text-lg font-semibold text-primary-200 mb-4">Player {playerNum}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name={`p${playerNum}_fullName`} label="Full Name" required />
            <Input name={`p${playerNum}_inGameName`} label="In-Game Name" required placeholder={`${gameName} name`} />
            <Select
              name={`p${playerNum}_class`}
              label="Class"
              values={classes}
              labels={classes}
              required
            />
            <Select
              name={`p${playerNum}_section`}
              label="Section"
              values={sections}
              labels={sections}
              required
            />
            <Input name={`p${playerNum}_roll`} label="Roll" required />
          </div>
        </div>
      ))}

      {/* Player 5 - Optional */}
      <div className="p-5 rounded-xl bg-yellow-600/10 border border-yellow-400/20">
        <h3 className="text-lg font-semibold text-yellow-300 mb-4">Player 5 (Optional - Substitute)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="p5_fullName" label="Full Name" placeholder="Optional" />
          <Input name="p5_inGameName" label="In-Game Name" placeholder={`${gameName} name (optional)`} />
          <Select
            name="p5_class"
            label="Class"
            values={["", ...classes]}
            labels={["Select", ...classes]}
          />
          <Select
            name="p5_section"
            label="Section"
            values={["", ...sections]}
            labels={["Select", ...sections]}
          />
          <Input name="p5_roll" label="Roll" placeholder="Optional" />
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
            <p className="text-white/60 text-sm">Team Fee: ৳{fee}</p>
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

export default TeamGamingForm;
