import { useSwap } from "@/components/swap-widget/swap-provider/SwapProvider";
import { useMemo, useState } from "react";
import { SubmitModalWindow } from "../sumbit-modal-window/SubmitModalWindow";

interface SwapSubmitButtonProps {
    isWalletConnected: boolean;
}

export function SwapSubmitButton({ isWalletConnected }: SwapSubmitButtonProps) {
    const { selectedBuyCurrency, selectedSellCurrency, selectedNetwork, sellAmount, buyAmount } = useSwap();

    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

    const isDisabled = useMemo(() => {
        return (
            !isWalletConnected ||
            !selectedBuyCurrency ||
            !selectedSellCurrency ||
            !Number(sellAmount) ||
            !Number(buyAmount) ||
            !selectedNetwork
        );
    }, [
        isWalletConnected,
        selectedBuyCurrency,
        selectedSellCurrency,
        sellAmount,
        buyAmount,
        selectedNetwork,
    ]);

    return (
        <>
            <button
                className="bg-submit-disabled-button-bg disabled:bg-submit-disabled-button-bg/50 flex h-14 w-full cursor-pointer items-center justify-center rounded-2xl py-[18px] disabled:cursor-not-allowed"
                disabled={isDisabled}
                onClick={() => setIsSubmitModalOpen(true)}
                style={{
                    boxShadow: "inset 0 -3px 0 0 rgba(0, 0, 0, 0.2)",
                    background: !isDisabled ? "linear-gradient(90deg, #2D2C8A 0%, #6B5CFF 82%)" : undefined,
                }}
            >
                {!isWalletConnected ? (
                    <span className="text-font-additional">Connect wallet</span>
                ) : !selectedBuyCurrency ||
                  !selectedSellCurrency ||
                  !Number(sellAmount) ||
                  !Number(buyAmount) ? (
                    <span className="text-font-additional">Enter an amount</span>
                ) : (
                    <span className="text-font-secondary">Swap</span>
                )}
            </button>
            {isSubmitModalOpen && <SubmitModalWindow setIsSubmitModalOpen={setIsSubmitModalOpen} />}
        </>
    );
}
