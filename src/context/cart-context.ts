import { createContext } from "react";
import type { ChangeEvent, FocusEvent } from "react";

export interface CartContextType {
  amounts: Record<string, number>;
  totalSelectedBottles: number;
  getCurrentAmount: (productId: string) => number;
  handleDecreaseAmount: (productId: string, decrement: number) => void;
  handleIncreaseAmount: (productId: string, increment: number) => void;
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement>,
    productId: string,
  ) => void;
  handleInputFocus: (
    event: FocusEvent<HTMLInputElement>,
    currentAmount: number,
  ) => void;
  handleInputBlur: (
    event: FocusEvent<HTMLInputElement>,
    productId: string,
  ) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
