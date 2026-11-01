import React, { useState } from 'react';
import { 
  ShieldCheck, FileCheck, ExternalLink, AlertTriangle, 
  CheckCircle, Clock, Copy, Download, UserCheck, Mail, Send
} from 'lucide-react';

export default function ApsVault() {
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [applicantCategory, setApplicantCategory] = useState('masters'); // masters | bachelors | testas

  const [studentName, setStudentName] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [apsToken, setApsToken] = useState('');

  const [documents, setDocuments] = useState([
    { id: 1, name: 'Aadhaar Card (Linked with active mobile & DigiLocker)', required: true, done: true, appliesTo: ['masters', 'bachelors', 'testas'], note: 'Mandatory identity validation' },
    { id: 2, name: 'Valid Indian Passport (Front and Back color scan)', required: true, done: true, appliesTo: ['masters', 'bachelors', 'testas'], note: 'Min. 12 months validity remaining' },
    { id: 3, name: 'Class 10th Certificate & Marksheet', required: true, done: true, appliesTo: ['masters', 'bachelors', 'testas'], note: 'Date of birth proof' },
    { id: 4, name: 'Class 12th Certificate & Marksheet', required: true, done: true, appliesTo: ['masters', 'bachelors', 'testas'], note: 'Higher secondary verification' },
    { id: 5, name: 'Consolidated Semester Transcripts (All Semesters)', required: true, done: false, appliesTo: ['masters'], note: 'Signed and stamped by Controller of Examinations' },
    { id: 6, name: 'Bachelors Degree Certificate or Provisional (PDC)', required: true, done: false, appliesTo: ['masters'], note: 'Required if final degree is already completed' },
    { id: 7, name: 'Bona Fide Student Certificate (If in 7th/8th Semester)', required: true, done: false, appliesTo: ['masters'], note: 'For final year students without degree yet' },
    { id: 8, name: 'University Student Online Result Portal Login Info', required: true, done: false, appliesTo: ['masters'], note: 'Accelerates verification from 6 weeks to 15 days' },
    { id: 9, name: 'TestAS Scorecard Certificate', required: true, done: false, appliesTo: ['testas'], note: 'Compulsory for direct undergraduate applicants' },
    { id: 10, name: 'Printed & Signed APS Registration Form', required: true, done: false, appliesTo: ['masters', 'bachelors', 'testas'], note: 'Generated after ₹18,000 online fee payment' },
  ]);

  const activeDocs = documents.filter(d => d.appliesTo.includes(applicantCategory));

  const toggleDoc = (id) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, done: !d.done } : d));
  };

  const completedCount = activeDocs.filter(d => d.done).length;
  const progressPercent = Math.round((completedCount / activeDocs.length) * 100);

  const copyCourierAddress = () => {
    navigator.clipboard.writeText("Academic Evaluation Centre (APS India), Embassy of the Federal Republic of Germany, No. 6, Shantipath, Chanakyapuri, New Delhi - 110021");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Pre-formatted professor/Registrar email draft to speed up university response
  const emailDraft = `Subject: URGENT: Academic Verification Request for APS Germany - ${studentName || '[Student Name]'} (Roll: ${apsToken || '[Roll Number]'})

Respected Registrar / Dean of Academics,

I am an alumnus of ${universityName || '[Your Indian University]'} and have applied for higher studies in Germany. 

The Academic Evaluation Centre (APS) of the German Embassy in New Delhi requires verification of my academic transcripts and degree certificate. 

Kindly respond affirmatively with an official confirmation to verification inquiries sent to your office from the official German embassy address (@aps-india.de).

Student Name: ${studentName || '[Student Name]'}
Degree & Discipline: Bachelor of Technology / Science
Enrollment / Roll Number: ${apsToken || '[Your Roll Number]'}

Thank you for your prompt assistance.

Warm regards,
${studentName || '[Your Name]'}`;

  const copyEmail = () => {
    navigator.clipboard.writeText(emailDraft);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold text-[#008779] bg-teal-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            German Embassy Compliance
          </span>
          <h2 className="text-xl font-extrabold text-[#0D3B43] flex items-center gap-2 mt-1">
            <ShieldCheck className="text-[#008779] w-6 h-6" /> German APS Document Vault & Expediter
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Mandatory verification for all Indian degrees before applying to German public universities or VFS visa slots.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl text-right shrink-0">
          <span className="text-xl font-black text-[#008779]">{progressPercent}%</span>
          <p className="text-[10px] font-bold text-slate-500">{completedCount} of {activeDocs.length} Verified</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 flex gap-2 overflow-x-auto text-xs">
        {[
          { id: 'masters', label: '🎓 Postgraduate / Master Applicant' },
          { id: 'bachelors', label: '🏫 12th Passed + 1-Year College' },
          { id: 'testas', label: '📝 Direct Bachelor with TestAS' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setApplicantCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition ${
              applicantCategory === cat.id 
                ? 'bg-[#0D3B43] text-white shadow-xs' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Checklist */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-sm font-extrabold text-[#0D3B43]">Mandatory Document Checklist</h3>
          <span className="text-xs font-bold text-[#008779] bg-emerald-50 px-2.5 py-0.5 rounded-md">
            Official Fee: ₹18,000 (Non-refundable)
          </span>
        </div>

        <div className="space-y-2">
          {activeDocs.map((doc) => (
            <div 
              key={doc.id}
              onClick={() => toggleDoc(doc.id)}
              className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                doc.done 
                  ? 'bg-emerald-50/40 border-emerald-200 text-slate-800' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={doc.done} 
                  onChange={() => {}} 
                  className="w-4 h-4 rounded text-emerald-600 cursor-pointer"
                />
                <div>
                  <p className={`text-xs font-bold ${doc.done ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {doc.name}
                  </p>
                  <p className="text-[10px] text-slate-400">{doc.note}</p>
                </div>
              </div>
              {doc.done && <CheckCircle size={16} className="text-emerald-600 shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* University Verification Acceleration Email Generator */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-[#0D3B43] flex items-center gap-2">
              <Mail className="text-[#008779] w-5 h-5" /> Expedite Your APS: University Registrar Email Generator
            </h3>
            <p className="text-xs text-slate-500">
              Most APS delays occur because your Indian university fails to reply to the embassy's verification email. Send this pre-notification.
            </p>
          </div>
          <button 
            onClick={copyEmail}
            className="text-xs font-bold bg-[#008779] hover:bg-teal-700 text-white px-3 py-1.5 rounded-xl transition flex items-center gap-1 active:scale-95 shrink-0"
          >
            {emailCopied ? '✓ Copied Draft' : 'Copy Email Draft'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input 
            type="text" 
            placeholder="Your Full Name" 
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium outline-none focus:border-[#008779]"
          />
          <input 
            type="text" 
            placeholder="Your University / College Name" 
            value={universityName}
            onChange={(e) => setUniversityName(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium outline-none focus:border-[#008779]"
          />
          <input 
            type="text" 
            placeholder="Enrollment / Roll Number" 
            value={apsToken}
            onChange={(e) => setApsToken(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium outline-none focus:border-[#008779]"
          />
        </div>

        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 font-mono text-[11px] text-slate-700 whitespace-pre-wrap leading-relaxed">
          {emailDraft}
        </div>
      </div>

      {/* Courier Address & Direct Portal Link */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
          <h4 className="font-extrabold text-[#0D3B43] flex items-center gap-2">
            <Copy size={16} className="text-[#008779]" /> Official Courier Address
          </h4>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            Academic Evaluation Centre (APS India), Embassy of the Federal Republic of Germany, No. 6, Shantipath, Chanakyapuri, New Delhi - 110021
          </p>
          <button 
            onClick={copyCourierAddress}
            className="text-[10px] font-bold text-[#008779] bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200 hover:bg-teal-100 flex items-center gap-1 transition"
          >
            {copied ? '✓ Courier Address Copied!' : 'Copy Courier Address'}
          </button>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <h4 className="font-extrabold text-[#0D3B43]">Official Portal Registration</h4>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Register, submit your educational details, and complete the ₹18,000 payment via CC Avenue directly on the official German embassy site.
            </p>
          </div>
          <a 
            href="https://aps-india.de" 
            target="_blank" 
            rel="noreferrer"
            className="bg-[#0D3B43] hover:bg-[#09262C] text-white py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1 transition active:scale-95"
          >
            Open APS India Official Portal <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}