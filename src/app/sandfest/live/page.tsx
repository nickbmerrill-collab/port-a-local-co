"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { SANDFEST_CONFIG } from "@/data/sandfest";

interface CrowdCurrent {
  count: number;
  timestamp: string;
  snapshot_url: string | null;
}

interface HourlySummary {
  hour: number;
  avg_count: number;
  max_count: number;
  readings: number;
}

interface DailySummary {
  date: string;
  avg_count: number;
  max_count: number;
  readings: number;
}

function estimateTotal(rawCount: number): number {
  return Math.round(rawCount * SANDFEST_CONFIG.crowdMultiplier);
}

function getDensityLevel(total: number) {
  if (total < 5000)
    return { label: "Light", color: "bg-green-500", text: "text-green-600", bg: "bg-green-50" };
  if (total < 15000)
    return { label: "Moderate", color: "bg-yellow-500", text: "text-yellow-600", bg: "bg-yellow-50" };
  if (total < 25000)
    return { label: "Busy", color: "bg-orange-500", text: "text-orange-600", bg: "bg-orange-50" };
  return { label: "Peak", color: "bg-red-500", text: "text-red-600", bg: "bg-red-50" };
}

function formatTime(hour: number): string {
  if (hour === 0) return "12a";
  if (hour < 12) return `${hour}a`;
  if (hour === 12) return "12p";
  return `${hour - 12}p`;
}

export default function LiveCrowdPage() {
  const [current, setCurrent] = useState<CrowdCurrent | null>(null);
  const [hourly, setHourly] = useState<HourlySummary[]>([]);
  const [daily, setDaily] = useState<DailySummary[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [online, setOnline] = useState(false);
  const [secondsAgo, setSecondsAgo] = useState(0);
  const [feedCacheBust, setFeedCacheBust] = useState(Date.now());

  const API = SANDFEST_CONFIG.crowdServiceUrl;

  const fetchData = useCallback(async () => {
    try {
      const [curRes, hourRes, dayRes] = await Promise.allSettled([
        fetch(`${API}/api/crowd/current`),
        fetch(`${API}/api/crowd/hourly`),
        fetch(`${API}/api/crowd/daily`),
      ]);

      if (curRes.status === "fulfilled" && curRes.value.ok) {
        setCurrent(await curRes.value.json());
        setOnline(true);
        setLastUpdated(new Date());
        setFeedCacheBust(Date.now());
      } else {
        setOnline(false);
      }

      if (hourRes.status === "fulfilled" && hourRes.value.ok) {
        setHourly(await hourRes.value.json());
      }

      if (dayRes.status === "fulfilled" && dayRes.value.ok) {
        setDaily(await dayRes.value.json());
      }
    } catch {
      setOnline(false);
    }
  }, [API]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [fetchData]);

  useEffect(() => {
    const tick = setInterval(() => {
      if (lastUpdated) {
        setSecondsAgo(Math.floor((Date.now() - lastUpdated.getTime()) / 1000));
      }
    }, 1000);
    return () => clearInterval(tick);
  }, [lastUpdated]);

  const total = current ? estimateTotal(current.count) : 0;
  const density = getDensityLevel(total);
  const maxHourlyCount = Math.max(...hourly.map((h) => h.avg_count), 1);
  const feedSrc =
    current?.snapshot_url ? `${API}${current.snapshot_url}?t=${feedCacheBust}` : null;

  return (
    <main className="min-h-screen bg-sand-50">
      {/* Header */}
      <section className="py-8 bg-gradient-to-br from-navy-900 to-navy-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            {online ? (
              <>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                </span>
                <span className="text-sm text-red-400 font-medium tracking-wide uppercase">
                  Live from the beach
                </span>
              </>
            ) : (
              <>
                <span className="h-3 w-3 rounded-full bg-slate-500" />
                <span className="text-sm text-slate-400 font-medium tracking-wide uppercase">
                  Offline
                </span>
              </>
            )}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-sand-50 mb-2">
            SandFest Live Feed
          </h1>
          <p className="text-navy-300 text-sm">
            AI-powered crowd camera at Port Aransas Beach
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-6">
        {/* Live camera feed */}
        <div className="rounded-2xl bg-navy-950 border border-navy-800 shadow-xl overflow-hidden mb-6">
          <div className="flex items-center justify-between px-4 py-3 bg-navy-900 border-b border-navy-800">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-xs text-red-400 font-semibold tracking-widest uppercase">
                Live Camera
              </span>
            </div>
            <span className="text-xs text-navy-400 font-mono">
              Port Aransas Beach &bull; SandFest 2026
            </span>
          </div>

          <div className="relative aspect-video bg-black flex items-center justify-center">
            {feedSrc ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={feedSrc}
                  alt="Live camera feed from SandFest"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                  <span className="text-[10px] text-white font-mono tracking-wider">
                    SANDFEST-CAM-01
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                  <span className="text-[10px] text-white font-mono">
                    {current?.timestamp
                      ? new Date(current.timestamp).toLocaleTimeString()
                      : ""}
                  </span>
                </div>
              </>
            ) : (
              <div className="text-center text-navy-500 py-16">
                <svg
                  className="w-16 h-16 mx-auto mb-4 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-sm font-medium text-navy-400">Camera feed offline</p>
                <p className="text-xs text-navy-500 mt-1">
                  Goes live when SandFest starts April 17
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main count card */}
        <div className="rounded-2xl bg-white border border-sand-200 shadow-lg p-8 text-center mb-6">
          {!online ? (
            <div className="py-6">
              <h2 className="text-xl font-bold text-navy-900 mb-2">
                Crowd Counter Offline
              </h2>
              <p className="text-navy-400 text-sm max-w-md mx-auto">
                The AI camera isn&apos;t connected right now. It&apos;ll go live when
                SandFest starts on April 17th.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-navy-400 tracking-wide uppercase mb-4">
                Estimated People at SandFest
              </p>
              <div className="text-7xl sm:text-8xl font-display font-bold text-navy-900 mb-4">
                {total.toLocaleString()}
              </div>
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${density.bg} ${density.text} text-sm font-semibold`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${density.color}`} />
                {density.label} Crowds
              </div>
              {lastUpdated && (
                <p className="text-xs text-navy-300 mt-4">
                  Updated {secondsAgo}s ago &bull; Camera count: {current?.count}
                </p>
              )}
            </>
          )}
        </div>

        {/* Hourly trend */}
        {hourly.length > 0 && (
          <div className="rounded-2xl bg-white border border-sand-200 shadow-sm p-6 sm:p-8 mb-6">
            <h3 className="font-display font-bold text-navy-900 text-lg mb-6">
              Today&apos;s Hourly Trend
            </h3>
            <div className="flex items-end gap-1 sm:gap-2 h-40">
              {hourly.map((h) => {
                const pct = (h.avg_count / maxHourlyCount) * 100;
                const est = estimateTotal(Math.round(h.avg_count));
                const d = getDensityLevel(est);
                return (
                  <div
                    key={h.hour}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <span className="text-[10px] text-navy-400 font-mono">
                      {est > 999 ? `${Math.round(est / 1000)}k` : est}
                    </span>
                    <div
                      className={`w-full rounded-t-md ${d.color} transition-all duration-500`}
                      style={{ height: `${Math.max(pct, 4)}%` }}
                    />
                    <span className="text-[10px] text-navy-400">{formatTime(h.hour)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Daily summary */}
        {daily.length > 0 && (
          <div className="rounded-2xl bg-white border border-sand-200 shadow-sm p-6 sm:p-8 mb-6">
            <h3 className="font-display font-bold text-navy-900 text-lg mb-4">
              Festival Daily Totals
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {daily.map((d) => (
                <div
                  key={d.date}
                  className="rounded-xl bg-sand-50 border border-sand-200 p-5 text-center"
                >
                  <p className="text-sm text-navy-400 font-medium mb-1">{d.date}</p>
                  <p className="text-2xl font-display font-bold text-navy-900">
                    {estimateTotal(Math.round(d.max_count)).toLocaleString()}
                  </p>
                  <p className="text-xs text-navy-300 mt-1">
                    Peak estimate &bull; {d.readings} readings
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="text-center pb-12">
          <Link
            href="/sandfest"
            className="text-sm text-orange-600 hover:text-orange-500 font-medium transition-colors"
          >
            &larr; Back to SandFest
          </Link>
        </div>
      </div>
    </main>
  );
}
