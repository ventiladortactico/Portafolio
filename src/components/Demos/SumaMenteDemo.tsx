import React, { useState } from 'react';
import { Calculator, Binary, HeartPulse, Zap, ArrowRight, RotateCcw, Copy, Check, Code2 } from 'lucide-react';

export const SumaMenteDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'finance' | 'programming' | 'health' | 'physics'>('finance');
  const [copied, setCopied] = useState(false);

  // 1. Finance State
  const [capital, setCapital] = useState<number>(100000);
  const [rate, setRate] = useState<number>(42); // TNA %
  const [years, setYears] = useState<number>(3);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(10000);

  // 2. Programming State
  const [decNumber, setDecNumber] = useState<number>(255);

  // 3. Health State
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(178); // cm

  // 4. Ohm Law State
  const [voltage, setVoltage] = useState<string>('12');
  const [current, setCurrent] = useState<string>('2');
  const [resistance, setResistance] = useState<string>('6');
  const [solveFor, setSolveFor] = useState<'R' | 'V' | 'I'>('R');

  // Compound Interest Calculation
  const calculateCompound = () => {
    let balance = capital;
    const monthlyRate = rate / 100 / 12;
    const totalMonths = years * 12;
    let totalInvested = capital;

    for (let i = 0; i < totalMonths; i++) {
      balance += balance * monthlyRate + monthlyContribution;
      totalInvested += monthlyContribution;
    }

    const totalProfit = balance - totalInvested;
    return {
      finalBalance: Math.round(balance),
      totalInvested,
      totalProfit: Math.round(totalProfit)
    };
  };

  const compoundResult = calculateCompound();

  // Programming Conversion
  const binaryVal = (decNumber || 0).toString(2);
  const hexVal = (decNumber || 0).toString(16).toUpperCase();
  const octalVal = (decNumber || 0).toString(8);
  const asciiVal = decNumber >= 32 && decNumber <= 126 ? String.fromCharCode(decNumber) : 'No imprimible';

  // Health IMC Calculation
  const heightMeters = height / 100;
  const bmi = heightMeters > 0 ? parseFloat((weight / (heightMeters * heightMeters)).toFixed(1)) : 0;
  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { category: 'Bajo Peso', color: 'text-amber-400', bg: 'bg-amber-500/20' };
    if (val < 25) return { category: 'Peso Normal (Saludable)', color: 'text-emerald-400', bg: 'bg-emerald-500/20' };
    if (val < 30) return { category: 'Sobrepeso', color: 'text-amber-400', bg: 'bg-amber-500/20' };
    return { category: 'Obesidad', color: 'text-rose-400', bg: 'bg-rose-500/20' };
  };
  const bmiInfo = getBmiCategory(bmi);

  // Ohm Law Calculation
  const calculateOhm = () => {
    const v = parseFloat(voltage) || 0;
    const i = parseFloat(current) || 0;
    const r = parseFloat(resistance) || 0;

    if (solveFor === 'R') return { label: 'Resistencia (R)', value: i > 0 ? (v / i).toFixed(2) : 'N/A', unit: 'Ω (Ohmios)' };
    if (solveFor === 'V') return { label: 'Voltaje (V)', value: (i * r).toFixed(2), unit: 'V (Voltios)' };
    return { label: 'Corriente (I)', value: r > 0 ? (v / r).toFixed(2) : 'N/A', unit: 'A (Amperios)' };
  };
  const ohmResult = calculateOhm();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-4 md:p-6 border border-slate-800 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              SumaMente <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full font-mono">+40 Módulos</span>
            </h3>
            <p className="text-xs text-slate-400">Prueba interactiva de simuladores de cálculo científico y técnico</p>
          </div>
        </div>


      </div>

      {/* Navigation tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => setActiveTab('finance')}
          className={`p-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'finance'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-950'
              : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <Calculator className="w-4 h-4" /> Interés Compuesto
        </button>

        <button
          onClick={() => setActiveTab('programming')}
          className={`p-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'programming'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-950'
              : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <Binary className="w-4 h-4" /> Conversor Numérico
        </button>

        <button
          onClick={() => setActiveTab('health')}
          className={`p-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'health'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-950'
              : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <HeartPulse className="w-4 h-4" /> Índice IMC Médico
        </button>

        <button
          onClick={() => setActiveTab('physics')}
          className={`p-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'physics'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-950'
              : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <Zap className="w-4 h-4" /> Ley de Ohm
        </button>
      </div>

      {/* Tab 1: Finance */}
      {activeTab === 'finance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-xl border border-slate-800">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Parámetros Financieros</h4>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Capital Inicial ($)</label>
              <input
                type="number"
                value={capital}
                onChange={(e) => setCapital(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Aporte Mensual ($)</label>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Tasa TNA Anual (%)</label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Plazo (Años)</label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Proyección Estimada</span>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <span className="text-xs text-slate-400 block">PATRIMONIO FINAL ACUMULADO</span>
                <span className="text-2xl font-black text-blue-400 font-mono">
                  ${compoundResult.finalBalance.toLocaleString('es-AR')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 block">Total Invertido</span>
                  <span className="font-bold text-slate-200 font-mono">${compoundResult.totalInvested.toLocaleString('es-AR')}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 block">Ganancia por Interés</span>
                  <span className="font-bold text-emerald-400 font-mono">+${compoundResult.totalProfit.toLocaleString('es-AR')}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleCopy(`Capital final proyectado: $${compoundResult.finalBalance.toLocaleString('es-AR')} (Ganancia: $${compoundResult.totalProfit.toLocaleString('es-AR')})`)}
              className="mt-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? '¡Copiado!' : 'Copiar Resultado'}
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Programming */}
      {activeTab === 'programming' && (
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <div>
            <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">
              Ingresa un Número Decimal (Base 10)
            </label>
            <input
              type="number"
              value={decNumber}
              onChange={(e) => setDecNumber(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full max-w-xs bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-base text-white font-mono focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[11px] text-blue-400 font-bold uppercase">Binario (Base 2)</span>
              <p className="font-mono text-sm font-bold text-white break-all">{binaryVal}</p>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[11px] text-purple-400 font-bold uppercase">Hexadecimal (Base 16)</span>
              <p className="font-mono text-sm font-bold text-white">0x{hexVal}</p>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[11px] text-amber-400 font-bold uppercase">Octal (Base 8)</span>
              <p className="font-mono text-sm font-bold text-white">{octalVal}</p>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[11px] text-emerald-400 font-bold uppercase">Carácter ASCII</span>
              <p className="font-mono text-sm font-bold text-white">'{asciiVal}'</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Health IMC */}
      {activeTab === 'health' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-xl border border-slate-800">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Datos Antropométricos</h4>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Peso Corporal: <strong>{weight} kg</strong></span>
              </div>
              <input
                type="range"
                min="40"
                max="150"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Estatura: <strong>{height} cm</strong></span>
              </div>
              <input
                type="range"
                min="130"
                max="210"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
          </div>

          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Resultado IMC</span>

              <div className="text-center py-4 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-4xl font-black text-white font-mono">{bmi}</span>
                <span className="text-xs text-slate-500 block mt-1">kg/m²</span>
              </div>

              <div className={`p-3 rounded-lg border border-slate-800 text-center ${bmiInfo.bg}`}>
                <span className={`font-bold text-sm ${bmiInfo.color}`}>{bmiInfo.category}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Ohm Law */}
      {activeTab === 'physics' && (
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex gap-2 items-center mb-2">
            <span className="text-xs text-slate-400 font-bold uppercase">Calcular variable:</span>
            {(['R', 'V', 'I'] as const).map((variable) => (
              <button
                key={variable}
                onClick={() => setSolveFor(variable)}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                  solveFor === variable ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {variable === 'R' ? 'Resistencia (R)' : variable === 'V' ? 'Voltaje (V)' : 'Corriente (I)'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {solveFor !== 'V' && (
              <div>
                <label className="text-xs text-slate-400 block mb-1">Voltaje V (Voltios)</label>
                <input
                  type="number"
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white font-mono"
                />
              </div>
            )}

            {solveFor !== 'I' && (
              <div>
                <label className="text-xs text-slate-400 block mb-1">Corriente I (Amperios)</label>
                <input
                  type="number"
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white font-mono"
                />
              </div>
            )}

            {solveFor !== 'R' && (
              <div>
                <label className="text-xs text-slate-400 block mb-1">Resistencia R (Ohmios Ω)</label>
                <input
                  type="number"
                  value={resistance}
                  onChange={(e) => setResistance(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white font-mono"
                />
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-900 rounded-lg border border-amber-500/30 flex justify-between items-center">
            <span className="text-xs text-slate-300 font-medium">{ohmResult.label}:</span>
            <span className="text-xl font-black text-amber-400 font-mono">
              {ohmResult.value} <span className="text-xs text-amber-200">{ohmResult.unit}</span>
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
