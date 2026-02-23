"use client";
import React from "react";
import Input from "@/components/ui/form/Input";
import Select from "@/components/ui/form/Select";

interface TeamGamingFormProps {
  eventName: string;
  fee: number;
  user: any;
}

const classes = ["VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const collegeOptions = ["BNMPC", "BMARPC"];
const collegeLabels = ["BNMPC — Birshreshtha Noor Mohammad Public College", "BMARPC — Birshreshtha Munshi Abdur Rouf Public College"];

const TeamGamingForm = ({ eventName, fee, user }: TeamGamingFormProps) => {
  const isPUBG = eventName === "pubg-mobile";
  const isFreeFire = eventName === "free-fire";
  const gameName = isPUBG ? "PUBG Mobile" : "Free Fire";

  return (
    <div className="space-y-6">
      {/* Team Info */}
      <div className="p-5 rounded-xl bg-primary-600/30 border border-primary-400/20">
        <h3 className="text-lg font-semibold text-primary-200 mb-2">Team Information</h3>
        <Input name="teamName" label="Team Name" required placeholder="Enter your team name" />
      </div>

      {/* College Rule Notice */}
      <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-400/30">
        <p className="text-yellow-300 font-semibold text-sm mb-1">⚠️ Team College Rule</p>
        <p className="text-white/70 text-sm">
          <strong className="text-white">Players 1 & 2</strong> must be from <strong className="text-yellow-200">BNMPC or BMARPC</strong> (select from dropdown).
          <br />
          <strong className="text-white">Players 3, 4 & 5</strong> can be from <strong className="text-white">any other college</strong> — enter their college name manually.
        </p>
      </div>

      {/* Player 1 - Captain */}
      <div className="p-5 rounded-xl bg-green-600/20 border border-green-400/20">
        <h3 className="text-lg font-semibold text-green-300 mb-1">Player 1 (Captain)</h3>
        <p className="text-white/60 text-sm mb-4">Auto-filled from your profile. You can edit if needed.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="p1_fullName" label="Full Name" defaultValue={user?.fullName} required />
          <Input name="p1_inGameName" label={`In-Game Name (${gameName})`} required placeholder={`Your ${gameName} IGN`} />
          <Input name="p1_uid" label="Game UID" required placeholder="Your game UID" />
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
          <Input name="p1_section" label="Section" placeholder="e.g. A, B, Science" defaultValue={user?.section} />
          <Input name="p1_roll" label="Roll Number" defaultValue={user?.roll} required />
          <Select
            name="p1_college"
            label="College"
            values={collegeOptions}
            labels={collegeLabels}
            defaultValue={user?.college}
            required
          />
        </div>
      </div>

      {/* Player 2 — BNMPC / BMARPC */}
      <div className="p-5 rounded-xl bg-primary-600/20 border border-primary-400/20">
        <h3 className="text-lg font-semibold text-primary-200 mb-1">
          Player 2{" "}
          <span className="text-yellow-300 text-sm font-normal">(Must be from BNMPC or BMARPC)</span>
        </h3>
        {isPUBG && <p className="text-white/50 text-xs mb-3">Optional for PUBG — leave blank if not applicable.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="p2_fullName" label="Full Name" placeholder="Full name" required={isFreeFire} />
          <Input name="p2_inGameName" label={`In-Game Name (${gameName})`} placeholder={`${gameName} IGN`} required={isFreeFire} />
          <Input name="p2_uid" label="Game UID" placeholder="Game UID" required={isFreeFire} />
          <Select
            name="p2_class"
            label="Class"
            values={["", ...classes]}
            labels={["Select", ...classes]}
            required={isFreeFire}
          />
          <Input name="p2_section" label="Section" placeholder="e.g. A, B, Science" />
          <Input name="p2_roll" label="Roll Number" placeholder="Roll number" required={isFreeFire} />
          <Select
            name="p2_college"
            label="College"
            values={["", ...collegeOptions]}
            labels={["Select College", ...collegeLabels]}
            required={isFreeFire}
          />
        </div>
      </div>

      {/* Players 3 & 4 — External College */}
      {[3, 4].map((playerNum) => (
        <div key={playerNum} className="p-5 rounded-xl bg-blue-600/10 border border-blue-400/20">
          <h3 className="text-lg font-semibold text-blue-300 mb-1">
            Player {playerNum}
            {isPUBG && <span className="text-white/40 text-sm font-normal"> (Optional for PUBG)</span>}
          </h3>
          <p className="text-white/50 text-xs mb-3">
            From any college — enter their college name below.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name={`p${playerNum}_fullName`} label="Full Name" placeholder={isPUBG ? "Optional" : "Full name"} required={isFreeFire} />
            <Input name={`p${playerNum}_inGameName`} label={`In-Game Name (${gameName})`} placeholder={`${gameName} IGN${isPUBG ? " (optional)" : ""}`} required={isFreeFire} />
            <Input name={`p${playerNum}_uid`} label="Game UID" placeholder={`Game UID${isPUBG ? " (optional)" : ""}`} required={isFreeFire} />
            <Input name={`p${playerNum}_roll`} label="Roll Number" placeholder={`Roll number${isPUBG ? " (optional)" : ""}`} required={isFreeFire} />
            <Input name={`p${playerNum}_college`} label="College / Institution" placeholder="Enter college name" required={isFreeFire} />
            <Select
              name={`p${playerNum}_class`}
              label="Class"
              values={["", ...classes]}
              labels={["Select", ...classes]}
              required={isFreeFire}
            />
          </div>
        </div>
      ))}

      {/* Player 5 - Optional Substitute */}
      <div className="p-5 rounded-xl bg-yellow-600/10 border border-yellow-400/20">
        <h3 className="text-lg font-semibold text-yellow-300 mb-1">Player 5 <span className="text-white/40 text-sm font-normal">(Optional — Substitute)</span></h3>
        <p className="text-white/50 text-xs mb-3">Can be from any college. Leave blank if not needed.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="p5_fullName" label="Full Name" placeholder="Optional" />
          <Input name="p5_inGameName" label={`In-Game Name (${gameName})`} placeholder={`${gameName} IGN (optional)`} />
          <Input name="p5_uid" label="Game UID" placeholder="Game UID (optional)" />
          <Input name="p5_roll" label="Roll Number" placeholder="Roll number (optional)" />
          <Input name="p5_college" label="College / Institution" placeholder="Enter college name (optional)" />
          <Select
            name="p5_class"
            label="Class"
            values={["", ...classes]}
            labels={["Select", ...classes]}
          />
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
          <p className="text-pink-300 font-mono text-lg font-bold">01313817741</p>
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
