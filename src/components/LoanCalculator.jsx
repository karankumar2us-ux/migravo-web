import React, { useState } from 'react';
import { Landmark, Calculator, Percent, ShieldCheck, FileText, ArrowRight, ExternalLink, HelpCircle, CheckCircle } from 'lucide-react';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(2500000); // ₹25 Lakhs
  const [interestRate, setInterestRate] = useState(10.5); // 10.5%
  const [tenureYears, setTenureYears] = useState(10); // 10 years
  const [taxBracket, setTaxBracket] = useState(30); // 30% slab under Section 80E

  // EMI Calculation: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  // Section 80E Annual Tax Savings (Avg interest over early years * tax slab)
  const avgAnnualInterest = totalInterest / tenureYears;
  const annualTaxSavings = Math.round(avgAnnualInterest * (taxBracket / 100));
  const max8YearTaxSavings = annualTaxSavings * 8; // 80E capped at 8 consecutive years

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold text-[#008779] bg-teal-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Financial Transparency
          </span>
          <h2 className="text-xl font-extrabold text-[#0D3B43] flex items-center gap-2 mt-1">
            <Landmark className="text-[#008779] w-6 h-6" /> Education Loan Hub & Section 80E Calculator
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            EMI calculations, non-collateral criteria, Indian bank comparisons, and zero-tax interest write-offs.
          </p>
        </div>
        <span className="text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200/80 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          Section 80E: Unlimited Deduction
        </span>
      </div>

      {/* Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Interactive Sliders */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
          <h3 className="font-bold text-sm text-[#0D3B43] flex items-center gap-2">
            <Calculator size={16} className="text-[#008779]" /> Loan & Repayment Sliders
          </h3>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Required Loan Amount</span>
              <span className="text-[#008779] text-sm">₹{(loanAmount / 100000).toFixed(1)} Lakhs</span>
            </div>
            <input 
              type="range" 
              min={500000} 
              max={10000000} 
              step={100000}
              value={loanAmount} 
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-[#008779] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹5L (Living / Sperrkonto)</span>
              <span>₹50L (US / Canada)</span>
              <span>₹1 Cr (Max Tier)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Interest Rate (p.a.)</span>
                <span className="text-[#008779]">{interestRate}%</span>
              </div>
              <input 
                type="range" 
                min={8.25} 
                max={14.0} 
                step={0.25}
                value={interestRate} 
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-[#008779] cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">SBI: ~8.5% | NBFC: ~10.5%-12%</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Repayment Tenure</span>
                <span className="text-[#008779]">{tenureYears} Years</span>
              </div>
              <input 
                type="range" 
                min={5} 
                max={15} 
                step={1}
                value={tenureYears} 
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-[#008779] cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">Excludes Course + 6-12m moratorium</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Co-Applicant (Parent/Self) Tax Bracket for Section 80E
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '10% Slab', val: 10 },
                { label: '20% Slab', val: 20 },
                { label: '30% Slab (High)', val: 30 },
              ].map(b => (
                <button
                  key={b.val}
                  onClick={() => setTaxBracket(b.val)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    taxBracket === b.val 
                      ? 'bg-[#0D3B43] text-white border-[#0D3B43]' 
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Output Snapshot */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0D3B43] via-[#0E535D] to-[#008779] text-white p-6 rounded-3xl shadow-lg flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-bold text-[#E5A93C] uppercase tracking-wider block">Estimated Monthly Outflow</span>
            <div className="text-3xl font-black text-white mt-1">₹{emi.toLocaleString('en-IN')} <span className="text-xs font-semibold text-teal-200">/ month</span></div>
            <p className="text-[11px] text-teal-100 mt-1">Repayment starts after your course + job search moratorium.</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl text-xs border border-white/15">
            <div>
              <span className="text-teal-200 text-[10px] block">Principal Borrowed</span>
              <span className="font-extrabold text-sm text-white">₹{(loanAmount / 100000).toFixed(1)}L</span>
            </div>
            <div>
              <span className="text-teal-200 text-[10px] block">Total Interest Payable</span>
              <span className="font-extrabold text-sm text-[#E5A93C]">₹{(totalInterest / 100000).toFixed(2)}L</span>
            </div>
            <div className="col-span-2 pt-1 border-t border-white/10">
              <span className="text-teal-200 text-[10px] block">Total Repayment Over {tenureYears} Yrs</span>
              <span className="font-black text-base text-white">₹{(totalPayment / 100000).toFixed(2)} Lakhs</span>
            </div>
          </div>

          {/* Section 80E Incentive Card */}
          <div className="bg-white/15 p-3.5 rounded-2xl border border-[#E5A93C]/40 space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#E5A93C] flex items-center gap-1">
              <Percent size={12} /> Section 80E Income Tax Benefit
            </span>
            <p className="text-xs font-bold text-white">
              Save up to ₹{max8YearTaxSavings.toLocaleString('en-IN')} in taxes!
            </p>
            <p className="text-[10px] text-teal-100 leading-relaxed">
              100% of education loan interest paid is deductible from gross income under Section 80E for up to 8 continuous years without any upper limit.
            </p>
          </div>
        </div>
      </div>

      {/* Lender Comparison Matrix */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-[#0D3B43] flex items-center gap-2">
          <ShieldCheck className="text-[#008779] w-5 h-5" /> Indian Abroad Education Loan Types: Public Bank vs NBFC
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Public Banks */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-900 text-sm">Public Sector Banks</h4>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Lowest Interest</span>
            </div>
            <p className="text-slate-500 text-[11px]">SBI (Global Ed-Vantage), Bank of Baroda, PNB</p>
            <ul className="space-y-1.5 text-slate-700">
              <li>• <strong>Interest Rate:</strong> 8.25% - 9.5% p.a. (MCLR/RLLR linked)</li>
              <li>• <strong>Collateral:</strong> Non-collateral up to ₹7.5L (CGFSEL) or ₹50L for top global tier universities</li>
              <li>• <strong>Processing Time:</strong> 15 to 25 working days</li>
              <li>• <strong>Tax/Subsidies:</strong> Eligible for Dr. Ambedkar & 80E write-offs</li>
            </ul>
          </div>

          {/* Private Banks */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-900 text-sm">Private Banks</h4>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">Balanced</span>
            </div>
            <p className="text-slate-500 text-[11px]">Axis Bank, ICICI Bank, IDFC First</p>
            <ul className="space-y-1.5 text-slate-700">
              <li>• <strong>Interest Rate:</strong> 9.5% - 11.5% p.a.</li>
              <li>• <strong>Collateral:</strong> Non-collateral up to ₹40 Lakhs based on GRE/co-applicant income</li>
              <li>• <strong>Processing Time:</strong> 7 to 14 working days</li>
              <li>• <strong>Tax/Subsidies:</strong> Section 80E tax deduction eligible</li>
            </ul>
          </div>

          {/* Specialized NBFCs */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-900 text-sm">Specialized Ed-NBFCs</h4>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">Fastest & High Unsecured</span>
            </div>
            <p className="text-slate-500 text-[11px]">HDFC Credila, Avanse, Auxilo</p>
            <ul className="space-y-1.5 text-slate-700">
              <li>• <strong>Interest Rate:</strong> 10.5% - 12.5% p.a. (Floating)</li>
              <li>• <strong>Collateral:</strong> Unsecured loans up to ₹60L - ₹75L+ without property mortgage</li>
              <li>• <strong>Processing Time:</strong> 3 to 7 working days</li>
              <li>• <strong>Pre-Visa Sanction:</strong> Fast sanction letters for embassy visa files</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Complete Step-by-Step Procedure */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
        <h3 className="text-sm font-extrabold text-[#0D3B43] flex items-center gap-2">
          <FileText className="text-[#008779] w-5 h-5" /> End-to-End Abroad Education Loan Roadmap in India
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
            <span className="w-5 h-5 rounded-full bg-[#0D3B43] text-white font-bold flex items-center justify-center text-[10px]">1</span>
            <p className="font-bold text-slate-800">Pre-Sanction Stage</p>
            <p className="text-slate-500 text-[11px]">Apply with your test scores (GRE/IELTS) or conditional offer letter to obtain a preliminary sanction letter for your I-20 or German blocked account.</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
            <span className="w-5 h-5 rounded-full bg-[#0D3B43] text-white font-bold flex items-center justify-center text-[10px]">2</span>
            <p className="font-bold text-slate-800">Doc Verification</p>
            <p className="text-slate-500 text-[11px]">Co-applicant KYC, last 2 years ITRs, 6 months bank statements, salary slips, and university cost of attendance breakdown.</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
            <span className="w-5 h-5 rounded-full bg-[#0D3B43] text-white font-bold flex items-center justify-center text-[10px]">3</span>
            <p className="font-bold text-slate-800">Official Sanction</p>
            <p className="text-slate-500 text-[11px]">Bank issues the official Sanction Letter with loan amount, rate, and margin money. Use this as financial proof for VFS visa appointment.</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
            <span className="w-5 h-5 rounded-full bg-[#0D3B43] text-white font-bold flex items-center justify-center text-[10px]">4</span>
            <p className="font-bold text-slate-800">Disbursement</p>
            <p className="text-slate-500 text-[11px]">Post-visa, tuition is wired via SWIFT/Flywire to the university, and living expenses transfer to your Sperrkonto or Canada GIC at 0% TCS.</p>
          </div>
        </div>

        {/* Official Loan Portals Directory */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Direct Official Portals (Zero Middleman)</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <a 
              href="https://www.vidyalakshmi.co.in/" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 bg-teal-50/60 border border-teal-200/80 rounded-xl hover:bg-teal-100/60 transition flex items-center justify-between"
            >
              <div>
                <p className="font-bold text-slate-900">Vidya Lakshmi Portal</p>
                <p className="text-[10px] text-slate-500">Govt single-window for all Indian banks</p>
              </div>
              <ExternalLink size={13} className="text-[#008779]" />
            </a>

            <a 
              href="https://sbi.co.in/web/personal-banking/loans/education-loans/global-ed-vantage-scheme" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition flex items-center justify-between"
            >
              <div>
                <p className="font-bold text-slate-900">SBI Global Ed-Vantage</p>
                <p className="text-[10px] text-slate-500">Up to ₹1.5 Cr with lowest rates</p>
              </div>
              <ExternalLink size={13} className="text-slate-400" />
            </a>

            <a 
              href="https://www.credila.com/abroad-education-loans" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition flex items-center justify-between"
            >
              <div>
                <p className="font-bold text-slate-900">HDFC Credila</p>
                <p className="text-[10px] text-slate-500">Fast non-collateral sanctions</p>
              </div>
              <ExternalLink size={13} className="text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}