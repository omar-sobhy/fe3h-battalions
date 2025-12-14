import type { Paralogue } from './paralogue.js';

export type Battalion = {
  battalion: string;
  authority: string;
  phys: number | null;
  mag: number | null;
  hit: number | null;
  crit: number | null;
  avo: number | null;
  prot: number | null;
  res: number | null;
  cha: number | null;
  movement: string;
  gambit: string;
  cf: boolean;
  ss: boolean;
  am: boolean;
  vw: boolean;
  notes?: string;
  paralogue?: Paralogue;
  special?: string;
  shop: Array<{ chapter: number; price: number }>;
  quest?: {
    [k: string]:
      | Array<{
          chapter: number;
          route: 'cf' | 'ss' | 'am' | 'vw';
        }>
      | {
          chapter: number;
        };
  };
};
