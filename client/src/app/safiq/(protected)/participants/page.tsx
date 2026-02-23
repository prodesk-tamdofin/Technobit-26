"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import { eventCategories, getAllEvents } from "@/data/eventSegments";
import { toast } from "react-toastify";
import { BsSearch, BsTrash, BsX, BsArrowLeft, BsDownload, BsCheckCircle, BsXCircle, BsEye } from "react-icons/bs";
import { MdRefresh, MdClose } from "react-icons/md";

interface Participant {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  roll: string;
  college: string;
  institute: string;
  className: string;
  section?: string;
  whatsapp?: string;
  userName: string;
  registeredEvents: string[];
  paymentInfo?: Record<string, { bkashNumber?: string; transactionId?: string; verified?: boolean }>;
  gamingData?: Record<string, any>;
  createdAt: string;
}

const perPage = 25;

const ParticipantsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const selectedSegment = searchParams.get("segment") || "all";
  const searchQuery = searchParams.get("q") || "";

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchQuery);

  const allEvents = getAllEvents();
  const getEventName = (slug: string) => {
    const event = allEvents.find((e) => e.value === slug);
    return event?.name || slug;
  };

  const fetchParticipants = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchJSON(
        reqs.ALL_CLIENTS_ONEVENT + (selectedSegment === "all" ? "allPar" : selectedSegment),
        {
          method: "POST",
          credentials: "include",
        },
        {
          skip: perPage * (currentPage - 1),
          rowNum: perPage,
          searchKey: searchQuery,
        }
      );

      // Handle both array response and object with result
      if (Array.isArray(response)) {
        setParticipants(response);
      } else if (response?.result) {
        setParticipants(response.result);
      } else {
        setParticipants([]);
      }

      // Fetch count
      const countResp = await fetchJSON(
        reqs.ALL_COUNT_ONEVENT + (selectedSegment === "all" ? "allPar" : selectedSegment),
        { credentials: "include" },
        { searchKey: searchQuery }
      );
      setTotalCount(typeof countResp === "number" ? countResp : countResp?.count || 0);
    } catch (error) {
      console.error("Failed to fetch participants:", error);
      toast.error("Failed to load participants");
    }
    setLoading(false);
  }, [currentPage, selectedSegment, searchQuery]);

  useEffect(() => {
    fetchParticipants();
  }, [fetchParticipants]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("segment", selectedSegment);
    params.set("page", "1");
    if (searchInput) params.set("q", searchInput);
    router.push(`?${params.toString()}`);
  };

  const handleSegmentChange = (segment: string) => {
    const params = new URLSearchParams();
    params.set("segment", segment);
    params.set("page", "1");
    if (searchQuery) params.set("q", searchQuery);
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.set("segment", selectedSegment);
    params.set("page", String(page));
    if (searchQuery) params.set("q", searchQuery);
    router.push(`?${params.toString()}`);
  };

  const handleDeleteParticipant = async (id: string, name: string) => {
    if (!confirm(`Delete participant "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetchJSON(reqs.DELETE_PARTICIPANT + id, {
        method: "DELETE",
        credentials: "include",
      });

      if (response?.succeed) {
        toast.success("Participant deleted");
        fetchParticipants();
      } else {
        toast.error(response?.msg || "Failed to delete");
      }
    } catch (error) {
      toast.error("Failed to delete participant");
    }
  };

  const handleRemoveSegment = async (participantId: string, segment: string, participantName: string) => {
    if (!confirm(`Remove "${getEventName(segment)}" registration from ${participantName}?`)) {
      return;
    }

    try {
      const response = await fetchJSON(
        reqs.REMOVE_SEGMENT + participantId + "/remove-segment",
        {
          method: "POST",
          credentials: "include",
        },
        { segment }
      );

      if (response?.succeed) {
        toast.success(`Removed ${getEventName(segment)} registration`);
        fetchParticipants();
      } else {
        toast.error(response?.msg || "Failed to remove segment");
      }
    } catch (error) {
      toast.error("Failed to remove segment");
    }
  };

  const handleDownloadExcel = async () => {
    toast.info("Generating Excel... This may take a moment.");
    try {
      const response = await fetchJSON(
        reqs.ALL_CLIENTS_ONEVENT + (selectedSegment === "all" ? "allPar" : selectedSegment),
        {
          method: "POST",
          credentials: "include",
        },
        {
          skip: 0,
          rowNum: 10000,
          searchKey: searchQuery,
        }
      );

      const data = Array.isArray(response) ? response : response?.result || [];
      
      if (data.length === 0) {
        toast.error("No data to export");
        return;
      }

      // Convert to CSV
      const headers = ["Name", "Email", "Phone", "Roll", "College", "Class", "Username", "Registered Events", "Created At"];
      const csvContent = [
        headers.join(","),
        ...data.map((p: Participant) => [
          `"${p.fullName || ""}"`,
          `"${p.email || ""}"`,
          `"${p.phone || ""}"`,
          `"${p.roll || ""}"`,
          `"${p.college || ""}"`,
          `"${p.className || ""}"`,
          `"${p.userName || ""}"`,
          `"${(p.registeredEvents || []).map(getEventName).join(", ")}"`,
          `"${p.createdAt ? new Date(p.createdAt).toLocaleDateString() : ""}"`,
        ].join(","))
      ].join("\n");

      // Download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `participants-${selectedSegment}-${new Date().toISOString().split("T")[0]}.csv`;
      link.click();
      toast.success("CSV downloaded");
    } catch (error) {
      toast.error("Failed to generate export");
    }
  };

  const handleVerifyPayment = async (participantId: string, eventName: string, verified: boolean) => {
    try {
      const response = await fetchJSON(reqs.VERIFY_PAYMENT, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId, eventName, verified }),
      });

      if (response?.succeed) {
        toast.success(verified ? "Payment verified!" : "Verification removed");
        // Update local state
        setParticipants((prev) =>
          prev.map((p) => {
            if (p._id === participantId) {
              const newPaymentInfo = { ...p.paymentInfo };
              if (newPaymentInfo[eventName]) {
                newPaymentInfo[eventName] = { ...newPaymentInfo[eventName], verified };
              }
              return { ...p, paymentInfo: newPaymentInfo };
            }
            return p;
          })
        );
        // Update selected participant if viewing
        if (selectedParticipant && selectedParticipant._id === participantId) {
          const newPaymentInfo = { ...selectedParticipant.paymentInfo };
          if (newPaymentInfo[eventName]) {
            newPaymentInfo[eventName] = { ...newPaymentInfo[eventName], verified };
          }
          setSelectedParticipant({ ...selectedParticipant, paymentInfo: newPaymentInfo });
        }
      } else {
        toast.error(response?.msg || "Failed to update verification");
      }
    } catch (error) {
      toast.error("Failed to verify payment");
    }
  };

  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [editGaming, setEditGaming] = useState<{ participantId: string; eventSlug: string; data: any } | null>(null);
  const [editGamingLoading, setEditGamingLoading] = useState(false);

  const openEditGaming = (participantId: string, eventSlug: string, gamingInfo: any) => {
    // Deep clone so we can edit without mutating existing data
    const clone = JSON.parse(JSON.stringify(gamingInfo));
    setEditGaming({ participantId, eventSlug, data: clone });
  };

  const handleGamingFieldChange = (field: string, value: string) => {
    setEditGaming((prev) => prev ? { ...prev, data: { ...prev.data, [field]: value } } : null);
  };

  const handlePlayerFieldChange = (idx: number, field: string, value: string) => {
    setEditGaming((prev) => {
      if (!prev) return null;
      const players = [...(prev.data.players || [])];
      players[idx] = { ...players[idx], [field]: value };
      return { ...prev, data: { ...prev.data, players } };
    });
  };

  const handleSaveGamingData = async () => {
    if (!editGaming) return;
    setEditGamingLoading(true);
    try {
      const response = await fetchJSON(
        reqs.ADMIN_UPDATE_GAMING_DATA + editGaming.participantId,
        { method: "PATCH", credentials: "include" },
        { eventSlug: editGaming.eventSlug, gamingData: editGaming.data }
      );
      if (response?.succeed) {
        toast.success("Gaming data updated!");
        // Update local state
        setParticipants((prev) =>
          prev.map((p) => {
            if (p._id === editGaming.participantId) {
              const newGamingData = { ...(p.gamingData || {}) };
              newGamingData[editGaming.eventSlug] = editGaming.data;
              return { ...p, gamingData: newGamingData };
            }
            return p;
          })
        );
        if (selectedParticipant?._id === editGaming.participantId) {
          const newGamingData = { ...(selectedParticipant.gamingData || {}) };
          newGamingData[editGaming.eventSlug] = editGaming.data;
          setSelectedParticipant({ ...selectedParticipant, gamingData: newGamingData });
        }
        setEditGaming(null);
      } else {
        toast.error(response?.msg || "Failed to update gaming data");
      }
    } catch {
      toast.error("Failed to update gaming data");
    }
    setEditGamingLoading(false);
  };

  // Get selected event data
  const selectedEventData = allEvents.find(e => e.value === selectedSegment);
  const isPaidEvent = selectedSegment !== "all" && selectedEventData && selectedEventData.fee > 0;

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <main className="w-full min-h-screen">
      <section className="py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/safiq"
            className="p-2 rounded-lg bg-primary-700/50 hover:bg-primary-600/50 text-white transition-colors"
          >
            <BsArrowLeft className="text-xl" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Participants</h1>
            <p className="text-white/60 text-sm">
              {loading ? "Loading..." : `${totalCount} total participants`}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <BsSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                type="text"
                placeholder="Search by name, email, phone, roll..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-primary-800/50 border border-primary-600/30 text-white placeholder-white/40 focus:outline-none focus:border-primary-500"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={fetchParticipants}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white transition-colors disabled:opacity-50"
            >
              <MdRefresh className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={handleDownloadExcel}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-600/80 hover:bg-green-500 text-white transition-colors"
            >
              <BsDownload />
              Export CSV
            </button>
            <Link
              href="/safiq/csv"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-indigo-600/80 hover:bg-indigo-500 text-white transition-colors"
            >
              <BsDownload />
              Group CSVs
            </Link>
          </div>
        </div>

        {/* Segment Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSegmentChange("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedSegment === "all"
                  ? "bg-primary-500 text-white"
                  : "bg-primary-800/50 text-white/70 hover:bg-primary-700/50"
              }`}
            >
              All Participants
            </button>
            {eventCategories.map((category) => (
              <div key={category.id} className="flex flex-wrap gap-2">
                <span className="self-center text-white/40 text-sm px-2">|</span>
                {category.events.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => handleSegmentChange(event.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedSegment === event.value
                        ? "bg-primary-500 text-white"
                        : "bg-primary-800/50 text-white/70 hover:bg-primary-700/50"
                    }`}
                  >
                    {event.name}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl bg-primary-800/50 border border-primary-600/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-primary-600/30 bg-primary-900/50">
                  <th className="px-4 py-4 text-sm font-medium text-white/70">Name</th>
                  <th className="px-4 py-4 text-sm font-medium text-white/70">Contact</th>
                  <th className="px-4 py-4 text-sm font-medium text-white/70">Institute</th>
                  <th className="px-4 py-4 text-sm font-medium text-white/70">Class</th>
                  {isPaidEvent && (
                    <th className="px-4 py-4 text-sm font-medium text-white/70">Payment</th>
                  )}
                  <th className="px-4 py-4 text-sm font-medium text-white/70">Events</th>
                  <th className="px-4 py-4 text-sm font-medium text-white/70">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={isPaidEvent ? 7 : 6} className="px-4 py-12 text-center text-white/50">
                      <div className="flex items-center justify-center gap-2">
                        <MdRefresh className="animate-spin text-xl" />
                        Loading participants...
                      </div>
                    </td>
                  </tr>
                ) : participants.length === 0 ? (
                  <tr>
                    <td colSpan={isPaidEvent ? 7 : 6} className="px-4 py-12 text-center text-white/50">
                      No participants found
                    </td>
                  </tr>
                ) : (
                  participants.map((participant) => {
                    const paymentData = selectedSegment !== "all" 
                      ? participant.paymentInfo?.[selectedSegment]
                      : null;

                    return (
                    <tr
                      key={participant._id}
                      className="border-b border-primary-600/20 last:border-0 hover:bg-primary-700/30"
                    >
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-white font-medium">{participant.fullName}</p>
                          <p className="text-white/50 text-sm">@{participant.userName}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-white/80 text-sm">{participant.email}</p>
                          <p className="text-white/50 text-sm">{participant.phone}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-white/80 text-sm">{participant.institute || participant.college}</p>
                          {participant.section && <p className="text-white/50 text-sm">Section: {participant.section}</p>}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-white/80">{participant.className}</span>
                      </td>
                      {isPaidEvent && (
                        <td className="px-4 py-4">
                          {paymentData ? (
                            <div className="space-y-1">
                              <button
                                onClick={() => handleVerifyPayment(
                                  participant._id,
                                  selectedSegment,
                                  !paymentData.verified
                                )}
                                className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-colors ${
                                  paymentData.verified
                                    ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                    : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                }`}
                              >
                                {paymentData.verified ? (
                                  <><BsCheckCircle /> Verified</>
                                ) : (
                                  <><BsXCircle /> Unverified</>
                                )}
                              </button>
                              <p className="text-white/50 text-xs font-mono truncate max-w-[100px]" title={paymentData.transactionId}>
                                {paymentData.transactionId || "No TrxID"}
                              </p>
                              <p className="text-white/40 text-xs">{paymentData.bkashNumber || ""}</p>
                            </div>
                          ) : (
                            <span className="text-white/30 text-xs">No payment</span>
                          )}
                        </td>
                      )}
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {participant.registeredEvents?.length > 0 ? (
                            participant.registeredEvents.slice(0, 3).map((event) => (
                              <span
                                key={event}
                                className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary-600/50 text-primary-200 group"
                              >
                                {getEventName(event)}
                                <button
                                  onClick={() => handleRemoveSegment(participant._id, event, participant.fullName)}
                                  className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity"
                                  title="Remove this registration"
                                >
                                  <BsX className="text-sm" />
                                </button>
                              </span>
                            ))
                          ) : (
                            <span className="text-white/40 text-sm">None</span>
                          )}
                          {(participant.registeredEvents?.length || 0) > 3 && (
                            <span className="text-xs px-2 py-1 rounded-full bg-primary-600/50 text-primary-300">
                              +{participant.registeredEvents.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setSelectedParticipant(participant)}
                            className="p-2 rounded-lg bg-primary-600/20 hover:bg-primary-600/40 text-primary-300 transition-colors"
                            title="View details"
                          >
                            <BsEye />
                          </button>
                          <button
                            onClick={() => handleDeleteParticipant(participant._id, participant.fullName)}
                            className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/40 text-red-400 transition-colors"
                            title="Delete participant"
                          >
                            <BsTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );})
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-4 border-t border-primary-600/30">
              <p className="text-white/50 text-sm">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="px-4 py-2 rounded-lg bg-primary-700/50 hover:bg-primary-600/50 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let page: number;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === page
                          ? "bg-primary-500 text-white"
                          : "bg-primary-700/50 hover:bg-primary-600/50 text-white"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="px-4 py-2 rounded-lg bg-primary-700/50 hover:bg-primary-600/50 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Participant Detail Modal */}
      {selectedParticipant && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-primary-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-primary-600/50 shadow-2xl">
            <div className="sticky top-0 bg-primary-800 border-b border-primary-600/30 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Participant Details</h2>
              <button onClick={() => setSelectedParticipant(null)} className="p-2 rounded-lg hover:bg-primary-700 text-white/70 hover:text-white">
                <MdClose className="text-xl" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-primary-700/50 rounded-xl p-4">
                  <p className="text-primary-300 text-sm mb-1">Full Name</p>
                  <p className="text-white font-semibold text-lg">{selectedParticipant.fullName}</p>
                </div>
                <div className="bg-primary-700/50 rounded-xl p-4">
                  <p className="text-primary-300 text-sm mb-1">Email</p>
                  <p className="text-white">{selectedParticipant.email}</p>
                </div>
                <div className="bg-primary-700/50 rounded-xl p-4">
                  <p className="text-primary-300 text-sm mb-1">Phone</p>
                  <p className="text-white">{selectedParticipant.phone}</p>
                </div>
                <div className="bg-primary-700/50 rounded-xl p-4">
                  <p className="text-primary-300 text-sm mb-1">Institute</p>
                  <p className="text-white">{selectedParticipant.institute || selectedParticipant.college}</p>
                </div>
                <div className="bg-primary-700/50 rounded-xl p-4">
                  <p className="text-primary-300 text-sm mb-1">Class</p>
                  <p className="text-white">{selectedParticipant.className} {selectedParticipant.section && `(Section: ${selectedParticipant.section})`}</p>
                </div>
                {selectedParticipant.whatsapp && (
                  <div className="bg-primary-700/50 rounded-xl p-4">
                    <p className="text-primary-300 text-sm mb-1">WhatsApp</p>
                    <p className="text-white">{selectedParticipant.whatsapp}</p>
                  </div>
                )}
              </div>

              {/* Registered Events with Payment */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Registered Events</h3>
                <div className="space-y-3">
                  {selectedParticipant.registeredEvents?.map((eventSlug) => {
                    const eventData = allEvents.find(e => e.value === eventSlug);
                    const fee = eventData?.fee || 0;
                    const paymentData = selectedParticipant.paymentInfo?.[eventSlug];
                    const gamingInfo = selectedParticipant.gamingData?.[eventSlug];

                    return (
                      <div key={eventSlug} className="bg-primary-700/30 rounded-xl p-4 border border-primary-600/30">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{getEventName(eventSlug)}</span>
                            {fee > 0 && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">
                                ৳{fee}
                              </span>
                            )}
                          </div>
                          {fee > 0 && (
                            <button
                              onClick={() => handleVerifyPayment(selectedParticipant._id, eventSlug, !paymentData?.verified)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                paymentData?.verified
                                  ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                  : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                              }`}
                            >
                              {paymentData?.verified ? (
                                <><BsCheckCircle /> Verified</>
                              ) : (
                                <><BsXCircle /> Unverified</>
                              )}
                            </button>
                          )}
                        </div>

                        {/* Payment Details */}
                        {fee > 0 && paymentData && (
                          <div className="bg-pink-500/10 rounded-lg p-3 mb-3 border border-pink-500/20">
                            <p className="text-pink-300 text-xs mb-2 font-medium">Payment Details</p>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <p className="text-white/50 text-xs">bKash Number</p>
                                <p className="text-white font-mono">{paymentData.bkashNumber || "N/A"}</p>
                              </div>
                              <div>
                                <p className="text-white/50 text-xs">Transaction ID</p>
                                <p className="text-white font-mono">{paymentData.transactionId || "N/A"}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Gaming Data */}
                        {gamingInfo && Object.keys(gamingInfo).length > 0 && (
                          <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-blue-300 text-xs font-medium">Gaming Info</p>
                              <button
                                onClick={() => openEditGaming(selectedParticipant._id, eventSlug, gamingInfo)}
                                className="text-xs px-2 py-1 rounded bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 transition-colors"
                              >
                                ✏️ Edit Team Data
                              </button>
                            </div>
                            {gamingInfo.teamName && (
                              <div className="mb-2">
                                <p className="text-white/50 text-xs">Team Name</p>
                                <p className="text-white font-semibold">{gamingInfo.teamName}</p>
                              </div>
                            )}
                            {gamingInfo.teamCollege && (
                              <div className="mb-2">
                                <p className="text-white/50 text-xs">Team College</p>
                                <p className="text-white">{gamingInfo.teamCollege}</p>
                              </div>
                            )}
                            {gamingInfo.players && (
                              <div>
                                <p className="text-white/50 text-xs mb-2">Players ({gamingInfo.players.length})</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {gamingInfo.players.map((player: any, idx: number) => (
                                    <div key={idx} className="bg-primary-800/50 rounded-lg p-3 text-xs space-y-0.5">
                                      <p className="text-white font-semibold text-sm">{player.fullName || "—"}</p>
                                      <p className="text-primary-300 capitalize font-medium">{player.role}</p>
                                      {player.inGameName && <p className="text-white/70">IGN: <span className="text-white font-mono">{player.inGameName}</span></p>}
                                      {player.uid && <p className="text-white/70">UID: <span className="text-white font-mono">{player.uid}</span></p>}
                                      {player.email && <p className="text-white/70">Email: <span className="text-white">{player.email}</span></p>}
                                      {player.facebook && <p className="text-white/70">FB: <span className="text-white break-all">{player.facebook}</span></p>}
                                      {player.college && <p className="text-white/70">College: <span className="text-white">{player.college}</span></p>}
                                      {player.class && <p className="text-white/70">Class: <span className="text-white">{player.class}</span></p>}
                                      {player.section && <p className="text-white/70">Section: <span className="text-white">{player.section}</span></p>}
                                      {player.roll && <p className="text-white/70">Roll: <span className="text-white">{player.roll}</span></p>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {gamingInfo.lichessUsername && (
                              <div className="mb-2">
                                <p className="text-white/50 text-xs">LiChess Username</p>
                                <p className="text-white font-mono">{gamingInfo.lichessUsername}</p>
                              </div>
                            )}
                            {gamingInfo.hackerrankUsername && (
                              <div className="mb-2">
                                <p className="text-white/50 text-xs">HackerRank Username</p>
                                <p className="text-white font-mono">{gamingInfo.hackerrankUsername}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Gaming Data Modal */}
      {editGaming && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-primary-900 rounded-2xl w-full max-w-2xl border border-blue-500/30 shadow-2xl">
            <div className="sticky top-0 bg-primary-900 border-b border-primary-700/50 p-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Edit Team Data</h2>
                <p className="text-white/50 text-sm">{editGaming.eventSlug}</p>
              </div>
              <button onClick={() => setEditGaming(null)} className="p-2 rounded-lg hover:bg-primary-700 text-white/70 hover:text-white">
                <MdClose className="text-xl" />
              </button>
            </div>

            <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Team Name */}
              <div>
                <label className="text-white/70 text-xs font-medium block mb-1">Team Name</label>
                <input
                  className="w-full px-3 py-2 rounded-lg bg-primary-800 border border-primary-600 text-white text-sm focus:outline-none focus:border-blue-500"
                  value={editGaming.data.teamName || ""}
                  onChange={(e) => handleGamingFieldChange("teamName", e.target.value)}
                  placeholder="Team name"
                />
              </div>

              {/* Players */}
              {(editGaming.data.players || []).map((player: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl bg-primary-800/60 border border-primary-600/30">
                  <p className="text-white font-semibold text-sm mb-3 capitalize">
                    {player.role === "captain" ? "🟢 Player 1 (Captain)" :
                     player.role === "player2" ? "🔵 Player 2" :
                     player.role === "player3" ? "🔵 Player 3" :
                     player.role === "player4" ? "🔵 Player 4" :
                     player.role === "substitute" ? "🟡 Player 5 (Substitute)" :
                     `Player (${player.role})`}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {[
                      { field: "fullName", label: "Full Name" },
                      { field: "inGameName", label: "In-Game Name (IGN)" },
                      { field: "uid", label: "Game UID" },
                      { field: "email", label: "Email" },
                      { field: "facebook", label: "Facebook" },
                      { field: "college", label: "College" },
                      { field: "class", label: "Class" },
                      { field: "section", label: "Section" },
                      { field: "roll", label: "Roll Number" },
                    ].map(({ field, label }) => (
                      <div key={field}>
                        <label className="text-white/50 text-xs block mb-1">{label}</label>
                        <input
                          className="w-full px-3 py-2 rounded-lg bg-primary-700 border border-primary-600/50 text-white text-sm focus:outline-none focus:border-blue-400"
                          value={player[field] || ""}
                          onChange={(e) => handlePlayerFieldChange(idx, field, e.target.value)}
                          placeholder={label}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-primary-700/50 flex justify-end gap-3">
              <button
                onClick={() => setEditGaming(null)}
                className="px-4 py-2 rounded-lg bg-primary-700 hover:bg-primary-600 text-white text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGamingData}
                disabled={editGamingLoading}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {editGamingLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ParticipantsPage;
