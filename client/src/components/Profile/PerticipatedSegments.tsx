"use client";
import React, { useContext } from "react";
import ProfileTitle from "./ProfileTitle";
import UserContext from "@/context/UserContext";
import EventCardProfile from "./EventCardProfile";

const ParticipatedSegments: React.FC = () => {
  const userData = useContext(UserContext);

  // Support both old (clientEvents) and new (registeredEvents) format
  const events: string[] =
    Array.isArray(userData.registeredEvents) && userData.registeredEvents.length > 0
      ? userData.registeredEvents
      : Array.isArray(userData.clientEvents)
      ? userData.clientEvents
      : [];

  return (
    <div className="my-10">
      <ProfileTitle title="Participated Segments" />

      {events.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.map((eventSlug: string, index: number) => (
            <EventCardProfile key={eventSlug + index} slug={eventSlug} />
          ))}
        </div>
      ) : (
        <div className="mt-4 grid h-32 min-h-32 w-full place-items-center rounded-2xl bg-gradient-to-br from-secondary-700 to-secondary-500/20 p-5 text-center text-white/60">
          You haven&apos;t participated in any segment yet.
        </div>
      )}
    </div>
  );
};

export default ParticipatedSegments;
