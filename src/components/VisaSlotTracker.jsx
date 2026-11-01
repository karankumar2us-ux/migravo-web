import React, { useState } from 'react';
import { ShieldAlert, ExternalLink, CheckCircle2, Clock, Calendar, HelpCircle, FileCheck2, Globe2 } from 'lucide-react';

const VISA_SYSTEMS = {
  germany: {
    country: 'Germany National Student Visa (Type D)',
    vfsPortal: 'https://visa.vfsglobal.com/ind/en/deu',
    consulates: ['New Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Kolkata'],
    waitlistRule: 'Appointments use an automated waitlist (Warteliste) allocation system. Waitlist wait time varies from 2 to 8 weeks depending on intake peaks.',
    financialProof: '€11,904 Blocked Account confirmation (Expatrio / Coracle / Fintiba) + Statutory Health Insurance coverage confirmation.',
    steps: [
      { id: 'v1', task: 'Register on German Chancery Appointment System / VFS Waitlist', done: true },
      { id: 'v2', task: 'Print official Digital APS Certificate (Color printout)', done: true },
      { id: 'v3', task: 'Unconditional Admission Letter or Zulassungsbescheid', done: false },
      { id: 'v4', task: 'Sperrkonto 06 Confirmation Letter showing €11,904 funded', done: false },
      { id: 'v5', task: 'Travel Health Insurance (Incoming Insurance for first 180 days)', done: false },
      { id: 'v6', task: 'VIDEX Online Visa Application form printed with 2 barcoded copies', done: false },
    ],
    interviewTips: [
      'Know your module names and ECTS credit breakdown by heart.',
      'Explain clearly why your course is not offered in India with equivalent depth.',
      'Demonstrate basic conversational German (A1) even for 100% English programs.'
    ]
  },
  usa: {
    country: 'United States F-1 Student Visa',
    vfsPortal: 'https://www.ustraveldocs.com/in/en/',
    consulates: ['New Delhi', 'Mumbai', 'Hyderabad', 'Chennai', 'Kolkata'],
    waitlistRule: 'Requires two separate appointment bookings: VAC (Biometrics/OFC) followed by Consular Interview. Student visa slots release in seasonal bulk waves (May-June & Nov-Dec).',
    financialProof: 'Official I-20 document issued by designated school official (DSO) + proof covering at least 1st year total cost of attendance via Liquid Funds or Sanction Letter.',
    steps: [
      { id: 'u1', task: 'Receive signed electronic Form I-20 from university DSO', done: true },
      { id: 'u2', task: 'Pay SEVIS I-901 Fee ($350) on fmjfee.com & save payment receipt', done: true },
      { id: 'u3', task: 'Complete Form DS-160 online & save the confirmation barcode', done: false },
      { id: 'u4', task: 'Pay Visa Application Fee ($185) via NEFT/UPI on US Travel Docs', done: false },
      { id: 'u5', task: 'Book OFC Biometrics and Consular Interview appointments', done: false },
      { id: 'u6', task: 'Assemble bank statements and Section 80E Loan Sanction letter', done: false },
    ],
    interviewTips: [
      'Maintain strong non-immigrant intent (214(b)); articulate your return to India.',
      'Answer questions concisely in 1-2 sentences without lecturing the visa officer.',
      'Know your annual cost of study and explain how your family/loan finances it.'
    ]
  },
  uk: {
    country: 'United Kingdom Student Visa (Child/Adult Student Route)',
    vfsPortal: 'https://www.gov.uk/student-visa',
    consulates: ['New Delhi', 'Mumbai', 'Bengaluru', 'Chandigarh', 'Ahmedabad'],
    waitlistRule: 'Apply online up to 6 months before your course start date. Biometric appointments available within 5-10 business days at VFS centres across India.',
    financialProof: 'CAS (Confirmation of Acceptance for Studies) + 28-day holding rule for tuition and maintenance funds (£1,334/mo London, £1,023/mo outside).',
    steps: [
      { id: 'k1', task: 'Receive unconditional offer and CAS Number from UK university', done: true },
      { id: 'k2', task: 'Ensure 28 consecutive days holding of maintenance funds in bank', done: false },
      { id: 'k3', task: 'Submit online application on GOV.UK and pay Immigration Health Surcharge (IHS)', done: false },
      { id: 'k4', task: 'Book biometric appointment at local VFS Global Centre', done: false },
      { id: 'k5', task: 'Obtain approved TB (Tuberculosis) Clearance Certificate from IOM clinic', done: false },
    ],
    interviewTips: [
      'Credibility interviews may be conducted by Home Office caseworkers via video link.',
      'Be prepared to justify why you chose this specific UK university over alternatives.',
      'Explain the gap between your previous studies and this degree program.'
    ]
  },
  canada: {
    country: 'Canada Study Permit',
    vfsPortal: 'https://www.canada.ca/en/immigration-refugees-citizenship.html',
    consulates: ['VFS Global VAC India Network'],
    waitlistRule: 'Standard online processing via IRCC portal. Biometrics instruction letter (BIL) generated within 24-48 hours of payment.',
    financialProof: 'Guaranteed Investment Certificate (GIC) of CAD $20,635+ with an approved Canadian bank + proof of 1st year tuition payment receipt.',
    steps: [
      { id: 'c1', task: 'Obtain Letter of Acceptance (LOA) from a Designated Learning Institution (DLI)', done: true },
      { id: 'c2', task: 'Obtain Provincial Attestation Letter (PAL) from province of study', done: false },
      { id: 'c3', task: 'Purchase CAD $20,635 GIC Certificate with CIBC/Scotiabank/SBI Canada', done: false },
      { id: 'c4', task: 'Upfront medical examination by an IRCC paneled physician', done: false },
      { id: 'c5', task: 'Submit online study permit application on IRCC secure account', done: false },
      { id: 'c6', task: 'Attend VFS biometric appointment with valid passport and BIL letter', done: false },
    ],
    interviewTips: [
      'Strong Statement of Purpose (SOP) explaining why the Canadian credential fits your career in India.',
      'Show clear economic ties to India to prevent dual-intent refusals.',
      'Ensure the institution has an active Post-Graduation Work Permit (PGWP) eligibility status.'
    ]
  }
};

export default function VisaSlotTracker() {
  const [selectedCountry, setSelectedCountry] = useState('germany');
  const [taskStates, setTaskStates] = useState({});

  const current = VISA_SYSTEMS[selectedCountry];

  const isTaskDone = (id, defaultVal) => {
    return taskStates[id] !== undefined ? taskStates[id] : defaultVal;
  };

  const toggleTask = (id, defaultVal) => {
    setTaskStates(prev => ({
      ...prev,
      [id]: !isTaskDone(id, defaultVal)
    }));
  };

  const completed = current.steps.filter(s => isTaskDone(s.id, s.done)).length;
  const progress = Math.round((completed / current.steps.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold text-[#008779] bg-teal-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Consular & VFS Readiness
          </span>
          <h2 className="text-xl font-extrabold text-[#0D3B43] flex items-center gap-2 mt-1">
            <Calendar className="text-[#008779] w-6 h-6" /> Embassy & VFS Visa Appointment Tracker
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Verified step-by-step visa dossier checklists, appointment allocation rules, and consular interview preparation.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl text-right shrink-0">
          <span className="text-xl font-black text-[#008779]">{progress}%</span>
          <p className="text-[10px] font-bold text-slate-500">{completed} of {current.steps.length} Steps Ready</p>
        </div>
      </div>

      {/* Country Switcher */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 flex gap-2 overflow-x-auto no-scrollbar text-xs">
        {[
          { id: 'germany', label: '🇩🇪 Germany (National Visa D)' },
          { id: 'usa', label: '🇺🇸 USA (F-1 Student Visa & SEVIS)' },
          { id: 'uk', label: '🇬🇧 UK (Student Route & CAS)' },
          { id: 'canada', label: '🇨🇦 Canada (Study Permit & PAL)' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setSelectedCountry(item.id)}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition ${
              selectedCountry === item.id 
                ? 'bg-[#0D3B43] text-white shadow-xs' 
                : 'text-slate-600 hover:bg-slate-100 border border-slate-200/60'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Visa Info Card */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
          <div>
            <h3 className="text-base font-extrabold text-[#0D3B43]">{current.country}</h3>
            <p className="text-xs text-slate-500">{current.financialProof}</p>
          </div>
          <a
            href={current.vfsPortal}
            target="_blank"
            rel="noreferrer"
            className="bg-[#008779] hover:bg-teal-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition flex items-center gap-1 active:scale-95 shrink-0"
          >
            Official Appointment Portal <ExternalLink size={12} />
          </a>
        </div>

        {/* Consular System Details */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs text-slate-700 space-y-1">
          <p className="font-bold text-[#0D3B43]">Appointment Allocation Mechanics:</p>
          <p className="text-slate-600 leading-relaxed text-[11px]">{current.waitlistRule}</p>
          <p className="text-[10px] text-slate-400 font-medium pt-1">
            Official Indian Jurisdictions: {current.consulates.join(', ')}
          </p>
        </div>

        {/* Step-by-Step Task Checklist */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-extrabold text-[#0D3B43] block">Filing & Document Checklist</span>
          {current.steps.map(step => {
            const done = isTaskDone(step.id, step.done);
            return (
              <div
                key={step.id}
                onClick={() => toggleTask(step.id, step.done)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                  done 
                    ? 'bg-emerald-50/40 border-emerald-200 text-slate-800' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={done}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-emerald-600 cursor-pointer"
                  />
                  <p className={`text-xs font-bold ${done ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {step.task}
                  </p>
                </div>
                {done && <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Consular Interview Prep Box */}
      <div className="bg-amber-50/70 p-5 rounded-3xl border border-amber-200/80 space-y-2 text-xs">
        <h4 className="font-extrabold text-amber-950 flex items-center gap-1.5 text-sm">
          <HelpCircle size={16} className="text-amber-800" /> Consular Officer & VFS Interview Tips
        </h4>
        <ul className="space-y-1.5 text-amber-900/90 text-[11px]">
          {current.interviewTips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span>•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}