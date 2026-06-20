"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import type { Cohort, Registration, Session, Volunteer } from "@/lib/types";

const inputCls =
  "w-full px-3.5 py-2.5 text-sm border border-[#e8e3d8] rounded-lg text-[#1c1a16] bg-white focus:outline-none focus:border-[#059669] transition-colors";

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#1c1a16]">
        {label}
        {required && <span className="text-[#059669] ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-[#8a8074]">{hint}</p>}
    </div>
  );
}

const STATUS_LABEL: Record<Cohort["status"], string> = {
  upcoming: "Registration Open",
  active: "In Progress",
  completed: "Completed",
};

const STATUS_BADGE: Record<Cohort["status"], string> = {
  upcoming: "text-[#059669] bg-[#f0fdf4] border border-[#059669]/20",
  active: "text-amber-700 bg-amber-50 border border-amber-200",
  completed: "text-[#8a8074] bg-[#f5f3ee] border border-[#e8e3d8]",
};

const NEXT_STATUS: Record<Cohort["status"], Cohort["status"] | null> = {
  upcoming: "active",
  active: "completed",
  completed: null,
};

const NEXT_STATUS_LABEL: Record<Cohort["status"], string> = {
  upcoming: "Mark In Progress →",
  active: "Mark Completed →",
  completed: "",
};

// ── Cohort edit row ───────────────────────────────────────────────────────────

function CohortRow({ cohort }: { cohort: Cohort }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    venue: cohort.venue || "",
    barangay: cohort.barangay || "",
    startDate: cohort.startDate || "",
    endDate: cohort.endDate || "",
    sessionCount: cohort.sessionCount?.toString() || "",
    description: cohort.description || "",
  });

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!cohort.id) return;
    setSaving(true);
    await updateDoc(doc(db, "cohorts", cohort.id), {
      venue: form.venue,
      barangay: form.barangay,
      startDate: form.startDate,
      endDate: form.endDate,
      sessionCount: form.sessionCount ? parseInt(form.sessionCount) : null,
      description: form.description,
    });
    setSaving(false);
    setEditing(false);
  };

  const handleAdvanceStatus = async () => {
    if (!cohort.id) return;
    const next = NEXT_STATUS[cohort.status];
    if (!next) return;
    await updateDoc(doc(db, "cohorts", cohort.id), { status: next });
  };

  return (
    <div className="border border-[#e8e3d8] rounded-xl overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_BADGE[cohort.status]}`}
          >
            {STATUS_LABEL[cohort.status]}
          </span>
          <span className="font-serif font-bold text-[#1c1a16]">
            {cohort.name}
          </span>
          {cohort.venue && (
            <span className="text-sm text-[#8a8074]">· {cohort.venue}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {NEXT_STATUS[cohort.status] && (
            <button
              onClick={handleAdvanceStatus}
              className="text-xs px-3 py-1.5 rounded-lg border border-[#e8e3d8] text-[#8a8074] hover:text-[#1c1a16] hover:border-[#1c1a16] transition-colors"
            >
              {NEXT_STATUS_LABEL[cohort.status]}
            </button>
          )}
          <button
            onClick={() => setEditing((e) => !e)}
            className="text-xs px-3 py-1.5 rounded-lg border border-[#e8e3d8] text-[#8a8074] hover:text-[#1c1a16] hover:border-[#1c1a16] transition-colors"
          >
            {editing ? "Cancel" : "Edit Details"}
          </button>
        </div>
      </div>

      {editing && (
        <div className="border-t border-[#e8e3d8] px-5 py-5 grid grid-cols-2 sm:grid-cols-3 gap-4 bg-[#faf9f6]">
          <Field label="Venue">
            <input
              type="text"
              value={form.venue}
              onChange={(e) => set("venue", e.target.value)}
              className={inputCls}
              placeholder="Lapuz Public Library"
            />
          </Field>
          <Field label="Barangay">
            <input
              type="text"
              value={form.barangay}
              onChange={(e) => set("barangay", e.target.value)}
              className={inputCls}
              placeholder="Lapuz Norte"
            />
          </Field>
          <Field label="Sessions">
            <input
              type="number"
              min="1"
              value={form.sessionCount}
              onChange={(e) => set("sessionCount", e.target.value)}
              className={inputCls}
              placeholder="8"
            />
          </Field>
          <Field label="Start Date">
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => set("startDate", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="End Date">
            <input
              type="date"
              value={form.endDate}
              onChange={(e) => set("endDate", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Tagline (optional)">
            <input
              type="text"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className={inputCls}
              placeholder="Short description"
            />
          </Field>
          <div className="col-span-2 sm:col-span-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 bg-[#059669] hover:bg-[#047857] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const emptyCohortForm = {
  name: "",
  venue: "",
  barangay: "",
  startDate: "",
  endDate: "",
  sessionCount: "",
  description: "",
};

const emptySessionForm = {
  cohortId: "",
  date: new Date().toISOString().split("T")[0],
  phase: "1",
  kidsPresent: "",
  volunteersPresent: "",
  volunteerHours: "",
  appsShipped: "0",
  notes: "",
};

export default function KuyaPage() {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [regCohortId, setRegCohortId] = useState("");
  const [volTypeFilter, setVolTypeFilter] = useState<
    "all" | "local" | "remote"
  >("all");
  const [cohortForm, setCohortForm] = useState(emptyCohortForm);
  const [sessionForm, setSessionForm] = useState(emptySessionForm);
  const [cohortSaving, setCohortSaving] = useState(false);
  const [sessionSaving, setSessionSaving] = useState(false);
  const [sessionSaved, setSessionSaved] = useState(false);

  useEffect(() => {
    const unsubCohorts = onSnapshot(
      query(collection(db, "cohorts"), orderBy("createdAt", "desc")),
      (snap) => {
        const data = snap.docs.map(
          (d) => ({ id: d.id, ...d.data() }) as Cohort,
        );
        setCohorts(data);
        // Auto-select the first active/upcoming cohort in session form
        const active = data.find(
          (c) => c.status === "active" || c.status === "upcoming",
        );
        if (active?.id) {
          setSessionForm((f) => ({ ...f, cohortId: f.cohortId || active.id! }));
          setRegCohortId((prev) => prev || active.id!);
        }
      },
    );
    const unsubRegs = onSnapshot(
      query(collection(db, "registrations"), orderBy("createdAt", "desc")),
      (snap) =>
        setRegistrations(
          snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Registration),
        ),
    );
    const unsubSessions = onSnapshot(
      query(collection(db, "sessions"), orderBy("date", "desc")),
      (snap) =>
        setSessions(
          snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Session),
        ),
    );
    const unsubVolunteers = onSnapshot(
      query(collection(db, "volunteers"), orderBy("createdAt", "desc")),
      (snap) =>
        setVolunteers(
          snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Volunteer),
        ),
    );
    return () => {
      unsubCohorts();
      unsubRegs();
      unsubSessions();
      unsubVolunteers();
    };
  }, []);

  const setC = (k: keyof typeof emptyCohortForm, v: string) =>
    setCohortForm((f) => ({ ...f, [k]: v }));
  const setS = (k: keyof typeof emptySessionForm, v: string) =>
    setSessionForm((f) => ({ ...f, [k]: v }));

  const handleCreateCohort = async (e: React.FormEvent) => {
    e.preventDefault();
    setCohortSaving(true);
    try {
      await addDoc(collection(db, "cohorts"), {
        name: cohortForm.name.trim(),
        status: "upcoming",
        venue: cohortForm.venue.trim(),
        barangay: cohortForm.barangay.trim(),
        startDate: cohortForm.startDate,
        endDate: cohortForm.endDate,
        sessionCount: cohortForm.sessionCount
          ? parseInt(cohortForm.sessionCount)
          : null,
        description: cohortForm.description.trim(),
        createdAt: serverTimestamp(),
      });
      setCohortForm(emptyCohortForm);
    } catch (err) {
      console.error(err);
      alert("Error creating cohort.");
    } finally {
      setCohortSaving(false);
    }
  };

  const handleLogSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionForm.cohortId) return;
    setSessionSaving(true);
    try {
      const cohort = cohorts.find((c) => c.id === sessionForm.cohortId);
      await addDoc(collection(db, "sessions"), {
        cohortId: sessionForm.cohortId,
        cohortName: cohort?.name ?? "",
        venue: cohort?.venue ?? "",
        date: sessionForm.date,
        phase: parseInt(sessionForm.phase),
        kidsPresent: parseInt(sessionForm.kidsPresent),
        volunteersPresent: parseInt(sessionForm.volunteersPresent),
        volunteerHours: parseFloat(sessionForm.volunteerHours),
        appsShipped: parseInt(sessionForm.appsShipped),
        notes: sessionForm.notes.trim(),
        createdAt: serverTimestamp(),
      });
      setSessionForm((f) => ({
        ...emptySessionForm,
        cohortId: f.cohortId,
        date: new Date().toISOString().split("T")[0],
      }));
      setSessionSaved(true);
      setTimeout(() => setSessionSaved(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Error saving session.");
    } finally {
      setSessionSaving(false);
    }
  };

  const filteredRegs = registrations.filter((r) => r.cohortId === regCohortId);

  const statsForCohort = (cohortId: string) => ({
    enrolled: registrations.filter((r) => r.cohortId === cohortId).length,
    volHours: sessions
      .filter((s) => s.cohortId === cohortId)
      .reduce((sum, s) => sum + (s.volunteerHours ?? 0), 0),
    appsShipped: sessions
      .filter((s) => s.cohortId === cohortId && s.phase === 4)
      .reduce((sum, s) => sum + (s.appsShipped ?? 0), 0),
    sessionCount: sessions.filter((s) => s.cohortId === cohortId).length,
  });

  const activeCohort = cohorts.find(
    (c) => c.status === "active" || c.status === "upcoming",
  );
  const activeStats = activeCohort ? statsForCohort(activeCohort.id!) : null;

  return (
    <main className="min-h-screen bg-[#faf9f6]">
      {/* Header */}
      <div className="bg-[#1c1a16] border-b border-white/10 px-6 sm:px-10 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#4ade80] font-medium">
              Barangay Uswag
            </p>
            <h1 className="font-serif text-xl font-bold text-white">
              Admin · Kuya Mode
            </h1>
          </div>
          <span className="text-xs text-white/30">
            {new Date().toLocaleDateString("en-PH", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10 flex flex-col gap-10">
        {/* Quick stats for active cohort */}
        {activeCohort && activeStats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: "Registered",
                value: activeStats.enrolled,
                sub: activeCohort.name,
              },
              {
                label: "Sessions Logged",
                value: activeStats.sessionCount,
                sub: activeCohort.name,
              },
              {
                label: "Volunteer Hours",
                value: activeStats.volHours.toFixed(1),
                sub: activeCohort.name,
              },
              {
                label: "Apps Shipped",
                value: activeStats.appsShipped,
                sub: "Phase 4 only",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-[#e8e3d8] rounded-xl px-5 py-4"
              >
                <p className="font-serif text-3xl font-bold text-[#1c1a16]">
                  {stat.value}
                </p>
                <p className="text-xs font-medium text-[#1c1a16] mt-1">
                  {stat.label}
                </p>
                <p className="text-xs text-[#8a8074]">{stat.sub}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Cohort management ── */}
        <section className="bg-white border border-[#e8e3d8] rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-[#e8e3d8]">
            <h2 className="font-serif text-lg font-bold text-[#1c1a16]">
              Cohorts
            </h2>
            <p className="text-xs text-[#8a8074] mt-0.5">
              Create a cohort first. Everything else ties to it.
            </p>
          </div>

          {/* Existing cohorts */}
          {cohorts.length > 0 && (
            <div className="px-6 py-5 flex flex-col gap-3 border-b border-[#e8e3d8]">
              {cohorts.map((c) => (
                <CohortRow key={c.id} cohort={c} />
              ))}
            </div>
          )}

          {/* Create new cohort */}
          <form
            onSubmit={handleCreateCohort}
            className="px-6 py-5 grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            <p className="col-span-2 sm:col-span-3 text-xs tracking-[0.2em] uppercase text-[#8a8074] font-medium">
              {cohorts.length === 0 ? "Create First Cohort" : "New Cohort"}
            </p>

            <Field label="Cohort Name" required>
              <input
                type="text"
                required
                value={cohortForm.name}
                onChange={(e) => setC("name", e.target.value)}
                className={inputCls}
                placeholder="Cohort 1"
              />
            </Field>

            <Field label="Venue" hint="Leave blank if TBD">
              <input
                type="text"
                value={cohortForm.venue}
                onChange={(e) => setC("venue", e.target.value)}
                className={inputCls}
                placeholder="Lapuz Public Library"
              />
            </Field>

            <Field label="Barangay">
              <input
                type="text"
                value={cohortForm.barangay}
                onChange={(e) => setC("barangay", e.target.value)}
                className={inputCls}
                placeholder="Lapuz Norte"
              />
            </Field>

            <Field label="Start Date" hint="Leave blank if TBD">
              <input
                type="date"
                value={cohortForm.startDate}
                onChange={(e) => setC("startDate", e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="End Date" hint="Leave blank if TBD">
              <input
                type="date"
                value={cohortForm.endDate}
                onChange={(e) => setC("endDate", e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Total Sessions Planned" hint="e.g. 8">
              <input
                type="number"
                min="1"
                value={cohortForm.sessionCount}
                onChange={(e) => setC("sessionCount", e.target.value)}
                className={inputCls}
                placeholder="8"
              />
            </Field>

            <div className="col-span-2 sm:col-span-3">
              <button
                type="submit"
                disabled={cohortSaving}
                className="px-7 py-3 bg-[#1c1a16] hover:bg-[#3a3630] disabled:opacity-50 text-white text-sm font-medium rounded-full transition-colors"
              >
                {cohortSaving ? "Creating..." : "Create Cohort"}
              </button>
            </div>
          </form>
        </section>

        {/* ── Log a session ── */}
        <section className="bg-white border border-[#e8e3d8] rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-[#e8e3d8]">
            <h2 className="font-serif text-lg font-bold text-[#1c1a16]">
              Log a Session
            </h2>
            <p className="text-xs text-[#8a8074] mt-0.5">
              Fill this out after each class. Takes 2 minutes.
            </p>
          </div>
          <form
            onSubmit={handleLogSession}
            className="px-6 py-6 grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            <Field label="Cohort" required>
              <select
                required
                value={sessionForm.cohortId}
                onChange={(e) => setS("cohortId", e.target.value)}
                className={inputCls}
              >
                <option value="">Select cohort</option>
                {cohorts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} · {c.status}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Date" required>
              <input
                type="date"
                required
                value={sessionForm.date}
                onChange={(e) => setS("date", e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Phase" required>
              <select
                required
                value={sessionForm.phase}
                onChange={(e) => setS("phase", e.target.value)}
                className={inputCls}
              >
                <option value="1">Phase 1 · Think Like an App Builder</option>
                <option value="2">Phase 2 · Design & User Empathy</option>
                <option value="3">Phase 3 · The App Code Build</option>
                <option value="4">Phase 4 · Ipakita (Demo Day)</option>
              </select>
            </Field>

            <Field label="Kids Present" required>
              <input
                type="number"
                required
                min="0"
                value={sessionForm.kidsPresent}
                onChange={(e) => setS("kidsPresent", e.target.value)}
                className={inputCls}
                placeholder="0"
              />
            </Field>

            <Field label="Volunteers Present" required>
              <input
                type="number"
                required
                min="0"
                value={sessionForm.volunteersPresent}
                onChange={(e) => setS("volunteersPresent", e.target.value)}
                className={inputCls}
                placeholder="0"
              />
            </Field>

            <Field
              label="Total Volunteer Hours"
              required
              hint="e.g. 2 volunteers × 2 hrs = 4"
            >
              <input
                type="number"
                required
                min="0"
                step="0.5"
                value={sessionForm.volunteerHours}
                onChange={(e) => setS("volunteerHours", e.target.value)}
                className={inputCls}
                placeholder="0"
              />
            </Field>

            <Field label="Apps Shipped Today" hint="Usually 0 until Phase 4">
              <input
                type="number"
                min="0"
                value={sessionForm.appsShipped}
                onChange={(e) => setS("appsShipped", e.target.value)}
                className={inputCls}
                placeholder="0"
              />
            </Field>

            <div className="flex flex-col gap-1.5 col-span-2">
              <label className="text-xs font-medium text-[#1c1a16]">
                Notes
              </label>
              <textarea
                value={sessionForm.notes}
                onChange={(e) => setS("notes", e.target.value)}
                className={`${inputCls} resize-none`}
                rows={2}
                placeholder="Anything worth remembering"
              />
            </div>

            <div className="col-span-2 sm:col-span-3 flex items-center gap-4">
              <button
                type="submit"
                disabled={sessionSaving || !sessionForm.cohortId}
                className="px-7 py-3 bg-[#059669] hover:bg-[#047857] disabled:opacity-50 text-white text-sm font-medium rounded-full transition-colors"
              >
                {sessionSaving ? "Saving..." : "Log Session"}
              </button>
              {sessionSaved && (
                <span className="text-sm text-[#059669] font-medium">
                  ✓ Saved
                </span>
              )}
            </div>
          </form>
        </section>

        {/* ── Registrations ── */}
        <section className="bg-white border border-[#e8e3d8] rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-[#e8e3d8] flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1c1a16]">
                Registrations
              </h2>
              <p className="text-xs text-[#8a8074] mt-0.5">
                {filteredRegs.length} registered
              </p>
            </div>
            <select
              value={regCohortId}
              onChange={(e) => setRegCohortId(e.target.value)}
              className="text-sm border border-[#e8e3d8] rounded-lg px-3 py-2 text-[#1c1a16] focus:outline-none focus:border-[#059669]"
            >
              <option value="">All cohorts</option>
              {cohorts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {filteredRegs.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-[#8a8074] text-sm">
                No registrations yet for this cohort.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3d8]">
                    {[
                      "Name",
                      "Age",
                      "Gender",
                      "Grade",
                      "Barangay",
                      "Phone?",
                      "Guardian",
                      "Contact",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-xs tracking-[0.15em] uppercase text-[#8a8074] font-medium whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRegs.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-[#e8e3d8] hover:bg-[#f5f3ee] transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-[#1c1a16] whitespace-nowrap">
                        {r.childFirstName} {r.childLastName}
                      </td>
                      <td className="px-4 py-3 text-[#8a8074]">{r.age}</td>
                      <td className="px-4 py-3 text-[#8a8074]">{r.gender}</td>
                      <td className="px-4 py-3 text-[#8a8074] whitespace-nowrap">
                        {r.gradeLevel}
                      </td>
                      <td className="px-4 py-3 text-[#8a8074] whitespace-nowrap">
                        {r.barangay}
                      </td>
                      <td className="px-4 py-3 text-[#8a8074]">
                        {r.hasSmartphone ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-3 text-[#8a8074] whitespace-nowrap">
                        {r.guardianName}
                      </td>
                      <td className="px-4 py-3 text-[#8a8074]">
                        {r.guardianContact}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ── Sessions log ── */}
        <section className="bg-white border border-[#e8e3d8] rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-[#e8e3d8]">
            <h2 className="font-serif text-lg font-bold text-[#1c1a16]">
              Session Log
            </h2>
            <p className="text-xs text-[#8a8074] mt-0.5">
              {sessions.length} sessions across all cohorts
            </p>
          </div>
          {sessions.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-[#8a8074] text-sm">
                No sessions logged yet. Use the form above after your first
                class.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3d8]">
                    {[
                      "Date",
                      "Cohort",
                      "Phase",
                      "Kids",
                      "Vol.",
                      "Hours",
                      "Apps",
                      "Notes",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-xs tracking-[0.15em] uppercase text-[#8a8074] font-medium whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s) => (
                    <tr
                      key={s.id}
                      className="border-b border-[#e8e3d8] hover:bg-[#f5f3ee] transition-colors"
                    >
                      <td className="px-4 py-3 text-[#1c1a16] whitespace-nowrap">
                        {s.date}
                      </td>
                      <td className="px-4 py-3 text-[#8a8074] whitespace-nowrap">
                        {cohorts.find((c) => c.id === s.cohortId)?.name ??
                          s.cohortId}
                      </td>
                      <td className="px-4 py-3 text-[#8a8074]">{s.phase}</td>
                      <td className="px-4 py-3 text-[#8a8074]">
                        {s.kidsPresent}
                      </td>
                      <td className="px-4 py-3 text-[#8a8074]">
                        {s.volunteersPresent}
                      </td>
                      <td className="px-4 py-3 text-[#8a8074]">
                        {s.volunteerHours}
                      </td>
                      <td className="px-4 py-3 text-[#8a8074]">
                        {s.appsShipped}
                      </td>
                      <td className="px-4 py-3 text-[#8a8074] max-w-[200px] truncate">
                        {s.notes || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ── Volunteers ── */}
        <section className="bg-white border border-[#e8e3d8] rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-[#e8e3d8] flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1c1a16]">
                Volunteer Sign-Ups
              </h2>
              <p className="text-xs text-[#8a8074] mt-0.5">
                {volunteers.length} total ·{" "}
                {volunteers.filter((v) => v.type === "local").length} local ·{" "}
                {volunteers.filter((v) => v.type === "remote").length} remote ·{" "}
                {volunteers.filter((v) => v.shippingHardware).length} shipping
                hardware
              </p>
            </div>
            <div className="flex gap-2">
              {(["all", "local", "remote"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setVolTypeFilter(f)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors capitalize ${
                    volTypeFilter === f
                      ? "bg-[#1c1a16] text-white border-[#1c1a16]"
                      : "text-[#8a8074] border-[#e8e3d8] hover:border-[#1c1a16]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {volunteers.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-[#8a8074] text-sm">
                No volunteer sign-ups yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3d8]">
                    {[
                      "Name",
                      "Contact",
                      "Type",
                      "Role",
                      "Cohort",
                      "Hardware",
                      "Location",
                      "Notes",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-xs tracking-[0.15em] uppercase text-[#8a8074] font-medium whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {volunteers
                    .filter(
                      (v) =>
                        volTypeFilter === "all" || v.type === volTypeFilter,
                    )
                    .map((v) => (
                      <tr
                        key={v.id}
                        className="border-b border-[#e8e3d8] hover:bg-[#f5f3ee] transition-colors"
                      >
                        <td className="px-4 py-3 font-medium text-[#1c1a16] whitespace-nowrap">
                          {v.name}
                        </td>
                        <td className="px-4 py-3 text-[#8a8074]">
                          {v.contact}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              v.type === "local"
                                ? "text-[#059669] bg-[#f0fdf4]"
                                : "text-[#1c1a16] bg-[#f5f3ee]"
                            }`}
                          >
                            {v.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[#8a8074] whitespace-nowrap">
                          {v.localRole ?? v.remoteRole ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-[#8a8074] whitespace-nowrap">
                          {v.cohortName ?? "Any"}
                        </td>
                        <td className="px-4 py-3 text-[#8a8074]">
                          {v.shippingHardware ? (v.hardwareType ?? "Yes") : "—"}
                        </td>
                        <td className="px-4 py-3 text-[#8a8074]">
                          {v.location ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-[#8a8074] max-w-[180px] truncate">
                          {v.notes ?? "—"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
