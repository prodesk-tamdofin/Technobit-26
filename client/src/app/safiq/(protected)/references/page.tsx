"use client";

import React, { useCallback, useEffect, useState } from "react";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import { toast } from "react-toastify";
import { MdRefresh, MdDownload } from "react-icons/md";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface RefStat {
  _id: string;       // refCode or "__none__"
  count: number;
}

const COLORS = [
  "#FF1744", "#FF006E", "#7C3AED", "#2563EB", "#059669",
  "#D97706", "#DB2777", "#0891B2", "#65A30D", "#9333EA",
  "#E11D48", "#0284C7", "#16A34A", "#CA8A04", "#7C3AED",
];

const ReferencesPage = () => {
  const [stats, setStats] = useState<RefStat[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchJSON(reqs.ADMIN_REFCODE_STATS, { credentials: "include" });
      if (res?.succeed) {
        setStats(res.stats || []);
        setTotal(res.total || 0);
      } else {
        toast.error("Failed to load reference stats");
      }
    } catch {
      toast.error("Failed to load reference stats");
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const handleBackup = async () => {
    toast.info("Generating backup...");
    try {
      const res = await fetch(reqs.ADMIN_BACKUP, { credentials: "include" });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `backup_participants_${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      toast.success("Backup downloaded!");
    } catch {
      toast.error("Backup failed");
    }
  };

  const chartData = stats.map((s) => ({
    name: s._id === "__none__" ? "No Code" : s._id,
    value: s.count,
  }));

  const namedStats = stats.map((s, i) => ({
    ...s,
    label: s._id === "__none__" ? "No Code" : s._id,
    pct: total > 0 ? ((s.count / total) * 100).toFixed(1) : "0",
    color: COLORS[i % COLORS.length],
  }));

  return (
    <div className="flex-1 text-white">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Reference Codes</h1>
          <p className="text-white/60 text-sm mt-1">
            Distribution of reference codes across{" "}
            <span className="text-white font-semibold">{total}</span> registered participants
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchStats}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white transition-colors disabled:opacity-50"
          >
            <MdRefresh className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={handleBackup}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-600/80 hover:bg-green-500 text-white transition-colors"
          >
            <MdDownload />
            Download Backup
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24 text-white/50">
          <MdRefresh className="animate-spin text-2xl mr-2" /> Loading...
        </div>
      ) : stats.length === 0 ? (
        <div className="text-center py-24 text-white/40">No data yet</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="rounded-2xl bg-primary-800/50 border border-primary-600/30 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Usage Distribution</h2>
            <ResponsiveContainer width="100%" height={340}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={130}
                  innerRadius={60}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={true}
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#1a1025", border: "1px solid #4c1d95", borderRadius: 8 }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#ddd" }}
                  formatter={(value: number) => [`${value} participants`, ""]}
                />
                <Legend
                  wrapperStyle={{ fontSize: 12, color: "#bbb" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Table */}
          <div className="rounded-2xl bg-primary-800/50 border border-primary-600/30 overflow-hidden">
            <div className="px-6 py-4 border-b border-primary-600/30">
              <h2 className="text-lg font-semibold text-white">Breakdown</h2>
            </div>
            <div className="overflow-y-auto max-h-[400px]">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-primary-900/80 backdrop-blur">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-white/50 uppercase tracking-wider">Code</th>
                    <th className="px-6 py-3 text-xs font-medium text-white/50 uppercase tracking-wider text-right">Count</th>
                    <th className="px-6 py-3 text-xs font-medium text-white/50 uppercase tracking-wider text-right">%</th>
                  </tr>
                </thead>
                <tbody>
                  {namedStats.map((s, i) => (
                    <tr key={i} className="border-b border-primary-600/20 last:border-0 hover:bg-primary-700/30">
                      <td className="px-6 py-3 flex items-center gap-3">
                        <span
                          className="inline-block w-3 h-3 rounded-full shrink-0"
                          style={{ background: s.color }}
                        />
                        <span className={`font-mono text-sm ${s._id === "__none__" ? "text-white/40 italic" : "text-white"}`}>
                          {s.label}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right font-bold text-white">{s.count}</td>
                      <td className="px-6 py-3 text-right text-white/60">{s.pct}%</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-primary-500/40 bg-primary-900/50">
                    <td className="px-6 py-3 font-semibold text-white/70">Total</td>
                    <td className="px-6 py-3 text-right font-bold text-white">{total}</td>
                    <td className="px-6 py-3 text-right text-white/60">100%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferencesPage;
