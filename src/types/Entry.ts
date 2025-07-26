// src/types/Entry.ts
export interface Entry {
  id: string;
  source: string;
  amount: number;
  date: string;
}

export interface Saving {
  amount: number;
  target: number;
}