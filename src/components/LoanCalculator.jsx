import React, { useState } from 'react';
import { 
  Landmark, Calculator, Percent, ShieldCheck, FileText, 
  ArrowRight, ExternalLink, HelpCircle, CheckCircle, AlertCircle, 
  IndianRupee, TrendingDown, DollarSign
} from 'lucide-react';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(3000000); // ₹30 Lakhs
  const [interestRate, setInterestRate] = useState(10.0); // 10%
  const [tenureYears, setTenureYears] = useState(10); // 10 years
  const [moratoriumYears, setMoratoriumYears] = useState(2); // 2 years study + 6m buffer
  const [taxBracket, setTaxBracket] = useState(30); // 30% slab under Section 80E
  const [currency, setCurrency] = useState('EUR'); // EUR, USD, CAD

  // Currency Conversions (Indicative mid-market rates)
  const currencyRates = {
    EUR: 90.5,
    USD: 84.0,
    CAD: 61.5
  };
  const foreignVal = Math.round(loanAmount / currencyRates[currency]);

  // Moratorium simple interest accumulated during study
  const moratoriumInterest = Math.round(loanAmount * (interestRate / 100) * moratoriumYears);
  const adjustedPrincipal = loanAmount + moratoriumInterest;

  // Monthly Amortisation: P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi = Math.round(
    (adjustedPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  // Section 80E Savings (Unlimited interest deduction for up to 8 years)
  const avgAnnualInterest = (totalInterest / (tenureYears + moratoriumYears));
  const annualTaxSavings = Math.round(avgAnnualInterest * (taxBracket / 100));
  const totalTaxSaved8Years = annualTaxSavings * 8;

  // RBI LRS & TCS Rule on Education Loans:
  // Remittances funded by an education loan from an approved Indian bank get 0.5% TCS above ₹7L (vs 20% on non-loan remittances).
  const excessAbove7L = Math.max(0, loanAmount - 700000);
  const tcsLoan = Math.round(excessAbove7L * 0.005); // 0.5%
  const tcsSelfFunded = Math.round(excessAbove7L * 0.20); // 20% on self funds
  const tcsSavings = tcsSelfFunded - tcsLoan;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold text-[#008779] bg-teal-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Zero-Broker Loan Intelligence
          </span>
          <h2 className="text-xl font-extrabold text-[#0D3B43] flex items-center gap-2 mt-1">
            <Landmark className="text-[#008779] w-6 h-6" /> Education Loan, Moratorium & Section 80E Simulator
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Compute true EMI after course completion, RBI 0.5% TCS rules, and tax deductions under the Old Tax Regime.
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 p-1.5 rounded-2xl">
          {['EUR', 'USD', 'CAD'].map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                currency === c ? 'bg-[#0D3B43] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Inputs */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#0D3B43] flex items-center gap-2">
              <Calculator size={16} className="text-[#008779]" /> Loan Sizing & Repayment Profile
            </h3>
            <span className="text-xs font-bold text-[#008779] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
              ≈ {currency === 'EUR' ? '€' : '$'}{foreignVal.toLocaleString()} {currency}
            </span>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Required Loan Amount</span>
              <span className="text-[#008779] text-base">₹{(loanAmount / 100000).toFixed(1)} Lakhs</span>
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
              <span>₹5L (Sperrkonto / GIC)</span>
              <span>₹35L (European Masters)</span>
              <span>₹1 Cr (US STEM MS)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>Interest Rate</span>
                <span className="text-[#008779] font-bold">{interestRate}% p.a.</span>
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
              <span className="text-[10px] text-slate-400">Public: 8.5% | NBFC: 11%-12%</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>Course Moratorium</span>
                <span className="text-[#008779] font-bold">{moratoriumYears} Years</span>
              </div>
              <input 
                type="range" 
                min={1} 
                max={4} 
                step={0.5}
                value={moratoriumYears} 
                onChange={(e) => setMoratoriumYears(Number(e.target.value))}
                className="w-full accent-[#008779] cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">Duration of degree + grace period</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>Repayment Tenure</span>
                <span className="text-[#008779] font-bold">{tenureYears} Years</span>
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
              <span className="text-[10px] text-slate-400">Starts after moratorium ends</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Section 80E Co-Applicant Tax Slab
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: '10%', val: 10 },
                  { label: '20%', val: 20 },
                  { label: '30%', val: 30 },
                ].map(b => (
                  <button
                    key={b.val}
                    onClick={() => setTaxBracket(b.val)}
                    className={`py-1.5 rounded-xl text-xs font-bold border transition ${
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
        </div>

        {/* Right Output Dashboard */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0D3B43] via-[#0E535D] to-[#008779] text-white p-6 rounded-3xl shadow-lg flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-bold text-[#E5A93C] uppercase tracking-wider block">Post-Study Monthly EMI</span>
            <div className="text-3xl font-black text-white mt-1">₹{emi.toLocaleString('en-IN')} <span className="text-xs font-normal text-teal-200">/ mo</span></div>
            <p className="text-[11px] text-teal-100 mt-1">
              Zero principal payment required while attending university classes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl text-xs border border-white/15">
            <div>
              <span className="text-teal-200 text-[10px] block">Principal Borrowed</span>
              <span className="font-extrabold text-sm text-white">₹{(loanAmount / 100000).toFixed(1)}L</span>
            </div>
            <div>
              <span className="text-teal-200 text-[10px] block">Moratorium Simple Int.</span>
              <span className="font-extrabold text-sm text-[#E5A93C]">₹{(moratoriumInterest / 100000).toFixed(2)}L</span>
            </div>
            <div>
              <span className="text-teal-200 text-[10px] block">Total Interest Outflow</span>
              <span className="font-extrabold text-sm text-[#E5A93C]">₹{(totalInterest / 100000).toFixed(2)}L</span>
            </div>
            <div>
              <span className="text-teal-200 text-[10px] block">Total Repayment</span>
              <span className="font-black text-sm text-white">₹{(totalPayment / 100000).toFixed(2)}L</span>
            </div>
          </div>

          {/* Section 80E Deduction */}
          <div className="bg-white/15 p-3 rounded-2xl border border-[#E5A93C]/40 space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#E5A93C] flex items-center gap-1">
              <Percent size={12} /> Section 80E Income Tax Benefit (8 Yrs)
            </span>
            <p className="text-sm font-black text-white">
              Save up to ₹{totalTaxSaved8Years.toLocaleString('en-IN')}
            </p>
            <p className="text-[10px] text-teal-100 leading-tight">
              Deduct 100% of education loan interest with NO upper monetary ceiling under the Old Tax Regime.
            </p>
          </div>

          {/* RBI LRS TCS Highlight */}
          <div className="bg-emerald-950/40 p-3 rounded-2xl border border-emerald-400/30 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-emerald-300 text-[11px]">RBI TCS on Education Loan</p>
              <p className="text-[10px] text-emerald-100">0.5% TCS above ₹7L vs 20% on self-funded</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-[#E5A93C]">Save ₹{tcsSavings.toLocaleString('en-IN')}</span>
              <span className="text-[9px] block text-emerald-200">upfront cash preserved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Non-Collateral vs Collateral Comparison */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-[#0D3B43] flex items-center gap-2">
          <ShieldCheck className="text-[#008779] w-5 h-5" /> Indian Bank Selection Matrix for Global Degrees
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Public Sector */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-extrabold text-slate-900 text-sm">Public Banks (SBI/BOB)</h4>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Best Rates</span>
            </div>
            <div className="space-y-1.5 text-slate-700">
              <p>• <strong>Interest Rate:</strong> 8.25% - 9.30% (EBLR linked)</p>
              <p>• <strong>Non-Collateral Cap:</strong> Up to ₹7.5 Lakhs (CGFSEL scheme), or up to ₹50L for premier global institutes.</p>
              <p>• <strong>Collateral:</strong> Property, Fixed Deposit, or LIC policies for loans ₹7.5L to ₹1.5 Cr.</p>
              <p>• <strong>Turnaround:</strong> 18-25 business days.</p>
            </div>
            <a 
              href="https://www.vidyalakshmi.co.in" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#008779] font-bold flex items-center gap-1 hover:underline pt-1 text-[11px]"
            >
              Apply via Vidya Lakshmi Portal <ExternalLink size={11} />
            </a>
          </div>

          {/* Private Banks */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-extrabold text-slate-900 text-sm">Private Banks (Axis/ICICI)</h4>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">Balanced</span>
            </div>
            <div className="space-y-1.5 text-slate-700">
              <p>• <strong>Interest Rate:</strong> 9.50% - 11.25%</p>
              <p>• <strong>Non-Collateral Cap:</strong> Up to ₹40 Lakhs based on GRE scores and co-applicant ITRs.</p>
              <p>• <strong>Co-Applicant:</strong> Parents with ₹50,000+/month verifiable salary.</p>
              <p>• <strong>Turnaround:</strong> 7-12 business days.</p>
            </div>
            <a 
              href="https://www.axisbank.com/retail/loans/education-loan" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#008779] font-bold flex items-center gap-1 hover:underline pt-1 text-[11px]"
            >
              Axis Education Loan Rules <ExternalLink size={11} />
            </a>
          </div>

          {/* Specialized NBFCs */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-extrabold text-slate-900 text-sm">NBFCs (Credila/Avanse)</h4>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">High Unsecured</span>
            </div>
            <div className="space-y-1.5 text-slate-700">
              <p>• <strong>Interest Rate:</strong> 10.75% - 13.00% (Floating)</p>
              <p>• <strong>Non-Collateral Cap:</strong> Up to ₹75 Lakhs without any property pledge.</p>
              <p>• <strong>Pre-Visa Sanction:</strong> Issues formal sanction letters for German blocked accounts and US I-20 proof within 72 hours.</p>
              <p>• <strong>Turnaround:</strong> 3-5 business days.</p>
            </div>
            <a 
              href="https://www.credila.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#008779] font-bold flex items-center gap-1 hover:underline pt-1 text-[11px]"
            >
              HDFC Credila Direct Portal <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}