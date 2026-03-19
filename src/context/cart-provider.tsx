import {
  useMemo,
  type ChangeEvent,
  type FocusEvent,
  useState,
  type ReactNode,
} from "react";
import { CartContext } from "./cart-context";

import { mockProducts } from "@/fixtures/mockProducts";

interface Props {
  children: ReactNode;
}

export function CartProvider({ children }: Props) {
  const [amounts, setAmounts] = useState<Record<string, number>>({});

  const defaultAmountById = useMemo(
    () =>
      mockProducts.reduce<Record<string, number>>((acc, product) => {
        acc[product.id] = 0;
        return acc;
      }, {}),
    [],
  );

  const getCurrentAmount = (productId: string) => {
    return amounts[productId] ?? defaultAmountById[productId] ?? 0;
  };

  const totalSelectedBottles = useMemo(
    () => Object.values(amounts).reduce((sum, amount) => sum + amount, 0),
    [amounts],
  );

  const updateAmount = (productId: string, nextValue: number) => {
    setAmounts((prev) => ({
      ...prev,
      [productId]: Math.max(0, nextValue),
    }));
  };

  const handleDecreaseAmount = (productId: string, decrement: number) => {
    const currentAmount = getCurrentAmount(productId);
    updateAmount(productId, currentAmount - decrement);
  };

  const handleIncreaseAmount = (productId: string, increment: number) => {
    const currentAmount = getCurrentAmount(productId);
    updateAmount(productId, currentAmount + increment);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    productId: string,
  ) => {
    const nextValue = Number(e.target.value);

    if (Number.isNaN(nextValue)) {
      updateAmount(productId, 0);
      return;
    }

    updateAmount(productId, nextValue);
  };

  const handleInputFocus = (
    e: FocusEvent<HTMLInputElement>,
    currentAmount: number,
  ) => {
    if (currentAmount === 0) {
      e.target.select();
    }
  };

  const handleInputBlur = (
    e: FocusEvent<HTMLInputElement>,
    productId: string,
  ) => {
    const nextValue = Number(e.target.value);
    updateAmount(productId, Number.isNaN(nextValue) ? 0 : nextValue);
  };

  return (
    <CartContext.Provider
      value={{
        amounts,
        totalSelectedBottles,
        getCurrentAmount,
        handleDecreaseAmount,
        handleIncreaseAmount,
        handleInputChange,
        handleInputFocus,
        handleInputBlur,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
