"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import { toast } from "react-toastify";
import { BsSearch, BsTrash, BsEye, BsX, BsDownload } from "react-icons/bs";
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
  fb?: string;
  address?: string;
  userName: string;
  image?: string;
  registeredEvents: string[];
  createdAt: string;
}

const perPage = 25;

const RegisteredUsersPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("q") || "";

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [selectedUser, setSelectedUser] = useState<Participant | null>(null);

  const fetchParticipants = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchJSON(
        reqs.ALL_CLIENTS_ONEVENT + "allPar",
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

      if (Array.isArray(response)) {
        setParticipants(response);
      } else if (response?.result) {
        setParticipants(response.result);
      } else {
        setParticipants([]);
      }

      // Fetch count
      const countResp = await fetchJSON(
        reqs.ALL_COUNT_ONEVENT + "allPar",
        { credentials: "include" },
        { searchKey: searchQuery }
      );
      setTotalCount(typeof countResp === "number" ? countResp : countResp?.count || 0);
    } catch (error) {
      console.error("Failed to fetch participants:", error);
      toast.error("Failed to load registered users");
    }
    setLoading(false);
  }, [currentPage, searchQuery]);

  useEffect(() => {
    fetchParticipants();
  }, [fetchParticipants]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("page", "1");
    if (searchInput) params.set("q", searchInput);
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (searchQuery) params.set("q", searchQuery);
    router.push(`?${params.toString()}`);
  };

  const handleDeleteParticipant = async (id: string, name: string) => {
    if (!confirm(`Delete user "${name}"? This will remove all their data and registrations.`)) {
      return;
    }

    try {
      const response = await fetchJSON(reqs.DELETE_PARTICIPANT + id, {
        method: "DELETE",
        credentials: "include",
      });

      if (response?.succeed) {
        toast.success("User deleted");
        fetchParticipants();
        if (selectedUser?._id === id) setSelectedUser(null);
      } else {
        toast.error(response?.msg || "Failed to delete");
      }
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleDownloadExcel = async () => {
    toast.info("Generating CSV...");
    try {
      const response = await fetchJSON(
        reqs.ALL_CLIENTS_ONEVENT + "allPar",
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

      // Convert to CSV - Registration data only
      const headers = ["Name", "Username", "Email", "Phone", "WhatsApp", "Roll", "College", "Institute", "Class", "Section", "Facebook", "Address", "Registered At"];
      const csvContent = [
        headers.join(","),
        ...data.map((p: Participant) => [
          `"${p.fullName || ""}"`,
          `"${p.userName || ""}"`,
          `"${p.email || ""}"`,
          `"${p.phone || ""}"`,
          `"${p.whatsapp || p.phone || ""}"`,
          `"${p.roll || ""}"`,
          `"${p.college || ""}"`,
          `"${p.institute || ""}"`,
          `"${p.className || ""}"`,
          `"${p.section || ""}"`,
          `"${p.fb || ""}"`,
          `"${p.address || ""}"`,
          `"${p.createdAt ? new Date(p.createdAt).toLocaleDateString() : ""}"`,
        ].join(","))
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `registered-users-${new Date().toISOString().split("T")[0]}.csv`;
      link.click();
      toast.success("CSV downloaded");
    } catch (error) {
      toast.error("Failed to generate export");
    }
  };

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div className="flex-1 text-white">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Registered Users</h1>
          <p className="text-white/60 text-sm mt-1">
            All accounts registered on the platform ({totalCount} total)
          </p>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="mb-6 flex flex-wrap gap-4">
        <form onSubmit={handleSearch} className="flex-1 min-w-[300px]">
          <div className="relative">
            <BsSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search by name, email, phone, roll..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-primary-800/50 border border-primary-600/30 text-white placeholder:text-white/40 focus:outline-none focus:border-primary-500"
            />
          </div>
        </form>

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
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-primary-800/50 border border-primary-600/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-primary-600/30 bg-primary-900/50">
                <th className="px-4 py-4 text-sm font-medium text-white/70">User</th>
                <th className="px-4 py-4 text-sm font-medium text-white/70">Contact</th>
                <th className="px-4 py-4 text-sm font-medium text-white/70">Institute</th>
                <th className="px-4 py-4 text-sm font-medium text-white/70">Class</th>
                <th className="px-4 py-4 text-sm font-medium text-white/70">Events</th>
                <th className="px-4 py-4 text-sm font-medium text-white/70">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-white/50">
                    <div className="flex items-center justify-center gap-2">
                      <MdRefresh className="animate-spin text-xl" />
                      Loading users...
                    </div>
                  </td>
                </tr>
              ) : participants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-white/50">
                    No registered users found
                  </td>
                </tr>
              ) : (
                participants.map((participant) => (
                  <tr
                    key={participant._id}
                    className="border-b border-primary-600/20 last:border-0 hover:bg-primary-700/30"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={participant.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${participant.userName}`}
                          alt=""
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-white">{participant.fullName}</div>
                          <div className="text-sm text-white/50">@{participant.userName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-white/80">{participant.email}</div>
                      <div className="text-sm text-white/50">{participant.phone}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-white/80">{participant.college}</div>
                      <div className="text-sm text-white/50">{participant.institute}</div>
                    </td>
                    <td className="px-4 py-4 text-white/80">{participant.className}</td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 rounded-lg bg-primary-600/50 text-sm">
                        {participant.registeredEvents?.length || 0} events
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedUser(participant)}
                          className="p-2 rounded-lg bg-blue-600/80 hover:bg-blue-500 text-white transition-colors"
                          title="View Details"
                        >
                          <BsEye />
                        </button>
                        <button
                          onClick={() => handleDeleteParticipant(participant._id, participant.fullName)}
                          className="p-2 rounded-lg bg-red-600/80 hover:bg-red-500 text-white transition-colors"
                          title="Delete User"
                        >
                          <BsTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
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

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-primary-800 rounded-2xl border border-primary-600/30 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">User Details</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 rounded-lg hover:bg-primary-700/50 text-white/60 hover:text-white transition-colors"
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <img 
                src={selectedUser.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.userName}`}
                alt=""
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="text-lg font-bold text-white">{selectedUser.fullName}</h3>
                <p className="text-white/60">@{selectedUser.userName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <InfoField label="Email" value={selectedUser.email} />
              <InfoField label="Phone" value={selectedUser.phone} />
              <InfoField label="WhatsApp" value={selectedUser.whatsapp || selectedUser.phone} />
              <InfoField label="Roll" value={selectedUser.roll} />
              <InfoField label="College" value={selectedUser.college} />
              <InfoField label="Institute" value={selectedUser.institute} />
              <InfoField label="Class" value={selectedUser.className} />
              <InfoField label="Section" value={selectedUser.section} />
              <InfoField label="Facebook" value={selectedUser.fb} />
              <InfoField label="Address" value={selectedUser.address} />
              <InfoField label="Registered" value={selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : ""} />
            </div>

            <div className="border-t border-primary-600/30 pt-4">
              <h4 className="font-medium text-white mb-2">Registered Events ({selectedUser.registeredEvents?.length || 0})</h4>
              <div className="flex flex-wrap gap-2">
                {selectedUser.registeredEvents?.length ? (
                  selectedUser.registeredEvents.map((event) => (
                    <span key={event} className="px-3 py-1 rounded-lg bg-primary-600/50 text-sm">
                      {event}
                    </span>
                  ))
                ) : (
                  <p className="text-white/50">No events registered</p>
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
    <div className="text-white/80">{value || "-"}</div>
  </div>
);

export default RegisteredUsersPage;
