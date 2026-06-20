"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { LOCAL_ROLES, REMOTE_ROLES } from "@/lib/constants";
import type { Cohort } from "@/lib/types";
import { X } from "lucide-react";

const inputCls =
  "w-full px-3.5 py-2.5 text-sm border border-[#e8e3d8] rounded-lg text-[#1c1a16] bg-white focus:outline-none focus:border-[#059669] transition-colors";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#1c1a16]">
        {label}
        {required && <span className="text-[#059669] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function VolunteerModal({
  defaultType,
  onClose,
}: {
  defaultType: "local" | "remote";
  onClose: () => void;
}) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [submitting, setSubmitting] = useState(false);
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    type: defaultType,
    localRole: "",
    remoteRole: "",
    cohortId: "",
    shippingHardware: "no",
    hardwareType: "",
    location: "",
    notes: "",
  });

  useEffect(() => {
    getDocs(
      query(
        collection(db, "cohorts"),
        where("status", "in", ["upcoming", "active"]),
      ),
    ).then((snap) =>
      setCohorts(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Cohort)),
    );
  }, []);

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const cohort = cohorts.find((c) => c.id === form.cohortId);
    try {
      await addDoc(collection(db, "volunteers"), {
        name: form.name.trim(),
        contact: form.contact.trim(),
        type: form.type,
        localRole: form.type === "local" ? form.localRole : null,
        remoteRole: form.type === "remote" ? form.remoteRole : null,
        cohortId: form.cohortId || null,
        cohortName: cohort?.name ?? null,
        shippingHardware: form.shippingHardware === "yes",
        hardwareType:
          form.shippingHardware === "yes" ? form.hardwareType : null,
        location: form.type === "remote" ? form.location.trim() : null,
        notes: form.notes.trim() || null,
        createdAt: serverTimestamp(),
      });
      setStep("success");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again or reach out on Facebook.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[20vh]">
      <div
        className="absolute inset-0 bg-[#0d0c0a]/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-lg max-h-[75vh] overflow-y-auto shadow-2xl rounded-2xl">
        {/* Sticky header — always shows type badge so you never lose context */}
        <div className="sticky top-0 bg-white border-b border-[#e8e3d8] px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1c1a16] leading-none">
                Volunteer Sign-Up
              </h2>
              <p className="text-xs text-[#8a8074] mt-0.5">
                Get Involved · Libre
              </p>
            </div>
            {/* Live type badge — always visible even when scrolled */}
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                form.type === "local"
                  ? "text-[#059669] bg-[#f0fdf4] border-[#059669]/20"
                  : "text-[#1c1a16] bg-[#f5f3ee] border-[#e8e3d8]"
              }`}
            >
              {form.type === "local" ? "Local · Iloilo" : "Remote · Anywhere"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#8a8074] hover:text-[#1c1a16] transition-colors p-1 shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {step === "success" ? (
          <div className="px-6 py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-[#f0fdf4] flex items-center justify-center mx-auto mb-4">
              <span className="text-[#059669] font-bold text-xl">✓</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1c1a16] mb-2">
              Salamat!
            </h3>
            <p className="text-[#8a8074] text-sm leading-relaxed max-w-xs mx-auto mb-6">
              We have your details. Kuya Patrick will be in touch soon. Damo gid
              salamat sa inyo.
            </p>
            <button
              onClick={onClose}
              className="px-7 py-3 bg-[#1c1a16] text-white text-sm font-medium rounded-full"
            >
              Close
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="px-6 py-5 flex flex-col gap-4"
          >
            {/* Name + Contact side by side */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Your Name" required>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={inputCls}
                  placeholder="Full name"
                />
              </Field>
              <Field label="Email or Facebook" required>
                <input
                  type="text"
                  required
                  value={form.contact}
                  onChange={(e) => set("contact", e.target.value)}
                  className={inputCls}
                  placeholder="How to reach you"
                />
              </Field>
            </div>

            {/* Local / Remote toggle */}
            <Field label="How are you helping?" required>
              <div className="grid grid-cols-2 gap-2">
                {(["local", "remote"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        type: t,
                        localRole: "",
                        remoteRole: "",
                      }))
                    }
                    className={`py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                      form.type === t
                        ? "bg-[#1c1a16] text-white border-[#1c1a16]"
                        : "bg-white text-[#8a8074] border-[#e8e3d8] hover:border-[#1c1a16]"
                    }`}
                  >
                    {t === "local" ? "Local · Iloilo" : "Remote · Anywhere"}
                  </button>
                ))}
              </div>
            </Field>

            {/* Role — clears when type changes */}
            <Field label="Which role fits you?" required>
              <select
                required
                value={form.type === "local" ? form.localRole : form.remoteRole}
                onChange={(e) =>
                  set(
                    form.type === "local" ? "localRole" : "remoteRole",
                    e.target.value,
                  )
                }
                className={inputCls}
              >
                <option value="">
                  {form.type === "local"
                    ? "Select a local role"
                    : "Select a remote role"}
                </option>
                {(form.type === "local" ? LOCAL_ROLES : REMOTE_ROLES).map(
                  (r) => (
                    <option key={r}>{r}</option>
                  ),
                )}
              </select>
            </Field>

            {/* Location — remote only */}
            {form.type === "remote" && (
              <Field label="City and Country">
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  className={inputCls}
                  placeholder="e.g. San Francisco, USA"
                />
              </Field>
            )}

            {/* Cohort — optional, only shown when cohorts exist */}
            {cohorts.length > 0 && (
              <Field label="Which cohort are you hoping to help with?">
                <select
                  value={form.cohortId}
                  onChange={(e) => set("cohortId", e.target.value)}
                  className={inputCls}
                >
                  <option value="">Any / Not sure yet</option>
                  {cohorts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                      {c.venue ? ` · ${c.venue}` : ""}
                    </option>
                  ))}
                </select>
              </Field>
            )}

            {/* Hardware — inline yes/no toggle, no separate required field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#1c1a16]">
                Got an old laptop or Android to ship?
              </label>
              <div className="flex gap-2">
                {[
                  { v: "yes", label: "Yes, I can ship one" },
                  { v: "no", label: "Not right now" },
                ].map((opt) => (
                  <button
                    key={opt.v}
                    type="button"
                    onClick={() => set("shippingHardware", opt.v)}
                    className={`flex-1 py-2 rounded-lg text-sm border transition-colors ${
                      form.shippingHardware === opt.v
                        ? "bg-[#1c1a16] text-white border-[#1c1a16]"
                        : "bg-white text-[#8a8074] border-[#e8e3d8] hover:border-[#1c1a16]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {form.shippingHardware === "yes" && (
              <Field label="What device?" required>
                <select
                  required
                  value={form.hardwareType}
                  onChange={(e) => set("hardwareType", e.target.value)}
                  className={inputCls}
                >
                  <option value="">Select</option>
                  <option value="Laptop">Laptop / Chromebook</option>
                  <option value="Android">Android Phone</option>
                  <option value="Both">Both</option>
                  <option value="Other">Other</option>
                </select>
              </Field>
            )}

            <Field label="Anything else? (optional)">
              <textarea
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                className={`${inputCls} resize-none`}
                rows={2}
                placeholder="Availability, questions, anything"
              />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#059669] hover:bg-[#047857] disabled:opacity-50 text-white text-sm font-medium tracking-wide rounded-full transition-colors"
            >
              {submitting ? "Sending..." : "Sign Me Up"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
