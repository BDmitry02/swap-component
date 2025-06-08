"use client";

import { createContext, use, useCallback, useEffect, useState } from "react";
import { Price } from "@/tools/types/price";
import { Token } from "@/tools/types/token";
import { Network } from "@/tools/types/network";
import { ParamVoidFunc, SetStateFunc } from "@/tools/types/general-func-types";

interface SwapProviderProps {
    children: React.ReactNode;
    tokenPromise: Promise<Token[]>;
    price: Price;
    networks: Network[];
}

interface SwapContextType {
    // You can use Promise data in provider, but when you use it in components, you should use `use` hook to get the resolved value.
    // And wrap component that uses `useSwap` hook with `Suspense` to handle loading state.
    tokenPromise: Promise<Token[]>;
    price: Price;
    networks: Network[];
    selectedNetwork?: Network;
    setSelectedNetwork: SetStateFunc<Network | undefined>;
    selectedSellCurrency: Token | undefined;
    setSelectedSellCurrency: SetStateFunc<Token | undefined>;
    selectedBuyCurrency: Token | undefined;
    setSelectedBuyCurrency: SetStateFunc<Token | undefined>;
    sellAmount: string;
    buyAmount: string;
    setSellAmount: ParamVoidFunc<string>;
    setBuyAmount: ParamVoidFunc<string>;
}

const SwapContext = createContext<SwapContextType | undefined>(undefined);

export function SwapProvider({ children, tokenPromise, price, networks }: SwapProviderProps) {
    const [selectedNetwork, setSelectedNetwork] = useState<Network>();
    const [selectedSellCurrency, setSelectedSellCurrency] = useState<Token>();
    const [selectedBuyCurrency, setSelectedBuyCurrency] = useState<Token>();

    const [sellAmount, setSellAmount] = useState("");
    const [buyAmount, setBuyAmount] = useState("");

    const onSellAmountChange = useCallback(
        (value: string) => {
            setSellAmount(value);
            if (selectedSellCurrency?.price && selectedBuyCurrency?.price) {
                const baseValue = Number(value) * selectedSellCurrency.price;
                const buyValue = baseValue / selectedBuyCurrency.price;
                setBuyAmount(buyValue.toFixed(5).toString());
            } else {
                setBuyAmount("");
            }
        },
        [selectedSellCurrency?.price, selectedBuyCurrency?.price],
    );

    const onBuyAmountChange = useCallback(
        (value: string) => {
            setBuyAmount(value);
            if (selectedSellCurrency?.price && selectedBuyCurrency?.price) {
                const baseValue = Number(value) * selectedBuyCurrency.price;
                const sellValue = baseValue / selectedSellCurrency.price;
                setSellAmount(sellValue.toFixed(5).toString());
            } else {
                setSellAmount("");
            }
        },
        [selectedSellCurrency?.price, selectedBuyCurrency?.price],
    );

    // Remove conflicting useEffects and only update amounts when currencies change
    useEffect(() => {
        // When selected currencies change, recalculate buyAmount based on current sellAmount
        if (sellAmount && selectedSellCurrency && selectedBuyCurrency) {
            onSellAmountChange(sellAmount);
        } else {
            setBuyAmount("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSellCurrency, selectedBuyCurrency]);

    const contextValue = {
        tokenPromise,
        price,
        networks,
        selectedNetwork,
        setSelectedNetwork,
        selectedSellCurrency,
        setSelectedSellCurrency,
        selectedBuyCurrency,
        setSelectedBuyCurrency,
        sellAmount,
        buyAmount,
        setSellAmount: onSellAmountChange,
        setBuyAmount: onBuyAmountChange,
    };

    return <SwapContext value={contextValue}>{children}</SwapContext>;
}

export const useSwap = () => {
    const context = use(SwapContext);

    if (context === undefined) {
        throw new Error("useSwap must be used within a SwapProvider");
    }

    return context;
};
