"use client";
import React, { useRef, useState, useEffect } from "react";
import ExtendedColors from "@/../color.config";
import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import { getEventBySlug, getCategoryById } from "@/data/eventSegments";
import Link from "next/link";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import PageLoading from "@/components/PageLoading";
import ErrorC from "@/components/Error";
import Separator from "@/components/ui/Separator";
import { TbCreditCardPay } from "react-icons/tb";
import CheckBox from "@/components/ui/form/Checkbox";
import useForm from "@/hooks/useForm";
import Loading from "@/components/ui/LoadingWhite";
import { toast } from "react-toastify";
import {
  single_event_par,
  submit_event,
  team_event_par,
} from "@/api/events";

const Page = ({ params }: { params: { value: string } }) => {
  // Use static event data instead of API fetch
  const staticEvent = getEventBySlug(params.value);
  const Router = useRouter();
  const [user, loadingUser, errorUser] = useUser();
  const checkBox = useRef<HTMLInputElement>(null);

  // Create a result object compatible with the existing template
  const result = staticEvent ? {
    ...staticEvent,
    team: false,
    submission: "{}",
    paid: staticEvent.fee > 0,
    regPortal: true, // Always enabled for static events
  } : null;

  const [form, formLoading] = useForm(
    {
      handler: async (data) => {
        if (checkBox?.current?.checked) {
          // Single event participation
          const response = await single_event_par({
            ...data,
            eventName: params.value,
          });
          return response;
        } else {
          throw new Error("You haven't agreed to rules and regulations.");
        }
      },
      onSuccess() {
        toast.success("Successfully registered for " + (result?.name || "event") + "!");
        Router.push("/profile");
      },
    },
    [user, result],
  );

  // Handle redirects
  useEffect(() => {
    if (!loadingUser && errorUser) {
      // User not logged in - redirect to register
      Router.push("/register");
    }
  }, [loadingUser, errorUser, Router]);

  if (loadingUser) {
    return <PageLoading />;
  } else if (!result) {
    return <ErrorC msg="Event not found!" code={404} href="/events" />;
  } else if (errorUser) {
    // Will redirect via useEffect
    return <PageLoading />;
  } else if (result && user) {
    return (
      <>
        <main className="bg-grid-white/[0.02] relative flex min-h-screen w-full justify-center overflow-hidden bg-primary-650 antialiased md:justify-center">
          <Spotlight
            className="-top-40 left-0 md:-top-20 md:left-60"
            fill={ExtendedColors.primary["200"]}
          />
          <div className="z-30 mt-28 w-screen">
            <div className="container-c flex flex-col gap-1 text-left">
              <div className="">
                <Link
                  href="/events"
                  className="mb-1 border-b border-transparent pb-1 text-lg text-primary-200 hover:border-primary-200"
                >
                  ← Back to Events
                </Link>
              </div>
              {/* Heading */}
              <p className="Inter text-xl font-semibold text-primary-150">
                EVENT REGISTRATION
              </p>
              <div>
                <h2 className="title mb-0 mt-0 inline-block pb-1 text-left text-4xl md:text-5xl">
                  {result.name}
                </h2>
              </div>
              <p className="text-white/70 mt-2 max-w-2xl">{result.description}</p>
            </div>
            <div className="grid grid-flow-col grid-cols-1 grid-rows-[auto_1fr_auto] items-start gap-6 py-4 lg:h-full lg:grid-cols-[1fr_.9fr] lg:grid-rows-[auto_1fr] lg:gap-12">
              {/* Participant info */}
              <div className="container-padding-left row-span-1 mr-4 inline-flex w-[90%] items-center justify-between gap-6 rounded-r-full bg-gradient-to-l from-secondary-600 to-secondary-500/40 pb-5 pr-8 pt-4 lg:w-full lg:max-w-[1100px]">
                <div className="z-10 ml-1 lg:-ml-1">
                  <div className="mb-2 flex items-center text-sm">
                    <p className="text-secondary-200">Participant</p>
                    <Separator className="mx-2" />
                    <p>{user.className}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold md:text-xl">
                      {user.fullName}
                    </p>
                    <p className="text-sm opacity-75 md:text-base">
                      {user.institute}
                    </p>
                    <p className="text-sm opacity-50">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="lg:container-padding-left container-c row-span-1 row-start-3 mb-12 lg:row-start-2 lg:max-w-[1100px]">
                <form ref={form} className="grid gap-4">
                  <CheckBox
                    ref={checkBox}
                    divClass="mx-1 lg:mx-4 mb-2.5 mt-4"
                    labelText={
                      <span className="text-sm font-light text-white/80">
                        I have reviewed all the provided data thoroughly and am
                        fully aware of all the rules and regulations.
                      </span>
                    }
                  />
                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={formLoading}
                      className={
                        "btn-prim Bebas inline-flex items-center gap-1 py-2.5 pr-8 text-center text-xl tracking-wide " +
                        (formLoading ? "pl-6" : "pl-8")
                      }
                    >
                      {formLoading ? <Loading scale={0.6} /> : null}
                      PARTICIPATE
                    </button>
                  </div>
                </form>
              </div>

              {/* Instructions */}
              <div className="lg:container-padding-right container-c col-start-1 row-span-1 row-start-2 mb-8 text-white/75 lg:col-start-2 lg:row-span-2 lg:h-full">
                <div className="rounded-t-xl from-secondary-600/75 to-secondary-600/50 lg:h-full lg:bg-gradient-to-br lg:p-8">
                  <h3 className="Inter GradText mb-3 pt-3 text-xl font-bold md:text-2xl">
                    <TbCreditCardPay className="icn-inline mr-1 text-3xl text-primary-250 md:text-4xl" />{" "}
                    INSTRUCTIONS
                  </h3>
                  <ul className="list-disc ml-4 space-y-2">
                    <li>Make sure you have registered with correct details.</li>
                    <li>Each participant can only register once per event.</li>
                    <li>Please review the event rules before participating.</li>
                    {result.paid && (
                      <li className="text-primary-250">
                        This is a paid event. Fee: ৳{result.fee}
                      </li>
                    )}
                    {result.type === "online" && (
                      <li>This is an online event. Links will be shared via email.</li>
                    )}
                  </ul>

                  {/* Event Details Card */}
                  <div className="mt-6 p-4 rounded-xl bg-primary-600/50 border border-primary-400/20">
                    <h4 className="text-primary-200 font-semibold mb-2">Event Details</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-white/60">Type:</span> <span className="capitalize">{result.type}</span></p>
                      <p><span className="text-white/60">Fee:</span> {result.fee === 0 ? "Free" : `৳${result.fee}`}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  } else {
    return <div className="min-h-[100vh] w-full"></div>;
  }
};

export default Page;
