import React, { useState } from 'react';
import { useStore } from '../store';
import { Button, cn } from '../components/UI';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function BorrowStep({ onNext }: { onNext: () => void }) {
  const { user, borrow, getMaxBorrow, getBorrowAPR, getHealthFactor } = useStore();
  const [amount, setAmount] = useState<string>('500');
  const [isBorrowing, setIsBorrowing] = useState(false);

  const borrowValue = parseFloat(amount) || 0;
  const maxBorrow = getMaxBorrow();
  const healthFactor = getHealthFactor();

  const handleBorrow = () => {
    setIsBorrowing(true);
    setTimeout(() => {
      borrow(borrowValue);
      setIsBorrowing(false);
      onNext();
    }, 1200);
  };

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <p className="text-lg md:text-xl text-zinc-400 max-w-xl">
          Your credit power is now active. You can borrow <span className="text-white font-bold">Stablecoins</span> against your collateral at institutional rates.
        </p>
      </div>

      <div className="space-y-8">
        <div className="relative">
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-transparent text-6xl md:text-8xl lg:text-[12rem] font-bold text-display outline-none tracking-tighter text-blue-500"
          />
          <span className="absolute bottom-4 left-0 text-xs font-mono tracking-widest uppercase text-zinc-600">Borrow Amount (USDC)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 glass-panel">
            <p className="text-xs font-mono tracking-widest uppercase text-zinc-500 mb-2">Max Borrow</p>
            <p className="text-3xl font-bold">${maxBorrow.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="p-6 glass-panel">
            <p className="text-xs font-mono tracking-widest uppercase text-zinc-500 mb-2">Interest Rate</p>
            <p className="text-3xl font-bold text-blue-400">{getBorrowAPR().toFixed(1)}%</p>
          </div>
          <div className="p-6 glass-panel">
            <p className="text-xs font-mono tracking-widest uppercase text-zinc-500 mb-2">Health Factor</p>
            <p className={cn(
              "text-3xl font-bold",
              healthFactor > 2 ? "text-emerald-500" : "text-amber-500"
            )}>
              {healthFactor > 100 ? '>100' : healthFactor.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
        <Button 
          onClick={handleBorrow}
          disabled={isBorrowing || borrowValue <= 0 || borrowValue > maxBorrow}
          className="w-full md:w-auto justify-center group flex items-center gap-4 px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl rounded-full bg-blue-500 text-white hover:bg-blue-400 transition-all"
        >
          {isBorrowing ? 'Unlocking Credit...' : 'Unlock Credit'}
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </Button>
        <div className="flex items-center gap-3 text-zinc-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="text-xs italic">Your position is protected by our automated risk engine.</span>
        </div>
      </div>
    </div>
  );
}
