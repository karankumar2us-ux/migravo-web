import React, { useState } from 'react';
import { ShieldCheck, FileCheck, ExternalLink, AlertTriangle, CheckCircle, Clock, Copy, Download } from 'lucide-react';

export default function ApsVault() {
  const [copied, setCopied] = useState(false);
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Aadhaar Card (Linked with active Mobile & DigiLocker)', required: true, done: true, note: 'Primary identity verification' },
    { id: 2, name: 'Valid Indian Passport (Front & Back scanned copy)', required: true, done: true, note: 'Must have at least 12 months validity' },
    { id: 3, name: 'Class 10th Marksheet & Passing Certificate', required: true, done: true, note: 'Original color scan' },
    { id: 4, name: 'Class 12th Marksheet & Passing Certificate', required: true, done: true, note: 'Original color scan' },
    { id: 5, name: 'All Semester Marksheets / Consolidated Transcript', required: true, done: false, note: 'Transcripts stamped by Registrar/Controller of Exams' },
    { id: 6, name: 'Degree Certificate or Provisional Degree Certificate (PDC)', required: true, done: false, note: 'Mandatory for Master applicants' },
    { id: 7, name: 'University Student Portal Login Credentials or Professor Email', required: true, done: false, note: 'Speeds up APS verification by 3-4 weeks' },
    { id: 8, name: 'IELTS / TOEFL / TestAS Scorecard', required: false, done: false, note: 'Language proof (IELTS minimum 6.0/6.5 recommended)' },
    { id: 9, name: 'Printed & Signed APS Application Form', required: true, done: false, note: 'Downloaded post fee payment of ₹18,000' },
  ]);

  const toggleDoc = (id) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, done: !d.done } : d));
  };

  const completed = documents.filter(d => d.done).length;
  const progress = Math.round((completed / documents.length) * 100);

  const copyApsAddress = () => {
    navigator.clipboard.writeText("Academic Evaluation Centre (APS India), Embassy of the Federal Republic of Germany, No. 6, Shantipath, Chanakyapuri, New Delhi - 110021");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold text-[#008779] bg-teal-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Germany Embassy Compliance
          </span>
          <h2 className="text-xl font-extrabold text-[#0D3B43] flex items-center gap-2 mt-1">
            <ShieldCheck className="text-[#008779] w-6 h-6" /> German APS Document Verification Vault
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Mandatory for every Indian student applying to German public universities and VFS student visa slots.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-2xl text-right shrink-0">
          <span className="text-xl font-black text-[#008779]">{progress}%</span>
          <p className="text-[10px] font-bold text-slate-500">{completed} of {documents.length} Docs Ready</p>
        </div>
      </div>

      {/* Critical Advisory Banner */}
      <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 text-xs text-amber-950">
        <AlertTriangle size={18} className="text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Standard Processing Window: 3 to 6 Weeks</p>
          <p className="text-amber-800/80 leading-relaxed">
            Apply for APS at least <strong>3 months before university admission deadlines</strong>. Without an issued digital APS certificate (PDF), neither Uni-Assist nor German universities will process Indian applications, and VFS will not grant student visa appointments.
          </p>
        </div>
      </div>

      {/* Document Checklist Vault */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-sm font-extrabold text-[#0D3B43]">Mandatory Document Verification Checklist</h3>
          <span className="text-[11px] text-slate-400 font-medium">Fee: ₹18,000 (Non-refundable)</span>
        </div>

        <div className="space-y-2">
          {documents.map((doc) => (
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

      {/* Verification Acceleration Pro-Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <h4 className="font-extrabold text-[#0D3B43] flex items-center gap-2">
            <Clock size={16} className="text-[#008779]" /> How to Expedite Verification
          </h4>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            APS verifies your degree directly with your Indian college/university. If your university uses an online result portal (e.g., AKTU, VTU, Mumbai University, Anna University), provide your student portal credentials in the designated field to avoid delays caused by postal inquiry.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <h4 className="font-extrabold text-[#0D3B43] flex items-center gap-2">
            <Copy size={16} className="text-[#008779]" /> Official APS India Office Address
          </h4>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            Academic Evaluation Centre (APS India), German Embassy, No. 6, Shantipath, Chanakyapuri, New Delhi - 110021
          </p>
          <button 
            onClick={copyApsAddress}
            className="text-[10px] font-bold text-[#008779] bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 hover:bg-teal-100 flex items-center gap-1 transition"
          >
            {copied ? '✓ Address Copied!' : 'Copy Courier Address'}
          </button>
        </div>
      </div>

      {/* Direct Link to Official Portal */}
      <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <p className="font-bold text-slate-800">Ready to file your APS verification?</p>
          <p className="text-slate-500 text-[11px]">Register and pay the ₹18,000 fee directly on the German government portal without agency markups.</p>
        </div>
        <a 
          href="https://aps-india.de" 
          target="_blank" 
          rel="noreferrer"
          className="bg-[#0D3B43] hover:bg-[#09262C] text-white px-4 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shrink-0"
        >
          Open APS India Portal <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}