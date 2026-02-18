"use client";

import React from "react";
import Link from "next/link";
import { BsPeople, BsGear } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { FaPlusCircle, FaTrophy } from "react-icons/fa";

const QuickActionCard = ({
  href,
  icon: Icon,
  title,
  description,
  color,
}: {
  href: string;
  icon: any;
  title: string;
  description: string;
  color: string;
}) => (
  <Link
    href={href}
    className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${color} p-6 transition-all hover:scale-[1.02] hover:shadow-xl`}
  >
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/70 text-sm">{description}</p>
      </div>
      <Icon className="text-4xl text-white/30 group-hover:text-white/50 transition-colors" />
    </div>
  </Link>
);

const AdminDashboard = () => {
  return (
    <main className="max-w-screen bg-primary-900 relative overflow-hidden text-primary-200">
      <section className="container-c mb-32 mt-24 min-h-screen w-full antialiased">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/60">Welcome to Technobit&apos;26 Admin Panel</p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickActionCard
            href="/safiq/events"
            icon={RiDashboardFill}
            title="Manage Events"
            description="View and manage all event segments"
            color="from-blue-600/80 to-blue-800/80"
          />
          <QuickActionCard
            href="/safiq/participants"
            icon={BsPeople}
            title="Participants"
            description="View registered participants"
            color="from-green-600/80 to-green-800/80"
          />
          <QuickActionCard
            href="/safiq/create-user/solo"
            icon={FaPlusCircle}
            title="Add Participant"
            description="Manually add a new participant"
            color="from-purple-600/80 to-purple-800/80"
          />
          <QuickActionCard
            href="/safiq/result"
            icon={FaTrophy}
            title="Results"
            description="Manage event results and winners"
            color="from-yellow-600/80 to-yellow-800/80"
          />
          <QuickActionCard
            href="/safiq/settings"
            icon={BsGear}
            title="Settings"
            description="Configure event settings"
            color="from-gray-600/80 to-gray-800/80"
          />
        </div>

        {/* Event Info */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-primary-600/50 to-primary-700/50 border border-primary-400/20">
          <h2 className="text-2xl font-bold text-white mb-4">Technobit&apos;26</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/70">
            <div>
              <p className="text-sm text-primary-300">Event Dates</p>
              <p className="text-lg font-semibold text-white">5-8 March 2026</p>
            </div>
            <div>
              <p className="text-sm text-primary-300">Event Type</p>
              <p className="text-lg font-semibold text-white">Intra Online Event</p>
            </div>
            <div>
              <p className="text-sm text-primary-300">Organized By</p>
              <p className="text-lg font-semibold text-white">BNMPC IT Club</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
