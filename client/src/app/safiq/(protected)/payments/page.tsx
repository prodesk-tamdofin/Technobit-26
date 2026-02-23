"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import { eventCategories, getAllEvents } from "@/data/eventSegments";
import { toast } from "react-toastify";
import { BsSearch, BsCheckCircle, BsXCircle, BsEye } from "react-icons/bs";
import { MdRefresh, MdClose } from "react-icons/md";

interface PaymentInfo {
  bkashNumber?: string;
  transactionId?: string;
  verified?: boolean;
  fee?: number;
}

interface Participant {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  className: string;
  userName: string;
  registeredEvents: string[];
  paymentInfo?: Record<string, PaymentInfo>;
  gamingData?: Record<string, any>;
}

// Paid events
const PAID_EVENTS = [
  { value: 'crack-the-code', name: 'Crack the Code', fee: 30 },
  { value: 'efootball', name: 'eFootball', fee: 40 },
  { value: 'pubg-mobile', name: 'PUBG Mobile', fee: 100 },
  { value: 'free-fire', name: 'Free Fire', fee: 100 },
];

const perPage = 25;

const PaymentsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const selectedSegment = searchParams.get("segment") || PAID_EVENTS[0].value;
  const filterStatus = searchParams.get("status") || "all";
  const searchQuery = searchParams.get("q") || "";

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  const getEventName = (slug: string) => {
    const event = PAID_EVENTS.find((e) => e.value === slug);
    return event?.name || slug;
  };

  const fetchParticipants = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchJSON(
        reqs.ALL_CLIENTS_ONEVENT + selectedSegment,
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

      let data = Array.isArray(response) ? response : response?.result || [];

      // Filter by payment status on client side
      if (filterStatus !== "all") {
        data = data.filter((p: Participant) => {
          const payment = p.paymentInfo?.[selectedSegment];
          if (filterStatus === "verified") return payment?.verified === true;
          if (filterStatus === "pending") return payment && !payment.verified;
          return true;
        });
      }

      setParticipants(data);

      // Fetch count
      const countResp = await fetchJSON(
        reqs.ALL_COUNT_ONEVENT + selectedSegment,
        { credentials: "include" },
        { searchKey: searchQuery }
      );
      setTotalCount(typeof countResp === "number" ? countResp : countResp?.count || 0);
    } catch (error) {
      console.error("Failed to fetch participants:", error);
      toast.error("Failed to load payment data");
    }
    setLoading(false);
  }, [currentPage, selectedSegment, searchQuery, filterStatus]);

  useEffect(() => {
    fetchParticipants();
  }, [fetchParticipants]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("segment", selectedSegment);
    params.set("status", filterStatus);
    params.set("page", "1");
    if (searchInput) params.set("q", searchInput);
    router.push(`?${params.toString()}`);
  };

  const handleSegmentChange = (segment: string) => {
    const params = new URLSearchParams();
    params.set("segment", segment);
    params.set("status", filterStatus);
    params.set("page", "1");
    if (searchQuery) params.set("q", searchQuery);
    router.push(`?${params.toString()}`);
  };

  const handleStatusFilter = (status: string) => {
    const params = new URLSearchParams();
    params.set("segment", selectedSegment);
    params.set("status", status);
    params.set("page", "1");
    if (searchQuery) params.set("q", searchQuery);
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.set("segment", selectedSegment);
    params.set("status", filterStatus);
    params.set("page", String(page));
    if (searchQuery) params.set("q", searchQuery);
    router.push(`?${params.toString()}`);
  };

  const handleVerifyPayment = async (participantId: string, verified: boolean) => {
    try {
      const response = await fetchJSON(reqs.VERIFY_PAYMENT, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId, eventName: selectedSegment, verified }),
      });

      if (response?.succeed) {
        toast.success(verified ? "Payment verified!" : "Verification removed");
        // Update local state
        setParticipants((prev) =>
          prev.map((p) => {
            if (p._id === participantId) {
              const newPaymentInfo = { ...p.paymentInfo };
              if (newPaymentInfo[selectedSegment]) {
                newPaymentInfo[selectedSegment] = { ...newPaymentInfo[selectedSegment], verified };
              }
              return { ...p, paymentInfo: newPaymentInfo };
            }
            return p;
          })
        );
        // Update selected participant if viewing
        if (selectedParticipant && selectedParticipant._id === participantId) {
          const newPaymentInfo = { ...selectedParticipant.paymentInfo };
          if (newPaymentInfo[selectedSegment]) {
            newPaymentInfo[selectedSegment] = { ...newPaymentInfo[selectedSegment], verified };
          }
          setSelectedParticipant({ ...selectedParticipant, paymentInfo: newPaymentInfo });
        }
      } else {
        toast.error(response?.msg || "Failed to update verification");
      }
    } catch (error) {
      toast.error("Failed to update payment verification");
    }
  };

  const totalPages = Math.ceil(totalCount / perPage);

  // Stats
  const verifiedCount = participants.filter(p => p.paymentInfo?.[selectedSegment]?.verified).length;
  const pendingCount = participants.filter(p => p.paymentInfo?.[selectedSegment] && !p.paymentInfo[selectedSegment].verified).length;

  return (
    <div className="flex-1 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Payment Verification</h1>
        <p className="text-white/60 text-sm mt-1">
          Verify bKash payments for paid segments
        </p>
      </div>

      {/* Segment Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {PAID_EVENTS.map((event) => (
          <button
            key={event.value}
            onClick={() => handleSegmentChange(event.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedSegment === event.value
                ? "bg-green-600 text-white"
                : "bg-primary-800/50 text-white/70 hover:bg-primary-700/50"
            }`}
          >
            {event.name} (৳{event.fee})
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-primary-800/50 border border-primary-600/30">
          <div className="text-2xl font-bold text-white">{totalCount}</div>
          <div className="text-sm text-white/60">Total Registrations</div>
        </div>
        <div className="p-4 rounded-xl bg-green-800/30 border border-green-600/30">
          <div className="text-2xl font-bold text-green-400">{verifiedCount}</div>
          <div className="text-sm text-white/60">Verified</div>
        </div>
        <div className="p-4 rounded-xl bg-yellow-800/30 border border-yellow-600/30">
          <div className="text-2xl font-bold text-yellow-400">{pendingCount}</div>
          <div className="text-sm text-white/60">Pending</div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex gap-2">
          {[
            { value: "all", label: "All" },
            { value: "pending", label: "Pending" },
            { value: "verified", label: "Verified" },
          ].map((status) => (
            <button
              key={status.value}
              onClick={() => handleStatusFilter(status.value)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filterStatus === status.value
                  ? "bg-primary-500 text-white"
                  : "bg-primary-800/50 text-white/70 hover:bg-primary-700/50"
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearch} className="flex-1 min-w-[250px]">
          <div className="relative">
            <BsSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-primary-800/50 border border-primary-600/30 text-white placeholder:text-white/40 focus:outline-none focus:border-primary-500"
            />
          </div>
        </form>

        <button
          onClick={fetchParticipants}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white transition-colors disabled:opacity-50"
        >
          <MdRefresh className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-primary-800/50 border border-primary-600/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-primary-600/30 bg-primary-900/50">
                <th className="px-4 py-4 text-sm font-medium text-white/70">Participant</th>
                <th className="px-4 py-4 text-sm font-medium text-white/70">Contact</th>
                <th className="px-4 py-4 text-sm font-medium text-white/70">bKash Number</th>
                <th className="px-4 py-4 text-sm font-medium text-white/70">Transaction ID</th>
                <th className="px-4 py-4 text-sm font-medium text-white/70">Status</th>
                <th className="px-4 py-4 text-sm font-medium text-white/70">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-white/50">
                    <div className="flex items-center justify-center gap-2">
                      <MdRefresh className="animate-spin text-xl" />
                      Loading payments...
                    </div>
                  </td>
                </tr>
              ) : participants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-white/50">
                    No registrations found for {getEventName(selectedSegment)}
                  </td>
                </tr>
              ) : (
                participants.map((participant) => {
                  const payment = participant.paymentInfo?.[selectedSegment];
                  return (
                    <tr
                      key={participant._id}
                      className="border-b border-primary-600/20 last:border-0 hover:bg-primary-700/30"
                    >
                      <td className="px-4 py-4">
                        <div className="font-medium text-white">{participant.fullName}</div>
                        <div className="text-sm text-white/50">@{participant.userName}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-white/80">{participant.phone}</div>
                        <div className="text-sm text-white/50">{participant.college}</div>
                      </td>
                      <td className="px-4 py-4">
                        <code className="px-2 py-1 rounded bg-primary-700/50 text-white/90">
                          {payment?.bkashNumber || "-"}
                        </code>
                      </td>
                      <td className="px-4 py-4">
                        <code className="px-2 py-1 rounded bg-primary-700/50 text-white/90">
                          {payment?.transactionId || "-"}
                        </code>
                      </td>
                      <td className="px-4 py-4">
                        {payment?.verified ? (
                          <span className="flex items-center gap-1 text-green-400">
                            <BsCheckCircle /> Verified
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-yellow-400">
                            <BsXCircle /> Pending
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {payment?.verified ? (
                            <button
                              onClick={() => handleVerifyPayment(participant._id, false)}
                              className="px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-500 text-white text-sm transition-colors"
                            >
                              Unverify
                            </button>
                          ) : (
                            <button
                              onClick={() => handleVerifyPayment(participant._id, true)}
                              className="px-3 py-1.5 rounded-lg bg-green-600/80 hover:bg-green-500 text-white text-sm transition-colors"
                            >
                              Verify
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedParticipant(participant)}
                            className="p-2 rounded-lg bg-blue-600/80 hover:bg-blue-500 text-white transition-colors"
                            title="View Details"
                          >
                            <BsEye />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-4 py-2 rounded-lg bg-primary-700/50 text-white/70 hover:bg-primary-600/50 disabled:opacity-30"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-white/60">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 rounded-lg bg-primary-700/50 text-white/70 hover:bg-primary-600/50 disabled:opacity-30"
          >
            Next
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedParticipant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-primary-800 rounded-2xl border border-primary-600/30 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Payment Details</h2>
              <button
                onClick={() => setSelectedParticipant(null)}
                className="p-2 rounded-lg hover:bg-primary-700/50 text-white/60 hover:text-white transition-colors"
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InfoField label="Name" value={selectedParticipant.fullName} />
                <InfoField label="Username" value={`@${selectedParticipant.userName}`} />
                <InfoField label="Phone" value={selectedParticipant.phone} />
                <InfoField label="Email" value={selectedParticipant.email} />
                <InfoField label="College" value={selectedParticipant.college} />
                <InfoField label="Class" value={selectedParticipant.className} />
              </div>

              <div className="border-t border-primary-600/30 pt-4">
                <h3 className="font-semibold text-white mb-3">Payment Information - {getEventName(selectedSegment)}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <InfoField label="bKash Number" value={selectedParticipant.paymentInfo?.[selectedSegment]?.bkashNumber} />
                  <InfoField label="Transaction ID" value={selectedParticipant.paymentInfo?.[selectedSegment]?.transactionId} />
                  <InfoField label="Fee" value={`৳${selectedParticipant.paymentInfo?.[selectedSegment]?.fee || "-"}`} />
                  <div>
                    <div className="text-sm text-white/50 mb-1">Status</div>
                    {selectedParticipant.paymentInfo?.[selectedSegment]?.verified ? (
                      <span className="flex items-center gap-1 text-green-400">
                        <BsCheckCircle /> Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-400">
                        <BsXCircle /> Pending Verification
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Gaming Data for gaming events */}
              {selectedParticipant.gamingData?.[selectedSegment] && (
                <div className="border-t border-primary-600/30 pt-4">
                  <h3 className="font-semibold text-white mb-3">Gaming Data</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedParticipant.gamingData[selectedSegment]).map(([key, value]) => (
                      <InfoField key={key} label={key.replace(/_/g, " ")} value={String(value || "-")} />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                {selectedParticipant.paymentInfo?.[selectedSegment]?.verified ? (
                  <button
                    onClick={() => handleVerifyPayment(selectedParticipant._id, false)}
                    className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium transition-colors"
                  >
                    Remove Verification
                  </button>
                ) : (
                  <button
                    onClick={() => handleVerifyPayment(selectedParticipant._id, true)}
                    className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium transition-colors"
                  >
                    Verify Payment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoField = ({ label, value }: { label: string; value?: string | null }) => (
  <div>
    <div className="text-sm text-white/50">{label}</div>
    <div className="text-white/80 break-all">{value || "-"}</div>
  </div>
);

export default PaymentsPage;
