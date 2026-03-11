import React from 'react';
import { useStore } from '../store';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Shield, Wallet, Gift } from 'lucide-react';
import { Button, cn } from '../components/UI';

export default function OverviewStep() {
  const { user, getStakingAPY, getHealthFactor, claimRewards } = useStore();
  const healthFactor = getHealthFactor();

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <p className="text-lg md:text-xl text-zinc-400 max-w-xl">
          Your empire is growing. Monitor your yields, manage your debt, and claim your rewards as they accrue.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-8 glass-panel border-emerald-500/20 bg-emerald-500/5">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-xs font-mono tracking-widest uppercase text-zinc-500 mb-1">Total Staked</p>
                <p className="text-4xl md:text-5xl font-bold text-display">${user.stakedUSD.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-mono tracking-widest uppercase text-zinc-500 mb-1">Net APY</p>
                <p className="text-2xl md:text-3xl font-bold text-emerald-500">+{getStakingAPY().toFixed(1)}%</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-zinc-400">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>Earning approximately ${(user.stakedUSD * (getStakingAPY() / 100) / 12).toFixed(2)} per month</span>
            </div>
          </div>

          <div className="p-8 glass-panel border-blue-500/20 bg-blue-500/5">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-xs font-mono tracking-widest uppercase text-zinc-500 mb-1">Active Debt</p>
                <p className="text-4xl md:text-5xl font-bold text-display">${user.borrowedUSD.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-mono tracking-widest uppercase text-zinc-500 mb-1">Health Factor</p>
                <p className={cn(
                  "text-2xl md:text-3xl font-bold",
                  healthFactor > 2 ? "text-emerald-500" : "text-amber-500"
                )}>
                  {healthFactor > 100 ? '>100' : healthFactor.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-zinc-400">
              <Shield className="w-4 h-4 text-blue-500" />
              <span>Your collateral is safely backing your credit.</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 md:p-8 glass-panel flex flex-col justify-between h-full">
            <div>
              <h4 className="text-xl md:text-2xl font-bold text-display mb-4 italic">Accumulated Rewards</h4>
              <p className="text-5xl md:text-6xl font-bold text-emerald-500 mb-2">${user.rewardsClaimable.toFixed(4)}</p>
              <p className="text-sm text-zinc-500">DualBank Governance Tokens (DBT)</p>
            </div>
            
            <div className="space-y-4 mt-12">
              <Button 
                onClick={claimRewards}
                className="w-full py-4 md:py-6 text-base md:text-lg rounded-full bg-white text-black hover:bg-emerald-500 transition-all flex items-center justify-center gap-3"
              >
                <Gift className="w-5 h-5" />
                Claim All Rewards
              </Button>
              <Button variant="outline" className="w-full py-4 md:py-6 text-base md:text-lg rounded-full border-white/10 hover:bg-white/5">
                Manage Positions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
