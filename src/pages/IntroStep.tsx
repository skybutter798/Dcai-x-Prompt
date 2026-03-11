import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Zap, Coins } from 'lucide-react';
import { Button } from '../components/UI';

export default function IntroStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <p className="text-lg md:text-2xl lg:text-3xl text-zinc-400 font-light leading-relaxed max-w-2xl">
          DualBank is a sophisticated liquidity engine designed for the next generation of capital efficiency. 
          <span className="text-white font-medium italic"> No jargon. No complexity. Just pure growth.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Coins, title: 'Fuel', desc: 'Stake dual assets to power the protocol.' },
          { icon: Zap, title: 'Power', desc: 'Unlock instant credit tiers based on your stake.' },
          { icon: Shield, title: 'Safety', desc: 'Institutional-grade risk management.' },
        ].map((item, idx) => (
          <motion.div 
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (idx * 0.1) }}
            className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
          >
            <item.icon className="w-8 h-8 text-emerald-500 mb-4" />
            <h4 className="font-bold text-lg mb-2">{item.title}</h4>
            <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Button 
          onClick={onNext}
          className="w-full md:w-auto justify-center group flex items-center gap-4 px-8 py-4 md:py-6 text-lg md:text-xl rounded-full bg-white text-black hover:bg-emerald-500 transition-all"
        >
          Begin Your Journey
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </Button>
      </motion.div>
    </div>
  );
}
