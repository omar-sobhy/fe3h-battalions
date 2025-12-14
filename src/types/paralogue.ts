export type Paralogue = {
  characters: Array<{ name: string; required: boolean }>;
  notes?: string;
  chapters: Partial<
    Record<'wc' | 'cf' | 'ss' | 'am' | 'vw', { start: number; end: number }>
  >;
};
