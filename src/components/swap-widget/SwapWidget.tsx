"use client";

import { useEffect, useState } from "react";
import { SwapChart } from "@/components/swap-widget/swap-chart/SwapChart";
import { SwapCards } from "@/components/swap-widget/swap-cards/SwapCards";
import { SwapChartOpenIcon } from "@/components/swap-widget/swap-chart-open-icon/SwapChartOpenIcon";
import { checkIsMobile } from "@/components/swap-widget/SwapWidget.funcs";
import { SwapProvider } from "@/components/swap-widget/swap-provider/SwapProvider";
import { networkMockData, priceMockData, tokenMockData } from "@/mock-data";
import { SwapSubmitButton } from "@/components/swap-widget/swap-submit-button/SwapSubmitButton";

export function SwapWidget() {
    const [isMobile, setIsMobile] = useState(false);

    //placeholder for wallet connection state
    const [isWalletConnected, setIsWalletConnected] = useState(true);

    useEffect(() => {
        checkIsMobile(setIsMobile);

        const resizeObserver = new ResizeObserver(() => {
            checkIsMobile(setIsMobile);
        });

        resizeObserver.observe(document.body);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <SwapProvider
            networks={networkMockData}
            tokenPromise={
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(tokenMockData);
                    }, 1000);
                })
            }
            price={priceMockData}
        >
            <div className="flex flex-col items-center justify-center gap-1.5">
                <SwapCards />
                <SwapChart />
                <SwapSubmitButton isWalletConnected={isWalletConnected} />
                <div className="flex items-center gap-1.5 self-start p-1.5">
                    <SwapChartOpenIcon />
                    <p className="text-font-primary text-xs">Open Chart</p>
                </div>
            </div>
        </SwapProvider>
    );
}
