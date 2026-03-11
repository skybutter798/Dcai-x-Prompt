import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from './store';
import { cn } from './components/UI';
import { ChevronRight, ChevronLeft, Wallet, Shield, Zap, Info, ArrowRight } from 'lucide-react';

// New Artistic Pages
import IntroStep from './pages/IntroStep';
import StakeStep from './pages/StakeStep';
import BorrowStep from './pages/BorrowStep';
import OverviewStep from './pages/OverviewStep';

const STEPS = [
  { id: 'intro', title: 'The Beginning', subtitle: 'Welcome to the future of liquidity' },
  { id: 'stake', title: 'The Fuel', subtitle: 'Power the protocol with your assets' },
  { id: 'borrow', title: 'The Power', subtitle: 'Unlock credit without selling' },
  { id: 'overview', title: 'The Horizon', subtitle: 'Monitor your growing empire' },
];

export default function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { updatePrices, wallet, protocol } = useStore();

  useEffect(() => {
    const interval = setInterval(() => {
      updatePrices();
    }, 5000);
    return () => clearInterval(interval);
  }, [updatePrices]);

  const nextStep = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const currentStep = STEPS[currentStepIndex];
  const totalWalletValue = wallet.tokenA + wallet.tokenB + (wallet.eth * protocol.ethPrice) + (wallet.btc * protocol.btcPrice) + wallet.nft.floorPrice;

  return (
    <div className="min-h-screen selection:bg-emerald-500/30 font-sans">
      <div className="atmosphere" />
      
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 h-20 md:h-24 px-6 md:px-12 flex items-center justify-between z-50">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg">DB</div>
          <span className="text-xl font-bold tracking-tighter text-display">DUALBANK</span>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden lg:block text-right">
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-[0.2em]">Available Balance</p>
            <p className="text-lg font-medium tracking-tight">${totalWalletValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-md">
            <Wallet className="w-5 h-5 text-zinc-400" />
          </div>
        </div>
      </header>

      {/* Step Progress Rail */}
      <div className="hidden md:flex fixed left-12 top-1/2 -translate-y-1/2 flex-col gap-8 z-40">
        {STEPS.map((step, idx) => (
          <div key={step.id} className="flex items-center gap-4 group cursor-pointer" onClick={() => setCurrentStepIndex(idx)}>
            <div className={cn(
              "w-1 h-8 rounded-full transition-all duration-500",
              idx === currentStepIndex ? "bg-emerald-500 h-12" : "bg-white/10 group-hover:bg-white/30"
            )} />
            <span className={cn(
              "text-[10px] font-mono tracking-[0.3em] uppercase transition-all duration-500",
              idx === currentStepIndex ? "text-emerald-500 opacity-100" : "text-white opacity-0 -translate-x-2 group-hover:opacity-30 group-hover:translate-x-0"
            )}>
              {step.id}
            </span>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <main className="relative pt-28 md:pt-32 pb-32 px-6 md:px-12 lg:px-32 min-h-screen flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-6xl mx-auto"
          >
            <div className="mb-12">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.5, y: 0 }}
                className="text-xs font-mono tracking-[0.4em] uppercase mb-4"
              >
                Phase 0{currentStepIndex + 1} // {currentStep.subtitle}
              </motion.p>
              <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold text-display leading-none tracking-tighter">
                {currentStep.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7">
                {currentStep.id === 'intro' && <IntroStep onNext={nextStep} />}
                {currentStep.id === 'stake' && <StakeStep onNext={nextStep} />}
                {currentStep.id === 'borrow' && <BorrowStep onNext={nextStep} />}
                {currentStep.id === 'overview' && <OverviewStep />}
              </div>

              <div className="lg:col-span-5">
                <div className="glass-panel p-8 space-y-8">
                  <h3 className="text-xl font-bold text-display italic">Protocol Insights</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <span className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Global TVL</span>
                      <span className="text-2xl font-bold tracking-tighter">$1.25M</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Active Yield</span>
                      <span className="text-2xl font-bold tracking-tighter text-emerald-500">12.4% APY</span>
                    </div>
                    <div className="h-px bg-white/5" />
                    <div className="flex gap-4">
                      <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Risk Level</p>
                        <p className="text-sm font-bold text-emerald-500">Low</p>
                      </div>
                      <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Liquidity</p>
                        <p className="text-sm font-bold">Deep</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Controls */}
      <div className="fixed bottom-0 left-0 right-0 p-6 md:bottom-12 md:left-12 md:right-12 md:p-0 flex justify-between items-center z-50 bg-black/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-t border-white/10 md:border-none">
        <button 
          onClick={prevStep}
          disabled={currentStepIndex === 0}
          className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs font-mono tracking-widest uppercase opacity-40 hover:opacity-100 transition-opacity disabled:hidden"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex gap-1.5 md:gap-2">
          {STEPS.map((_, idx) => (
            <div 
              key={idx} 
              className={cn(
                "w-8 md:w-12 h-1 transition-all duration-500",
                idx === currentStepIndex ? "bg-emerald-500" : "bg-white/10"
              )} 
            />
          ))}
        </div>

        <button 
          onClick={nextStep}
          disabled={currentStepIndex === STEPS.length - 1}
          className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs font-mono tracking-widest uppercase opacity-40 hover:opacity-100 transition-opacity disabled:hidden"
        >
          Next Phase
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
