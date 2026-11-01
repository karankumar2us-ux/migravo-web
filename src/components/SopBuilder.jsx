import React, { useState } from 'react';
import { FileEdit, Copy, Check, Download, Sparkles, BookOpen, User, GraduationCap, Briefcase, Target } from 'lucide-react';

export default function SopBuilder() {
  const [docType, setDocType] = useState('sop'); // 'sop' | 'lor'
  const [targetCountry, setTargetCountry] = useState('germany');
  const [applicantName, setApplicantName] = useState('');
  const [degreeProgram, setDegreeProgram] = useState('');
  const [targetUni, setTargetUni] = useState('');
  const [undergradMajor, setUndergradMajor] = useState('');
  const [undergradCollege, setUndergradCollege] = useState('');
  const [keyProject, setKeyProject] = useState('');
  const [workExp, setWorkExp] = useState('');
  const [careerGoal, setCareerGoal] = useState('');
  const [recommenderName, setRecommenderName] = useState('');
  const [recommenderTitle, setRecommenderTitle] = useState('Professor & Head of Department');
  const [copied, setCopied] = useState(false);

  const generateSopDraft = () => {
    const name = applicantName.trim() || '[Your Full Name]';
    const target = targetUni.trim() || '[Target University]';
    const prog = degreeProgram.trim() || '[Target Master Program]';
    const ug = undergradMajor.trim() || '[Undergraduate Major]';
    const col = undergradCollege.trim() || '[Your Undergraduate University]';
    const proj = keyProject.trim() || '[Your Primary Technical Project / Thesis]';
    const exp = workExp.trim() || '[Relevant Industry Internship / Role]';
    const goal = careerGoal.trim() || '[Your Short & Long-Term Career Milestone]';

    if (docType === 'lor') {
      const rec = recommenderName.trim() || '[Recommender Full Name]';
      const title = recommenderTitle.trim() || '[Recommender Designation]';
      return `LETTER OF RECOMMENDATION

To: The Admissions Committee
${target}

Subject: Recommendation for ${name} for admission into ${prog}

Dear Members of the Admissions Committee,

It gives me immense pleasure to write this letter of recommendation on behalf of ${name}, whom I have known closely over the past four years in my capacity as ${title} at ${col}. As their professor, I have observed their analytical aptitude, problem-solving persistence, and academic dedication during their coursework in ${ug}.

Throughout their undergraduate tenure, ${name} distinguished themselves by ranking consistently among the top tier of their peer group. What sets them apart is their capacity to bridge foundational theoretical concepts with rigorous implementation. This was demonstrated during their work on "${proj}", where they showed exceptional independence in researching scientific literature, troubleshooting technical hurdles, and deriving conclusive results.

Beyond classroom excellence, ${name} has continually pursued hands-on exposure, including ${exp}. They possess exemplary technical communication, teamwork ethics, and a clear motivation for specialized research.

The curriculum of ${prog} at ${target} perfectly complements ${name}'s academic trajectory and their goal to ${goal}. I recommend ${name} for admission into your prestigious graduate program without reservation.

Sincerely,

${rec}
${title}
${col}
Email: verification@${col.toLowerCase().replace(/[^a-z]/g, '') || 'university'}.edu.in`;
    }

    // SOP Content Tailored by Country Academic Flavor
    let stylePreamble = "";
    if (targetCountry === 'germany') {
      stylePreamble = "My motivation to pursue this graduate degree at " + target + " stems directly from Germany's rigorous public university curriculum, focus on research-led engineering, and tight alignment between industrial application and laboratory exploration.";
    } else if (targetCountry === 'us') {
      stylePreamble = "My objective in applying to the " + prog + " at " + target + " is to leverage the university's cutting-edge computational labs, collaborative interdisciplinary framework, and entrepreneurial research ecosystem to accelerate my career.";
    } else if (targetCountry === 'uk') {
      stylePreamble = "The focused, intensive 1-year structure of the " + prog + " at " + target + " provides the exact specialization I require to synthesize my academic foundations and step directly into senior technical leadership.";
    } else {
      stylePreamble = "My aspiration to enroll in " + prog + " at " + target + " is anchored in the institution's distinguished faculty, state-of-the-art research infrastructure, and strong commitment to global mobility and applied science.";
    }

    return `STATEMENT OF PURPOSE

Applicant: ${name}
Program: ${prog}
Institution: ${target}

I. INTRODUCTION & ACADEMIC MOTIVATION
${stylePreamble} Having built a solid technical bedrock during my Bachelor of Technology / Science in ${ug} at ${col}, I have cultivated a structured approach toward dissecting complex challenges. I am eager to dedicate my graduate research to advancing knowledge within this domain.

II. UNDERGRADUATE FOUNDATION & TECHNICAL EXPERTISE
During my undergraduate studies at ${col}, I engaged deeply with core subjects including Algorithms, Applied Mathematics, and System Architecture. To move beyond traditional curricula, I focused heavily on project-driven investigation. My key project, "${proj}", required deep immersion into algorithmic formulation, dataset curation, and iterative testing. This practical engagement reinforced my conviction that scalable engineering requires both mathematical rigor and clean design patterns.

III. PROFESSIONAL EXPOSURE & PRACTICAL APPLICATION
Complementing my academic rigor, my experience in ${exp} exposed me to enterprise codebases, real-world constraints, and agile deployment cycles. Working within multidisciplinary squads helped me grasp how theoretical abstractions translate into customer-facing solutions, while illuminating the exact technical gaps that only graduate study can bridge.

IV. WHY ${target.toUpperCase()}?
I have selected ${target} because of its academic pedigree, curriculum flexibility, and specialized focus areas in ${prog}. The opportunity to study under esteemed faculty whose research interests align with my undergraduate foundation in ${proj} is unmatched. Furthermore, the multicultural scholarly cohort and collaborative ecosystem at ${target} offer the ideal environment for my personal and professional development.

V. CAREER TRAJECTORY & OBJECTIVE
Upon completing ${prog}, my direct plan is to ${goal}. Armed with the analytical proficiency and research discipline developed at ${target}, I intend to contribute meaningful technological advancements that solve systemic, large-scale problems.

I look forward to contributing to the academic and cultural vitality of the incoming cohort at ${target}.

Respectfully submitted,
${name}`;
  };

  const generatedText = generateSopDraft();

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${applicantName.trim().replace(/\s+/g, '_') || 'Candidate'}_${docType.toUpperCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold text-[#008779] bg-teal-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Zero-Consultancy Application Dossier
          </span>
          <h2 className="text-xl font-extrabold text-[#0D3B43] flex items-center gap-2 mt-1">
            <FileEdit className="text-[#008779] w-6 h-6" /> Anti-Consultancy SOP & LOR Draft Generator
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Generate authentic, academic-first Statements of Purpose and Letters of Recommendation without paying ₹20,000 to agents.
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 p-1.5 rounded-2xl">
          <button
            onClick={() => setDocType('sop')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              docType === 'sop' ? 'bg-[#0D3B43] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Statement of Purpose (SOP)
          </button>
          <button
            onClick={() => setDocType('lor')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              docType === 'lor' ? 'bg-[#0D3B43] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Professor LOR Draft
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Input Form */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-[#0D3B43] flex items-center gap-2">
            <User size={16} className="text-[#008779]" /> Candidate & Target Profile
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Target Country</label>
              <select
                value={targetCountry}
                onChange={(e) => setTargetCountry(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 font-semibold outline-none focus:border-[#008779]"
              >
                <option value="germany">Germany (Academic Rigor & ECTS Focus)</option>
                <option value="us">United States (Holistic & Research Lab Focus)</option>
                <option value="uk">United Kingdom (Intensive 1-Year Master Track)</option>
                <option value="canada">Canada (Applied Research & Career Integration)</option>
                <option value="australia">Australia (Graduate Capability Framework)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="e.g. Karan Kumar"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium outline-none focus:border-[#008779]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Target University</label>
                <input
                  type="text"
                  placeholder="e.g. TU Munich / UIUC"
                  value={targetUni}
                  onChange={(e) => setTargetUni(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium outline-none focus:border-[#008779]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Target Degree</label>
                <input
                  type="text"
                  placeholder="e.g. M.Sc. Data Science"
                  value={degreeProgram}
                  onChange={(e) => setDegreeProgram(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium outline-none focus:border-[#008779]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Undergrad Major</label>
                <input
                  type="text"
                  placeholder="e.g. Computer Science"
                  value={undergradMajor}
                  onChange={(e) => setUndergradMajor(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium outline-none focus:border-[#008779]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Undergrad College</label>
                <input
                  type="text"
                  placeholder="e.g. Delhi Technological Univ"
                  value={undergradCollege}
                  onChange={(e) => setUndergradCollege(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium outline-none focus:border-[#008779]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Key Project or Thesis</label>
              <input
                type="text"
                placeholder="e.g. Medical Scan Segmentation using Computer Vision"
                value={keyProject}
                onChange={(e) => setKeyProject(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium outline-none focus:border-[#008779]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Work / Internship Experience</label>
              <input
                type="text"
                placeholder="e.g. 6 months backend software engineering internship"
                value={workExp}
                onChange={(e) => setWorkExp(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium outline-none focus:border-[#008779]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Career Goal</label>
              <input
                type="text"
                placeholder="e.g. lead applied machine learning teams in robotics and autonomous systems"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium outline-none focus:border-[#008779]"
              />
            </div>

            {docType === 'lor' && (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#008779] block">Recommender Info</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Prof. Name (e.g. Dr. R. Sharma)"
                    value={recommenderName}
                    onChange={(e) => setRecommenderName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium outline-none focus:border-[#008779]"
                  />
                  <input
                    type="text"
                    placeholder="Designation (e.g. Professor & HOD)"
                    value={recommenderTitle}
                    onChange={(e) => setRecommenderTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium outline-none focus:border-[#008779]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Live Formatted Document Preview */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-sm text-[#0D3B43] flex items-center gap-2">
                <Sparkles size={16} className="text-[#008779]" /> Live Academic Draft Preview
              </h3>
              <p className="text-[11px] text-slate-400">Strictly academic, unpadded prose calibrated for admissions committees.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 transition flex items-center gap-1 active:scale-95"
              >
                {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownloadTxt}
                className="bg-[#0D3B43] hover:bg-[#09262C] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1 active:scale-95"
              >
                <Download size={13} />
                <span>Download .txt</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-slate-800 font-mono text-xs leading-relaxed whitespace-pre-wrap max-h-[520px] overflow-y-auto">
            {generatedText}
          </div>

          <div className="bg-teal-50/70 p-3 rounded-2xl border border-teal-200/60 text-[11px] text-teal-950 flex items-center justify-between">
            <span><strong>Anti-Consultancy Rule:</strong> Never copy generic templates. Customize section II with your exact coursework ECTS and code repositories.</span>
          </div>
        </div>
      </div>
    </div>
  );
}