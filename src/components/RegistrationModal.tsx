"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  ILOILO_BARANGAYS,
  GRADE_LEVELS,
  HEARD_FROM_OPTIONS,
} from "@/lib/constants";
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

export default function RegistrationModal({
  cohortId,
  cohortName,
  onClose,
}: {
  cohortId: string;
  cohortName: string;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    childFirstName: "",
    childLastName: "",
    age: "",
    gender: "",
    gradeLevel: "",
    schoolName: "",
    barangay: "",
    hasSmartphone: "",
    guardianName: "",
    guardianContact: "",
    heardFrom: "",
  });

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, "registrations"), {
        cohortId,
        cohortName,
        childFirstName: form.childFirstName.trim(),
        childLastName: form.childLastName.trim(),
        age: parseInt(form.age),
        gender: form.gender,
        gradeLevel: form.gradeLevel,
        schoolName: form.schoolName.trim(),
        barangay: form.barangay,
        hasSmartphone: form.hasSmartphone === "yes",
        guardianName: form.guardianName.trim(),
        guardianContact: form.guardianContact.trim(),
        heardFrom: form.heardFrom,
        createdAt: serverTimestamp(),
      });
      setStep("success");
    } catch (err) {
      console.error(err);
      alert(
        "Something went wrong. Please try again or contact us on Facebook.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-[#0d0c0a]/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white w-full sm:max-w-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl rounded-t-2xl sm:rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#e8e3d8] px-6 py-5 flex items-center justify-between z-10 rounded-t-2xl">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-[#059669] font-medium">
              {cohortName} · Libre
            </p>
            <h2 className="font-serif text-xl font-bold text-[#1c1a16]">
              Register Your Child
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#8a8074] hover:text-[#1c1a16] transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {step === "success" ? (
          <div className="px-6 py-14 text-center">
            <div className="w-12 h-12 rounded-full bg-[#f0fdf4] flex items-center justify-center mx-auto mb-5">
              <span className="text-[#059669] font-bold text-xl">✓</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1c1a16] mb-3">
              Salamat!
            </h3>
            <p className="text-[#8a8074] text-sm leading-relaxed max-w-xs mx-auto mb-8">
              Your child is registered for {cohortName}. We&apos;ll reach out to
              your contact once session dates and venue are confirmed. Padayon.
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
            className="px-6 py-6 flex flex-col gap-5"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-[#8a8074] font-medium">
              Child&apos;s Information
            </p>

            <div className="grid grid-cols-2 gap-3">
              <Field label="First Name" required>
                <input
                  type="text"
                  required
                  value={form.childFirstName}
                  onChange={(e) => set("childFirstName", e.target.value)}
                  className={inputCls}
                  placeholder="Juan"
                />
              </Field>
              <Field label="Last Name" required>
                <input
                  type="text"
                  required
                  value={form.childLastName}
                  onChange={(e) => set("childLastName", e.target.value)}
                  className={inputCls}
                  placeholder="dela Cruz"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Age" required>
                <select
                  required
                  value={form.age}
                  onChange={(e) => set("age", e.target.value)}
                  className={inputCls}
                >
                  <option value="">Select age</option>
                  {[10, 11, 12, 13, 14, 15, 16, 17, 18].map((a) => (
                    <option key={a} value={a}>
                      {a} years old
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Gender" required>
                <select
                  required
                  value={form.gender}
                  onChange={(e) => set("gender", e.target.value)}
                  className={inputCls}
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Grade Level" required>
                <select
                  required
                  value={form.gradeLevel}
                  onChange={(e) => set("gradeLevel", e.target.value)}
                  className={inputCls}
                >
                  <option value="">Select</option>
                  {GRADE_LEVELS.map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </Field>
              <Field label="School Name">
                <input
                  type="text"
                  value={form.schoolName}
                  onChange={(e) => set("schoolName", e.target.value)}
                  className={inputCls}
                  placeholder="e.g. ISNHS"
                />
              </Field>
            </div>

            <Field label="Barangay of Residence" required>
              <select
                required
                value={form.barangay}
                onChange={(e) => set("barangay", e.target.value)}
                className={inputCls}
              >
                <option value="">Select barangay</option>
                {ILOILO_BARANGAYS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </Field>

            <Field label="Does your child have a smartphone?" required>
              <select
                required
                value={form.hasSmartphone}
                onChange={(e) => set("hasSmartphone", e.target.value)}
                className={inputCls}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No (we have devices at sessions)</option>
              </select>
            </Field>

            <p className="text-xs tracking-[0.2em] uppercase text-[#8a8074] font-medium pt-1">
              Parent / Guardian
            </p>

            <Field label="Guardian Name" required>
              <input
                type="text"
                required
                value={form.guardianName}
                onChange={(e) => set("guardianName", e.target.value)}
                className={inputCls}
                placeholder="Nanay or Tatay's full name"
              />
            </Field>

            <Field label="Contact (Mobile or Facebook)" required>
              <input
                type="text"
                required
                value={form.guardianContact}
                onChange={(e) => set("guardianContact", e.target.value)}
                className={inputCls}
                placeholder="09XX XXX XXXX or Facebook name"
              />
            </Field>

            <Field label="How did you hear about Barangay Uswag?" required>
              <select
                required
                value={form.heardFrom}
                onChange={(e) => set("heardFrom", e.target.value)}
                className={inputCls}
              >
                <option value="">Select</option>
                {HEARD_FROM_OPTIONS.map((h) => (
                  <option key={h}>{h}</option>
                ))}
              </select>
            </Field>

            <p className="text-xs text-[#8a8074] leading-relaxed bg-[#f5f3ee] rounded-lg p-3">
              This is a libre (free) program. No fees, ever. Session dates and
              venue will be shared to your contact once confirmed.
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#059669] hover:bg-[#047857] disabled:opacity-50 text-white text-sm font-medium tracking-wide rounded-full transition-colors"
            >
              {submitting ? "Sending..." : "Register My Child"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
