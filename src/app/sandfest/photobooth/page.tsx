"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { SANDFEST_CONFIG } from "@/data/sandfest";

interface GalleryItem {
  id: string;
  timestamp: string;
  style: string;
  capture_url: string;
  generated_url: string;
}

const STYLES = [
  {
    id: "sand_sculpture",
    name: "Sand Sculpture",
    emoji: "\uD83C\uDFF0",
    description: "Become a masterpiece carved from golden beach sand",
  },
  {
    id: "beach_painting",
    name: "Beach Painting",
    emoji: "\uD83C\uDFA8",
    description: "A watercolor beach scene starring you",
  },
  {
    id: "ocean_mosaic",
    name: "Ocean Mosaic",
    emoji: "\uD83D\uDC1A",
    description: "Mosaic art made from sea glass and shells",
  },
];

type Stage = "idle" | "capturing" | "captured" | "generating" | "done" | "error";

export default function PhotoBoothPage() {
  const [style, setStyle] = useState("sand_sculpture");
  const [stage, setStage] = useState<Stage>("idle");
  const [captureId, setCaptureId] = useState<string | null>(null);
  const [captureUrl, setCaptureUrl] = useState<string | null>(null);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  const API = SANDFEST_CONFIG.crowdServiceUrl;

  const fetchGallery = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/photobooth/gallery`);
      if (res.ok) setGallery(await res.json());
    } catch {
      /* gallery fetch is non-critical */
    }
  }, [API]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  async function handleCapture() {
    setStage("capturing");
    setError(null);
    try {
      const res = await fetch(`${API}/api/photobooth/capture`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Camera capture failed");
      const data = await res.json();
      setCaptureId(data.id);
      setCaptureUrl(`${API}${data.capture_url}`);
      setStage("captured");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Camera not available");
      setStage("error");
    }
  }

  async function handleGenerate() {
    if (!captureId) return;
    setStage("generating");
    setError(null);
    try {
      const res = await fetch(`${API}/api/photobooth/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ capture_id: captureId, style }),
      });
      if (!res.ok) throw new Error("Image generation failed");
      const data = await res.json();
      setGeneratedUrl(`${API}${data.generated_url}`);
      setStage("done");
      fetchGallery();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed");
      setStage("error");
    }
  }

  function handleReset() {
    setStage("idle");
    setCaptureId(null);
    setCaptureUrl(null);
    setGeneratedUrl(null);
    setError(null);
  }

  return (
    <main className="min-h-screen bg-sand-50">
      {/* Hero */}
      <section className="py-10 bg-gradient-to-br from-amber-600 via-orange-500 to-coral-500 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
            SandFest AI Photo Booth
          </h1>
          <p className="text-white/80 text-lg font-light">
            Step up and become a sand sculpture!
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Style picker */}
        {(stage === "idle" || stage === "error") && (
          <div className="mb-8">
            <h2 className="font-display font-bold text-navy-900 text-lg mb-4 text-center">
              Choose Your Style
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={`rounded-xl p-5 text-left transition-all border-2 ${
                    style === s.id
                      ? "border-orange-500 bg-orange-50 shadow-md"
                      : "border-sand-200 bg-white hover:border-orange-300"
                  }`}
                >
                  <span className="text-3xl block mb-2">{s.emoji}</span>
                  <h3 className="font-bold text-navy-900 text-sm">
                    {s.name}
                  </h3>
                  <p className="text-xs text-navy-400 mt-1">
                    {s.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Capture button */}
        {(stage === "idle" || stage === "error") && (
          <div className="text-center">
            <button
              onClick={handleCapture}
              className="px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-coral-500 text-white font-bold text-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Take My Photo
            </button>
            {error && (
              <p className="mt-4 text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2 inline-block">
                {error}
              </p>
            )}
          </div>
        )}

        {/* Capturing state */}
        {stage === "capturing" && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 text-navy-600">
              <svg
                className="animate-spin h-6 w-6 text-orange-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span className="text-lg font-medium">Say cheese...</span>
            </div>
          </div>
        )}

        {/* Captured preview */}
        {stage === "captured" && captureUrl && (
          <div className="text-center">
            <div className="rounded-2xl overflow-hidden border-2 border-sand-200 shadow-md mb-6 inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={captureUrl}
                alt="Your photo"
                className="max-w-full max-h-[400px] object-contain"
              />
            </div>
            <p className="text-navy-400 text-sm mb-4">
              Looking good! Ready to transform into{" "}
              <strong>{STYLES.find((s) => s.id === style)?.name}</strong>?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl border border-sand-200 text-navy-600 font-medium hover:bg-sand-50 transition-colors"
              >
                Retake
              </button>
              <button
                onClick={handleGenerate}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-coral-500 text-white font-bold shadow-md hover:shadow-lg transition-all"
              >
                Generate Sand Art
              </button>
            </div>
          </div>
        )}

        {/* Generating state */}
        {stage === "generating" && (
          <div className="text-center py-12">
            <div className="mb-6">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-sand-200" />
                <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-2">
              Creating your sand art...
            </h3>
            <p className="text-navy-400 text-sm">
              Our AI sculptor is hard at work. This takes about 15-30 seconds.
            </p>
          </div>
        )}

        {/* Result */}
        {stage === "done" && generatedUrl && (
          <div className="text-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {captureUrl && (
                <div>
                  <p className="text-xs text-navy-400 uppercase tracking-wider mb-2">
                    Original
                  </p>
                  <div className="rounded-xl overflow-hidden border border-sand-200 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={captureUrl}
                      alt="Original photo"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs text-navy-400 uppercase tracking-wider mb-2">
                  Sand Art
                </p>
                <div className="rounded-xl overflow-hidden border-2 border-orange-400 shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={generatedUrl}
                    alt="AI sand art"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-navy-300 mb-4">
              Port A Local Co × SandFest 2026
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href={generatedUrl}
                download="sandfest-sand-art.jpg"
                className="px-6 py-3 rounded-xl bg-navy-900 text-white font-medium hover:bg-navy-800 transition-colors"
              >
                Download
              </a>
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-coral-500 text-white font-bold hover:shadow-md transition-all"
              >
                Take Another
              </button>
            </div>
          </div>
        )}

        {/* Gallery */}
        {gallery.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display font-bold text-navy-900 text-lg mb-6 text-center">
              Recent Creations
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {gallery.slice(0, 9).map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl overflow-hidden border border-sand-200 shadow-sm group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${API}${item.generated_url}`}
                    alt={`Sand art - ${item.style}`}
                    className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="text-center mt-12 pb-8">
          <Link
            href="/sandfest"
            className="text-sm text-orange-600 hover:text-orange-500 font-medium transition-colors"
          >
            ← Back to SandFest
          </Link>
        </div>
      </div>
    </main>
  );
}
