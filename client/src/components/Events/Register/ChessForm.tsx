"use client";
import React from "react";
import Input from "@/components/ui/form/Input";
import Select from "@/components/ui/form/Select";

interface ChessFormProps {
  user: any;
}

const colleges = ["BNMPC", "BMARPC"];
const classes = ["VI", "VII", "VIII", "IX", "X", "XI", "XII"];

const ChessForm = ({ user }: ChessFormProps) => {
  return (
    <div className="space-y-6">
      {/* Player Info */}
      <div className="p-5 rounded-xl bg-slate-600/20 border border-slate-400/20">
        <h3 className="text-lg font-semibold text-slate-300 mb-4">Chess Player Information</h3>
        <p className="text-white/60 text-sm mb-4">Auto-filled from your profile. Edit if needed.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="playerName" label="Full Name" defaultValue={user?.fullName} required />
          <Input 
            name="lichessUsername" 
            label="LiChess Username" 
            required 
            placeholder="Your lichess.org username"
          />
          <div className="col-span-full rounded-lg bg-slate-700/40 border border-slate-500/30 p-3 text-sm text-slate-300">
            <p className="font-semibold mb-1">Important: Join the Lichess Team</p>
            <p className="text-white/60 text-xs mb-2">You must join the official Technobit'26 Chess team on Lichess before the event begins.</p>
            <a
              href="https://lichess.org/team/technobit26-chess-championship"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-400 underline hover:text-blue-300"
            >
              https://lichess.org/team/technobit26-chess-championship
            </a>
          </div>
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

      {/* Free Event Notice */}
      <div className="p-4 rounded-xl bg-green-600/20 border border-green-400/20 text-center">
        <p className="text-green-300 font-semibold">This is a FREE event</p>
        <p className="text-white/60 text-sm mt-1">No registration fee required.</p>
      </div>
    </div>
  );
};

export default ChessForm;
