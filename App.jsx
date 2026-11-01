import React, { useState } from 'react';
import { 
  Compass, Award, CheckSquare, MessageSquareCode, 
  ExternalLink, Sparkles, Send, Layers, CheckCircle2, 
  Share2, Globe2, X, Landmark, ArrowUpRight,
  Zap
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('pathways');
  const [budget, setBudget] = useState('mid');
  const [field, setField] = useState('STEM');
  const [ielts, setIelts] = useState('7.0');
  const [userName, setUserName] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  // Relocation Roadmap
  const [checklist, setChecklist] = useState([
    { id: 1, title: 'IELTS / PTE / Academic Language Test', done: true, phase: 'Stage 1' },
    { id: 2, title: 'Document & Degree Evaluation (APS / WES)', done: true, phase: 'Stage 1' },
    { id: 3, title: 'SOP & 2 Academic Recommendations', done: false, phase: 'Stage 2' },
    { id: 4, title: 'University Admissions Filing', done: false, phase: 'Stage 2' },
    { id: 5, title: 'Blocked Account (€11,904) / Canada GIC', done: false, phase: 'Stage 3' },
    { id: 6, title: 'Education Loan Sanction Letter', done: false, phase: 'Stage 3' },
    { id: 7, title: 'VFS Visa Appointment & Biometrics', done: false, phase: 'Stage 4' },
    { id: 8, title: 'Post-Graduation Work Permit (OPT/PGWP)', done: false, phase: 'Stage 5' },
    { id: 9, title: 'Permanent Residency Application', done: false, phase: 'Stage 5' },
    { id: 10, title: 'OCI Card Registration (Post Foreign Passport)', done: false, phase: 'Stage 5' },
  ]);

  const toggleChecklist = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const completedCount = checklist.filter(c => c.done).length;
  const readinessPercent = Math.round((completedCount / checklist.length) * 100);

  // Chancenkarte State
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

  // AI Counselor
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Namaste! I am your Migravo counselor. Ask me anything about €0 German university tuition, US 36-month STEM OPT, loan sanctions, or passport surrender rules.' }
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
        reply = "In the USA, STEM-designated degrees grant a 24-month STEM OPT extension on top of the initial 12-month OPT, giving you 36 months (3 years) of legal full-time work authorization to enter the H-1B lottery multiple times.";
      } else if (lower.includes('pr') || lower.includes('canada') || lower.includes('points') || lower.includes('cec')) {
        reply = "For Canada, completing a 2-year Master's degree at a designated learning institution (DLI) grants a 3-year PGWP. 1 year of Canadian skilled work experience qualifies you for the Canadian Experience Class (CEC) stream under Express Entry.";
      } else if (lower.includes('citizenship') || lower.includes('passport') || lower.includes('oci') || lower.includes('dual')) {
        reply = "Crucial Legal Note: India does not permit dual citizenship. Once you acquire foreign citizenship, you must surrender your Indian passport under the Passports Act via the Passport Seva portal and apply for an Overseas Citizen of India (OCI) card for lifelong visa-free entry and work rights in India.";
      } else if (lower.includes('loan') || lower.includes('sbi') || lower.includes('fund')) {
        reply = "For Indian students, SBI Global Ed-Vantage offers education loans up to ₹1.5 Crores with 100% tax exemption on interest paid under Section 80E. Non-collateral options up to ₹40-50 Lakhs are available through HDFC Credila and Avanse for recognized universities.";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 400);
  };

  const handleWhatsAppShare = () => {
    const candidateName = userName.trim() ? `${userName.trim()}'s` : "My";
    const text = encodeURIComponent(
      `✈️ ${candidateName} Global Mobility Evaluation on Migravo:\n🎯 Readiness Score: ${readinessPercent}%\n🇩🇪 Germany Chancenkarte: ${ckTotal}/6 Points\n💰 Budget Tier: ${budget === 'low' ? '< ₹15L' : budget === 'mid' ? '₹15L-₹35L' : '₹35L+'}\n\nCheck your score without consultant fees: https://migravo-web.vercel.app`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-slate-900 font-sans antialiased pb-24 selection:bg-[#008779] selection:text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0D3B43] to-[#008779] flex items-center justify-center shadow-md shadow-[#008779]/20">
              <Compass className="text-[#E5A93C] w-5 h-5 -rotate-12" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-[#0D3B43]">
                Migra<span className="text-[#008779]">vo</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase bg-slate-100 px-2 py-0.5 rounded-md">
                Anti-Broker
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Readiness: {readinessPercent}%
            </div>
            <button 
              onClick={() => setShowShareModal(true)}
              className="bg-[#0D3B43] hover:bg-[#09262C] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-sm transition active:scale-95"
            >
              <Share2 size={13} className="text-[#E5A93C]" />
              <span>Get Badge</span>
            </button>
          </div>
        </div>

        {/* Scrollable Navigation Pill Bar */}
        <div className="max-w-6xl mx-auto px-4 flex gap-1.5 overflow-x-auto py-2.5 no-scrollbar border-t border-slate-100">
          {[
            { id: 'pathways', label: 'Country Pathways', icon: Globe2 },
            { id: 'chancenkarte', label: 'Germany Chancenkarte (6 Pts)', icon: Award },
            { id: 'scholarships', label: 'Govt Scholarships', icon: Layers },
            { id: 'checklist', label: 'Relocation Roadmap', icon: CheckSquare },
            { id: 'advisor', label: 'AI Advisor', icon: MessageSquareCode },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  active 
                    ? 'bg-[#0D3B43] text-white shadow-md shadow-[#0D3B43]/20 scale-[1.02]' 
                    : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                <Icon size={14} className={active ? 'text-[#E5A93C]' : 'text-slate-400'} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-[#0D3B43] via-[#0E535D] to-[#008779] text-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-[#0D3B43]/15 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#E5A93C] border border-white/15">
              <Zap size={13} /> 100% Zero-Consultancy Transparency
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
              From Bharat to Permanent Residency.
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              Skip greedy consultancies. Verified step-by-step pathways linking <span className="font-bold text-white underline decoration-[#E5A93C] underline-offset-4">Admissions, Blocked Accounts, Work Visas & Permanent Residency</span>.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center space-y-3 shrink-0 shadow-inner">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-teal-200 font-bold">Your Relocation Index</p>
              <p className="text-4xl font-black text-[#E5A93C]">{readinessPercent}%</p>
              <p className="text-[11px] text-teal-100">{completedCount} of 10 milestones completed</p>
            </div>
            <button 
              onClick={() => setShowShareModal(true)}
              className="w-full bg-[#E5A93C] hover:bg-amber-400 text-slate-900 font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Share2 size={13} /> Generate Relocation Card
            </button>
          </div>
        </section>

        {/* TAB 1: PATHWAYS */}
        {activeTab === 'pathways' && (
          <div className="space-y-6">
            {/* Interactive Filters */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Max Budget (INR)</label>
                <select 
                  value={budget} 
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200 text-slate-800 text-xs rounded-xl p-2.5 font-semibold outline-none transition cursor-pointer"
                >
                  <option value="low">Under ₹15 Lakhs (Low Budget / €0 Tuition)</option>
                  <option value="mid">₹15 Lakhs - ₹35 Lakhs (Standard Budget)</option>
                  <option value="high">₹35 Lakhs+ (High Budget / Tier 1)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Field of Study</label>
                <select 
                  value={field} 
                  onChange={(e) => setField(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200 text-slate-800 text-xs rounded-xl p-2.5 font-semibold outline-none transition cursor-pointer"
                >
                  <option value="STEM">STEM, AI, Computer Science & IT</option>
                  <option value="Management">Management, Finance & MBA</option>
                  <option value="Healthcare">Healthcare & Nursing</option>
                  <option value="CoreEngg">Core Mechanical & Electrical</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">IELTS / PTE Band</label>
                <select 
                  value={ielts} 
                  onChange={(e) => setIelts(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200 text-slate-800 text-xs rounded-xl p-2.5 font-semibold outline-none transition cursor-pointer"
                >
                  <option value="6.0">6.0 - 6.5 (Standard Minimum)</option>
                  <option value="7.0">7.0 - 7.5 (Competitive / Top Tier)</option>
                  <option value="8.0">8.0+ (Maximum PR English Points)</option>
                </select>
              </div>
            </div>

            {/* Country Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Germany */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="https://flagcdn.com/w40/de.png" alt="Germany Flag" className="w-8 h-5 rounded shadow-xs object-cover" />
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">Germany</h3>
                      <p className="text-xs text-slate-500 font-medium">Public Universities = €0 Tuition</p>
                    </div>
                  </div>
                  <span className="bg-emerald-100/80 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-200/50">
                    94% Feasibility Match
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 bg-slate-50/80 p-3.5 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium block">Sperrkonto (Living Proof)</span>
                    <span className="font-bold text-[#0D3B43] text-sm">€11,904 (~₹10.8 L)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium block">Tuition Fee</span>
                    <span className="font-bold text-emerald-600 text-sm">₹0 (Free in 15 states)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium block">Post-Study Visa</span>
                    <span className="font-semibold text-slate-800">18-Month Jobseeker</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium block">Fastest PR Route</span>
                    <span className="font-semibold text-emerald-600">21 Months (B1 German)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <a 
                    href="https://www.make-it-in-germany.com/en/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-bold text-[#008779] hover:underline flex items-center gap-1"
                  >
                    Make it in Germany <ExternalLink size={12} />
                  </a>
                  <button 
                    onClick={() => setActiveTab('chancenkarte')}
                    className="text-xs bg-[#0D3B43] hover:bg-[#09262C] text-white px-3 py-1.5 rounded-lg font-bold transition active:scale-95"
                  >
                    Test Chancenkarte
                  </button>
                </div>
              </div>

              {/* Canada */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="https://flagcdn.com/w40/ca.png" alt="Canada Flag" className="w-8 h-5 rounded shadow-xs object-cover" />
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">Canada</h3>
                      <p className="text-xs text-slate-500 font-medium">Designated Learning Institutions</p>
                    </div>
                  </div>
                  <span className="bg-teal-100/80 text-teal-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-teal-200/50">
                    84% Match
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 bg-slate-50/80 p-3.5 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium block">Living GIC</span>
                    <span className="font-bold text-[#0D3B43] text-sm">CAD $23,448 (~₹14.4 L)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium block">Average Tuition</span>
                    <span className="font-semibold text-slate-800">₹14L - ₹24L / year</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium block">Post-Study Visa</span>
                    <span className="font-semibold text-slate-800">Up to 3-Year PGWP</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium block">PR Stream</span>
                    <span className="font-semibold text-slate-800">Express Entry (CEC)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <a 
                    href="https://www.canada.ca/en/immigration-refugees-citizenship.html" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-bold text-[#008779] hover:underline flex items-center gap-1"
                  >
                    IRCC Official Portal <ExternalLink size={12} />
                  </a>
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Cap Applied</span>
                </div>
              </div>

              {/* USA */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="https://flagcdn.com/w40/us.png" alt="USA Flag" className="w-8 h-5 rounded shadow-xs object-cover" />
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">United States</h3>
                      <p className="text-xs text-slate-500 font-medium">STEM, Tech & AI Hub</p>
                    </div>
                  </div>
                  <span className="bg-amber-100/80 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-200/50">
                    78% Match
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 bg-slate-50/80 p-3.5 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium block">I-20 Proof</span>
                    <span className="font-bold text-[#0D3B43] text-sm">$30,000+ (~₹25 L)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium block">Average Tuition</span>
                    <span className="font-semibold text-slate-800">₹22L - ₹45L / year</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium block">Work Authorization</span>
                    <span className="font-bold text-emerald-600">3-Year STEM OPT</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium block">Career Track</span>
                    <span className="font-semibold text-slate-800">H-1B ➔ EB-2/EB-3</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <a 
                    href="https://ceac.state.gov/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-bold text-[#008779] hover:underline flex items-center gap-1"
                  >
                    US CEAC Portal <ExternalLink size={12} />
                  </a>
                  <span className="text-[11px] text-slate-400">Lottery-based H-1B</span>
                </div>
              </div>

              {/* Australia */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="https://flagcdn.com/w40/au.png" alt="Australia Flag" className="w-8 h-5 rounded shadow-xs object-cover" />
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">Australia</h3>
                      <p className="text-xs text-slate-500 font-medium">Points-Based Skilled System</p>
                    </div>
                  </div>
                  <span className="bg-blue-100/80 text-blue-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-blue-200/50">
                    82% Match
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 bg-slate-50/80 p-3.5 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium block">Living Funds Proof</span>
                    <span className="font-bold text-[#0D3B43] text-sm">AUD $29,710 (~₹16.2 L)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium block">Average Tuition</span>
                    <span className="font-semibold text-slate-800">₹18L - ₹32L / year</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium block">Post-Study Visa</span>
                    <span className="font-semibold text-slate-800">2-4 Yrs (Subclass 485)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium block">Permanent Residency</span>
                    <span className="font-semibold text-emerald-600">Subclass 189 / 190</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <a 
                    href="https://online.immi.gov.au/lusc/login" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-bold text-[#008779] hover:underline flex items-center gap-1"
                  >
                    ImmiAccount Portal <ExternalLink size={12} />
                  </a>
                  <span className="text-[11px] text-slate-400">Genuine Student Test</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CHANCENKARTE SIMULATOR */}
        {activeTab === 'chancenkarte' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-5 gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#0D3B43]">Germany Opportunity Card (Chancenkarte)</h2>
                <p className="text-xs text-slate-500 font-medium">Official 6-Points Live Calculator — Migrate without university admission</p>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-2xl text-right sm:text-right shrink-0">
                <span className="text-2xl font-black text-[#008779]">{ckTotal} / 6</span>
                <p className={`text-[11px] font-bold ${ckTotal >= 6 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {ckTotal >= 6 ? '✅ Eligible for Visa Application' : '⚠️ Need at least 6 points'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/60 space-y-2">
                <span className="font-bold text-slate-800 block">1. Foreign Degree Recognition (+4 Pts)</span>
                <label className="flex items-center gap-2.5 cursor-pointer bg-white p-2.5 rounded-xl border border-slate-200/70 hover:border-[#008779] transition">
                  <input type="checkbox" checked={ckDegree} onChange={(e) => setCkDegree(e.target.checked)} className="w-4 h-4 rounded text-[#008779]" />
                  <span className="font-medium text-slate-700">Indian Degree recognized via Anabin / ZAB (+4 pts)</span>
                </label>
              </div>

              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/60 space-y-2">
                <span className="font-bold text-slate-800 block">2. Language Proficiency</span>
                <select value={ckGerman} onChange={(e) => setCkGerman(e.target.value)} className="w-full bg-white border border-slate-200/70 p-2.5 rounded-xl font-semibold outline-none">
                  <option value="none">No German (0 pts)</option>
                  <option value="a2">German A2 (+1 pt)</option>
                  <option value="b1">German B1 (+2 pts)</option>
                  <option value="b2">German B2 (+3 pts)</option>
                </select>
                <label className="flex items-center gap-2.5 cursor-pointer bg-white p-2.5 rounded-xl border border-slate-200/70 hover:border-[#008779] transition mt-2">
                  <input type="checkbox" checked={ckEnglish} onChange={(e) => setCkEnglish(e.target.checked)} className="w-4 h-4 rounded text-[#008779]" />
                  <span className="font-medium text-slate-700">English C1 / IELTS 7.0+ (+1 pt)</span>
                </label>
              </div>

              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/60 space-y-2">
                <span className="font-bold text-slate-800 block">3. Professional Experience</span>
                <select value={ckExp} onChange={(e) => setCkExp(e.target.value)} className="w-full bg-white border border-slate-200/70 p-2.5 rounded-xl font-semibold outline-none">
                  <option value="none">Less than 2 years (0 pts)</option>
                  <option value="2yr">2 years within last 5 years (+2 pts)</option>
                  <option value="3yr">3+ years within last 7 years (+3 pts)</option>
                </select>
              </div>

              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/60 space-y-2">
                <span className="font-bold text-slate-800 block">4. Age & Shortage Occupation</span>
                <select value={ckAge} onChange={(e) => setCkAge(e.target.value)} className="w-full bg-white border border-slate-200/70 p-2.5 rounded-xl font-semibold outline-none">
                  <option value="under35">Under 35 years old (+2 pts)</option>
                  <option value="35to40">35 to 40 years old (+1 pt)</option>
                  <option value="over40">Over 40 years old (0 pts)</option>
                </select>
                <label className="flex items-center gap-2.5 cursor-pointer bg-white p-2.5 rounded-xl border border-slate-200/70 hover:border-[#008779] transition mt-2">
                  <input type="checkbox" checked={ckShortage} onChange={(e) => setCkShortage(e.target.checked)} className="w-4 h-4 rounded text-[#008779]" />
                  <span className="font-medium text-slate-700">Role in Shortage Profession (IT, Engg, Medical) (+1 pt)</span>
                </label>
              </div>
            </div>

            <div className="bg-amber-50/80 border border-amber-200/80 p-4 rounded-2xl text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-bold">Mandatory Proof: €1,027/month living funds (~€12,324 blocked account)</p>
                <p className="text-amber-800/80">Grants 20 hours/week part-time work rights and 2-week trial jobs while interviewing.</p>
              </div>
              <a 
                href="https://www.make-it-in-germany.com/en/visa-residence/types/opportunity-card" 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#0D3B43] hover:bg-[#09262C] text-white px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center justify-center gap-1 transition"
              >
                Official Chancery Guidelines <ExternalLink size={12} />
              </a>
            </div>
          </div>
        )}

        {/* TAB 3: SCHOLARSHIPS */}
        {activeTab === 'scholarships' && (
          <div className="space-y-4">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm">
              <h2 className="text-base font-extrabold text-[#0D3B43]">Government & Trust Grants for Indian Students</h2>
              <p className="text-xs text-slate-500 font-medium">Direct links to official application portals without agent middlemen</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'National Overseas Scholarship (NOS)', provider: 'Govt of India (Social Justice)', award: '100% Tuition + Living Stipend + Flights', deadline: 'March - April Annual', link: 'https://www.dosje.gov.in/organisation/national-overseas-scholarship/' },
                { title: 'Inlaks Shivdasani Foundation', provider: 'Inlaks Foundation', award: 'Up to $100,000 for Masters (US, UK, Europe)', deadline: 'February - March', link: 'https://www.inlaksfoundation.org/' },
                { title: 'J.N. Tata Endowment Loan Scholarship', provider: 'Tata Trusts', award: '₹1 Lakh to ₹10 Lakhs + Gift Grant', deadline: 'December - March', link: 'https://www.jntataendowment.org/' },
                { title: 'Fulbright-Nehru Master’s Fellowships', provider: 'USIEF (US - India)', award: 'Full Tuition, J-1 Visa, Stipend & Travel', deadline: 'May Annual Cycle', link: 'https://www.usief.org.in/' },
                { title: 'DAAD Scholarships (Germany)', provider: 'German Academic Exchange Service', award: '€934/month living stipend + Health Insurance', deadline: 'Varies by University Program', link: 'https://www.daad.de/en/' },
                { title: 'Chevening Scholarships (UK)', provider: 'UK Foreign & Commonwealth Office', award: '100% Tuition, Monthly Allowance & Flights', deadline: 'August - November', link: 'https://www.chevening.org/' },
              ].map((s, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{s.title}</h3>
                    <p className="text-xs text-slate-400 font-medium">{s.provider}</p>
                    <div className="mt-2.5 bg-emerald-50 text-emerald-800 text-xs font-semibold p-2.5 rounded-xl border border-emerald-100">
                      {s.award}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <span className="text-slate-400 font-medium">Deadline: {s.deadline}</span>
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

        {/* TAB 4: RELOCATION ROADMAP */}
        {activeTab === 'checklist' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#0D3B43]">End-to-End Relocation Roadmap</h2>
                <p className="text-xs text-slate-500 font-medium">Track your step-by-step milestones to Permanent Residency & OCI</p>
              </div>
              <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full border border-slate-200/80 shrink-0">
                {completedCount} / {checklist.length} Complete ({readinessPercent}%)
              </span>
            </div>

            <div className="space-y-2.5">
              {checklist.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => toggleChecklist(item.id)}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all duration-200 ${
                    item.done 
                      ? 'bg-emerald-50/40 border-emerald-200 text-slate-800 shadow-xs' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
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
                      <span className="text-[10px] text-slate-400 font-semibold">{item.phase}</span>
                    </div>
                  </div>
                  {item.done && <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: AI MOBILITY ADVISOR */}
        {activeTab === 'advisor' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col h-[540px]">
            <div className="bg-[#0D3B43] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#E5A93C]" />
                <h3 className="font-extrabold text-sm">Migravo AI Mobility Counselor</h3>
              </div>
              <span className="text-[11px] bg-white/10 px-2.5 py-0.5 rounded-full text-emerald-300 font-semibold border border-white/10">
                Verified Indian Assistant
              </span>
            </div>

            <div className="p-2.5 bg-slate-50/90 border-b border-slate-100 flex gap-2 overflow-x-auto no-scrollbar text-xs">
              <button onClick={() => sendQuery("How to get PR in Germany in 21 months?")} className="bg-white px-3 py-1.5 rounded-full border border-slate-200 hover:border-[#008779] whitespace-nowrap font-medium transition">
                🇩🇪 German 21-Mo PR
              </button>
              <button onClick={() => sendQuery("What are the 3-year STEM OPT rules in USA?")} className="bg-white px-3 py-1.5 rounded-full border border-slate-200 hover:border-[#008779] whitespace-nowrap font-medium transition">
                🇺🇸 US 3-Yr STEM OPT
              </button>
              <button onClick={() => sendQuery("What happens to my Indian passport when I get foreign citizenship?")} className="bg-white px-3 py-1.5 rounded-full border border-slate-200 hover:border-[#008779] whitespace-nowrap font-medium transition">
                🇮🇳 OCI & Passport Surrender
              </button>
              <button onClick={() => sendQuery("Can I study abroad under 15 Lakhs budget?")} className="bg-white px-3 py-1.5 rounded-full border border-slate-200 hover:border-[#008779] whitespace-nowrap font-medium transition">
                💰 Under ₹15L Options
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user' 
                      ? 'bg-[#0D3B43] text-white rounded-br-none shadow-xs' 
                      : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/80 shadow-xs'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-slate-200/90 flex items-center gap-2 bg-white">
              <input 
                type="text" 
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendQuery()}
                placeholder="Ask about PR rules, blocked accounts, education loans, or visa points..." 
                className="flex-1 bg-slate-50 border border-slate-200/90 text-xs rounded-xl p-2.5 outline-none focus:border-[#008779] font-medium"
              />
              <button 
                onClick={() => sendQuery()}
                className="bg-[#008779] hover:bg-teal-700 text-white p-2.5 rounded-xl transition shadow-sm active:scale-95"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        )}

      </main>

      {/* POPUP MODAL: VIRAL SCORECARD & AFFILIATE MONETIZATION */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200/90">
            <div className="bg-[#0D3B43] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="text-[#E5A93C] w-5 h-5" />
                <h3 className="font-extrabold text-sm sm:text-base">Your Migravo Relocation Card</h3>
              </div>
              <button onClick={() => setShowShareModal(false)} className="text-slate-300 hover:text-white p-1 rounded-lg">
                <X size={18} />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Enter Name for Badge</label>
                <input 
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/90 rounded-xl p-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#008779]"
                />
              </div>

              {/* The Shareable Badge Preview */}
              <div className="bg-gradient-to-br from-[#0D3B43] via-[#0E535D] to-[#008779] text-white p-5 rounded-2xl space-y-3.5 shadow-lg">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] text-[#E5A93C] uppercase tracking-wider font-extrabold">Verified Applicant Profile</span>
                    <h4 className="text-base sm:text-lg font-bold text-white truncate max-w-[200px] sm:max-w-xs">{userName.trim() || 'Global Mobility Candidate'}</h4>
                  </div>
                  <div className="bg-white/10 px-2.5 py-1 rounded-full text-[10px] font-semibold text-teal-200 border border-white/15">
                    🇮🇳 Bharat ➔ Global
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="bg-white/10 p-2.5 rounded-xl">
                    <span className="text-teal-200 block text-[10px] font-medium">Readiness Score</span>
                    <span className="text-xl font-black text-[#E5A93C]">{readinessPercent}%</span>
                  </div>
                  <div className="bg-white/10 p-2.5 rounded-xl">
                    <span className="text-teal-200 block text-[10px] font-medium">Germany Chancenkarte</span>
                    <span className="text-xl font-black text-white">{ckTotal}/6 Pts</span>
                  </div>
                  <div className="bg-white/10 p-2.5 rounded-xl">
                    <span className="text-teal-200 block text-[10px] font-medium">Target Field</span>
                    <span className="text-xs font-bold text-white">{field}</span>
                  </div>
                  <div className="bg-white/10 p-2.5 rounded-xl">
                    <span className="text-teal-200 block text-[10px] font-medium">Planned Budget</span>
                    <span className="text-xs font-bold text-white">{budget === 'low' ? '< ₹15 Lakhs' : budget === 'mid' ? '₹15L - ₹35L' : '₹35L+'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-teal-200">
                  <span>Verified via Migravo Mobility Engine</span>
                  <span className="text-[#E5A93C] font-semibold">100% Zero-Consultancy</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5">
                <button 
                  onClick={handleWhatsAppShare}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition active:scale-95"
                >
                  <Share2 size={14} /> Share on WhatsApp
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText('https://migravo-web.vercel.app');
                    alert("Website link copied to clipboard!");
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2.5 px-4 rounded-xl transition"
                >
                  Copy Link
                </button>
              </div>

              {/* Partner Funding Section */}
              <div className="border-t border-slate-100 pt-3 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Pre-Approved Official Funding Partners</span>
                
                {/* Loan Partner */}
                <div className="flex items-center justify-between p-2.5 bg-amber-50/80 rounded-xl border border-amber-200/60 text-xs">
                  <div className="flex items-center gap-2">
                    <Landmark size={15} className="text-amber-800" />
                    <div>
                      <p className="font-bold text-slate-800 text-[11px]">Check SBI & HDFC Loan Eligibility</p>
                      <p className="text-[10px] text-slate-500">Non-collateral loans up to ₹40L | 100% Tax benefit</p>
                    </div>
                  </div>
                  <a 
                    href="https://www.vidyalakshmi.co.in/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-[#0D3B43] text-white px-2.5 py-1 rounded-lg font-bold text-[10px] hover:bg-slate-800 flex items-center gap-1 transition"
                  >
                    Check <ArrowUpRight size={11} />
                  </a>
                </div>

                {/* Blocked Account Partner */}
                <div className="flex items-center justify-between p-2.5 bg-teal-50/80 rounded-xl border border-teal-200/60 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🏛️</span>
                    <div>
                      <p className="font-bold text-slate-800 text-[11px]">German Sperrkonto (€11,904)</p>
                      <p className="text-[10px] text-slate-500">Embassy-recognized partner with health insurance</p>
                    </div>
                  </div>
                  <a 
                    href="https://www.expatrio.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-[#008779] text-white px-2.5 py-1 rounded-lg font-bold text-[10px] hover:bg-teal-700 flex items-center gap-1 transition"
                  >
                    Open <ArrowUpRight size={11} />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 pt-10 text-center text-xs text-slate-400 space-y-2">
        <p className="font-medium">© 2026 Migravo Mobility Hub. From Bharat to the World.</p>
        <p className="text-[11px]">
          Official Portals: <a href="https://passportindia.gov.in" target="_blank" rel="noreferrer" className="underline hover:text-slate-600">Passport Seva</a> • <a href="https://ociservices.gov.in" target="_blank" rel="noreferrer" className="underline hover:text-slate-600">OCI Services</a> • <a href="https://emigrate.gov.in" target="_blank" rel="noreferrer" className="underline hover:text-slate-600">eMigrate India</a>
        </p>
      </footer>
    </div>
  );
}