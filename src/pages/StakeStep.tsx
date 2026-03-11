import React, { useState } from 'react';
import { useStore } from '../store';
import { Button } from '../components/UI';
import { motion } from 'motion/react';
import { ArrowRight, Info } from 'lucide-react';

export default function StakeStep({ onNext }: { onNext: () => void }) {
  const { wallet, stake, getStakingAPY } = useStore();
  const [amount, setAmount] = useState<string>('1000');
  const [isStaking, setIsStaking] = useState(false);

  const usdValue = parseFloat(amount) || 0;
  const tokenAAmount = usdValue * 0.3;
  const tokenBAmount = usdValue * 0.7;

  const handleStake = () => {
    setIsStaking(true);
    setTimeout(() => {
      stake(usdValue);
      setIsStaking(false);
      onNext();
    }, 1200);
  };

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <p className="text-lg md:text-xl text-zinc-400 max-w-xl">
          To fuel the bank, you provide a balanced mix of <span className="text-white font-bold">Token A (30%)</span> and <span className="text-white font-bold">Token B (70%)</span>. 
          This creates the foundation for your credit power.
        </p>
      </div>

      <div className="space-y-8">
        <div className="relative">
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-transparent text-6xl md:text-8xl lg:text-[12rem] font-bold text-display outline-none tracking-tighter text-emerald-500"
          />
          <span className="absolute bottom-4 left-0 text-xs font-mono tracking-widest uppercase text-zinc-600">Amount in USD</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <p className="text-xs font-mono tracking-widest uppercase text-zinc-500">Required Assets</p>
            <div className="flex gap-4">
              <div className="flex-1 p-6 glass-panel">
                <p className="text-2xl font-bold">${tokenAAmount.toLocaleString()}</p>
                <p className="text-xs text-zinc-500">Token A (30%)</p>
              </div>
              <div className="flex-1 p-6 glass-panel">
                <p className="text-2xl font-bold">${tokenBAmount.toLocaleString()}</p>
                <p className="text-xs text-zinc-500">Token B (70%)</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-mono tracking-widest uppercase text-zinc-500">Expected Yield</p>
            <div className="p-6 glass-panel flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold text-emerald-500">{getStakingAPY().toFixed(1)}%</p>
                <p className="text-xs text-zinc-500">Annual Percentage Yield</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">+${(usdValue * (getStakingAPY() / 100)).toFixed(0)}</p>
                <p className="text-xs text-zinc-500">Est. Yearly Profit</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
        <Button 
          onClick={handleStake}
          disabled={isStaking || usdValue <= 0}
          className="w-full md:w-auto justify-center group flex items-center gap-4 px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl rounded-full bg-emerald-500 text-black hover:bg-emerald-400 transition-all"
        >
          {isStaking ? 'Fueling Protocol...' : 'Fuel the Protocol'}
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </Button>
        <div className="flex items-center gap-3 text-zinc-500">
          <Info className="w-4 h-4 shrink-0" />
          <span className="text-xs italic">Assets will be locked for 30 days to ensure stability.</span>
        </div>
      </div>
    </div>
  );
}
