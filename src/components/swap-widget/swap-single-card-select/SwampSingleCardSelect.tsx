import { useMemo, useState } from "react";
import { SwapToggleIcon } from "@/components/swap-widget/swap-svg/SwapToggleIcon";
import { SwapModalWindow } from "@/components/swap-widget/swap-modal-window/SwapModalWindow";
import { SwapSingleCardVariant, swapSingleCardVariants } from "@/tools/constants/swap-constants";
import { useSwap } from "../swap-provider/SwapProvider";
import Image from "next/image";

interface SwapSingleCardSelectProps {
    cardVariant: SwapSingleCardVariant;
}

export function SwapSingleCardSelect({ cardVariant }: SwapSingleCardSelectProps) {
    const { selectedBuyCurrency, selectedSellCurrency, selectedNetwork } = useSwap();
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const onMenuOpenToggle = () => {
        setIsMenuOpened((prev) => !prev);
    };

    const selectedToken = useMemo(() => {
        if (cardVariant === swapSingleCardVariants.buy) {
            return selectedBuyCurrency;
        } else {
            return selectedSellCurrency;
        }
    }, [cardVariant, selectedBuyCurrency, selectedSellCurrency]);

    return (
        <>
            <button
                className={`relative flex h-8 cursor-pointer items-center justify-between gap-2 rounded-3xl pr-2.5 ${
                    selectedToken ? "p-1" : "bg-select-background px-3 py-1.5"
                }`}
                style={{
                    background: selectedToken
                        ? "linear-gradient(#1d2038, #1d2038) padding-box, linear-gradient(90deg, #2775CA 0%, #FFFFFF00 100%) border-box"
                        : undefined,
                    border: selectedToken ? "0.75px solid transparent" : "none",
                }}
                onClick={onMenuOpenToggle}
            >
                {selectedToken ? (
                    <>
                        <div className="relative">
                            <Image
                                src={selectedToken.tokenImg}
                                alt={selectedToken.tokenName}
                                className="rounded-full"
                                width={24}
                                height={25}
                            />
                            <div className="bg-card-background-secondary border-card-border absolute -right-[1px] -bottom-[2px] size-2.5 rounded-full border-[0.5px]">
                                {selectedNetwork && (
                                    <Image
                                        src={selectedNetwork.networkImg}
                                        alt={selectedNetwork.networkName}
                                        className="h-full w-full rounded-full"
                                        width={8}
                                        height={8}
                                    />
                                )}
                            </div>
                        </div>
                        <p className="text-font-secondary text-sm">{selectedToken.tokenSymbol}</p>
                    </>
                ) : (
                    <p className="text-font-secondary text-sm font-medium">Select asset</p>
                )}

                <SwapToggleIcon
                    isOpened={isMenuOpened}
                    svgClassName="w-2.5 h-1.5"
                    pathClassName="stroke-font-secondary"
                />
            </button>

            {isMenuOpened && (
                <SwapModalWindow onMenuOpenToggle={onMenuOpenToggle} cardVariant={cardVariant} />
            )}
        </>
    );
}
