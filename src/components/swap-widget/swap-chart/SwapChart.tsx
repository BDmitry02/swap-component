import { useEffect, useState } from "react";
import { SwapChartOpenIcon } from "@/components/swap-widget/swap-chart-open-icon/SwapChartOpenIcon";
import { SwapToggleIcon } from "@/components/swap-widget/swap-svg/SwapToggleIcon";
import { handleKeyDown } from "@/components/swap-widget/swap-chart/SwapChart.funcs";
import { useSwap } from "@/components/swap-widget/swap-provider/SwapProvider";
import { eventListenerEvents } from "@/tools/constants/event-listeners/event-listener-events";
import { convertPriceToUserFriendlyString } from "@/tools/funcs/converters/price-converter";

export function SwapChart() {
    const { priceInQuote, priceInUsd } = useSwap().price;

    const [isChartOpened, setIsChartOpened] = useState(false);

    useEffect(() => {
        window.addEventListener(eventListenerEvents.keydown, (e) => handleKeyDown(e, setIsChartOpened));

        return () => {
            window.removeEventListener(eventListenerEvents.keydown, (e) =>
                handleKeyDown(e, setIsChartOpened),
            );
        };
    }, []);

    const handleToggleChart = () => {
        setIsChartOpened((prev) => !prev);
    };

    return (
        <div className="border-card-border bg-card-background flex w-full max-w-[411px] flex-col items-center rounded-xl border-[0.5px]">
            <button
                className="flex w-full cursor-pointer items-center justify-between px-4 py-2"
                onClick={handleToggleChart}
            >
                <p className="text-font-secondary text-sm">
                    1 ETH = {priceInQuote}USDC{" "}
                    <span className="text-font-primary">
                        ({convertPriceToUserFriendlyString(priceInUsd)})
                    </span>
                </p>
                <div className="flex items-center gap-2">
                    <SwapChartOpenIcon />
                    <SwapToggleIcon isOpened={isChartOpened} />
                </div>
            </button>
            <div
                className={`flex w-full flex-col gap-2 overflow-hidden px-4 pt-0 transition-all duration-300 ${
                    isChartOpened ? "max-h-[500px] py-2 opacity-100" : "max-h-0 py-0 opacity-0"
                }`}
            >
                <div className="flex w-full items-center justify-between self-start">
                    <p className="text-font-primary text-sm">Fee (0.25%)</p>
                    <p className="text-font-secondary text-sm">$151.89</p>
                </div>
                <div className="flex w-full items-center justify-between self-start">
                    <p className="text-font-primary text-sm">Network cost</p>
                    <p className="text-font-primary text-sm">N/A</p>
                </div>
                <div className="flex w-full items-center justify-between self-start">
                    <p className="text-font-primary text-sm">Order routing</p>
                    <p className="text-font-secondary text-sm">Uniswap API</p>
                </div>
                <div className="flex w-full items-center justify-between self-start">
                    <p className="text-font-primary text-sm">Price impact</p>
                    <p className="text-font-primary text-sm">-0.04%</p>
                </div>
                <div className="flex w-full items-center justify-between self-start">
                    <p className="text-font-primary text-sm">Max slippage</p>
                    <p className="text-font-secondary text-sm">0.50%</p>
                </div>
            </div>
        </div>
    );
}
