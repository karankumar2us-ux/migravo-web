import React, { useState } from 'react';
import { 
  Compass, Award, CheckSquare, MessageSquareCode, 
  ArrowRight, ShieldCheck, ExternalLink, Sparkles, 
  Send, UserCheck, Layers, FileCheck, CheckCircle2, ChevronRight, Share2, Globe2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('pathways');
  const [budget, setBudget] = useState('mid'); // 'low' (<15L), 'mid' (15L-35L), 'high' (>35L)
  const [field, setField] = useState('STEM');
  const [ielts, setIelts] = useState('7.0');

  // Interactive Checklist State
  const [checklist, setChecklist] = useState([
    { id: 1, title: 'IELTS / PTE / TOEFL Academic Test', done: true, phase: 'Phase 1: Foundations' },
    { id: 2, title: 'Transcript Evaluation (APS for Germany / WES for Canada & US)', done: true, phase: 'Phase 1: Foundations' },
    { id: 3, title: 'Statement of Purpose (SOP) & 2-3 Letters of Recommendation (LOR)', done: false, phase: 'Phase 2: Applications' },
    { id: 4, title: 'University Admissions via Uni-Assist / UCAS / Direct Portals', done: false, phase: 'Phase 2: Applications' },
    { id: 5, title: 'Open Blocked Account (Sperrkonto €11,904) or Canada GIC ($23,448)', done: false, phase: 'Phase 3: Financial Proof' },
    { id: 6, title: 'Education Loan Sanction (SBI Global Ed-Vantage / HDFC Credila)', done: false, phase: 'Phase 3: Financial Proof' },
    { id: 7, title: 'VFS Visa Appointment & Biometrics / US Visa Interview', done: false, phase: 'Phase 4: Visa Filing' },
    { id: 8, title: 'Post-Graduation Work Permit (PGWP / 18-Mo Jobseeker / OPT)', done: false, phase: 'Phase 5: Career & PR' },
    { id: 9, title: 'Permanent Residency Filing (Canada CEC / Germany EU Blue Card)', done: false, phase: 'Phase 5: Career & PR' },
    { id: 10, title: 'OCI Card Registration (Post foreign citizenship acquisition)', done: false, phase: 'Phase 5: Career & PR' },
  ]);

  const toggleChecklist = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const completedCount = checklist.filter(c => c.done).length;
  const readinessPercent = Math.round((completedCount / checklist.length) * 100);

  // Chancenkarte Points State
  const [ckDegree, setCkDegree] = useState(true);
  const [ckGerman, setCkGerman] = useState('none');
  const [ckEnglish, setCkEnglish] = useState(true);
  const [ckExp, setCkExp] = useState('3yr');
  const [ckAge, setCkAge] = useState('under35');
  const [ckShortage, setCkShortage] = useState(true);

  const calculateChancenkartePoints = () => {
    let pts = 0;
    if (ckDegree) pts += 4;
    if (ckGerman === 'b2') pts += 3;
    else if (ckGerman === 'b1') pts += 2;
    else if (ckGerman === 'a2') pts += 1;
    if (ckEnglish) pts += 1;
    if (ckExp === '3yr') pts += 3;
    else if (ckExp === '2yr') pts += 2;
    if (ckAge === 'under35') pts += 2;
    else if (ckAge === '35to40') pts += 1;
    if (ckShortage) pts += 1;
    return pts;
  };

  const ckTotal = calculateChancenkartePoints();

  // AI Assistant Chat State
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Namaste! I am your Migravo Mobility Counselor. Ask me about €0 German tuition, STEM OPT extensions, Indian passport surrender rules, or education loan sanctions.' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const sendQuery = (text) => {
    const query = text || inputMsg;
    if (!query.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setInputMsg('');

    setTimeout(() => {
      let reply = "Our counselors recommend focusing on target PR pathways matching your qualification level.";
      const lower = query.toLowerCase();

      if (lower.includes('low budget') || lower.includes('germany') || lower.includes('sperrkonto') || lower.includes('cost')) {
        reply = "Germany is the #1 low-budget destination for Indian STEM graduates: public university tuition is €0. You only need the mandatory Sperrkonto (Blocked Account) of €11,904 (~₹10.8 Lakhs) to secure your student visa, and after graduation you get an 18-month jobseeker visa leading to PR in 21 months with B1 German.";
      } else if (lower.includes('opt') || lower.includes('stem') || lower.includes('usa') || lower.includes('h-1b')) {
        reply = "In the USA, STEM-designated degrees (CS, AI, Data, Core Engg) grant a 24-month STEM OPT extension on top of the initial 12-month OPT, giving you a full 36 months (3 years) of legal full-time work authorization to enter the H-1B lottery multiple times.";
      } else if (lower.includes('pr') || lower.includes('canada') || lower.includes('points') || lower.includes('cec')) {
        reply = "For Canada, completing a 2-year Master's degree at a designated learning institution (DLI) grants a 3-year PGWP. 1 year of Canadian skilled work experience under TEER 0, 1, 2, or 3 qualifies you for the Canadian Experience Class (CEC) stream under Express Entry.";
      } else if (lower.includes('citizenship') || lower.includes('passport') || lower.includes('oci') || lower.includes('dual')) {
        reply = "Crucial Legal Note: India does not permit dual citizenship. Once you acquire foreign citizenship, you must surrender your Indian passport under the Passports Act via the Passport Seva portal and apply for an Overseas Citizen of India (OCI) card for lifelong visa-free entry and work rights in India.";
      } else if (lower.includes('loan') || lower.includes('sbi') || lower.includes('fund')) {
        reply = "For Indian students, SBI Global Ed-Vantage offers education loans up to ₹1.5 Crores with 100% tax exemption on interest paid under Section 80E. Non-collateral options up to ₹40-50 Lakhs are available through HDFC Credila and Avanse for recognized universities.";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased pb-24">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0D3B43] to-[#008779] flex items-center justify-center shadow-md">
              <Compass className="text-[#E5A93C] w-6 h-6 transform -rotate-12" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-[#0D3B43]">
                Migra<span className="text-[#E5A93C]">vo</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                Bharat to Global Hub
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-semibold text-slate-700">Readiness: {readinessPercent}%</span>
            </div>
            <button 
              onClick={() => alert(`Your profile is ${readinessPercent}% ready. Share your score: https://migravo.in`)}
              className="bg-[#0D3B43] hover:bg-[#0E535D] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition"
            >
              <Share2 size={14} className="text-[#E5A93C]" />
              <span>Share Score</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-4 flex gap-2 border-t border-slate-100 overflow-x-auto py-2">
          {[
            { id: 'pathways', label: 'Country Pathways', icon: Globe2 },
            { id: 'chancenkarte', label: 'Germany Chancenkarte (6 Pts)', icon: Award },
            { id: 'scholarships', label: 'Indian Scholarships', icon: Layers },
            { id: 'checklist', label: 'Relocation Checklist', icon: CheckSquare },
            { id: 'advisor', label: 'AI Mobility Advisor', icon: MessageSquareCode },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  active 
                    ? 'bg-[#0D3B43] text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon size={14} className={active ? 'text-[#E5A93C]' : 'text-slate-400'} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-[#0D3B43] via-[#0E535D] to-[#008779] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-block bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#E5A93C] border border-white/20">
              ✈️ Zero-Consultancy Anti-Broker Portal
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              From Bharat to Permanent Residency: <br className="hidden sm:inline" />
              The Transparent Mobility Engine.
            </h1>
            <p className="text-slate-200 text-sm leading-relaxed">
              No hidden agency fees. Verified pathways linking <span className="font-semibold text-white">Admissions ➔ Blocked Accounts & Loans ➔ Work Visas ➔ PR & OCI</span>.
            </p>
          </div>
        </section>

        {/* TAB 1: PATHWAYS */}
        {activeTab === 'pathways' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Your Total Budget (INR)</label>
                <select 
                  value={budget} 
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl p-2.5 font-medium outline-none"
                >
                  <option value="low">Under ₹15 Lakhs (Low Budget / €0 Tuition)</option>
                  <option value="mid">₹15 Lakhs - ₹35 Lakhs (Moderate Budget)</option>
                  <option value="high">₹35 Lakhs+ (High Budget / Ivy / Tier 1)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Field of Study</label>
                <select 
                  value={field} 
                  onChange={(e) => setField(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl p-2.5 font-medium outline-none"
                >
                  <option value="STEM">STEM, AI, Computer Science & IT</option>
                  <option value="Management">Management, Finance & MBA</option>
                  <option value="Healthcare">Healthcare, Nursing & Medicine</option>
                  <option value="CoreEngg">Core Mechanical, Civil & Electrical</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">IELTS / PTE Band</label>
                <select 
                  value={ielts} 
                  onChange={(e) => setIelts(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl p-2.5 font-medium outline-none"
                >
                  <option value="6.0">6.0 - 6.5 (Standard Minimum)</option>
                  <option value="7.0">7.0 - 7.5 (Competitive / Top Tier)</option>
                  <option value="8.0">8.0+ (Maximum English PR Points)</option>
                </select>
              </div>
            </div>

            {/* Country Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Germany Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🇩🇪</span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Germany</h3>
                      <p className="text-xs text-slate-500">Public Universities = €0 Tuition</p>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-1 rounded-full">
                    94% Feasibility Match
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-500 block">Mandatory Blocked Account</span>
                    <span className="font-bold text-[#0D3B43] text-sm">€11,904 (~₹10.8 L)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Tuition Fee</span>
                    <span className="font-bold text-emerald-600 text-sm">₹0 (Free in 15 states)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Post-Study Work Visa</span>
                    <span className="font-semibold text-slate-800">18-Month Jobseeker</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Fastest PR Timeline</span>
                    <span className="font-semibold text-emerald-600">21 Months (B1 German)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <a 
                    href="https://www.make-it-in-germany.com/en/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-bold text-[#008779] hover:underline flex items-center gap-1"
                  >
                    Official Portal: Make it in Germany <ExternalLink size={12} />
                  </a>
                  <button 
                    onClick={() => setActiveTab('chancenkarte')}
                    className="text-xs bg-[#0D3B43] text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-slate-800"
                  >
                    Test Chancenkarte
                  </button>
                </div>
              </div>

              {/* Canada Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🇨🇦</span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Canada</h3>
                      <p className="text-xs text-slate-500">Designated Learning Institutions (DLI)</p>
                    </div>
                  </div>
                  <span className="bg-teal-100 text-teal-800 text-xs font-black px-2.5 py-1 rounded-full">
                    84% Match
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-500 block">Mandatory Living GIC</span>
                    <span className="font-bold text-[#0D3B43] text-sm">CAD $23,448 (~₹14.4 L)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Average Tuition</span>
                    <span className="font-semibold text-slate-800">₹14L - ₹24L / year</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Post-Grad Work Permit</span>
                    <span className="font-semibold text-slate-800">Up to 3-Year PGWP</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">PR Pathway</span>
                    <span className="font-semibold text-slate-800">Express Entry (CEC stream)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <a 
                    href="https://www.canada.ca/en/immigration-refugees-citizenship.html" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-bold text-[#008779] hover:underline flex items-center gap-1"
                  >
                    Official Portal: IRCC Canada <ExternalLink size={12} />
                  </a>
                  <span className="text-xs text-slate-400">Strict Cap in 2026</span>
                </div>
              </div>

              {/* United States Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🇺🇸</span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">United States</h3>
                      <p className="text-xs text-slate-500">Top STEM & AI Innovation Hub</p>
                    </div>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-xs font-black px-2.5 py-1 rounded-full">
                    78% Match
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-500 block">I-20 Liquid Proof</span>
                    <span className="font-bold text-[#0D3B43] text-sm">$30,000+ (~₹25 L)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Average Tuition</span>
                    <span className="font-semibold text-slate-800">₹22L - ₹45L / year</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Work Rights</span>
                    <span className="font-bold text-emerald-600">3-Year STEM OPT</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">PR Track</span>
                    <span className="font-semibold text-slate-800">H-1B ➔ EB-2 / EB-3</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <a 
                    href="https://ceac.state.gov/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-bold text-[#008779] hover:underline flex items-center gap-1"
                  >
                    Official Portal: US CEAC <ExternalLink size={12} />
                  </a>
                  <span className="text-xs text-amber-600 font-medium">H-1B Lottery Required</span>
                </div>
              </div>

              {/* Australia Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🇦🇺</span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Australia</h3>
                      <p className="text-xs text-slate-500">Points-Based Skilled Migration</p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-black px-2.5 py-1 rounded-full">
                    82% Match
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-500 block">Living Funds Proof</span>
                    <span className="font-bold text-[#0D3B43] text-sm">AUD $29,710 (~₹16.2 L)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Average Tuition</span>
                    <span className="font-semibold text-slate-800">₹18L - ₹32L / year</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Post-Study Visa</span>
                    <span className="font-semibold text-slate-800">2-4 Yrs (Subclass 485)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Permanent Residency</span>
                    <span className="font-semibold text-emerald-600">Subclass 189 / 190</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <a 
                    href="https://online.immi.gov.au/lusc/login" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-bold text-[#008779] hover:underline flex items-center gap-1"
                  >
                    Official Portal: Home Affairs ImmiAccount <ExternalLink size={12} />
                  </a>
                  <span className="text-xs text-slate-400">GS Test Mandatory</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CHANCENKARTE CALCULATOR */}
        {activeTab === 'chancenkarte' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-[#0D3B43]">Germany Opportunity Card (Chancenkarte)</h2>
                <p className="text-xs text-slate-500">Live 6-Points Eligibility Simulator for direct job migration without upfront admission</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#008779]">{ckTotal} / 6 Points</span>
                <p className={`text-xs font-bold ${ckTotal >= 6 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {ckTotal >= 6 ? '✅ Eligible for Visa Application' : '⚠️ Need at least 6 points'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                <span className="font-bold text-slate-700 block">1. Foreign Degree Recognition (+4 Pts)</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={ckDegree} onChange={(e) => setCkDegree(e.target.checked)} className="rounded text-[#008779]" />
                  <span>Indian Degree recognized via Anabin / ZAB (+4 pts)</span>
                </label>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                <span className="font-bold text-slate-700 block">2. Language Proficiency</span>
                <select value={ckGerman} onChange={(e) => setCkGerman(e.target.value)} className="w-full bg-white border border-slate-200 p-2 rounded-lg font-medium">
                  <option value="none">No German (0 pts)</option>
                  <option value="a2">German A2 (+1 pt)</option>
                  <option value="b1">German B1 (+2 pts)</option>
                  <option value="b2">German B2 (+3 pts)</option>
                </select>
                <label className="flex items-center gap-2 cursor-pointer mt-2">
                  <input type="checkbox" checked={ckEnglish} onChange={(e) => setCkEnglish(e.target.checked)} className="rounded text-[#008779]" />
                  <span>English C1 / IELTS 7.0+ (+1 pt)</span>
                </label>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                <span className="font-bold text-slate-700 block">3. Professional Experience</span>
                <select value={ckExp} onChange={(e) => setCkExp(e.target.value)} className="w-full bg-white border border-slate-200 p-2 rounded-lg font-medium">
                  <option value="none">Less than 2 years (0 pts)</option>
                  <option value="2yr">2 years within last 5 years (+2 pts)</option>
                  <option value="3yr">3+ years within last 7 years (+3 pts)</option>
                </select>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                <span className="font-bold text-slate-700 block">4. Age & Shortage Occupation</span>
                <select value={ckAge} onChange={(e) => setCkAge(e.target.value)} className="w-full bg-white border border-slate-200 p-2 rounded-lg font-medium">
                  <option value="under35">Under 35 years old (+2 pts)</option>
                  <option value="35to40">35 to 40 years old (+1 pt)</option>
                  <option value="over40">Over 40 years old (0 pts)</option>
                </select>
                <label className="flex items-center gap-2 cursor-pointer mt-2">
                  <input type="checkbox" checked={ckShortage} onChange={(e) => setCkShortage(e.target.checked)} className="rounded text-[#008779]" />
                  <span>Role in Bottleneck Profession (IT, AI, Healthcare, Core Engg) (+1 pt)</span>
                </label>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 flex items-center justify-between">
              <div>
                <p className="font-bold">Required Proof: €1,027/month living funds (~€12,324 blocked account)</p>
                <p>Allows 20 hours/week part-time work and 2-week trial jobs while seeking a full-time contract.</p>
              </div>
              <a 
                href="https://www.make-it-in-germany.com/en/visa-residence/types/opportunity-card" 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#0D3B43] text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-slate-800 whitespace-nowrap ml-4 flex items-center gap-1"
              >
                Official Chancery Guidelines <ExternalLink size={12} />
              </a>
            </div>
          </div>
        )}

        {/* TAB 3: SCHOLARSHIPS DIRECTORY */}
        {activeTab === 'scholarships' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <h2 className="text-lg font-bold text-[#0D3B43]">Government & Merit Scholarships for Indian Students</h2>
              <p className="text-xs text-slate-500">Verified links to official grant authorities</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'National Overseas Scholarship (NOS)', provider: 'Ministry of Social Justice, Govt of India', award: '100% Tuition + Living Stipend + Airfare', deadline: 'March - April Annual', link: 'https://www.dosje.gov.in/organisation/national-overseas-scholarship/' },
                { title: 'Inlaks Shivdasani Foundation', provider: 'Inlaks Foundation', award: 'Up to $100,000 for Masters (US, UK, Europe)', deadline: 'February - March', link: 'https://www.inlaksfoundation.org/' },
                { title: 'J.N. Tata Endowment Loan Scholarship', provider: 'Tata Trusts', award: '₹1 Lakh to ₹10 Lakhs + Gift Grant', deadline: 'December - March', link: 'https://www.jntataendowment.org/' },
                { title: 'Fulbright-Nehru Master’s Fellowships', provider: 'USIEF (United States - India)', award: 'Full Tuition, J-1 Visa, Stipend & Airfare', deadline: 'May Annual Cycle', link: 'https://www.usief.org.in/' },
                { title: 'DAAD Scholarships (Germany)', provider: 'German Academic Exchange Service', award: '€934/month living stipend + Health Insurance', deadline: 'Varies by University Program', link: 'https://www.daad.de/en/' },
                { title: 'Chevening Scholarships (UK)', provider: 'UK Foreign & Commonwealth Office', award: '100% Tuition, Monthly Allowance & Flights', deadline: 'August - November', link: 'https://www.chevening.org/' },
              ].map((s, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{s.title}</h3>
                    <p className="text-xs text-slate-500">{s.provider}</p>
                    <div className="mt-2 bg-emerald-50 text-emerald-800 text-xs font-semibold p-2 rounded-lg">
                      {s.award}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-400">Deadline: {s.deadline}</span>
                    <a 
                      href={s.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-[#008779] font-bold hover:underline flex items-center gap-1"
                    >
                      Apply on Portal <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RELOCATION CHECKLIST */}
        {activeTab === 'checklist' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-[#0D3B43]">End-to-End Relocation Checklist</h2>
                <p className="text-xs text-slate-500">Track your progress from Indian tests to Foreign Permanent Residency & OCI</p>
              </div>
              <span className="text-sm font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-700">
                {completedCount} / {checklist.length} Complete ({readinessPercent}%)
              </span>
            </div>

            <div className="space-y-2">
              {checklist.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => toggleChecklist(item.id)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    item.done 
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-800' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={item.done} 
                      onChange={() => {}} 
                      className="w-4 h-4 rounded text-emerald-600 cursor-pointer"
                    />
                    <div>
                      <p className={`text-xs font-bold ${item.done ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {item.title}
                      </p>
                      <span className="text-[10px] text-slate-400 font-medium">{item.phase}</span>
                    </div>
                  </div>
                  {item.done && <CheckCircle2 size={16} className="text-emerald-600" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: AI MOBILITY ADVISOR */}
        {activeTab === 'advisor' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[520px]">
            <div className="bg-[#0D3B43] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#E5A93C]" />
                <h3 className="font-bold text-sm">Migravo AI Mobility Counselor</h3>
              </div>
              <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded text-emerald-300">Live Indian Assistant</span>
            </div>

            {/* Prompt Quick Chips */}
            <div className="p-2 bg-slate-50 border-b border-slate-100 flex gap-2 overflow-x-auto text-xs">
              <button onClick={() => sendQuery("How to get PR in Germany in 21 months?")} className="bg-white px-2.5 py-1 rounded-full border border-slate-200 hover:border-teal-500 whitespace-nowrap">
                🇩🇪 German 21-Mo PR
              </button>
              <button onClick={() => sendQuery("What are the 3-year STEM OPT rules in USA?")} className="bg-white px-2.5 py-1 rounded-full border border-slate-200 hover:border-teal-500 whitespace-nowrap">
                🇺🇸 US 3-Yr STEM OPT
              </button>
              <button onClick={() => sendQuery("What happens to my Indian passport when I get foreign citizenship?")} className="bg-white px-2.5 py-1 rounded-full border border-slate-200 hover:border-teal-500 whitespace-nowrap">
                🇮🇳 OCI & Passport Surrender
              </button>
              <button onClick={() => sendQuery("Can I study abroad under 15 Lakhs budget?")} className="bg-white px-2.5 py-1 rounded-full border border-slate-200 hover:border-teal-500 whitespace-nowrap">
                💰 Under ₹15L Options
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user' 
                      ? 'bg-[#0D3B43] text-white rounded-br-none' 
                      : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Box */}
            <div className="p-3 border-t border-slate-200 flex items-center gap-2 bg-white">
              <input 
                type="text" 
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendQuery()}
                placeholder="Ask about PR points, blocked accounts, education loans, or visa rules..." 
                className="flex-1 bg-slate-50 border border-slate-200 text-xs rounded-xl p-2.5 outline-none focus:border-teal-500"
              />
              <button 
                onClick={() => sendQuery()}
                className="bg-[#008779] hover:bg-teal-700 text-white p-2.5 rounded-xl transition shadow-sm"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 pt-10 text-center text-xs text-slate-400 space-y-2">
        <p>© 2026 Migravo Mobility Hub. From Bharat to the World.</p>
        <p className="text-[11px]">
          Official Reference Portals: <a href="https://passportindia.gov.in" target="_blank" rel="noreferrer" className="underline hover:text-slate-600">Passport Seva</a> • <a href="https://ociservices.gov.in" target="_blank" rel="noreferrer" className="underline hover:text-slate-600">OCI Services</a> • <a href="https://emigrate.gov.in" target="_blank" rel="noreferrer" className="underline hover:text-slate-600">eMigrate India</a>
        </p>
      </footer>
    </div>
  );
}