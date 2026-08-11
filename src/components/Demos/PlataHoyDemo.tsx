import React, { useState, useMemo } from 'react';
import { TrendingUp, DollarSign, Share2, Check } from 'lucide-react';

export const PlataHoyDemo: React.FC = () => {
  const [initialAmount, setInitialAmount] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(100);
  const [annualRate, setAnnualRate] = useState<number>(8);
  const [years, setYears] = useState<number>(20);
  const [copied, setCopied] = useState(false);

  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;

  const calculation = useMemo(() => {
    let balance = initialAmount;
    let totalInvested = initialAmount;
    const historyWithInterest: number[] = [initialAmount];
    const historyInvested: number[] = [initialAmount];

    for (let m = 1; m <= totalMonths; m++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      totalInvested += monthlyContribution;
      if (m % 12 === 0) {
        historyWithInterest.push(Math.round(balance));
        historyInvested.push(totalInvested);
      }
    }

    const totalProfit = balance - totalInvested;
    const avgReturn = totalInvested > 0 ? ((totalProfit / totalInvested) * 100) : 0;

    return {
      finalBalance: Math.round(balance),
      totalInvested,
      totalProfit: Math.round(totalProfit),
      avgReturn: parseFloat(avgReturn.toFixed(1)),
      historyWithInterest,
      historyInvested
    };
  }, [initialAmount, monthlyContribution, annualRate, totalMonths, monthlyRate]);

  const scenarios = [
    { name: 'Conservador', rate: 5, color: 'bg-emerald-500' },
    { name: 'Moderado', rate: 8, color: 'bg-blue-500' },
    { name: 'Agresivo', rate: 12, color: 'bg-purple-500' },
  ];

  const handleShare = () => {
    const text = `💰 Con $${initialAmount.toLocaleString('es-AR')} y aportes de $${monthlyContribution}/mes al ${annualRate}% anual durante ${years} años → $${calculation.finalBalance.toLocaleString('es-AR')} finales. Simulalo en PlataHoy.`;

    if (navigator.share) {
      navigator.share({ title: 'PlataHoy - Calculadora Interés Compuesto', text, url: 'https://platahoy.vercel.app' });
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`$${calculation.finalBalance.toLocaleString('es-AR')} (Ganancia: $${calculation.totalProfit.toLocaleString('es-AR')})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const maxChartValue = Math.max(...calculation.historyWithInterest);

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-4 md:p-6 border border-slate-800 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              PlataHoy <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full font-mono">Calculadora</span>
            </h3>
            <p className="text-xs text-slate-400">Calculadora de Interés Compuesto</p>
          </div>
        </div>
        <button
          onClick={handleShare}
          className="text-xs px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md font-medium transition-colors flex items-center gap-1.5"
        >
          <Share2 className="w-3.5 h-3.5" /> Compartir
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Parámetros de Inversión</h4>

          <div>
            <label className="text-xs text-slate-300 flex justify-between mb-1">
              <span>Monto Inicial ($)</span>
              <span className="font-mono text-emerald-400">${initialAmount.toLocaleString('es-AR')}</span>
            </label>
            <input
              type="number"
              min="0"
              value={initialAmount}
              onChange={(e) => setInitialAmount(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 flex justify-between mb-1">
              <span>Aporte Mensual ($)</span>
              <span className="font-mono text-emerald-400">${monthlyContribution.toLocaleString('es-AR')}</span>
            </label>
            <input
              type="number"
              min="0"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 flex justify-between mb-1">
              <span>Tasa de Interés Anual (%)</span>
              <span className="font-mono text-emerald-400">{annualRate}%</span>
            </label>
            <input
              type="number"
              min="0"
              value={annualRate}
              onChange={(e) => setAnnualRate(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 flex justify-between mb-1">
              <span>Años de Inversión</span>
              <span className="font-mono text-emerald-400">{years} años</span>
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          {/* Scenario Buttons */}
          <div className="pt-2 border-t border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-2">Escenarios preconfigurados:</span>
            <div className="flex gap-2">
              {scenarios.map((s) => (
                <button
                  key={s.name}
                  onClick={() => setAnnualRate(s.rate)}
                  className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    annualRate === s.rate
                      ? `${s.color} text-white shadow-lg`
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {s.name} ({s.rate}%)
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Total Final</span>
              <span className="text-lg font-black text-emerald-400 font-mono">${calculation.finalBalance.toLocaleString('es-AR')}</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Total Aportado</span>
              <span className="text-lg font-black text-blue-400 font-mono">${calculation.totalInvested.toLocaleString('es-AR')}</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Ganancia</span>
              <span className="text-lg font-black text-purple-400 font-mono">+${calculation.totalProfit.toLocaleString('es-AR')}</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Rendimiento</span>
              <span className="text-lg font-black text-amber-400 font-mono">{calculation.avgReturn}%</span>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Evolución Patrimonial</span>
            <div className="space-y-2">
              {calculation.historyWithInterest.map((value, idx) => {
                const invested = calculation.historyInvested[idx];
                const yearLabel = idx;
                const widthPercent = (value / maxChartValue) * 100;
                const investedWidth = (invested / maxChartValue) * 100;
                return (
                  <div key={idx} className="flex items-center gap-2 text-[10px]">
                    <span className="w-8 text-slate-500 font-mono shrink-0">Año {yearLabel}</span>
                    <div className="flex-1 h-5 bg-slate-900 rounded overflow-hidden relative">
                      <div
                        className="absolute inset-y-0 left-0 bg-blue-500/40 rounded"
                        style={{ width: `${investedWidth}%` }}
                      />
                      <div
                        className="absolute inset-y-0 left-0 bg-emerald-500/60 rounded"
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                    <span className="w-20 text-right text-emerald-400 font-mono shrink-0">${value.toLocaleString('es-AR')}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-3 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-emerald-500/60" />
                <span className="text-[10px] text-slate-400">Con Interés</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-blue-500/40" />
                <span className="text-[10px] text-slate-400">Aportado</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <DollarSign className="w-3.5 h-3.5" />}
            {copied ? '¡Copiado!' : 'Copiar Resultado'}
          </button>
        </div>
      </div>
    </div>
  );
};
