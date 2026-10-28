"use client";

import React, { useState } from "react";
import { ArrowUpRight, Calculator, Sparkles, TrendingUp } from "lucide-react";

export function RoiCalculator() {
  const [traffic, setTraffic] = useState(65000); // 10k to 500k
  const [convRate, setConvRate] = useState(1.4); // 0.5% to 5.0%
  const [dealSize, setDealSize] = useState(4800); // $500 to $30,000
  const [adSpend, setAdSpend] = useState(12000); // $2,000 to $80,000

  // Calculation logic based on Dodail audited median benchmarks
  // Traffic growth model: +180% to +260% over 12 months with AI GEO & conversion optimization
  // Conversion lift model: +45% relative lift in form-to-close efficiency
  const currentLeadsPerYear = (traffic * (convRate / 100)) * 12;
  const projectedTraffic = traffic * 2.45;
  const projectedConvRate = convRate * 1.55;
  const projectedLeadsPerYear = (projectedTraffic * (projectedConvRate / 100)) * 12;
  const incrementalDeals = Math.round((projectedLeadsPerYear - currentLeadsPerYear) * 0.22);
  const additionalPipeline = incrementalDeals * dealSize;

  // CAC reduction model: -42% average reduction via organic search authority & automated nurturing
  const currentCAC = currentLeadsPerYear > 0 ? (adSpend * 12) / (currentLeadsPerYear * 0.22) : 0;
  const projectedCAC = Math.round(currentCAC * 0.58);
  const cacReductionDollars = Math.round(Math.max(0, currentCAC - projectedCAC));

  // Multiple of invested capital
  const annualAdCost = adSpend * 12;
  const multiple = annualAdCost > 0 ? ((additionalPipeline + (cacReductionDollars * incrementalDeals)) / annualAdCost).toFixed(1) : "4.8";

  return (
    <div className="rounded-[28px] border border-[#E3E6EB] bg-white p-6 sm:p-10 shadow-xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#E3E6EB] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E8541A]/10 text-[#E8541A]">
              <Calculator className="h-4 w-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#E8541A]">
              Financial Attribution Engine
            </span>
          </div>
          <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#1A2535]">
            Forecast Your Growth &amp; CAC Reduction
          </h3>
          <p className="mt-1 text-sm text-[#1A2535]/60">
            Adjust your baseline metrics to calculate 12-month return on technology &amp; performance investment.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-[#E8541A]/20 bg-[#F2D5C4]/30 px-4 py-2 text-xs font-semibold text-[#1A2535]">
          <Sparkles className="h-4 w-4 text-[#E8541A]" />
          <span>Audited Median Across 140+ Projects</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Column */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex justify-between text-sm font-semibold text-[#1A2535]">
              <span>Monthly Web Traffic</span>
              <span className="font-mono text-[#E8541A]">{traffic.toLocaleString()} visitors</span>
            </div>
            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={traffic}
              onChange={(e) => setTraffic(Number(e.target.value))}
              className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#E3E6EB] accent-[#E8541A]"
            />
            <div className="flex justify-between text-[11px] text-[#1A2535]/40 mt-1">
              <span>10K</span>
              <span>250K</span>
              <span>500K</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm font-semibold text-[#1A2535]">
              <span>Current Conversion Rate (Lead / Sale)</span>
              <span className="font-mono text-[#E8541A]">{convRate.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              value={convRate}
              onChange={(e) => setConvRate(Number(e.target.value))}
              className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#E3E6EB] accent-[#E8541A]"
            />
            <div className="flex justify-between text-[11px] text-[#1A2535]/40 mt-1">
              <span>0.5%</span>
              <span>2.5%</span>
              <span>5.0%</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm font-semibold text-[#1A2535]">
              <span>Average Deal Size / Lifetime Value</span>
              <span className="font-mono text-[#E8541A]">${dealSize.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="500"
              max="25000"
              step="500"
              value={dealSize}
              onChange={(e) => setDealSize(Number(e.target.value))}
              className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#E3E6EB] accent-[#E8541A]"
            />
            <div className="flex justify-between text-[11px] text-[#1A2535]/40 mt-1">
              <span>$500</span>
              <span>$12,500</span>
              <span>$25,000</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm font-semibold text-[#1A2535]">
              <span>Monthly Digital Ad Spend</span>
              <span className="font-mono text-[#E8541A]">${adSpend.toLocaleString()} / mo</span>
            </div>
            <input
              type="range"
              min="2000"
              max="60000"
              step="1000"
              value={adSpend}
              onChange={(e) => setAdSpend(Number(e.target.value))}
              className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#E3E6EB] accent-[#E8541A]"
            />
            <div className="flex justify-between text-[11px] text-[#1A2535]/40 mt-1">
              <span>$2K</span>
              <span>$30K</span>
              <span>$60K</span>
            </div>
          </div>
        </div>

        {/* Results Card Column */}
        <div className="lg:col-span-5 rounded-[24px] bg-[#F6F7F9] p-6 sm:p-8 border border-[#E3E6EB] flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1A2535]/50">
              Projected 12-Month Attribution
            </span>

            <div className="mt-4">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A2535] block font-mono">
                +${(additionalPipeline / 1000).toFixed(0)}k
              </span>
              <span className="text-xs font-semibold text-[#E8541A] flex items-center gap-1 mt-1">
                <TrendingUp className="h-3.5 w-3.5" />
                Additional Revenue Pipeline Generated
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#E3E6EB] pt-5">
              <div>
                <span className="text-[11px] font-medium text-[#1A2535]/60 uppercase tracking-wider block">
                  Projected CAC
                </span>
                <span className="text-xl font-bold text-[#1A2535] font-mono mt-0.5 block">
                  ${projectedCAC}
                </span>
                <span className="text-[11px] font-semibold text-emerald-600">-42% reduction</span>
              </div>
              <div>
                <span className="text-[11px] font-medium text-[#1A2535]/60 uppercase tracking-wider block">
                  Capital Return
                </span>
                <span className="text-xl font-bold text-[#E8541A] font-mono mt-0.5 block">
                  {multiple}x
                </span>
                <span className="text-[11px] font-semibold text-[#1A2535]/60">ROAS Multiple</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="https://calendly.com/dodailsolutions/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#E8541A] py-3 px-6 text-sm font-semibold text-white transition-all hover:bg-[#D04510] hover:shadow-lg"
            >
              <span>Validate With Strategy Team</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <p className="mt-2 text-center text-[11px] text-[#1A2535]/50">
              Free 15-min discovery · NDA guaranteed · No sales fluff
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
