import { create } from "zustand";

export interface Price {
  id: string;
  code: string;
  title: string;
  zone: string;
  price: number;
  smallZone: boolean;
  mainZone: boolean;
  order?: number;
}

interface PriceState {
  prices: Price[];
  selectedPrice: Price | null;
  setPrices: (prices: Price[]) => void;
  addPrice: (price: Price) => void;
  setSelectedPrice: (price: Price) => void;
  removePrice: (title: string) => void;
}

export const usePriceStore = create<PriceState>((set) => ({
  prices: [],
  selectedPrice: null,
  setPrices: (prices) => set({ prices }),
  addPrice: (price) =>
    set((state) => ({
      prices: [...state.prices, price],
    })),
  removePrice: (title) =>
    set((state) => ({
      prices: state.prices.filter((price) => price.title !== title),
    })),
  setSelectedPrice: (price) => set({ selectedPrice: price }),
  clearSelectedPrice: () => set({ selectedPrice: null }),
}));

interface Zone {
  id: string;
  title: string;
}

interface Combo {
  id: string;
  price: number;
  zones: Zone[];
  title: string;
  smallZones: number;
}

interface ComboState {
  combos: Combo[];
  selectedCombo: Combo | null;
  setCombos: (combos: Combo[]) => void;
  addCombo: (combo: Combo) => void;
  setSelectedCombo: (combo: Combo) => void;
  removeCombo: (id: string) => void;
  clearSelectedCombo: () => void;
}

export const useComboStore = create<ComboState>((set) => ({
  combos: [],
  selectedCombo: null,
  setCombos: (combos) => set({ combos }),
  addCombo: (combo) =>
    set((state) => ({
      combos: [...state.combos, combo],
    })),
  removeCombo: (id) =>
    set((state) => ({
      combos: state.combos.filter((combo) => combo.id !== id),
    })),
  setSelectedCombo: (combo) => set({ selectedCombo: combo }),
  clearSelectedCombo: () => set({ selectedCombo: null }),
}));
