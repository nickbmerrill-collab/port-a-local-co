"use client";

import { useState, useEffect, useCallback } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Task {
  id: string;
  title: string;
  description: string | null;
  group_target: string;
  status: string;
  accepted_by: string | null;
  property: string | null;
  created_at: string;
  accepted_at: string | null;
  completed_at: string | null;
}

interface Worker {
  id: string;
  name: string;
  group_name: string;
  push_token: string | null;
  created_at: string;
}

export default function AdminPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [groupTarget, setGroupTarget] = useState("all");
  const [property, setProperty] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"dispatch" | "tasks" | "workers">("dispatch");

  const fetchTasks = useCallback(async () => {
    const res = await fetch("/api/tasks");
    if (res.ok) setTasks(await res.json());
  }, []);

  const fetchWorkers = useCallback(async () => {
    const res = await fetch("/api/workers");
    if (res.ok) setWorkers(await res.json());
  }, []);

  useEffect(() => {
    fetchTasks();
    fetchWorkers();
  }, [fetchTasks, fetchWorkers]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        description: description.trim() || null,
        group_target: groupTarget,
        property: property.trim() || null,
      }),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
      setProperty("");
      fetchTasks();
    }

    setSubmitting(false);
  }

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  const groupColor: Record<string, string> = {
    runner: "bg-purple-100 text-purple-800",
    maintenance: "bg-orange-100 text-orange-800",
    all: "bg-slate-100 text-slate-800",
  };

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Task Dispatch
          </h1>
          <p className="text-slate-500 mb-8">
            Send tasks to your workforce — they&apos;ll get a push notification
            instantly.
          </p>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 p-1 bg-sand-100 rounded-lg w-fit">
            {(["dispatch", "tasks", "workers"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Dispatch Tab */}
          {activeTab === "dispatch" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="rounded-2xl bg-white border border-sand-200 p-8 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Deliver towels to Unit 302"
                    className="w-full px-4 py-2.5 rounded-lg border border-sand-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Any additional details..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg border border-sand-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Assign To *
                    </label>
                    <select
                      value={groupTarget}
                      onChange={(e) => setGroupTarget(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-sand-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                    >
                      <option value="all">All Teams</option>
                      <option value="runner">Runners</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Property / Location
                    </label>
                    <input
                      type="text"
                      value={property}
                      onChange={(e) => setProperty(e.target.value)}
                      placeholder="e.g. Port Royal Unit 302"
                      className="w-full px-4 py-2.5 rounded-lg border border-sand-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting || !title.trim()}
                  className="w-full py-3 rounded-lg bg-ocean-600 text-white font-semibold hover:bg-ocean-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? "Sending..." : "Dispatch Task"}
                </button>
              </div>
            </form>
          )}

          {/* Tasks Tab */}
          {activeTab === "tasks" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-800">
                  Recent Tasks ({tasks.length})
                </h2>
                <button
                  onClick={fetchTasks}
                  className="text-sm text-ocean-600 hover:text-ocean-700 font-medium"
                >
                  Refresh
                </button>
              </div>

              {tasks.length === 0 ? (
                <div className="rounded-2xl bg-white border border-sand-200 p-8 text-center text-slate-400">
                  No tasks yet. Dispatch one from the Dispatch tab.
                </div>
              ) : (
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-xl bg-white border border-sand-200 p-5"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-medium text-slate-800">
                          {task.title}
                        </h3>
                        <div className="flex gap-2 shrink-0">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${groupColor[task.group_target]}`}
                          >
                            {task.group_target}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[task.status]}`}
                          >
                            {task.status}
                          </span>
                        </div>
                      </div>
                      {task.description && (
                        <p className="text-sm text-slate-500 mb-2">
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        {task.property && <span>{task.property}</span>}
                        <span>
                          {new Date(task.created_at + "Z").toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Workers Tab */}
          {activeTab === "workers" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-800">
                  Registered Workers ({workers.length})
                </h2>
                <button
                  onClick={fetchWorkers}
                  className="text-sm text-ocean-600 hover:text-ocean-700 font-medium"
                >
                  Refresh
                </button>
              </div>

              {workers.length === 0 ? (
                <div className="rounded-2xl bg-white border border-sand-200 p-8 text-center text-slate-400">
                  No workers registered yet. They&apos;ll appear here once they
                  set up the mobile app.
                </div>
              ) : (
                <div className="space-y-3">
                  {workers.map((worker) => (
                    <div
                      key={worker.id}
                      className="rounded-xl bg-white border border-sand-200 p-5 flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-medium text-slate-800">
                          {worker.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          ID: {worker.id}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${groupColor[worker.group_name]}`}
                        >
                          {worker.group_name}
                        </span>
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            worker.push_token
                              ? "bg-green-400"
                              : "bg-slate-300"
                          }`}
                          title={
                            worker.push_token
                              ? "Push enabled"
                              : "No push token"
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
