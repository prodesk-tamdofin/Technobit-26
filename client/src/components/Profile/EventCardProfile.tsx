"use client";
import React, { useContext } from "react";
import Link from "next/link";
import UserContext from "@/context/UserContext";
import { getAllEvents } from "@/data/eventSegments";
import { TbCoinTakaFilled } from "react-icons/tb";
import { FiCheckCircle, FiClock } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";

const allEvents = getAllEvents();

const EventCardProfile = ({ slug }: { slug: string }) => {
  const userData = useContext(UserContext);

  const event = allEvents.find((e) => e.value === slug);
  const eventName = event?.name || slug;
  const isPaid = event ? event.fee > 0 : false;

  // Payment info from MongoDB format
  const paymentInfo = userData.paymentInfo
    ? typeof userData.paymentInfo.get === "function"
      ? userData.paymentInfo.get(slug)
      : (userData.paymentInfo as any)[slug]
    : null;

  const isVerified = paymentInfo?.verified === true;

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-tl from-secondary-700 to-primary-600 p-6 text-white backdrop-blur-md">
      <MdOutlineCategory className="absolute -bottom-4 -right-4 h-24 w-24 rotate-12 text-white/5" />

      <div className="flex flex-col gap-3">
        <p className="text-xl font-semibold text-primary-150">{eventName}</p>

        {isPaid && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/60">Payment:</span>
            {isVerified ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-600/80 px-2.5 py-0.5 text-xs font-semibold text-white">
                <FiCheckCircle className="h-3 w-3" /> Confirmed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-600/80 px-2.5 py-0.5 text-xs font-semibold text-white">
                <FiClock className="h-3 w-3" /> Pending Verification
              </span>
            )}
            {paymentInfo?.transactionId && (
              <span className="ml-auto font-mono text-xs text-white/40">
                {paymentInfo.transactionId}
              </span>
            )}
          </div>
        )}

        {!isPaid && (
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-primary-500/30 px-2.5 py-0.5 text-xs font-semibold text-primary-200">
            <FiCheckCircle className="h-3 w-3" /> Registered — Free
          </span>
        )}

        <div className="mt-2 flex justify-end">
          <Link
            href={"/events/" + slug}
            className="rounded-full bg-primary-400 px-5 py-2 text-sm text-white transition hover:bg-primary-450"
          >
            About
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCardProfile;
