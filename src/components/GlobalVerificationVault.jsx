import React, { useState } from 'react';
import { 
  ShieldCheck, ExternalLink, AlertTriangle, CheckCircle, 
  Copy, Mail, Globe2, FileText, CheckSquare
} from 'lucide-react';

const COUNTRY_VERIFICATIONS = {
  germany: {
    title: 'Germany APS Certificate',
    authority: 'Academic Evaluation Centre (APS India)',
    fee: '₹18,000 (Non-refundable)',
    timeline: '3 to 6 Weeks',
    portalUrl: 'https://aps-india.de',
    portalName: 'APS India Official Portal',
    mandatoryFor: 'All Indian bachelor/master applicants applying for German public universities and VFS visa slots.',
    officeAddress: 'Academic Evaluation Centre (APS India), German Embassy, No. 6, Shantipath, Chanakyapuri, New Delhi - 110021',
    docs: [
      { id: 'de1', name: 'Aadhaar Card (Linked with active mobile & DigiLocker)', required: true, done: true },
      { id: 'de2', name: 'Valid Indian Passport (Front and Back color scan)', required: true, done: true },
      { id: 'de3', name: 'Class 10th & 12th Certificates & Marksheets', required: true, done: true },
      { id: 'de4', name: 'Consolidated Semester Transcripts (Registrar stamped)', required: true, done: false },
      { id: 'de5', name: 'Bachelor Degree Certificate or Provisional (PDC)', required: true, done: false },
      { id: 'de6', name: 'College Student Portal Login Credentials or Professor Email', required: true, done: false },
    ]
  },
  usa_canada: {
    title: 'USA & Canada WES / NACES Evaluation',
    authority: 'World Education Services (WES) / NACES Members',
    fee: 'CAD $220 - $250 / USD $175 (Course-by-Course)',
    timeline: '7 to 15 Business Days post document delivery',
    portalUrl: 'https://www.wes.org',
    portalName: 'WES Credential Portal',
    mandatoryFor: 'US/Canadian graduate admissions, university equivalency GPA (4.0 scale), and Express Entry (ECA).',
    officeAddress: 'WES Reference Number generated online; transcripts sent via university electronic exchange.',
    docs: [
      { id: 'wes1', name: 'Official University Transcripts sent directly by university registrar', required: true, done: true },
      { id: 'wes2', name: 'Clear legible copy of Degree Certificate', required: true, done: true },
      { id: 'wes3', name: 'WES Reference Number placed on all communications', required: true, done: false },
      { id: 'wes4', name: 'Electronic Transcript Portal link (TrueCopy/ETX/DigiLocker)', required: true, done: false },
    ]
  },
  uk: {
    title: 'UK ENIC Statement of Comparability',
    authority: 'UK National Information Centre (UK ENIC / Ecctis)',
    fee: '£49.50 + VAT (Fast track options available)',
    timeline: '10 to 15 Business Days',
    portalUrl: 'https://www.enic.org.uk',
    portalName: 'UK ENIC Official Portal',
    mandatoryFor: 'Confirms how Indian 3-year or 4-year undergraduate degrees compare to UK bachelor/master standards.',
    officeAddress: 'Ecctis Ltd, Suffolks, Cheltenham, Gloucestershire, GL50 2ED, UK',
    docs: [
      { id: 'uk1', name: 'Final Degree Certificate scan (Color PDF)', required: true, done: true },
      { id: 'uk2', name: 'Consolidated Academic Transcripts covering all academic years', required: true, done: false },
      { id: 'uk3', name: 'Certified English translation (if originals in regional script)', required: false, done: false },
    ]
  },
  australia: {
    title: 'Australia VETASSESS & Engineers Australia',
    authority: 'VETASSESS / Engineers Australia (MSA CDR)',
    fee: 'AUD $300 - $900 (Depends on migration vs student track)',
    timeline: '4 to 8 Weeks',
    portalUrl: 'https://www.vetassess.com.au',
    portalName: 'VETASSESS Australia Portal',
    mandatoryFor: 'Skill assessments for Subclass 189/190 PR tracks and university credit transfer exemptions.',
    officeAddress: 'Online portal upload with certified true color notary copies.',
    docs: [
      { id: 'au1', name: 'Color Passport & Primary Photo ID Proof', required: true, done: true },
      { id: 'au2', name: 'Full Semester Marksheets & Degree Certificate', required: true, done: true },
      { id: 'au3', name: 'Course Syllabus / Curriculum outline for credit exemptions', required: false, done: false },
      { id: 'au4', name: 'Competency Demonstration Report (CDR) for engineers', required: false, done: false },
    ]
  },
  ireland_eu: {
    title: 'Ireland & EU NARIC Recognition',
    authority: 'Quality and Qualifications Ireland (QQI / NARIC Ireland)',
    fee: 'Free Search / €0 (Direct Institutional Verification)',
    timeline: 'Instant database lookup / 2 weeks for formal review',
    portalUrl: 'https://www.naricireland.ie',
    portalName: 'NARIC Ireland Foreign Qualifications Guide',
    mandatoryFor: 'Determines NFQ (National Framework of Qualifications) level for Irish third-level master programs.',
    officeAddress: 'QQI, 26-27 Denzille Lane, Dublin 2, Ireland',
    docs: [
      { id: 'ie1', name: 'Bachelors Degree Certificate with apostille or verified transcript', required: true, done: true },
      { id: 'ie2', name: 'Consolidated Marksheets listing total credits/hours completed', required: true, done: false },
      { id: 'ie3', name: 'English Medium of Instruction (MOI) Certificate from Indian College', required: true, done: false },
    ]
  }
};

export default function GlobalVerificationVault() {
  const [activeCountry, setActiveCountry] = useState('germany');
  const [docStates, setDocStates] = useState({});
  const [studentName, setStudentName] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [copiedDraft, setCopiedDraft] = useState(false);

  const current = COUNTRY_VERIFICATIONS[activeCountry];

  const isDocDone = (docId, defaultVal) => {
    return docStates[docId] !== undefined ? docStates[docId] : defaultVal;
  };

  const toggleDoc = (docId, defaultVal) => {
    setDocStates(prev => ({
      ...prev,
      [docId]: !isDocDone(docId, defaultVal)
    }));
  };

  const completed = current.docs.filter(d => isDocDone(d.id, d.done)).length;
  const progress = Math.round((completed / current.docs.length) * 100);

  const emailDraft = `Subject: URGENT: Academic Verification Inquiry - ${studentName || '[Student Name]'} (Roll: ${rollNumber || '[Roll No]'})

Respected Registrar / Controller of Examinations,

I am an alumnus of ${universityName || '[Your Indian University/College]'} and have filed for higher studies and global mobility credentials.

The international credential verification body (${current.authority}) requires direct verification of my academic transcripts and degree certificate. 

Kindly ensure that any verification request received from their official verification domain is confirmed promptly by your department.

Student Details:
- Name: ${studentName || '[Student Name]'}
- Roll / Enrollment Number: ${rollNumber || '[Roll Number]'}
- Awarded Qualification: Bachelor of Engineering / Technology / Science

Thank you for your cooperation.

Sincerely,
${studentName || '[Your Name]'}`;

  const copyEmail = () => {
    navigator.clipboard.writeText(emailDraft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold text-[#008779] bg-teal-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            All-Country Academic Equivalency
          </span>
          <h2 className="text-xl font-extrabold text-[#0D3B43] flex items-center gap-2 mt-1">
            <ShieldCheck className="text-[#008779] w-6 h-6" /> Global Credential & APS Verification Vault
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Official degree evaluation checklists across Germany (APS), USA/Canada (WES), UK (ENIC), Australia & EU.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl text-right shrink-0">
          <span className="text-xl font-black text-[#008779]">{progress}%</span>
          <p className="text-[10px] font-bold text-slate-500">{completed} of {current.docs.length} Docs Ready</p>
        </div>
      </div>

      {/* Country Tabs */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 flex gap-2 overflow-x-auto no-scrollbar text-xs">
        {[
          { id: 'germany', label: '🇩🇪 Germany (APS India)' },
          { id: 'usa_canada', label: '🇺🇸 / 🇨🇦 USA & Canada (WES / NACES)' },
          { id: 'uk', label: '🇬🇧 UK (ENIC / Ecctis)' },
          { id: 'australia', label: '🇦🇺 Australia (VETASSESS)' },
          { id: 'ireland_eu', label: '🇮🇪 / 🇪🇺 Ireland & EU (NARIC)' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveCountry(tab.id)}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition ${
              activeCountry === tab.id
                ? 'bg-[#0D3B43] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 border border-slate-200/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Body Overview Card */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
          <div>
            <h3 className="text-base font-extrabold text-[#0D3B43]">{current.title}</h3>
            <p className="text-xs text-slate-500">{current.mandatoryFor}</p>
          </div>
          <div className="flex gap-2">
            <span className="text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl">
              Fee: {current.fee}
            </span>
            <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-xl">
              Time: {current.timeline}
            </span>
          </div>
        </div>

        {/* Dynamic Checklist */}
        <div className="space-y-2">
          {current.docs.map(doc => {
            const done = isDocDone(doc.id, doc.done);
            return (
              <div 
                key={doc.id}
                onClick={() => toggleDoc(doc.id, doc.done)}
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
                    {doc.name}
                  </p>
                </div>
                {done && <CheckCircle size={16} className="text-emerald-600 shrink-0" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* University Fast-Track Email Dispatcher */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-[#0D3B43] flex items-center gap-2">
              <Mail className="text-[#008779] w-5 h-5" /> Expedite Verification: Registrar Pre-Notification Email
            </h3>
            <p className="text-xs text-slate-500">
              Foreign evaluators require direct verification from your Indian college. Send this draft to ensure prompt responses.
            </p>
          </div>
          <button 
            onClick={copyEmail}
            className="text-xs font-bold bg-[#008779] hover:bg-teal-700 text-white px-3 py-1.5 rounded-xl transition flex items-center gap-1 active:scale-95 shrink-0"
          >
            {copiedDraft ? '✓ Copied Draft' : 'Copy Email Draft'}
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
            placeholder="College / University Name"
            value={universityName}
            onChange={(e) => setUniversityName(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium outline-none focus:border-[#008779]"
          />
          <input 
            type="text" 
            placeholder="Enrollment / Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium outline-none focus:border-[#008779]"
          />
        </div>

        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 font-mono text-[11px] text-slate-700 whitespace-pre-wrap leading-relaxed">
          {emailDraft}
        </div>
      </div>

      {/* Official Evaluation Portals */}
      <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <p className="font-bold text-slate-800">Ready to file for {current.title}?</p>
          <p className="text-slate-500 text-[11px]">Proceed on the official government-authorized verification portal without third-party agency markups.</p>
        </div>
        <a 
          href={current.portalUrl} 
          target="_blank" 
          rel="noreferrer"
          className="bg-[#0D3B43] hover:bg-[#09262C] text-white px-4 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shrink-0"
        >
          {current.portalName} <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}