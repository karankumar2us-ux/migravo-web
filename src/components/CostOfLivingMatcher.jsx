import React, { useState } from 'react';
import { DollarSign, Landmark, TrendingDown, Home, Utensils, Bus, Shield, HeartHandshake } from 'lucide-react';

const CITIES_DATA = [
  {
    city: 'Berlin',
    country: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR',
    symbol: '€',
    exchangeRateINR: 90.5,
    rentStudio: 550,
    healthInsurance: 125,
    foodGroceries: 220,
    transit: 35, // discounted semester ticket
    miscellaneous: 100,
    monthlyTotal: 1030,
    statutoryMinimum: 992, // Sperrkonto monthly payout
    partTimeWageHourly: 13.0,
    weeklyMaxHours: 20
  },
  {
    city: 'Munich',
    country: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR',
    symbol: '€',
    exchangeRateINR: 90.5,
    rentStudio: 820,
    healthInsurance: 125,
    foodGroceries: 260,
    transit: 35,
    miscellaneous: 140,
    monthlyTotal: 1380,
    statutoryMinimum: 992,
    partTimeWageHourly: 14.0,
    weeklyMaxHours: 20
  },
  {
    city: 'New York / Jersey City',
    country: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    symbol: '$',
    exchangeRateINR: 84.0,
    rentStudio: 1400,
    healthInsurance: 180,
    foodGroceries: 450,
    transit: 132,
    miscellaneous: 250,
    monthlyTotal: 2412,
    statutoryMinimum: 1800,
    partTimeWageHourly: 16.5,
    weeklyMaxHours: 20
  },
  {
    city: 'Austin / Dallas',
    country: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    symbol: '$',
    exchangeRateINR: 84.0,
    rentStudio: 850,
    healthInsurance: 150,
    foodGroceries: 350,
    transit: 60,
    miscellaneous: 180,
    monthlyTotal: 1590,
    statutoryMinimum: 1400,
    partTimeWageHourly: 15.0,
    weeklyMaxHours: 20
  },
  {
    city: 'London',
    country: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    symbol: '£',
    exchangeRateINR: 108.0,
    rentStudio: 1050,
    healthInsurance: 65, // NHS surcharge amortised
    foodGroceries: 250,
    transit: 110,
    miscellaneous: 150,
    monthlyTotal: 1625,
    statutoryMinimum: 1334,
    partTimeWageHourly: 11.44, // National living wage
    weeklyMaxHours: 20
  },
  {
    city: 'Manchester',
    country: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    symbol: '£',
    exchangeRateINR: 108.0,
    rentStudio: 650,
    healthInsurance: 65,
    foodGroceries: 200,
    transit: 60,
    miscellaneous: 120,
    monthlyTotal: 1095,
    statutoryMinimum: 1023,
    partTimeWageHourly: 11.44,
    weeklyMaxHours: 20
  },
  {
    city: 'Toronto',
    country: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    symbol: 'CAD$',
    exchangeRateINR: 61.5,
    rentStudio: 1150,
    healthInsurance: 75,
    foodGroceries: 380,
    transit: 128,
    miscellaneous: 180,
    monthlyTotal: 1913,
    statutoryMinimum: 1720,
    partTimeWageHourly: 17.2,
    weeklyMaxHours: 24
  },
  {
    city: 'Melbourne',
    country: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    symbol: 'AUD$',
    exchangeRateINR: 55.0,
    rentStudio: 1300,
    healthInsurance: 50,
    foodGroceries: 400,
    transit: 160,
    miscellaneous: 200,
    monthlyTotal: 2110,
    statutoryMinimum: 2475,
    partTimeWageHourly: 24.1,
    weeklyMaxHours: 24
  },
  {
    city: 'Dublin',
    country: 'Ireland',
    flag: '🇮🇪',
    currency: 'EUR',
    symbol: '€',
    exchangeRateINR: 90.5,
    rentStudio: 950,
    healthInsurance: 60,
    foodGroceries: 280,
    transit: 65,
    miscellaneous: 150,
    monthlyTotal: 1505,
    statutoryMinimum: 1000,
    partTimeWageHourly: 12.7,
    weeklyMaxHours: 20
  }
];

export default function CostOfLivingMatcher() {
  const [selectedCityIndex, setSelectedCityIndex] = useState(0);
  const [workedHoursPerWeek, setWorkedHoursPerWeek] = useState(15);

  const city = CITIES_DATA[selectedCityIndex];
  const monthlyInr = Math.round(city.monthlyTotal * city.exchangeRateINR);

  // Student Part-Time Earning Simulation
  const monthlyPartTimeGross = Math.round(workedHoursPerWeek * city.partTimeWageHourly * 4.33);
  const monthlyPartTimeINR = Math.round(monthlyPartTimeGross * city.exchangeRateINR);
  const netDeficitOrSurplus = monthlyPartTimeGross - city.monthlyTotal;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold text-[#008779] bg-teal-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            City-Level Realities
          </span>
          <h2 className="text-xl font-extrabold text-[#0D3B43] flex items-center gap-2 mt-1">
            <DollarSign className="text-[#008779] w-6 h-6" /> Global City Cost-of-Living & Earning Matcher
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Realistic student budgets (rent, health insurance, food) and legal part-time earning offsets across top study destinations.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl text-right shrink-0">
          <span className="text-xl font-black text-[#008779]">₹{monthlyInr.toLocaleString('en-IN')}</span>
          <p className="text-[10px] font-bold text-slate-500">Monthly Total in INR</p>
        </div>
      </div>

      {/* City Chips */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 flex gap-2 overflow-x-auto no-scrollbar text-xs">
        {CITIES_DATA.map((c, idx) => (
          <button
            key={c.city}
            onClick={() => setSelectedCityIndex(idx)}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition ${
              selectedCityIndex === idx
                ? 'bg-[#0D3B43] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 border border-slate-200/60'
            }`}
          >
            <span>{c.flag} {c.city}</span>
          </button>
        ))}
      </div>

      {/* Main Budget Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Itemized Monthly Expense Breakdown */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-[#0D3B43] flex items-center gap-2">
                {city.flag} {city.city}, {city.country}
              </h3>
              <p className="text-xs text-slate-500">Average student monthly outflow based on student dorm or shared flat (WG)</p>
            </div>
            <span className="text-xs font-bold text-[#008779] bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              {city.symbol}{city.monthlyTotal.toLocaleString()} / month
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Home size={16} className="text-[#008779]" />
                <div>
                  <span className="font-bold text-slate-800 block">Shared Accommodation</span>
                  <span className="text-[10px] text-slate-400">Heating & Internet included</span>
                </div>
              </div>
              <span className="font-extrabold text-slate-900">{city.symbol}{city.rentStudio}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Utensils size={16} className="text-[#008779]" />
                <div>
                  <span className="font-bold text-slate-800 block">Food & Supermarkets</span>
                  <span className="text-[10px] text-slate-400">Self-cooked Indian groceries</span>
                </div>
              </div>
              <span className="font-extrabold text-slate-900">{city.symbol}{city.foodGroceries}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Shield size={16} className="text-[#008779]" />
                <div>
                  <span className="font-bold text-slate-800 block">Health Insurance</span>
                  <span className="text-[10px] text-slate-400">Public statutory coverage</span>
                </div>
              </div>
              <span className="font-extrabold text-slate-900">{city.symbol}{city.healthInsurance}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Bus size={16} className="text-[#008779]" />
                <div>
                  <span className="font-bold text-slate-800 block">Public Transportation</span>
                  <span className="text-[10px] text-slate-400">Subsidized student travel card</span>
                </div>
              </div>
              <span className="font-extrabold text-slate-900">{city.symbol}{city.transit}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100 text-xs flex justify-between items-center">
            <span className="font-bold text-slate-700">Official Monthly Embassy Living Mandate</span>
            <span className="font-extrabold text-slate-900">{city.symbol}{city.statutoryMinimum} / mo</span>
          </div>
        </div>

        {/* Right: Part-Time Working Simulator */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0D3B43] via-[#0E535D] to-[#008779] text-white p-6 rounded-3xl shadow-lg flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-bold text-[#E5A93C] uppercase tracking-wider block">Part-Time Student Earning Simulator</span>
            <h4 className="text-xl font-extrabold text-white mt-1">Legal Student Work Rights</h4>
            <p className="text-[11px] text-teal-100 mt-1">
              Minimum hourly wage: <strong>{city.symbol}{city.partTimeWageHourly.toFixed(2)}/hr</strong> (Legal cap: {city.weeklyMaxHours} hrs/week).
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-teal-100">
              <span>Worked Hours Per Week</span>
              <span className="text-[#E5A93C] font-black">{workedHoursPerWeek} hrs / week</span>
            </div>
            <input
              type="range"
              min={0}
              max={city.weeklyMaxHours}
              step={1}
              value={workedHoursPerWeek}
              onChange={(e) => setWorkedHoursPerWeek(Number(e.target.value))}
              className="w-full accent-[#E5A93C] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-teal-200">
              <span>0 hrs (Pure Study)</span>
              <span>{city.weeklyMaxHours} hrs (Legal Limit)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl text-xs border border-white/15">
            <div>
              <span className="text-teal-200 text-[10px] block">Monthly Part-Time Pay</span>
              <span className="font-black text-sm text-white">{city.symbol}{monthlyPartTimeGross.toLocaleString()}</span>
              <span className="text-[9px] block text-teal-200">≈ ₹{monthlyPartTimeINR.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-teal-200 text-[10px] block">Net Monthly Budget Status</span>
              <span className={`font-black text-sm ${netDeficitOrSurplus >= 0 ? 'text-emerald-300' : 'text-[#E5A93C]'}`}>
                {netDeficitOrSurplus >= 0 ? `+${city.symbol}${netDeficitOrSurplus} Surplus` : `-${city.symbol}${Math.abs(netDeficitOrSurplus)} Deficit`}
              </span>
              <span className="text-[9px] block text-teal-200">
                {netDeficitOrSurplus >= 0 ? 'Self-sustaining living!' : 'Funded by loan / savings'}
              </span>
            </div>
          </div>

          <p className="text-[10px] text-teal-100 leading-tight">
            *In countries like Germany and Australia, working 15-20 hours/week in student jobs (HiWi, tutoring, logistics) covers up to 80-100% of living expenses.
          </p>
        </div>
      </div>
    </div>
  );
}