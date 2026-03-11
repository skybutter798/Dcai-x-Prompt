import { create } from 'zustand';

export type CreditTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface UserWallet {
  tokenA: number; // USD
  tokenB: number; // USD
  eth: number;    // Amount
  btc: number;    // Amount
  nft: {
    id: string;
    name: string;
    floorPrice: number; // USD
  };
}

export interface ProtocolState {
  totalTVL: number;
  totalBorrowed: number;
  reserveLiquidity: number;
  ethPrice: number;
  btcPrice: number;
}

export interface UserPosition {
  stakedUSD: number;
  borrowedUSD: number;
  rewardsClaimable: number;
}

interface DualBankStore {
  // State
  wallet: UserWallet;
  protocol: ProtocolState;
  user: UserPosition;
  
  // Computed
  getUtilizationRate: () => number;
  getBorrowAPR: () => number;
  getStakingAPY: () => number;
  getCreditTier: () => CreditTier;
  getLTV: () => number;
  getHealthFactor: () => number;
  getMaxBorrow: () => number;

  // Actions
  stake: (amountUSD: number) => void;
  borrow: (amountUSD: number) => void;
  repay: (amountUSD: number) => void;
  claimRewards: () => void;
  updatePrices: () => void;
}

export const useStore = create<DualBankStore>((set, get) => ({
  wallet: {
    tokenA: 5000,
    tokenB: 10000,
    eth: 2,
    btc: 0.1,
    nft: {
      id: 'DB-772',
      name: 'DualBank Genesis #772',
      floorPrice: 2500,
    },
  },
  protocol: {
    totalTVL: 1250000,
    totalBorrowed: 450000,
    reserveLiquidity: 800000,
    ethPrice: 3200,
    btcPrice: 65000,
  },
  user: {
    stakedUSD: 0,
    borrowedUSD: 0,
    rewardsClaimable: 0,
  },

  getUtilizationRate: () => {
    const { totalBorrowed, totalTVL } = get().protocol;
    return (totalBorrowed / totalTVL) * 100;
  },

  getBorrowAPR: () => {
    const utilization = get().getUtilizationRate();
    if (utilization < 50) return 10;
    if (utilization < 70) return 15;
    if (utilization < 80) return 25;
    if (utilization < 90) return 40;
    return 80;
  },

  getStakingAPY: () => {
    const utilization = get().getUtilizationRate();
    // Base APY + utilization bonus
    return 5 + (utilization / 5);
  },

  getCreditTier: () => {
    const staked = get().user.stakedUSD;
    if (staked >= 20000) return 'Platinum';
    if (staked >= 5000) return 'Gold';
    if (staked >= 1000) return 'Silver';
    return 'Bronze';
  },

  getLTV: () => {
    const tier = get().getCreditTier();
    switch (tier) {
      case 'Platinum': return 75;
      case 'Gold': return 65;
      case 'Silver': return 55;
      default: return 40;
    }
  },

  getMaxBorrow: () => {
    const { user, wallet, protocol } = get();
    const ltv = get().getLTV();
    
    const collateralValue = 
      (wallet.eth * protocol.ethPrice) + 
      (wallet.btc * protocol.btcPrice) + 
      (wallet.nft.floorPrice * 0.5); // NFT fixed 50% LTV

    return (collateralValue * (ltv / 100));
  },

  getHealthFactor: () => {
    const { user } = get();
    if (user.borrowedUSD === 0) return 999;
    const maxBorrow = get().getMaxBorrow();
    return maxBorrow / user.borrowedUSD;
  },

  stake: (amountUSD) => {
    const { wallet, user, protocol } = get();
    const tokenAAmount = amountUSD * 0.3;
    const tokenBAmount = amountUSD * 0.7;

    if (wallet.tokenA >= tokenAAmount && wallet.tokenB >= tokenBAmount) {
      set((state) => ({
        wallet: {
          ...state.wallet,
          tokenA: state.wallet.tokenA - tokenAAmount,
          tokenB: state.wallet.tokenB - tokenBAmount,
        },
        user: {
          ...state.user,
          stakedUSD: state.user.stakedUSD + amountUSD,
        },
        protocol: {
          ...state.protocol,
          totalTVL: state.protocol.totalTVL + amountUSD,
        }
      }));
    }
  },

  borrow: (amountUSD) => {
    const max = get().getMaxBorrow();
    const current = get().user.borrowedUSD;
    if (current + amountUSD <= max) {
      set((state) => ({
        user: {
          ...state.user,
          borrowedUSD: state.user.borrowedUSD + amountUSD,
        },
        protocol: {
          ...state.protocol,
          totalBorrowed: state.protocol.totalBorrowed + amountUSD,
        }
      }));
    }
  },

  repay: (amountUSD) => {
    set((state) => ({
      user: {
        ...state.user,
        borrowedUSD: Math.max(0, state.user.borrowedUSD - amountUSD),
      },
      protocol: {
        ...state.protocol,
        totalBorrowed: Math.max(0, state.protocol.totalBorrowed - amountUSD),
      }
    }));
  },

  claimRewards: () => {
    set((state) => ({
      user: {
        ...state.user,
        rewardsClaimable: 0,
      }
    }));
  },

  updatePrices: () => {
    set((state) => ({
      wallet: {
        ...state.wallet,
        nft: {
          ...state.wallet.nft,
          floorPrice: state.wallet.nft.floorPrice * (1 + (Math.random() * 0.02 - 0.01)),
        }
      },
      user: {
        ...state.user,
        rewardsClaimable: state.user.rewardsClaimable + (state.user.stakedUSD * (get().getStakingAPY() / 100) / 365 / 24 / 60),
      }
    }));
  }
}));
