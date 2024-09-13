import create from "zustand";

interface Price {
  code: string;
  title: string;
  zone: string;
  price: number;
}

interface PriceState {
  prices: Price[];
  setPrices: (prices: Price[]) => void;
  addPrice: (price: Price) => void;
  removePrice: (title: string) => void;
}

export const usePriceStore = create<PriceState>((set) => ({
  prices: [],
  setPrices: (prices) => set({ prices }),
  addPrice: (price) =>
    set((state) => ({
      prices: [...state.prices, price],
    })),
  removePrice: (title) =>
    set((state) => ({
      prices: state.prices.filter((price) => price.title !== title),
    })),
}));
