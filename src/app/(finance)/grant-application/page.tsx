"use client";
/* eslint-disable react/no-unescaped-entities, react-hooks/purity, react-hooks/set-state-in-effect */

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  CheckCircle2,
  Download,
  ExternalLink,
  Home,
  PartyPopper,
  CalendarDays,
  Zap,
  KeyRound,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { LinksConfig } from "@/lib/linksConfig";

const DEFAULT_LINKS: LinksConfig = {
  paymentFormUrl: "https://tinyurl.com/HUApayment",
  supplementalFormUrl: "",
  fundingApplicationUrl: "https://airtable.com/apptT80fnqdIom8dX/shrZqQ7fIHXM2LJSd",
  paymentFormPassword: "",
  fundingFormPassword: "",
};

const STORAGE_KEY = "hua-grant-wizard-v1";

type GrantType = "semesterly" | "emergency";

interface WizardState {
  currentStep: number;
  completedSteps: number[];
  eligibilityChecks: [boolean, boolean];
  grantType: GrantType | null;
}

const DEFAULT_STATE: WizardState = {
  currentStep: 1,
  completedSteps: [],
  eligibilityChecks: [false, false],
  grantType: null,
};

const STEPS = [
  { number: 1, label: "Eligibility" },
  { number: 2, label: "Guidelines" },
  { number: 3, label: "Payment Info" },
  { number: 4, label: "Supplemental Form" },
  { number: 5, label: "Application" },
];

// ─── Progress Stepper ────────────────────────────────────────────────────────

function StepIndicator({
  state,
}: {
  state: WizardState;
}) {
  const { currentStep, completedSteps } = state;
  const isComplete = currentStep > 5;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center">
        {STEPS.map((step, i) => {
          const done = completedSteps.includes(step.number) || isComplete;
          const active = currentStep === step.number && !isComplete;
          const isLast = i === STEPS.length - 1;

          return (
            <div key={step.number} className="flex items-center flex-1 last:flex-none">
              {/* Node */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 font-semibold text-sm",
                    done
                      ? "bg-[#1F5F0A] border-[#1F5F0A] text-white"
                      : active
                      ? "bg-white border-[#1F5F0A] text-[#1F5F0A]"
                      : "bg-white border-[#D1D5DB] text-[#9CA3AF]"
                  )}
                >
                  {done ? <Check className="w-4 h-4" strokeWidth={2.5} /> : step.number}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium text-center leading-tight hidden sm:block",
                    active ? "text-[#1F5F0A]" : done ? "text-[#1F5F0A]" : "text-[#9CA3AF]"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div className="flex-1 h-0.5 mx-2 relative overflow-hidden bg-[#E8ECE7] rounded-full">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[#1F5F0A] rounded-full"
                    initial={false}
                    animate={{ width: done ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Eligibility Checkbox ────────────────────────────────────────────────────

function EligibilityCheck({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200",
        checked
          ? "border-[#1F5F0A] bg-[#F5F8F2]"
          : "border-[#E8ECE7] bg-white hover:border-[#1F5F0A]/40"
      )}
    >
      <div
        className={cn(
          "w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-colors duration-200",
          checked ? "bg-[#1F5F0A] border-[#1F5F0A]" : "border-[#D1D5DB]"
        )}
      >
        {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </div>
      <span className="text-[#222222] text-sm font-medium leading-relaxed">{label}</span>
    </button>
  );
}

// ─── Step 1 ──────────────────────────────────────────────────────────────────

function Step1({
  checks,
  onChecksChange,
  onNext,
}: {
  checks: [boolean, boolean];
  onChecksChange: (c: [boolean, boolean]) => void;
  onNext: () => void;
}) {
  const allChecked = checks[0] && checks[1];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-xs font-bold text-[#1F5F0A] tracking-widest uppercase">Step 1 of 5</span>
        <h2 className="mt-1 text-2xl font-bold text-[#222222]">
          Verify Your Organization's Eligibility
        </h2>
        <p className="mt-2 text-[#6b7280] leading-relaxed">
          Before applying for funding, your organization must meet the following two eligibility requirements.
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          <li className="flex items-start gap-2 text-[#6b7280] text-sm leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6b7280] flex-shrink-0 mt-2" />
            <span>
              <strong className="text-[#222222]">Note:</strong> Your club will be labeled as overall ineligible until payment information is submitted, which is fine — this is handled in <strong className="text-[#1F5F0A]">Step 3</strong>.
            </span>
          </li>
          <li className="flex items-start gap-2 text-[#6b7280] text-sm leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6b7280] flex-shrink-0 mt-2" />
            <span>
              Visit the{" "}
              <Link href="/eligibility" target="_blank" className="text-[#1F5F0A] font-medium underline underline-offset-2 hover:text-[#174508]">
                eligibility page
              </Link>
              , search for your club, and confirm that <strong className="text-[#222222]">both</strong> of the following are true:
            </span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <EligibilityCheck
          checked={checks[0]}
          label="My organization is in good standing with the Dean of Students Office (DSO)."
          onChange={(v) => onChecksChange([v, checks[1]])}
        />
        <EligibilityCheck
          checked={checks[1]}
          label="My organization is compliant with HUA receipt submission requirements."
          onChange={(v) => onChecksChange([checks[0], v])}
        />
      </div>

      {!allChecked && (
        <p className="text-sm text-[#9CA3AF]">
          Both requirements must be confirmed before you can continue.
        </p>
      )}

      <div className="pt-2">
        <button
          onClick={onNext}
          disabled={!allChecked}
          className={cn(
            "w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
            allChecked
              ? "bg-[#1F5F0A] text-white hover:bg-[#174508] shadow-sm"
              : "bg-[#E8ECE7] text-[#9CA3AF] cursor-not-allowed"
          )}
        >
          Continue to Finance Guidelines
        </button>
      </div>
    </div>
  );
}

// ─── Guidelines ──────────────────────────────────────────────────────────────

function Guidelines({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-xs font-bold text-[#1F5F0A] tracking-widest uppercase">Step 2 of 5</span>
        <h2 className="mt-1 text-2xl font-bold text-[#222222]">Read the Finance Guidelines</h2>
        <p className="mt-2 text-[#6b7280] leading-relaxed">
          Before continuing, you must read the HUA Finance Guidelines{" "}
          <strong className="text-[#1F5F0A]">in their entirety</strong>. Reading the guidelines
          is a <strong className="text-[#1F5F0A]">requirement</strong> of applying for funding.
        </p>
      </div>

      <div className="bg-[#F5F8F2] rounded-xl p-5 border border-[#E8ECE7] flex flex-col gap-3">
        <p className="text-sm text-[#6b7280]">
          The guidelines will open in a new tab. Once you&apos;ve read them in full, return here
          and click the button below to continue.
        </p>
        <a
          href="/guidelines"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1F5F0A] text-white text-sm font-semibold hover:bg-[#174508] transition-colors duration-200 w-fit"
        >
          <ExternalLink className="w-4 h-4" />
          Open Finance Guidelines
        </a>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBack}
          className="px-8 py-3 rounded-xl border border-[#E8ECE7] text-[#6b7280] text-sm font-semibold hover:border-[#1F5F0A] hover:text-[#1F5F0A] transition-colors duration-200"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 rounded-xl bg-[#1F5F0A] text-white text-sm font-semibold hover:bg-[#174508] transition-colors duration-200 shadow-sm"
        >
          I've Read the Guidelines
        </button>
      </div>
    </div>
  );
}

// ─── Step 2 ──────────────────────────────────────────────────────────────────

function Step2({ onNext, onBack, paymentFormUrl, paymentFormPassword }: { onNext: () => void; onBack: () => void; paymentFormUrl: string; paymentFormPassword: string }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-xs font-bold text-[#1F5F0A] tracking-widest uppercase">Step 3 of 5</span>
        <h2 className="mt-1 text-2xl font-bold text-[#222222]">Record Payment Information</h2>
        <p className="mt-2 text-[#6b7280] leading-relaxed">
          If your organization has not already submitted payment information to the HUA Finance Team,
          you must complete the <strong className="text-[#1F5F0A]">payment information form</strong>.{" "}
          New payment information must be submitted <strong className="text-[#1F5F0A]">every fall</strong>.
          If your payment information is already on file, you can skip ahead. You can verify if payment
          information has been recorded by viewing{" "}
          <strong className="text-[#1F5F0A]">"Recorded Information"</strong> on the{" "}
          <Link href="/eligibility" target="_blank" className="text-[#1F5F0A] font-medium underline underline-offset-2 hover:text-[#174508]">
            club eligibility list
          </Link>
          .
        </p>
      </div>

      <div className="bg-[#F5F8F2] rounded-xl p-5 border border-[#E8ECE7] flex flex-col gap-3">
        <p className="text-sm text-[#6b7280]">
          The form will open in a new tab. Return here{" "}
          <strong className="text-[#222222]">after you&apos;ve <span className="text-base">Submitted</span> it</strong>{" "}
          and click the button below.
        </p>
        <a
          href={paymentFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1F5F0A] text-white text-sm font-semibold hover:bg-[#174508] transition-colors duration-200 w-fit"
        >
          <ExternalLink className="w-4 h-4" />
          Open Payment Information Form
        </a>
      </div>

      {paymentFormPassword && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border-2 border-amber-300">
          <KeyRound className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-900">
            <strong className="font-bold text-red-600">This semester&apos;s form password:</strong>{" "}
            <strong className="font-bold font-mono tracking-wide">{paymentFormPassword}</strong>
          </p>
        </div>
      )}

      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBack}
          className="px-8 py-3 rounded-xl border border-[#E8ECE7] text-[#6b7280] text-sm font-semibold hover:border-[#1F5F0A] hover:text-[#1F5F0A] transition-colors duration-200"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 rounded-xl bg-[#1F5F0A] text-white text-sm font-semibold hover:bg-[#174508] transition-colors duration-200 shadow-sm"
        >
          I've Completed This Step
        </button>
      </div>
    </div>
  );
}

// ─── Step 3 ──────────────────────────────────────────────────────────────────

function Step3({ onNext, onBack, supplementalFormUrl }: { onNext: () => void; onBack: () => void; supplementalFormUrl: string }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-xs font-bold text-[#1F5F0A] tracking-widest uppercase">Step 4 of 5</span>
        <h2 className="mt-1 text-2xl font-bold text-[#222222]">Complete the Supplemental Form</h2>
        <p className="mt-2 text-[#6b7280] leading-relaxed">
          Download and fill out the required supplemental Excel form. This document must be
          completed <strong className="text-[#1F5F0A]">before</strong> you submit your funding
          application — you will need to <strong className="text-[#222222]">attach it in Step 5</strong>.
        </p>
      </div>

      {/* Excel-only warning */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <span className="text-amber-500 text-lg leading-none flex-shrink-0 mt-0.5">⚠</span>
        <div className="text-sm">
          <p className="font-semibold text-amber-800">This form must be submitted as an Excel file (.xlsx)</p>
          <p className="mt-0.5 text-amber-700">
            Do <strong>not</strong> open or edit this file in Google Sheets. It must be downloaded,
            completed in Excel, and attached as an <strong>.xlsx file</strong> when you submit your
            application. Submissions via Google Sheets will not be accepted.
          </p>
        </div>
      </div>

      <ol className="flex flex-col gap-3">
        {[
          <span key={0}>Download the <strong className="text-[#1F5F0A]">Excel template</strong> below.</span>,
          <span key={1}>Open and complete it in <strong className="text-[#1F5F0A]">Microsoft Excel</strong> — <strong className="text-[#222222]">do not use Google Sheets</strong>.</span>,
          <span key={2}>Save the file as <strong className="text-[#1F5F0A]">.xlsx</strong> — you'll attach it in <strong className="text-[#222222]">Step 5</strong>.</span>,
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-[#6b7280]">
            <span className="w-5 h-5 rounded-full bg-[#F5F8F2] border border-[#E8ECE7] flex items-center justify-center text-xs font-bold text-[#1F5F0A] flex-shrink-0 mt-0.5">
              {i + 1}
            </span>
            {item}
          </li>
        ))}
      </ol>

      <div className="bg-[#F5F8F2] rounded-xl p-5 border border-[#E8ECE7]">
        <a
          href={supplementalFormUrl}
          download="HUA_Supplemental_Form.xlsx"
          className={cn(
            "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-colors duration-200",
            supplementalFormUrl
              ? "bg-[#1F5F0A] text-white hover:bg-[#174508]"
              : "bg-[#E8ECE7] text-[#9CA3AF] pointer-events-none"
          )}
        >
          <Download className="w-4 h-4" />
          Download Excel Template (.xlsx)
        </a>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBack}
          className="px-8 py-3 rounded-xl border border-[#E8ECE7] text-[#6b7280] text-sm font-semibold hover:border-[#1F5F0A] hover:text-[#1F5F0A] transition-colors duration-200"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 rounded-xl bg-[#1F5F0A] text-white text-sm font-semibold hover:bg-[#174508] transition-colors duration-200 shadow-sm"
        >
          I've Completed This Step
        </button>
      </div>
    </div>
  );
}

// ─── Payment Notice ───────────────────────────────────────────────────────────

function PaymentNotice({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-4 p-5 rounded-xl bg-[#F5F8F2] border border-[#1F5F0A]/20">
        <div className="w-10 h-10 rounded-full bg-[#1F5F0A] flex items-center justify-center flex-shrink-0 mt-0.5">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-[#222222] text-sm">Payment information submitted</p>
          <p className="mt-1 text-[#6b7280] text-sm leading-relaxed">
            Once your payment information is processed, your club should appear as{" "}
            <strong className="text-[#1F5F0A]">fully eligible</strong> on the eligibility page.
            This can take <strong className="text-[#222222]">a few minutes</strong> — if your
            club still shows as ineligible, wait a moment and refresh before continuing.{" "}
            Please note that if your club is{" "}
            <strong className="text-[#222222]">not marked as fully eligible</strong>, you will{" "}
            <strong className="text-[#222222]">not be able to submit</strong> the funding application in{" "}
            <strong className="text-[#1F5F0A]">Step 5</strong>.
          </p>
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={onContinue}
          className="px-8 py-3 rounded-xl bg-[#1F5F0A] text-white text-sm font-semibold hover:bg-[#174508] transition-colors duration-200 shadow-sm"
        >
          Got it — Continue to Supplemental Form
        </button>
      </div>
    </div>
  );
}

// ─── Step 4 ──────────────────────────────────────────────────────────────────

function Step4({ onComplete, onBack, fundingApplicationUrl, fundingFormPassword }: { onComplete: () => void; onBack: () => void; fundingApplicationUrl: string; fundingFormPassword: string }) {
  const items = [
    "Organization eligibility verified",
    "Payment information completed (if required)",
    "Supplemental form completed & Attached to application",
    "Funding Application Submitted",
  ];
  const [checks, setChecks] = useState([false, false, false, false]);
  const allChecked = checks.every(Boolean);

  const toggle = (i: number) =>
    setChecks((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-xs font-bold text-[#1F5F0A] tracking-widest uppercase">Step 5 of 5</span>
        <h2 className="mt-1 text-2xl font-bold text-[#222222]">Complete the Funding Application</h2>
        <p className="mt-2 text-[#6b7280] leading-relaxed">
          Open the funding application form below. Remember to{" "}
          <strong className="text-[#1F5F0A]">attach the completed supplemental Excel form</strong>{" "}
          before submitting.
        </p>
      </div>

      <div className="bg-[#F5F8F2] rounded-xl p-5 border border-[#E8ECE7] flex flex-col gap-3">
        <p className="text-sm text-[#6b7280]">
          Click below to open the application in a new tab.{" "}
          <strong className="text-[#1F5F0A]">Complete and SUBMIT IT there</strong>, then return here
          and check off the items below before clicking{" "}
          <strong className="text-[#222222]">&quot;I&apos;ve Completed This Step.&quot;</strong>
        </p>
        <a
          href={fundingApplicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1F5F0A] text-white text-sm font-semibold hover:bg-[#174508] transition-colors duration-200"
        >
          <ExternalLink className="w-4 h-4" />
          Open Funding Application
        </a>
      </div>

      {fundingFormPassword && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border-2 border-amber-300">
          <KeyRound className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-900">
            <strong className="font-bold text-red-600">This semester&apos;s form password:</strong>{" "}
            <strong className="font-bold font-mono tracking-wide">{fundingFormPassword}</strong>
          </p>
        </div>
      )}

      <div>
        <p className="text-sm font-semibold text-[#222222] mb-3">
          Confirm you've completed all of the following:
        </p>
        <div className="flex flex-col gap-2">
          {items.map((label, i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              className={cn(
                "w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200",
                checks[i]
                  ? "border-[#1F5F0A] bg-[#F5F8F2]"
                  : "border-[#E8ECE7] bg-white hover:border-[#1F5F0A]/40"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-colors duration-200",
                  checks[i] ? "bg-[#1F5F0A] border-[#1F5F0A]" : "border-[#D1D5DB]"
                )}
              >
                {checks[i] && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </div>
              <span className="text-[#222222] text-sm font-medium leading-relaxed">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBack}
          className="px-8 py-3 rounded-xl border border-[#E8ECE7] text-[#6b7280] text-sm font-semibold hover:border-[#1F5F0A] hover:text-[#1F5F0A] transition-colors duration-200"
        >
          ← Back
        </button>
        <button
          onClick={onComplete}
          disabled={!allChecked}
          className={cn(
            "px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
            allChecked
              ? "bg-[#1F5F0A] text-white hover:bg-[#174508] shadow-sm"
              : "bg-[#E8ECE7] text-[#9CA3AF] cursor-not-allowed"
          )}
        >
          I&apos;ve Completed This Step
        </button>
      </div>
    </div>
  );
}

// ─── Confetti ─────────────────────────────────────────────────────────────────

const CONFETTI_COLORS = ["#1F5F0A", "#4ade80", "#fbbf24", "#f87171", "#a78bfa", "#38bdf8", "#fb923c", "#f472b6"];

function Confetti() {
  const particles = useMemo(() =>
    Array.from({ length: 36 }, (_, i) => {
      const angle = (i / 36) * Math.PI * 2;
      const spread = 120 + Math.random() * 180;
      return {
        id: i,
        x: Math.cos(angle) * spread * (0.6 + Math.random() * 0.8),
        y: Math.sin(angle) * spread * (0.6 + Math.random() * 0.8) - 60,
        rotate: Math.random() * 720 - 360,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: Math.random() * 0.25,
        wide: i % 3 === 0,
      };
    }), []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{ backgroundColor: p.color, width: p.wide ? 10 : 7, height: p.wide ? 5 : 7 }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
          animate={{ x: p.x, y: p.y, opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0.5], rotate: p.rotate }}
          transition={{ duration: 1.4, delay: p.delay, ease: [0.2, 0.8, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

// ─── Completion Screen ────────────────────────────────────────────────────────

function CompletionScreen({ onReset }: { onReset: () => void }) {
  const items = [
    "Organization eligibility verified",
    "Payment information completed",
    "Supplemental form completed",
    "Funding application submitted",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative text-center flex flex-col items-center gap-6 overflow-hidden"
    >
      <Confetti />

      {/* Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: [0, 1.35, 0.88, 1.1, 1], rotate: [-20, 10, -5, 3, 0] }}
        transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
        className="relative w-24 h-24 rounded-full bg-[#F5F8F2] border-4 border-[#1F5F0A] flex items-center justify-center shadow-lg"
      >
        <PartyPopper className="w-11 h-11 text-[#1F5F0A]" />
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-[#222222]">Funding Application Complete!</h2>
        <p className="mt-2 text-[#6b7280]">
          You've successfully submitted your funding application to the HUA Finance Team.
        </p>
      </motion.div>

      {/* Checklist */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.35 }}
        className="w-full max-w-sm bg-[#F5F8F2] rounded-2xl border border-[#E8ECE7] p-6 text-left"
      >
        <p className="text-xs font-bold text-[#1F5F0A] tracking-widest uppercase mb-4">Completed</p>
        <ul className="flex flex-col gap-3">
          {items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.09, duration: 0.3 }}
              className="flex items-center gap-3 text-sm text-[#222222]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.6 + i * 0.09 }}
              >
                <CheckCircle2 className="w-5 h-5 text-[#1F5F0A] flex-shrink-0" />
              </motion.div>
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.35 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <Link
          href="/finance"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1F5F0A] text-white text-sm font-semibold hover:bg-[#174508] transition-colors duration-200"
        >
          <Home className="w-4 h-4" />
          Return to Funding Dashboard
        </Link>
        <button
          onClick={onReset}
          className="px-6 py-3 rounded-xl border border-[#E8ECE7] text-[#6b7280] text-sm font-medium hover:border-[#1F5F0A] hover:text-[#1F5F0A] transition-colors duration-200"
        >
          Start a New Application
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Grant Type Selector ──────────────────────────────────────────────────────

const GRANT_TYPES = [
  {
    id: "semesterly",
    Icon: CalendarDays,
    title: "Semesterly Grant",
    tagline: "Semester funding for planned programming",
    details: [
      "For registered student organizations planning events or operations over the semester",
      "Applications reviewed at the start of each semester",
      "Covers ongoing programming, operational costs, and events",
      "Requires a full budget breakdown and programming plan",
      "Standard review timeline of 2–4 weeks",
    ],
  },
  {
    id: "emergency",
    Icon: Zap,
    title: "Emergency Grant",
    tagline: "Urgent funding for unexpected needs",
    details: [
      "For time-sensitive, unforeseen expenses that arise mid-semester",
      "Rolling review process — no fixed deadline",
      "Faster turnaround than semesterly allocations",
      "Must demonstrate why the need could not have been anticipated",
      "Typically covers smaller, urgent one-time expenses",
    ],
  },
];

interface LiveGrantConfig {
  name: string;
  available: boolean;
}

interface LiveConfig {
  semesterly: LiveGrantConfig;
  emergency: LiveGrantConfig;
}

function GrantTypeSelector({
  onSelect,
  liveConfig,
}: {
  onSelect: (type: GrantType) => void;
  liveConfig: LiveConfig;
}) {
  const [hovered, setHovered] = useState<GrantType | null>(null);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-3xl font-bold text-[#222222]">What type of grant are you applying for?</h2>
        <p className="mt-3 text-[#6b7280] text-base leading-relaxed">
          Hover over each option to learn more, then click to begin your application.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {GRANT_TYPES.map((type) => {
          const isHovered = hovered === type.id;
          const Icon = type.Icon;
          const live = liveConfig[type.id as GrantType];
          const available = live.available;

          return (
            <motion.button
              key={type.id}
              type="button"
              onClick={() => available && onSelect(type.id as GrantType)}
              onHoverStart={() => setHovered(type.id as GrantType)}
              onHoverEnd={() => setHovered(null)}
              animate={{
                borderColor: !available ? "#E8ECE7" : isHovered ? "#1F5F0A" : "#E8ECE7",
                backgroundColor: !available ? "#FAFAFA" : isHovered ? "#F5F8F2" : "#ffffff",
              }}
              transition={{ duration: 0.15 }}
              className={cn(
                "relative text-left rounded-2xl border-2 p-8 flex flex-col gap-6 focus:outline-none",
                available ? "cursor-pointer focus-visible:ring-2 focus-visible:ring-[#1F5F0A]" : "cursor-not-allowed opacity-60"
              )}
            >
              {!available && (
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  Closed
                </span>
              )}

              <div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-150",
                  available && isHovered ? "bg-[#1F5F0A]" : "bg-[#E8ECE7]"
                )}
              >
                <Icon className={cn("w-7 h-7 transition-colors duration-150", available && isHovered ? "text-white" : "text-[#1F5F0A]")} />
              </div>

              <div>
                <p className="font-bold text-[#222222] text-2xl leading-tight">{live.name}</p>
                <p className="text-[#6b7280] mt-2 text-base">{type.tagline}</p>
              </div>

              <AnimatePresence initial={false}>
                {isHovered && available && (
                  <motion.ul
                    key="details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden flex flex-col gap-3"
                  >
                    {type.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#6b7280]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1F5F0A] flex-shrink-0 mt-1.5" />
                        {detail}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              {available && (
                <motion.div
                  animate={{
                    backgroundColor: isHovered ? "#1F5F0A" : "#F5F8F2",
                    color: isHovered ? "#ffffff" : "#1F5F0A",
                  }}
                  transition={{ duration: 0.15 }}
                  className="self-start px-6 py-3 rounded-xl text-sm font-semibold"
                >
                  Select →
                </motion.div>
              )}

              {!available && (
                <div className="self-start px-6 py-3 rounded-xl text-sm font-semibold bg-[#F5F8F2] text-[#9CA3AF]">
                  Not accepting applications
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const DEFAULT_LIVE_CONFIG: LiveConfig = {
  semesterly: { name: "Semesterly Grant", available: true },
  emergency: { name: "Emergency Grant", available: true },
};

export default function GrantApplicationPage() {
  const [liveConfig, setLiveConfig] = useState<LiveConfig>(DEFAULT_LIVE_CONFIG);
  const [liveLinks, setLiveLinks] = useState<LinksConfig>(DEFAULT_LINKS);
  const [configLoaded, setConfigLoaded] = useState(false);
  const [state, setState] = useState<WizardState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [showPaymentNotice, setShowPaymentNotice] = useState(false);

  // Load from localStorage and fetch live grant config after mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setState(JSON.parse(saved));
    } catch {}
    setHydrated(true);
    fetch("/api/admin/grants")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.semesterly && data?.emergency) setLiveConfig(data);
        setConfigLoaded(true);
      })
      .catch(() => setConfigLoaded(true));

    fetch("/api/admin/links")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data?.paymentFormUrl !== undefined) setLiveLinks(data); })
      .catch(() => {});
  }, []);

  // Persist on every state change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, hydrated]);

  const advance = () => {
    setDirection(1);
    setState((prev) => {
      if (prev.currentStep === 3) setShowPaymentNotice(true);
      return {
        ...prev,
        completedSteps: prev.completedSteps.includes(prev.currentStep)
          ? prev.completedSteps
          : [...prev.completedSteps, prev.currentStep],
        currentStep: prev.currentStep + 1,
      };
    });
  };

  const goBack = () => {
    setDirection(-1);
    setShowPaymentNotice(false);
    setState((prev) => ({
      ...prev,
      completedSteps: prev.completedSteps.filter((s) => s !== prev.currentStep - 1),
      currentStep: prev.currentStep - 1,
    }));
  };

  const reset = () => {
    setDirection(1);
    setState(DEFAULT_STATE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const isComplete = state.currentStep > 5;
  const grantType = state.grantType;

  if (!hydrated) return null;

  const grantLabel = grantType === "semesterly" ? "Semesterly Grant" : grantType === "emergency" ? "Emergency Grant" : "";

  return (
    <div className="min-h-screen bg-[#F5F8F2]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8ECE7] pt-24 pb-10 px-6">
        <div className="max-w-2xl mx-auto">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F5F8F2] text-[#1F5F0A] text-xs font-semibold tracking-wide uppercase mb-4 border border-[#E8ECE7]">
            {grantLabel || "Grant Application"}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#222222]">Apply for Funding</h1>
          <p className="mt-2 text-[#6b7280] text-sm">
            {grantType ? "Complete each step below to submit your HUA funding request." : "Select the type of grant you need to get started."}
          </p>
        </div>
      </div>

      {/* Stepper bar — only once grant type is chosen and not complete */}
      {grantType && !isComplete && (
        <div className="bg-white border-b border-[#E8ECE7] px-6 py-6">
          <div className="max-w-2xl mx-auto">
            <StepIndicator state={state} />
          </div>
        </div>
      )}

      {/* Card */}
      <div className="px-6 py-10">
        <div className={cn("mx-auto transition-all duration-300", grantType ? "max-w-2xl" : "max-w-4xl")}>
          {grantType && !isComplete && (
            <button
              onClick={() => { setState(DEFAULT_STATE); setShowPaymentNotice(false); }}
              className="mb-4 flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#1F5F0A] transition-colors duration-150 font-medium cursor-pointer"
            >
              ← Change grant type
            </button>
          )}
          <AnimatePresence mode="wait" custom={direction}>
            {!grantType && !configLoaded ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-8 md:p-10 flex items-center justify-center min-h-[200px]"
              >
                <div className="w-8 h-8 border-2 border-[#1F5F0A] border-t-transparent rounded-full animate-spin" />
              </motion.div>
            ) : !grantType ? (
              <motion.div
                key="selector"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-8 md:p-10"
              >
                <GrantTypeSelector onSelect={(type) => { setState({ ...DEFAULT_STATE, grantType: type }); }} liveConfig={liveConfig} />
              </motion.div>
            ) : isComplete ? (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-8 md:p-12"
              >
                <CompletionScreen onReset={reset} />
              </motion.div>
            ) : (
              <motion.div
                key={state.currentStep}
                custom={direction}
                initial={{ opacity: 0, x: direction * 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -32 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="bg-white rounded-2xl border border-[#E8ECE7] shadow-sm p-8 md:p-10"
              >
                {state.currentStep === 1 && (
                  <Step1
                    checks={state.eligibilityChecks}
                    onChecksChange={(c) =>
                      setState((prev) => ({ ...prev, eligibilityChecks: c }))
                    }
                    onNext={advance}
                  />
                )}
                {state.currentStep === 2 && <Guidelines onNext={advance} onBack={goBack} />}
                {state.currentStep === 3 && <Step2 onNext={advance} onBack={goBack} paymentFormUrl={liveLinks.paymentFormUrl} paymentFormPassword={liveLinks.paymentFormPassword} />}
                {state.currentStep === 4 && showPaymentNotice && (
                  <PaymentNotice onContinue={() => setShowPaymentNotice(false)} />
                )}
                {state.currentStep === 4 && !showPaymentNotice && <Step3 onNext={advance} onBack={goBack} supplementalFormUrl={liveLinks.supplementalFormUrl} />}
                {state.currentStep === 5 && <Step4 onComplete={advance} onBack={goBack} fundingApplicationUrl={liveLinks.fundingApplicationUrl} fundingFormPassword={liveLinks.fundingFormPassword} />}
              </motion.div>
            )}
          </AnimatePresence>

          {/* What's next preview */}
          {!isComplete && state.currentStep < 5 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 px-4 py-3 rounded-xl bg-white/60 border border-[#E8ECE7] flex items-center gap-3"
            >
              <span className="text-xs text-[#9CA3AF] font-medium">
                Next:{" "}
                <span className="text-[#6b7280]">
                  {STEPS[state.currentStep]?.label}
                </span>
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
