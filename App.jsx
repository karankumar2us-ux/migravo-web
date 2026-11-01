import React, { useState } from 'react';
import { 
  Compass, Award, CheckSquare, 
  ExternalLink, Layers, CheckCircle2, 
  Share2, Globe2, X, Landmark, ArrowUpRight, Zap,
  GraduationCap, Search, BookOpen, Download, Printer,
  Headphones, MessageCircle, Mail, HelpCircle, PhoneCall,
  ShieldCheck, ArrowRight, DollarSign, Calendar, FileEdit
} from 'lucide-react';

import LoanCalculator from './src/components/LoanCalculator';
import GlobalVerificationVault from './src/components/GlobalVerificationVault';
import SopBuilder from './src/components/SopBuilder';
import VisaSlotTracker from './src/components/VisaSlotTracker';
import CostOfLivingMatcher from './src/components/CostOfLivingMatcher';

// Comprehensive Global Destination Database
const DESTINATIONS = [
  {
    id: 'us',
    country: 'United States',
    tag: 'Tech, STEM & AI Innovation Capital',
    flag: 'https://flagcdn.com/w40/us.png',
    tuitionRange: '$22,000 - $55,000 / yr',
    livingProof: '$15,000 - $25,000 / yr (I-20 financial capacity)',
    workPermit: '36 Months (12m OPT + 24m STEM Extension)',
    prTimeline: 'H-1B Lottery ➔ Employment-based Green Card (EB-2/EB-3)',
    workRights: '20 hrs/week on-campus during semesters',
    topFields: 'Computer Science, AI, BioTech, Data Science, MBA',
    officialPortal: 'https://studyinthestates.dhs.gov',
    portalName: 'DHS Study in the States',
    budgetTier: 'high',
    popularDisciplines: ['STEM', 'Management']
  },
  {
    id: 'de',
    country: 'Germany',
    tag: 'Industrial Powerhouse • €0 Tuition Public System',
    flag: 'https://flagcdn.com/w40/de.png',
    tuitionRange: '€0 - €3,000 / yr (Zero tuition in 15 of 16 states)',
    livingProof: '€11,904 / yr (~₹10.8L in Sperrkonto Blocked Account)',
    workPermit: '18 Months Post-Study Jobseeker Visa',
    prTimeline: '21 Months with B1 German + EU Blue Card',
    workRights: '140 full days or 280 half days per calendar year',
    topFields: 'Automotive, Mechanical, AI, Mechatronics, Data Science',
    officialPortal: 'https://www.make-it-in-germany.com',
    portalName: 'Make-it-in-Germany (Official)',
    budgetTier: 'low',
    popularDisciplines: ['STEM', 'CoreEngg']
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    tag: 'Fast 1-Year Masters & Global Financial Centre',
    flag: 'https://flagcdn.com/w40/gb.png',
    tuitionRange: '£14,000 - £28,000 / yr',
    livingProof: '£12,006 (£15,660 in London) 28-day holding rule',
    workPermit: '2 Years Graduate Route (3 Years for PhDs)',
    prTimeline: 'Skilled Worker Visa sponsorship (5 Years to ILR)',
    workRights: '20 hrs/week during term-time',
    topFields: 'FinTech, Business Analytics, Law, AI, Management',
    officialPortal: 'https://www.gov.uk/graduate-visa',
    portalName: 'GOV.UK Graduate Route',
    budgetTier: 'mid',
    popularDisciplines: ['Management', 'STEM']
  },
  {
    id: 'ca',
    country: 'Canada',
    tag: 'Direct Post-Graduation Work Permit (PGWP)',
    flag: 'https://flagcdn.com/w40/ca.png',
    tuitionRange: 'CAD $16,000 - $35,000 / yr',
    livingProof: 'CAD $23,448 / yr (~₹14.4L via GIC Account)',
    workPermit: 'Up to 3 Years Post-Graduation Work Permit (PGWP)',
    prTimeline: 'Express Entry (Canadian Experience Class & Provincial PNPs)',
    workRights: '24 hrs/week off-campus during academic terms',
    topFields: 'Cloud Architecture, Software, Health Administration, Supply Chain',
    officialPortal: 'https://www.canada.ca/en/immigration-refugees-citizenship.html',
    portalName: 'IRCC Canada Official',
    budgetTier: 'mid',
    popularDisciplines: ['STEM', 'Healthcare', 'Management']
  },
  {
    id: 'au',
    country: 'Australia',
    tag: 'High Minimum Wages & Points-Based PR Migration',
    flag: 'https://flagcdn.com/w40/au.png',
    tuitionRange: 'AUD $25,000 - $45,000 / yr',
    livingProof: 'AUD $29,710 / yr (~₹16.2L living funds capacity)',
    workPermit: '2 to 4 Years (Subclass 485 Temporary Graduate Visa)',
    prTimeline: 'General Skilled Migration (Subclass 189 / 190 / 491)',
    workRights: '48 hrs per fortnight while classes in session',
    topFields: 'Civil, Mining, Renewable Energy, Nursing, Cyber Security',
    officialPortal: 'https://immi.homeaffairs.gov.au',
    portalName: 'Home Affairs Australia',
    budgetTier: 'high',
    popularDisciplines: ['CoreEngg', 'Healthcare', 'STEM']
  },
  {
    id: 'ie',
    country: 'Ireland',
    tag: 'European Silicon Valley & Global HQ Hub',
    flag: 'https://flagcdn.com/w40/ie.png',
    tuitionRange: '€11,000 - €24,000 / yr',
    livingProof: '€10,000 / yr proof of maintenance',
    workPermit: '2-Year Third Level Graduate Scheme (Stamp 1G)',
    prTimeline: 'Critical Skills Employment Permit (2 Years to Stamp 4 PR)',
    workRights: '20 hrs/week term-time, 40 hrs in summer/winter breaks',
    topFields: 'Pharmaceuticals, Medical Devices, Cloud, FinTech',
    officialPortal: 'https://www.irishimmigration.ie',
    portalName: 'Irish Immigration Service',
    budgetTier: 'mid',
    popularDisciplines: ['STEM', 'Healthcare']
  },
  {
    id: 'nl',
    country: 'Netherlands',
    tag: 'English-Taught Tech Programs & High Innovation',
    flag: 'https://flagcdn.com/w40/nl.png',
    tuitionRange: '€10,000 - €20,000 / yr',
    livingProof: '€14,600 / yr living cost standard (IND)',
    workPermit: '1-Year Orientation Year (Zoekjaar) for High Educated',
    prTimeline: 'Highly Skilled Migrant status (5 Years to Dutch/EU PR)',
    workRights: '16 hrs/week (requires TWV work permit from employer)',
    topFields: 'Semiconductors (ASML cluster), AI, Logistics, AgTech',
    officialPortal: 'https://ind.nl/en',
    portalName: 'IND Immigratie- en Naturalisatiedienst',
    budgetTier: 'mid',
    popularDisciplines: ['STEM', 'CoreEngg']
  },
  {
    id: 'fr',
    country: 'France',
    tag: 'Grandes Écoles & European Tech Startups',
    flag: 'https://flagcdn.com/w40/fr.png',
    tuitionRange: '€3,770 / yr (Public) to €18,000 / yr (Business)',
    livingProof: '€615 / month (€7,380 / yr minimum maintenance proof)',
    workPermit: '2-Year Post-Study Visa for Indian Masters (Bilateral Accord)',
    prTimeline: 'Talent Passport ➔ 5-Year Resident Card (10-Year Carte de Séjour)',
    workRights: '60% of annual legal working time (~964 hrs/yr)',
    topFields: 'Aerospace (Airbus), Luxury Management, Data, AI',
    officialPortal: 'https://france-visas.gouv.fr',
    portalName: 'France-Visas Official',
    budgetTier: 'low',
    popularDisciplines: ['Management', 'CoreEngg']
  },
  {
    id: 'se',
    country: 'Sweden',
    tag: 'Sustainability, Clean Energy & High Quality of Life',
    flag: 'https://flagcdn.com/w40/se.png',
    tuitionRange: 'SEK 90,000 - 180,000 / yr (~₹7L - ₹14L)',
    livingProof: 'SEK 10,314 / month living funds rule (Migrationsverket)',
    workPermit: '12-Month Jobseeker Visa post-graduation',
    prTimeline: 'Work permit holder for 4 continuous years leads to Permanent Residency',
    workRights: 'No weekly hourly cap as long as academic progress maintained',
    topFields: 'Telecom (Ericsson), Automotive (Volvo), Green Energy, IT',
    officialPortal: 'https://www.migrationsverket.se/English.html',
    portalName: 'Swedish Migration Agency',
    budgetTier: 'mid',
    popularDisciplines: ['STEM', 'CoreEngg']
  },
  {
    id: 'nz',
    country: 'New Zealand',
    tag: 'Green List Fast-Track PR for Shortage Careers',
    flag: 'https://flagcdn.com/w40/nz.png',
    tuitionRange: 'NZD $28,000 - $42,000 / yr',
    livingProof: 'NZD $20,000 / yr proof of funds for student visa',
    workPermit: 'Up to 3-Year Post-Study Work Visa (PSWV)',
    prTimeline: 'Straight to Residence via Green List Tier 1 & Skilled Migrant Category',
    workRights: '20 hrs/week during term, 40 hrs in holidays',
    topFields: 'Civil Engineering, Dairy Science, Cyber Security, Construction',
    officialPortal: 'https://www.immigration.govt.nz',
    portalName: 'Immigration New Zealand',
    budgetTier: 'mid',
    popularDisciplines: ['CoreEngg', 'Healthcare']
  },
  {
    id: 'it',
    country: 'Italy',
    tag: 'Low Public Tuition & Regional DSU Scholarships',
    flag: 'https://flagcdn.com/w40/it.png',
    tuitionRange: '€900 - €4,000 / yr (Based on ISEE Parificato Family Income)',
    livingProof: '€6,000 / yr (€500/mo bank proof)',
    workPermit: '12 Months Post-Study Permesso di Soggiorno per Attesa Occupazione',
    prTimeline: 'Subordinate Work Permit ➔ 5-Year EU Long-Term Resident Permit',
    workRights: '20 hrs/week up to a maximum of 1,040 hrs/year',
    topFields: 'Industrial Design, Mechanical, Architecture, Economics',
    officialPortal: 'https://vistoperitalia.esteri.it',
    portalName: 'Ministero degli Esteri Italy',
    budgetTier: 'low',
    popularDisciplines: ['CoreEngg', 'Management']
  },
  {
    id: 'sg',
    country: 'Singapore',
    tag: 'Premier Asian Tech & Banking Center (NUS / NTU)',
    flag: 'https://flagcdn.com/w40/sg.png',
    tuitionRange: 'SGD $22,000 - $45,000 / yr (Service Obligation reduces fee)',
    livingProof: 'SGD $12,000 - $18,000 / yr living expenses',
    workPermit: '1-Year Long Term Visit Pass (LTVP) + Employment Pass (EP)',
    prTimeline: 'PTS (Professionals/Technical Personnel and Skilled Workers) PR Scheme',
    workRights: '16 hrs/week for Ministry of Manpower approved institutions',
    topFields: 'Artificial Intelligence, Quantitative Finance, Supply Chain, Semiconductors',
    officialPortal: 'https://www.mom.gov.sg',
    portalName: 'Singapore Ministry of Manpower',
    budgetTier: 'high',
    popularDisciplines: ['STEM', 'Management']
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('pathways');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [fieldFilter, setFieldFilter] = useState('all');
  const [userName, setUserName] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  // Customer Support Form State
  const [supportName, setSupportName] = useState('');
  const [supportQuery, setSupportQuery] = useState('');

  // Relocation Roadmap State
  const [checklist, setChecklist] = useState([
    { id: 1, title: 'IELTS / PTE / TOEFL Academic Language Exam', done: true, phase: 'Stage 1: Testing' },
    { id: 2, title: 'Document & Degree Verification (APS / WES / ENIC)', done: true, phase: 'Stage 1: Credentials' },
    { id: 3, title: 'Statement of Purpose (SOP) & Academic LORs', done: false, phase: 'Stage 2: Applications' },
    { id: 4, title: 'Direct University Admissions Submission', done: false, phase: 'Stage 2: Filing' },
    { id: 5, title: 'Financial Proof: Blocked Account / GIC / Bank Balance', done: false, phase: 'Stage 3: Funding' },
    { id: 6, title: 'Education Loan Sanction Letter (Section 80E)', done: false, phase: 'Stage 3: Loan' },
    { id: 7, title: 'VFS / Embassy Biometrics & Visa Interview', done: false, phase: 'Stage 4: Visa' },
    { id: 8, title: 'Post-Study Work Permit Application (OPT/PGWP/485)', done: false, phase: 'Stage 5: Career' },
    { id: 9, title: 'Permanent Residency Filing (PR / Blue Card / CEC)', done: false, phase: 'Stage 5: Settlement' },
    { id: 10, title: 'OCI Card Registration (Upon Acquiring Foreign Passport)', done: false, phase: 'Stage 5: Dual Origin' },
  ]);

  const toggleChecklist = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const completedCount = checklist.filter(c => c.done).length;
  const readinessPercent = Math.round((completedCount / checklist.length) * 100);

  const filteredDestinations = DESTINATIONS.filter(item => {
    const matchesCountry = selectedCountryFilter === 'all' || item.id === selectedCountryFilter;
    const matchesBudget = budgetFilter === 'all' || item.budgetTier === budgetFilter;
    const matchesField = fieldFilter === 'all' || item.popularDisciplines.includes(fieldFilter);
    return matchesCountry && matchesBudget && matchesField;
  });

  const handleWhatsAppShare = () => {
    const candidateName = userName.trim() ? `${userName.trim()}'s` : "My";
    const text = encodeURIComponent(
      `✈️ ${candidateName} Global Mobility Evaluation on Migravo:\n🎯 Readiness Score: ${readinessPercent}%\n🌍 Zero-Broker Direct Admissions Guide\nCheck your score without consultant fees: https://migravo-web.vercel.app`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleSupportWhatsApp = () => {
    const name = supportName.trim() || 'Student';
    const query = supportQuery.trim() || 'I need help navigating admission / visa pathways.';
    const text = encodeURIComponent(`Hello Migravo Team!\nMy name is ${name}.\nQuery: ${query}`);
    window.open(`https://api.whatsapp.com/send?phone=919876543210&text=${text}`, '_blank');
  };

  const handleSupportEmail = () => {
    const name = supportName.trim() || 'Student';
    const query = supportQuery.trim() || 'I need guidance regarding my application dossier.';
    const subject = encodeURIComponent(`[Migravo Assistance] Query from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nReadiness: ${readinessPercent}%\nQuery:\n${query}`);
    window.location.href = `mailto:support@migravo.in?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-slate-900 font-sans antialiased pb-24 selection:bg-[#008779] selection:text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0D3B43] to-[#008779] flex items-center justify-center shadow-md shadow-[#008779]/20">
              <Compass className="text-[#E5A93C] w-5 h-5 -rotate-12" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-[#0D3B43]">
                Migra<span className="text-[#008779]">vo</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold tracking-wider text-[#008779] uppercase bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200/60">
                Zero-Broker Hub
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => setActiveTab('support')}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition active:scale-95 ${
                activeTab === 'support'
                  ? 'bg-[#008779] text-white border-[#008779] shadow-sm'
                  : 'bg-teal-50 text-[#008779] border-teal-200 hover:bg-teal-100'
              }`}
            >
              <Headphones size={14} className="text-[#E5A93C]" />
              <span>Get Support</span>
            </button>

            <button 
              onClick={() => setShowShareModal(true)}
              className="bg-[#0D3B43] hover:bg-[#09262C] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-sm transition active:scale-95"
            >
              <Share2 size={13} className="text-[#E5A93C]" />
              <span>Share Score</span>
            </button>
          </div>
        </div>

        {/* Modular Navigation Tabs */}
        <div className="border-t border-slate-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 flex items-center">
            <div className="flex gap-2 overflow-x-auto py-2.5 w-full scroll-smooth no-scrollbar">
              {[
                { id: 'pathways', label: '🌍 Global Pathways', icon: Globe2 },
                { id: 'loans', label: '💰 Education Loan & 80E', icon: Landmark },
                { id: 'aps', label: '🛡️ Credential Vault (APS/WES)', icon: ShieldCheck },
                { id: 'sop', label: '✍️ SOP & LOR Builder', icon: FileEdit },
                { id: 'visa', label: '📅 Visa & VFS Tracker', icon: Calendar },
                { id: 'living', label: '🏙️ City Cost & Earnings', icon: DollarSign },
                { id: 'checklist', label: '🗺️ Relocation Roadmap', icon: CheckSquare },
                { id: 'support', label: '🎧 Student Support Desk', icon: Headphones },
              ].map(tab => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-200 ${
                      active 
                        ? 'bg-[#0D3B43] text-white shadow-md shadow-[#0D3B43]/20 scale-[1.02]' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
                    }`}
                  >
                    <Icon size={13} className={active ? 'text-[#E5A93C]' : 'text-slate-400'} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        {/* Global Hero Banner */}
        <section className="bg-gradient-to-br from-[#0D3B43] via-[#0E535D] to-[#008779] text-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-[#0D3B43]/15 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#E5A93C] border border-white/15">
              <Zap size={13} /> Worldwide Direct Admissions • Zero Consultancy Cut
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
              Global Study & Relocation Pathways.
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              Standardized, verified criteria across top destinations. Prepare your entire dossier without agent markups.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center space-y-3 shrink-0 shadow-inner">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-teal-200 font-bold">Relocation Readiness</p>
              <p className="text-4xl font-black text-[#E5A93C]">{readinessPercent}%</p>
              <p className="text-[11px] text-teal-100">{completedCount} of 10 milestones completed</p>
            </div>
            <button 
              onClick={() => setActiveTab('checklist')}
              className="w-full bg-[#E5A93C] hover:bg-amber-400 text-slate-900 font-bold text-xs py-2 px-3 rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-1.5"
            >
              View Milestone Checklist <ArrowRight size={13} />
            </button>
          </div>
        </section>

        {/* TAB 1: GLOBAL DESTINATIONS */}
        {activeTab === 'pathways' && (
          <div className="space-y-5">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-base font-extrabold text-[#0D3B43] flex items-center gap-2">
                    <Globe2 className="text-[#008779] w-5 h-5" /> Select Your Target Destination
                  </h2>
                  <p className="text-xs text-slate-500">Filter by specific country or compare global destinations side-by-side.</p>
                </div>
                <span className="text-xs font-bold text-[#008779] bg-teal-50 px-3 py-1 rounded-full border border-teal-200 self-start sm:self-auto">
                  {filteredDestinations.length} Countries Showing
                </span>
              </div>

              {/* Country Selection Chips */}
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {[
                  { id: 'all', label: 'All Countries', flag: '🌐' },
                  { id: 'us', label: 'USA', flag: '🇺🇸' },
                  { id: 'de', label: 'Germany', flag: '🇩🇪' },
                  { id: 'uk', label: 'UK', flag: '🇬🇧' },
                  { id: 'ca', label: 'Canada', flag: '🇨🇦' },
                  { id: 'au', label: 'Australia', flag: '🇦🇺' },
                  { id: 'ie', label: 'Ireland', flag: '🇮🇪' },
                  { id: 'nl', label: 'Netherlands', flag: '🇳🇱' },
                  { id: 'fr', label: 'France', flag: '🇫🇷' },
                  { id: 'se', label: 'Sweden', flag: '🇸🇪' },
                  { id: 'nz', label: 'New Zealand', flag: '🇳🇿' },
                  { id: 'it', label: 'Italy', flag: '🇮🇹' },
                  { id: 'sg', label: 'Singapore', flag: '🇸🇬' },
                ].map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCountryFilter(c.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition active:scale-95 ${
                      selectedCountryFilter === c.id
                        ? 'bg-[#0D3B43] text-white shadow-sm'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/70'
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Planned Budget Range
                  </label>
                  <select 
                    value={budgetFilter}
                    onChange={(e) => setBudgetFilter(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-2.5 font-semibold outline-none focus:border-[#008779] cursor-pointer"
                  >
                    <option value="all">All Budget Tiers (Free to Tier 1)</option>
                    <option value="low">Under ₹15 Lakhs (Low Budget / Free Public)</option>
                    <option value="mid">₹15 Lakhs - ₹35 Lakhs (Standard Masters)</option>
                    <option value="high">₹35 Lakhs+ (High Budget / Tier-1 Tech)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Discipline / Field of Study
                  </label>
                  <select 
                    value={fieldFilter}
                    onChange={(e) => setFieldFilter(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-2.5 font-semibold outline-none focus:border-[#008779] cursor-pointer"
                  >
                    <option value="all">All Fields of Study</option>
                    <option value="STEM">STEM, AI, Computer Science & IT</option>
                    <option value="Management">Management, Business & MBA</option>
                    <option value="Healthcare">Healthcare & Nursing</option>
                    <option value="CoreEngg">Core Mechanical & Electrical</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredDestinations.map((dest) => (
                <div 
                  key={dest.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={dest.flag} 
                          alt={`${dest.country} Flag`} 
                          className="w-8 h-5 rounded shadow-xs object-cover" 
                        />
                        <div>
                          <h3 className="text-base font-extrabold text-slate-900">{dest.country}</h3>
                          <span className="text-[11px] font-semibold text-[#008779]">{dest.tag}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {dest.budgetTier === 'low' ? 'Low Budget' : dest.budgetTier === 'mid' ? 'Mid Budget' : 'High Budget'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      <div className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-100">
                        <span className="text-slate-400 text-[10px] font-medium block">Tuition Range</span>
                        <span className="font-bold text-slate-900">{dest.tuitionRange}</span>
                      </div>
                      <div className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-100">
                        <span className="text-slate-400 text-[10px] font-medium block">Living Cost / Funds Proof</span>
                        <span className="font-bold text-[#0D3B43]">{dest.livingProof}</span>
                      </div>
                      <div className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-100">
                        <span className="text-slate-400 text-[10px] font-medium block">Post-Study Work Visa</span>
                        <span className="font-bold text-emerald-700">{dest.workPermit}</span>
                      </div>
                      <div className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-100">
                        <span className="text-slate-400 text-[10px] font-medium block">Permanent Residency (PR)</span>
                        <span className="font-semibold text-slate-800">{dest.prTimeline}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs pt-1">
                      <p className="text-slate-600 text-[11px]">
                        <strong>Part-Time Work Rights:</strong> {dest.workRights}
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Key Career Sectors:</strong> {dest.topFields}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button 
                      onClick={() => setActiveTab('loans')}
                      className="text-[#008779] font-bold hover:underline flex items-center gap-1"
                    >
                      Loan & Tax Calculator <ArrowRight size={12} />
                    </button>
                    <a 
                      href={dest.officialPortal} 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-[#0D3B43] hover:bg-[#09262C] text-white px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition active:scale-95"
                    >
                      {dest.portalName} <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: LOAN & TAX CALCULATOR */}
        {activeTab === 'loans' && <LoanCalculator />}

        {/* TAB 3: CREDENTIAL & APS VAULT */}
        {activeTab === 'aps' && <GlobalVerificationVault />}

        {/* TAB 4: SOP & LOR BUILDER */}
        {activeTab === 'sop' && <SopBuilder />}

        {/* TAB 5: VISA & VFS SLOT TRACKER */}
        {activeTab === 'visa' && <VisaSlotTracker />}

        {/* TAB 6: CITY COST & EARNING MATCHER */}
        {activeTab === 'living' && <CostOfLivingMatcher />}

        {/* TAB 7: RELOCATION ROADMAP */}
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

        {/* TAB 8: STUDENT SUPPORT DESK */}
        {activeTab === 'support' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-5 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#008779] bg-teal-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Zero-Broker Assistance
                  </span>
                  <h2 className="text-xl font-extrabold text-[#0D3B43] flex items-center gap-2">
                    <Headphones className="text-[#008779] w-6 h-6" /> Student Support & Advisory Desk
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Direct coordinator assistance for admission filings, loan sanctions, and visa appointments.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-emerald-700">Advisors Online Now</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50/70 border border-emerald-200/80 p-5 rounded-2xl flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                      <MessageCircle size={20} />
                    </div>
                    <h3 className="font-bold text-emerald-950 text-sm">Instant WhatsApp Helpdesk</h3>
                    <p className="text-xs text-emerald-800/80 leading-relaxed">
                      Chat directly with a mobility coordinator for document review, loan sanctions, or visa filing questions.
                    </p>
                  </div>
                  <button 
                    onClick={handleSupportWhatsApp}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition active:scale-95 flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={15} /> Chat on WhatsApp Now
                  </button>
                </div>

                <div className="bg-slate-50 border border-slate-200/90 p-5 rounded-2xl flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="w-9 h-9 rounded-xl bg-[#0D3B43] text-white flex items-center justify-center shadow-xs">
                      <Mail size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">Email Escalation Desk</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Submit long-form profile evaluations, SOP reviews, or embassy queries for 24-hour turnaround.
                    </p>
                  </div>
                  <button 
                    onClick={handleSupportEmail}
                    className="w-full bg-[#0D3B43] hover:bg-[#09262C] text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Mail size={15} /> Email Support (support@migravo.in)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Share Modal */}
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
                    <span className="text-teal-200 block text-[10px] font-medium">Destinations Audited</span>
                    <span className="text-xl font-black text-white">Global Database</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-teal-200">
                  <span>Verified via Migravo Mobility Engine</span>
                  <span className="text-[#E5A93C] font-semibold">100% Zero-Consultancy</span>
                </div>
              </div>

              <div className="flex gap-2.5">
                <button 
                  onClick={handleWhatsAppShare}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition active:scale-95"
                >
                  <Share2 size={14} /> Share on WhatsApp
                </button>
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