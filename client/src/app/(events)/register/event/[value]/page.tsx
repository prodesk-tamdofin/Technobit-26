"use client";
import React, { useRef, useEffect } from "react";
import ExtendedColors from "@/../color.config";
import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import { getEventBySlug } from "@/data/eventSegments";
import Link from "next/link";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import PageLoading from "@/components/PageLoading";
import ErrorC from "@/components/Error";
import Separator from "@/components/ui/Separator";
import { TbCreditCardPay } from "react-icons/tb";
import CheckBox from "@/components/ui/form/Checkbox";
import Input from "@/components/ui/form/Input";
import useForm from "@/hooks/useForm";
import Loading from "@/components/ui/LoadingWhite";
import { toast } from "react-toastify";
import { single_event_par } from "@/api/events";
import TeamGamingForm from "@/components/Events/Register/TeamGamingForm";
import EFootballForm from "@/components/Events/Register/EFootballForm";
import ChessForm from "@/components/Events/Register/ChessForm";
import CrackTheCodeForm from "@/components/Events/Register/CrackTheCodeForm";

// Event type definitions
const teamGamingEvents = ["pubg-mobile", "free-fire"];

const Page = ({ params }: { params: { value: string } }) => {
  const staticEvent = getEventBySlug(params.value);
  const Router = useRouter();
  const [user, loadingUser, errorUser] = useUser();
  const checkBox = useRef<HTMLInputElement>(null);

  const isTeamEvent = teamGamingEvents.includes(params.value);
  const isEFootball = params.value === "efootball";
  const isChess = params.value === "chess";
  const isCrackTheCode = params.value === "crack-the-code";
  const isSpecialForm = isTeamEvent || isEFootball || isChess || isCrackTheCode;

  const result = staticEvent ? {
    ...staticEvent,
    team: isTeamEvent,
    paid: staticEvent.fee > 0,
    regPortal: true,
  } : null;

  const [form, formLoading] = useForm(
    {
      handler: async (data) => {
        if (!checkBox?.current?.checked) {
          throw new Error("You haven't agreed to rules and regulations.");
        }

        // Build gamingData based on event type
        let gamingData: any = {};

        if (isTeamEvent) {
          // Team gaming events (PUBG/Free Fire)
          gamingData = {
            teamName: data.teamName,
            teamCollege: data.teamCollege,
            players: [
              {
                role: "captain",
                fullName: data.p1_fullName,
                inGameName: data.p1_inGameName,
                uid: data.p1_uid,
                email: data.p1_email,
                facebook: data.p1_facebook,
                class: data.p1_class,
                section: data.p1_section,
                roll: data.p1_roll,
              },
              {
                role: "player2",
                fullName: data.p2_fullName,
                inGameName: data.p2_inGameName,
                class: data.p2_class,
                section: data.p2_section,
                roll: data.p2_roll,
              },
              {
                role: "player3",
                fullName: data.p3_fullName,
                inGameName: data.p3_inGameName,
                class: data.p3_class,
                section: data.p3_section,
                roll: data.p3_roll,
              },
              {
                role: "player4",
                fullName: data.p4_fullName,
                inGameName: data.p4_inGameName,
                class: data.p4_class,
                section: data.p4_section,
                roll: data.p4_roll,
              },
            ],
          };
          // Add optional player 5
          if (data.p5_fullName && data.p5_inGameName) {
            gamingData.players.push({
              role: "substitute",
              fullName: data.p5_fullName,
              inGameName: data.p5_inGameName,
              class: data.p5_class,
              section: data.p5_section,
              roll: data.p5_roll,
            });
          }
        } else if (isEFootball) {
          gamingData = {
            playerName: data.playerName,
            teamName: data.teamName,
            playerClass: data.playerClass,
            collegeName: data.collegeName,
            email: data.email,
            whatsapp: data.whatsapp,
            facebook: data.facebook,
          };
        } else if (isChess) {
          gamingData = {
            playerName: data.playerName,
            lichessUsername: data.lichessUsername,
            playerClass: data.playerClass,
            collegeName: data.collegeName,
            email: data.email,
            whatsapp: data.whatsapp,
            facebook: data.facebook,
          };
        } else if (isCrackTheCode) {
          gamingData = {
            playerName: data.playerName,
            hackerrankUsername: data.hackerrankUsername,
            email: data.email,
          };
        }

        const response = await single_event_par({
          eventName: params.value,
          bkashNumber: data.bkashNumber,
          transactionId: data.transactionId,
          gamingData,
        });
        return response;
      },
      onSuccess() {
        toast.success("Successfully registered for " + (result?.name || "event") + "!");
        Router.push("/profile");
      },
    },
    [user, result],
  );

  useEffect(() => {
    if (!loadingUser && errorUser) {
      Router.push("/register");
    }
  }, [loadingUser, errorUser, Router]);

  if (loadingUser) return <PageLoading />;
  if (!result) return <ErrorC msg="Event not found!" code={404} href="/events" />;
  if (errorUser) return <PageLoading />;
  
  if (!user) return <div className="min-h-[100vh] w-full"></div>;

  return (
    <main className="bg-grid-white/[0.02] relative flex min-h-screen w-full justify-center overflow-hidden bg-primary-650 antialiased">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill={ExtendedColors.primary["200"]} />
      <div className="z-30 mt-28 w-screen pb-12">
        <div className="container-c flex flex-col gap-1 text-left">
          <Link href="/events" className="mb-1 border-b border-transparent pb-1 text-lg text-primary-200 hover:border-primary-200">
            ← Back to Events
          </Link>
          <p className="Inter text-xl font-semibold text-primary-150">EVENT REGISTRATION</p>
          <h2 className="title mb-0 mt-0 inline-block pb-1 text-left text-4xl md:text-5xl">{result.name}</h2>
          <p className="text-white/70 mt-2 max-w-2xl">{result.description}</p>
        </div>

        <div className="container-c mt-8">
          {/* Participant Info Bar */}
          <div className="mb-6 inline-flex w-full items-center justify-between gap-6 rounded-xl bg-gradient-to-r from-secondary-600 to-secondary-500/40 p-5">
            <div>
              <div className="mb-2 flex items-center text-sm">
                <p className="text-secondary-200">Logged in as</p>
                <Separator className="mx-2" />
                <p>{user.className}</p>
              </div>
              <p className="text-lg font-semibold md:text-xl">{user.fullName}</p>
              <p className="text-sm opacity-75">{user.institute} | {user.email}</p>
            </div>
            {result.paid && (
              <div className="text-right">
                <p className="text-secondary-200 text-sm">Registration Fee</p>
                <p className="text-2xl font-bold text-white">৳{result.fee}</p>
              </div>
            )}
          </div>

          {/* Registration Form */}
          <form ref={form} className="space-y-6">
            {/* Dynamic Form Based on Event Type */}
            {isTeamEvent && <TeamGamingForm eventName={params.value} fee={result.fee} user={user} />}
            {isEFootball && <EFootballForm fee={result.fee} user={user} />}
            {isChess && <ChessForm user={user} />}
            {isCrackTheCode && <CrackTheCodeForm fee={result.fee} user={user} />}
            
            {/* Default Simple Form for Non-Gaming Events */}
            {!isSpecialForm && (
              <>
                {result.paid && (
                  <div className="p-5 rounded-xl bg-pink-600/20 border border-pink-400/20">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src="https://play-lh.googleusercontent.com/1CRcUfmtwvWxT2g-xJF8s9_btha42TLi6Lo-qVkVomXBb_citzakZX9BbeY51iholWs"
                        alt="bKash"
                        className="w-10 h-10 rounded-lg"
                      />
                      <div>
                        <p className="text-pink-200 font-semibold">bKash Payment Required</p>
                        <p className="text-white/60 text-sm">Fee: ৳{result.fee}</p>
                      </div>
                    </div>
                    <div className="mb-4 p-3 rounded-lg bg-primary-700/50 border border-primary-500/30">
                      <p className="text-white/80 text-sm mb-1">Send ৳{result.fee} to:</p>
                      <p className="text-pink-300 font-mono text-lg font-bold">01XXXXXXXXX</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input name="bkashNumber" label="Your bKash Number" placeholder="01XXXXXXXXX" required />
                      <Input name="transactionId" label="Transaction ID" placeholder="e.g., ABC123XYZ" required />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Agreement Checkbox */}
            <CheckBox
              ref={checkBox}
              divClass="mx-1 mb-2.5 mt-4"
              labelText={
                <span className="text-sm font-light text-white/80">
                  I have reviewed all the provided data thoroughly and am fully aware of all the rules and regulations.
                  {result.paid && " I confirm that I have completed the payment."}
                  {isTeamEvent && " All team members are from the same college."}
                </span>
              }
            />

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={formLoading}
                className="btn-prim Bebas inline-flex items-center gap-2 py-3 px-12 text-center text-xl tracking-wide"
              >
                {formLoading && <Loading scale={0.6} />}
                {result.paid ? "PAY & REGISTER" : "REGISTER NOW"}
              </button>
            </div>
          </form>

          {/* Instructions */}
          <div className="mt-8 p-6 rounded-xl bg-secondary-600/30 border border-secondary-400/20">
            <h3 className="text-xl font-bold text-primary-200 mb-4">
              <TbCreditCardPay className="inline mr-2 text-2xl" />
              Important Instructions
            </h3>
            <ul className="list-disc ml-4 space-y-2 text-white/75">
              <li>Make sure you have registered with correct details.</li>
              <li>Each participant can only register once per event.</li>
              {isTeamEvent && <li className="text-yellow-300">All team members must be from the same college.</li>}
              {isTeamEvent && <li>Player 5 (Substitute) is optional.</li>}
              {result.paid && <li className="text-pink-300">Payment via bKash only. Double-check Transaction ID.</li>}
              {isChess && <li className="text-slate-300">Make sure your LiChess username is correct.</li>}
              {isCrackTheCode && <li className="text-cyan-300">Competition will be on HackerRank. Verify your username.</li>}
              <li>Organizers&apos; decisions are final.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
