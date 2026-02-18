"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsPeople, BsGear, BsTrash } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { FaTrophy, FaUsers, FaGamepad, FaCode, FaQuestionCircle } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import { eventCategories, getAllEvents } from "@/data/eventSegments";
import { toast } from "react-toastify";

interface DashboardStats {
  totalParticipants: number;
  segmentCounts: Record<string, number>;
  recentRegistrations: Array<{
    _id: string;
    fullName: string;
    email: string;
    registeredEvents: string[];
    createdAt: string;
  }>;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  subtext,
}: {
  title: string;
  value: number | string;
  icon: any;
  color: string;
  subtext?: string;
}) => (
  <div className={`rounded-2xl bg-gradient-to-br ${color} p-6 border border-white/10`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-white/70 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
        {subtext && <p className="text-white/50 text-xs mt-1">{subtext}</p>}
      </div>
      <div className="p-3 rounded-xl bg-white/10">
        <Icon className="text-2xl text-white" />
      </div>
    </div>
  </div>
);

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
    className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${color} p-5 transition-all hover:scale-[1.02] hover:shadow-xl border border-white/10`}
  >
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-lg bg-white/10">
        <Icon className="text-xl text-white" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-white/60 text-sm">{description}</p>
      </div>
    </div>
  </Link>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetchJSON(reqs.DASHBOARD_STATS, {
        credentials: "include",
      });
      if (response?.succeed) {
        setStats(response.stats);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleClearAll = async () => {
    if (!confirm("⚠️ Are you sure you want to delete ALL participants? This action cannot be undone!")) {
      return;
    }
    if (!confirm("This will permanently delete all participant data. Type 'DELETE' in the next prompt to confirm.")) {
      return;
    }
    const confirmation = prompt("Type 'DELETE' to confirm:");
    if (confirmation !== "DELETE") {
      toast.info("Operation cancelled");
      return;
    }

    setClearing(true);
    try {
      const response = await fetchJSON(reqs.CLEAR_ALL_PARTICIPANTS, {
        method: "DELETE",
        credentials: "include",
      });
      if (response?.succeed) {
        toast.success(`Deleted ${response.deletedCount} participants`);
        fetchStats();
      } else {
        toast.error(response?.msg || "Failed to clear data");
      }
    } catch (error) {
      toast.error("Failed to clear participants");
    }
    setClearing(false);
  };

  const allEvents = getAllEvents();
  const getEventName = (slug: string) => {
    const event = allEvents.find(e => e.value === slug);
    return event?.name || slug;
  };

  const soloCount = Object.entries(stats?.segmentCounts || {})
    .filter(([key]) => eventCategories[0].events.some(e => e.value === key))
    .reduce((acc, [, count]) => acc + count, 0);

  const signatureCount = Object.entries(stats?.segmentCounts || {})
    .filter(([key]) => eventCategories[1].events.some(e => e.value === key))
    .reduce((acc, [, count]) => acc + count, 0);

  const gamingCount = Object.entries(stats?.segmentCounts || {})
    .filter(([key]) => eventCategories[2].events.some(e => e.value === key))
    .reduce((acc, [, count]) => acc + count, 0);

  return (
    <main className="w-full min-h-screen">
      <section className="py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-white/60">Technobit&apos;26 Admin Panel</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchStats}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white transition-colors disabled:opacity-50"
            >
              <MdRefresh className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={handleClearAll}
              disabled={clearing}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/80 hover:bg-red-500 text-white transition-colors disabled:opacity-50"
            >
              <BsTrash />
              Clear All Data
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Participants"
            value={loading ? "..." : stats?.totalParticipants || 0}
            icon={FaUsers}
            color="from-blue-600/80 to-blue-800/80"
          />
          <StatCard
            title="Solo Segments"
            value={loading ? "..." : soloCount}
            icon={FaQuestionCircle}
            color="from-green-600/80 to-green-800/80"
            subtext="Quiz registrations"
          />
          <StatCard
            title="Signature Events"
            value={loading ? "..." : signatureCount}
            icon={FaCode}
            color="from-purple-600/80 to-purple-800/80"
            subtext="Creative & coding"
          />
          <StatCard
            title="Gaming Segments"
            value={loading ? "..." : gamingCount}
            icon={FaGamepad}
            color="from-orange-600/80 to-orange-800/80"
            subtext="Tournament registrations"
          />
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <QuickActionCard
            href="/safiq/participants"
            icon={BsPeople}
            title="View Participants"
            description="Manage all registered participants"
            color="from-primary-600/60 to-primary-700/60"
          />
          <QuickActionCard
            href="/safiq/events"
            icon={RiDashboardFill}
            title="Event Segments"
            description="View segment details"
            color="from-primary-600/60 to-primary-700/60"
          />
          <QuickActionCard
            href="/safiq/result"
            icon={FaTrophy}
            title="Results"
            description="Manage event results"
            color="from-primary-600/60 to-primary-700/60"
          />
        </div>

        {/* Segment Registrations */}
        <h2 className="text-xl font-semibold text-white mb-4">Registrations by Segment</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {eventCategories.map((category) => (
            <div
              key={category.id}
              className="rounded-xl bg-primary-800/50 border border-primary-600/30 p-5"
            >
              <h3 className="text-lg font-semibold text-white mb-4">{category.name}</h3>
              <div className="space-y-3">
                {category.events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between py-2 border-b border-primary-600/20 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-white/90">{event.name}</span>
                      {event.fee > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">
                          ৳{event.fee}
                        </span>
                      )}
                    </div>
                    <span className="text-lg font-semibold text-primary-300">
                      {loading ? "..." : stats?.segmentCounts?.[event.value] || 0}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Registrations */}
        <h2 className="text-xl font-semibold text-white mb-4">Recent Registrations</h2>
        <div className="rounded-xl bg-primary-800/50 border border-primary-600/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-primary-600/30">
                  <th className="px-6 py-4 text-sm font-medium text-white/70">Name</th>
                  <th className="px-6 py-4 text-sm font-medium text-white/70">Email</th>
                  <th className="px-6 py-4 text-sm font-medium text-white/70">Registered Events</th>
                  <th className="px-6 py-4 text-sm font-medium text-white/70">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-white/50">
                      Loading...
                    </td>
                  </tr>
                ) : stats?.recentRegistrations?.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-white/50">
                      No registrations yet
                    </td>
                  </tr>
                ) : (
                  stats?.recentRegistrations?.map((participant) => (
                    <tr
                      key={participant._id}
                      className="border-b border-primary-600/20 last:border-0 hover:bg-primary-700/30"
                    >
                      <td className="px-6 py-4 text-white">{participant.fullName}</td>
                      <td className="px-6 py-4 text-white/70">{participant.email}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {participant.registeredEvents?.map((event) => (
                            <span
                              key={event}
                              className="text-xs px-2 py-1 rounded-full bg-primary-600/50 text-primary-200"
                            >
                              {getEventName(event)}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white/50 text-sm">
                        {new Date(participant.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {(stats?.recentRegistrations?.length || 0) > 0 && (
            <div className="px-6 py-4 border-t border-primary-600/30">
              <Link
                href="/safiq/participants"
                className="text-primary-300 hover:text-primary-200 text-sm"
              >
                View all participants →
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
