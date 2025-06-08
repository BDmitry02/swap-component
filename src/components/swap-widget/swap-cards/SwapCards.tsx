import { ArrowDownIcon } from "@/components/swap-widget/swap-svg/ArrowDownIcon";
import { SwapSingleCard } from "@/components/swap-widget/swap-single-card/SwapSingleCard";
import { swapSingleCardPositions, swapSingleCardVariants } from "@/tools/constants/swap-constants";
import { useSwap } from "@/components/swap-widget/swap-provider/SwapProvider";

export function SwapCards() {
    const { sellAmount, setSellAmount, buyAmount, setBuyAmount } = useSwap();
    return (
        <div className="relative flex w-[361px] flex-col items-center justify-center gap-1 md:w-[411px]">
            {/* arrow container */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-background flex size-10 items-center justify-center rounded-[14px]"></div>
            </div>

            {/* arrow */}
            <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <div
                    className="bg-card-background border-card-border flex size-[32px] items-center justify-center rounded-[10px] border-[0.5px]"
                    style={{
                        boxShadow: "inset 0 1px 0 0 #2d3143, inset 0 -2px 0 0 #110F1A",
                    }}
                >
                    <ArrowDownIcon />
                </div>
            </div>

            <SwapSingleCard
                variant={swapSingleCardVariants.sell}
                position={swapSingleCardPositions.top}
                inputValue={sellAmount}
                setInputValue={setSellAmount}
            />
            <SwapSingleCard
                variant={swapSingleCardVariants.buy}
                position={swapSingleCardPositions.bottom}
                inputValue={buyAmount}
                setInputValue={setBuyAmount}
            />
        </div>
    );
}
