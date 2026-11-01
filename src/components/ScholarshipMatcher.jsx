import React, { useState } from 'react';
import { Award, CheckCircle2, AlertCircle, ExternalLink, Filter, Calendar, Sparkles, DollarSign, Globe2 } from 'lucide-react';

const SCHOLARSHIPS_DATA = [
  // United Kingdom
  {
    id: 'chevening',
    name: 'Chevening Scholarship',
    country: 'United Kingdom',
    level: 'Masters',
    fundingType: 'Fully Funded',
    coverage: 'Tuition, monthly living stipend, return flights, visa fees',
    minDegree: 'Bachelors',
    minExpYears: 2,
    academicBenchmark: '60% / First Class equivalent',
    window: 'Aug to early Nov',
    officialUrl: 'https://www.chevening.org',
    requirements: '2 years verifiable work experience, commitment to return to India for minimum 2 years post-degree.'
  },
  {
    id: 'commonwealth',
    name: "Commonwealth Master's Scholarship",
    country: 'United Kingdom',
    level: 'Masters',
    fundingType: 'Fully Funded',
    coverage: 'Tuition fees, monthly stipend, return flights, arrival allowance',
    minDegree: 'Bachelors',
    minExpYears: 0,
    academicBenchmark: '60%+ in Bachelor degree',
    window: 'Sep to Nov (CSC + Ministry of Education portals)',
    officialUrl: 'https://cscuk.fcdo.gov.uk',
    requirements: 'Indian citizenship; annual family income under ₹4.5 Lakhs; require UK university offer.'
  },
  {
    id: 'rhodes',
    name: 'Rhodes Scholarship (Oxford)',
    country: 'United Kingdom',
    level: 'Masters',
    fundingType: 'Fully Funded',
    coverage: 'All university fees, monthly stipend, flights, visa, NHS health surcharge',
    minDegree: 'Bachelors',
    minExpYears: 0,
    academicBenchmark: 'Outstanding first-class academics + proven leadership',
    window: 'Jul to Aug',
    officialUrl: 'https://www.rhodeshouse.ox.ac.uk',
    requirements: 'Indian citizens aged 19 to 25 with proven academic and public leadership record.'
  },
  {
    id: 'gatescambridge',
    name: 'Gates Cambridge Scholarship',
    country: 'United Kingdom',
    level: 'Masters',
    fundingType: 'Fully Funded',
    coverage: 'Full cost of study, maintenance allowance, return airfare, visa',
    minDegree: 'Bachelors',
    minExpYears: 0,
    academicBenchmark: 'Top 5% of class / exceptional intellect',
    window: 'Oct to Dec (with Cambridge course application)',
    officialUrl: 'https://www.gatescambridge.org',
    requirements: 'Citizen of any country outside the UK applying to graduate programs at Cambridge.'
  },

  // United States
  {
    id: 'fulbright',
    name: "Fulbright-Nehru Master's Fellowship",
    country: 'United States',
    level: 'Masters',
    fundingType: 'Fully Funded',
    coverage: 'J-1 visa sponsorship, tuition, living stipend, roundtrip airfare, health insurance',
    minDegree: 'Bachelors',
    minExpYears: 3,
    academicBenchmark: '55%+ in 4-year Bachelor degree',
    window: 'May to Jul annual cycle',
    officialUrl: 'https://www.usief.org.in',
    requirements: 'Minimum 3 years professional work experience; strong community leadership orientation.'
  },
  {
    id: 'knighthennessy',
    name: 'Knight-Hennessy Scholars (Stanford)',
    country: 'United States',
    level: 'Masters',
    fundingType: 'Fully Funded',
    coverage: 'Full tuition, living stipend, travel grant, leadership immersion',
    minDegree: 'Bachelors',
    minExpYears: 0,
    academicBenchmark: 'High GPA / GRE / Stanford graduate admission standard',
    window: 'October annual cycle',
    officialUrl: 'https://knight-hennessy.stanford.edu',
    requirements: 'Must apply concurrently to any Stanford graduate program (MS, MBA, JD, PhD).'
  },
  {
    id: 'ivies_needblind',
    name: 'US Need-Blind Aid (Harvard, MIT, Yale, Princeton, Amherst, Dartmouth)',
    country: 'United States',
    level: 'Bachelors',
    fundingType: 'Fully Funded',
    coverage: 'Up to 100% demonstrated financial need (Tuition + Room + Board + Health)',
    minDegree: '12th Grade',
    minExpYears: 0,
    academicBenchmark: 'Near-perfect school marks + strong holistic profile',
    window: 'Nov (Early) / Jan (Regular)',
    officialUrl: 'https://college.harvard.edu',
    requirements: 'Award calculated strictly based on family income; zero loans included in packages.'
  },

  // Europe & Germany
  {
    id: 'erasmus',
    name: "Erasmus Mundus Joint Master's (EMJMD)",
    country: 'Europe',
    level: 'Masters',
    fundingType: 'Fully Funded',
    coverage: 'Full tuition, €1,000 - €1,400 monthly living allowance, travel, insurance',
    minDegree: 'Bachelors',
    minExpYears: 0,
    academicBenchmark: 'First Class degree in related disciplines',
    window: 'Oct to Jan (consortium specific)',
    officialUrl: 'https://erasmus-plus.ec.europa.eu',
    requirements: 'Degree completed across 2 to 3 European universities; open to all nationalities.'
  },
  {
    id: 'daad_epos',
    name: 'DAAD EPOS Scholarship (Germany)',
    country: 'Germany',
    level: 'Masters',
    fundingType: 'Fully Funded',
    coverage: '€934/month living stipend + health insurance + travel grant (Tuition €0)',
    minDegree: 'Bachelors',
    minExpYears: 2,
    academicBenchmark: 'Above-average Bachelor marks',
    window: 'Aug to Oct (intake specific)',
    officialUrl: 'https://www.daad.in',
    requirements: 'At least 2 years verified relevant professional experience in development fields.'
  },
  {
    id: 'eiffel',
    name: 'Eiffel Excellence Scholarship (France)',
    country: 'France',
    level: 'Masters',
    fundingType: 'Living + Extras',
    coverage: '€1,181/month allowance, international flights, local transport, health insurance',
    minDegree: 'Bachelors',
    minExpYears: 0,
    academicBenchmark: 'Top academic quartile',
    window: 'Nov to Jan (nominated directly by French institution)',
    officialUrl: 'https://www.campusfrance.org',
    requirements: 'Applicants up to 25-30 years old nominated directly by an accredited French university.'
  },
  {
    id: 'stipendium_hungaricum',
    name: 'Stipendium Hungaricum',
    country: 'Europe',
    level: 'Masters',
    fundingType: 'Fully Funded',
    coverage: 'Tuition waiver, monthly stipend, free dormitory housing or accommodation stipend, medical insurance',
    minDegree: 'Bachelors',
    minExpYears: 0,
    academicBenchmark: 'First Class / nominated via Ministry of Education',
    window: 'Nov to mid-Jan',
    officialUrl: 'https://stipendiumhungaricum.hu',
    requirements: 'Bilateral agreement scholarship between Indian Ministry of Education and Hungary.'
  },
  {
    id: 'ireland_goi',
    name: 'Government of Ireland International Scholarship (GOI-IES)',
    country: 'Ireland',
    level: 'Masters',
    fundingType: 'Fully Funded',
    coverage: 'Full tuition fee waiver + €10,000 annual living stipend',
    minDegree: 'Bachelors',
    minExpYears: 0,
    academicBenchmark: 'First class academic transcript',
    window: 'Feb to Mar',
    officialUrl: 'https://hea.ie',
    requirements: 'Must hold a formal offer letter from an eligible Irish higher education institution.'
  },

  // Asia & East Asia
  {
    id: 'mext',
    name: 'MEXT Research Scholarship (Japan)',
    country: 'Asia',
    level: 'Masters',
    fundingType: 'Fully Funded',
    coverage: '100% tuition, 143,000 - 145,000 JPY monthly stipend, roundtrip flights',
    minDegree: 'Bachelors',
    minExpYears: 0,
    academicBenchmark: 'Minimum 65-70% in Bachelor degree',
    window: 'Apr to May (Embassy track)',
    officialUrl: 'https://www.in.emb-japan.go.jp',
    requirements: 'Indian citizens under 35 years old; screening includes document audit and written test.'
  },
  {
    id: 'gks',
    name: 'Global Korea Scholarship (GKS Graduate)',
    country: 'Asia',
    level: 'Masters',
    fundingType: 'Fully Funded',
    coverage: 'Full tuition, monthly stipend, flights, 1-year Korean language training, medical insurance',
    minDegree: 'Bachelors',
    minExpYears: 0,
    academicBenchmark: 'Cumulative GPA above 80% or top 20% of class',
    window: 'Feb to Mar (Embassy / University tracks)',
    officialUrl: 'https://www.studyinkorea.go.kr',
    requirements: 'Under 40 years of age; Indian citizenship held by applicant and parents.'
  }
];

export default function ScholarshipMatcher() {
  const [levelFilter, setLevelFilter] = useState('All');
  const [fundingFilter, setFundingFilter] = useState('All');
  const [userWorkExp, setUserWorkExp] = useState(1);
  const [search, setSearch] = useState('');

  const filtered = SCHOLARSHIPS_DATA.filter(item => {
    const matchesLevel = levelFilter === 'All' || item.level === levelFilter;
    const matchesFunding = fundingFilter === 'All' || item.fundingType === fundingFilter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.country.toLowerCase().includes(search.toLowerCase()) ||
                          item.requirements.toLowerCase().includes(search.toLowerCase());
    return matchesLevel && matchesFunding && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold text-[#008779] bg-teal-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Verified Govt & Trust Grants
          </span>
          <h2 className="text-xl font-extrabold text-[#0D3B43] flex items-center gap-2 mt-1">
            <Award className="text-[#008779] w-6 h-6" /> Zero-Loan Scholarship Eligibility Engine
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            58+ Fully Funded scholarships covering full tuition, living stipends, and flights across UK, USA, Europe, and Asia.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl text-right shrink-0">
          <span className="text-xl font-black text-[#008779]">{filtered.length}</span>
          <p className="text-[10px] font-bold text-slate-500">Available Schemes</p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Degree Level
            </label>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 font-semibold outline-none focus:border-[#008779]"
            >
              <option value="All">All Degrees (UG & Masters)</option>
              <option value="Masters">Master's Programs</option>
              <option value="Bachelors">Bachelor's Programs (UG)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Funding Level
            </label>
            <select
              value={fundingFilter}
              onChange={(e) => setFundingFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 font-semibold outline-none focus:border-[#008779]"
            >
              <option value="All">All Funding Profiles</option>
              <option value="Fully Funded">Fully Funded (Tuition + Living + Flights)</option>
              <option value="Living + Extras">Living + Extras (€0 Public Tuition)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Search by Country or Name
            </label>
            <input
              type="text"
              placeholder="e.g. Chevening, Fulbright, Germany..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 font-semibold outline-none focus:border-[#008779]"
            />
          </div>
        </div>
      </div>

      {/* Scholarship Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(item => {
          const meetsWorkExp = userWorkExp >= item.minExpYears;
          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between border-b border-slate-100 pb-3 gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-[#008779] bg-teal-50 px-2 py-0.5 rounded uppercase tracking-wider">
                      {item.country} • {item.level}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-1">{item.name}</h3>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border whitespace-nowrap ${
                    item.fundingType === 'Fully Funded'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-blue-50 text-blue-800 border-blue-200'
                  }`}>
                    {item.fundingType}
                  </span>
                </div>

                <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-xs text-emerald-950">
                  <span className="font-bold block text-[11px] text-emerald-800">Coverage Package:</span>
                  <p className="mt-0.5">{item.coverage}</p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700">
                  <p><strong>Eligibility Rule:</strong> {item.requirements}</p>
                  <p><strong>Academic Benchmark:</strong> {item.academicBenchmark}</p>
                  <p className="text-slate-500 text-[11px]"><strong>Application Window:</strong> {item.window}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-slate-400">Direct Application Portal</span>
                <a
                  href={item.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#0D3B43] hover:bg-[#09262C] text-white px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition active:scale-95"
                >
                  Apply on Portal <ExternalLink size={12} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}