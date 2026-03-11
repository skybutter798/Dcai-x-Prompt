import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Card({ children, className, id }: { children: React.ReactNode; className?: string; id?: string; key?: React.Key }) {
  return (
    <div 
      id={id}
      className={cn(
        "bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Button({ 
  children, 
  variant = 'primary', 
  className, 
  onClick,
  disabled,
  id
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'; 
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  id?: string;
}) {
  const variants = {
    primary: "bg-emerald-500 hover:bg-emerald-600 text-white",
    secondary: "bg-white/10 hover:bg-white/20 text-white",
    outline: "bg-transparent border border-white/20 hover:border-white/40 text-white",
    danger: "bg-red-500/20 border border-red-500/50 text-red-500 hover:bg-red-500/30",
  };

  return (
    <button
      id={id}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-4 py-2 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
}

export function Stat({ label, value, subValue, trend, id }: { label: string; value: string; subValue?: string; trend?: number; id?: string }) {
  return (
    <div id={id} className="space-y-1">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-semibold text-white tracking-tight">{value}</h3>
        {trend !== undefined && (
          <span className={cn("text-xs font-medium", trend >= 0 ? "text-emerald-500" : "text-red-500")}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      {subValue && <p className="text-sm text-zinc-400">{subValue}</p>}
    </div>
  );
}
