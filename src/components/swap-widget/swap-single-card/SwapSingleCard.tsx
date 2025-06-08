import { useEffect, useMemo, useRef, useState } from "react";
import { SwapSingleCardSelect } from "@/components/swap-widget/swap-single-card-select/SwampSingleCardSelect";
import { convertPriceToUserFriendlyString } from "@/tools/funcs/converters/price-converter";
import { ParamVoidFunc } from "@/tools/types/general-func-types";
import {
    SwapSingleCardPosition,
    swapSingleCardPositions,
    SwapSingleCardVariant,
    swapSingleCardVariants,
} from "@/tools/constants/swap-constants";
import { useSwap } from "@/components/swap-widget/swap-provider/SwapProvider";

interface SwapSingleCardProps {
    variant: SwapSingleCardVariant;
    position: SwapSingleCardPosition;
    inputValue: string;
    setInputValue: ParamVoidFunc<string>;
}

export function SwapSingleCard({ variant, position, inputValue, setInputValue }: SwapSingleCardProps) {
    const { selectedNetwork, selectedBuyCurrency, selectedSellCurrency } = useSwap();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [usdPrice, setUsdPrice] = useState<string>();

    const selectedToken = useMemo(() => {
        if (variant === swapSingleCardVariants.buy) {
            return selectedBuyCurrency;
        } else {
            return selectedSellCurrency;
        }
    }, [variant, selectedBuyCurrency, selectedSellCurrency]);

    useEffect(() => {
        if (selectedToken) {
            setUsdPrice(convertPriceToUserFriendlyString(Number(inputValue) * selectedToken.price));
        }
    }, [inputValue, selectedToken]);

    const onSwapCardClick = () => {
        if (inputRef.current) {
            setIsInputFocused(true);
            inputRef.current.focus();
        }
    };

    const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setInputValue(value);
        }
    };

    const onInputFocus = () => setIsInputFocused(true);
    const onInputBlur = () => setIsInputFocused(false);

    const inputStyles = useMemo(
        () => (isInputFocused ? "border-card-border-secondary border" : "border-card-border border-[0.5px]"),
        [isInputFocused],
    );

    return (
        <div className="relative h-[142px] w-full">
            {/* Arrow hole */}
            <div
                className={`bg-background border-card-border absolute left-1/2 z-5 h-4.5 w-10 -translate-x-1/2 rounded-t-[14px] border-b-0 ${
                    position === swapSingleCardPositions.bottom ? "top-0 rotate-180" : "bottom-0"
                } ${inputStyles} `}
            />
            {/* Card content */}
            <div
                className={`bg-card-background flex size-full cursor-pointer flex-col gap-3 rounded-3xl px-5 py-6 ${inputStyles}`}
                style={
                    isInputFocused
                        ? {
                              boxShadow:
                                  " 0 0 2px 0 rgba(154, 163, 255, 0.4), 0 0 10px 0 rgba(154, 163, 255, 0.2), 0 0 20px 0 rgba(154, 163, 255, 0.25)",
                          }
                        : undefined
                }
                onClick={onSwapCardClick}
            >
                <p className="text-font-primary text-xs">
                    {variant === swapSingleCardVariants.buy ? "Buy" : "Sell"}
                </p>
                <div className="relative flex w-full items-center justify-between">
                    <input
                        className="text-font-primary caret-select-background placeholder:text-font-primary w-1/2 cursor-pointer border-none bg-transparent text-2xl outline-none placeholder:text-2xl hover:border-none hover:outline-none focus:border-none focus:outline-none"
                        placeholder="0"
                        name={variant + " Input"}
                        value={inputValue}
                        onChange={onInputValueChange}
                        ref={inputRef}
                        onFocus={onInputFocus}
                        onBlur={onInputBlur}
                        autoComplete="off"
                    />
                    <div className="absolute h-10 w-56"></div>
                    <div className="relative">
                        <SwapSingleCardSelect cardVariant={variant} />
                        {/* Overlay div for disabling select until sell value selected*/}
                        {variant === swapSingleCardVariants.buy && !selectedNetwork && (
                            <div
                                className="absolute inset-0 z-10 cursor-not-allowed rounded-lg bg-black/20"
                                title="Select sell asset first"
                                aria-label="Select sell asset first"
                            />
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-font-primary text-xs">{usdPrice ? usdPrice : "_"}</p>
                    <p className="text-font-primary text-xs">
                        1.5 ETH <span className="text-font-additional">MAX</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
