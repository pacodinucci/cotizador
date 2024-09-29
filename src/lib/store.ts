import { create } from "zustand";

interface Price {
  code: string;
  title: string;
  zone: string;
  price: number;
  smallZone: boolean;
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
