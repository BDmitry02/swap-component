import { Suspense, use, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { SwapToggleIcon } from "@/components/swap-widget/swap-svg/SwapToggleIcon";
import { SwapNetworkSelector } from "@/components/swap-widget/swap-network-selector/SwapNetworkSelector";
import { SwapSearch } from "@/components/swap-widget/swap-search/SwapSearch";
import { useSwap } from "@/components/swap-widget/swap-provider/SwapProvider";
import { SwapModalTokenList } from "@/components/swap-widget/swap-modal-token-list/SwapModalTokenList";
import { VoidFunc } from "@/tools/types/general-func-types";
import { SwapSingleCardVariant } from "@/tools/constants/swap-constants";
import { Network } from "@/tools/types/network";

interface SwapModalWindowProps {
    onMenuOpenToggle: VoidFunc;
    cardVariant: SwapSingleCardVariant;
}

export function SwapModalWindow({ onMenuOpenToggle, cardVariant }: SwapModalWindowProps) {
    const { tokenPromise } = useSwap();
    const tokens = use(tokenPromise);

    const [searchValue, setSearchValue] = useState("");
    const [networkFilter, setNetworkFilter] = useState<Network>();

    // TODO: Should be implemented the network filtering logic
    const filteredTokens = useMemo(() => {
        return tokens.filter(
            (token) =>
                token.tokenName.toLowerCase().includes(searchValue.toLowerCase()) ||
                token.tokenSymbol.toLowerCase().includes(searchValue.toLowerCase()),
        );
    }, [tokens, searchValue]);

    return createPortal(
        <div
            className="bg-background/50 fixed inset-0 z-90 flex items-center justify-center"
            onClick={onMenuOpenToggle}
        >
            <div
                className="bg-card-background border-card-border scrollbar relative flex h-[700px] w-[400px] flex-col items-center gap-4 overflow-y-scroll rounded-3xl border-[0.5px] px-6 py-[22px]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-[22px] left-7 flex cursor-pointer items-center justify-center border-0 p-2"
                    onClick={onMenuOpenToggle}
                >
                    <SwapToggleIcon
                        svgClassName="rotate-90"
                        pathClassName="stroke-[2px] stroke-font-primary"
                    />
                </button>
                <SwapNetworkSelector networkFilter={networkFilter} setNetworkFilter={setNetworkFilter} />
                <SwapSearch searchValue={searchValue} setSearchValue={setSearchValue} />
                <Suspense>
                    <SwapModalTokenList
                        tokens={filteredTokens}
                        cardVariant={cardVariant}
                        onMenuOpenToggle={onMenuOpenToggle}
                    />
                </Suspense>
            </div>
        </div>,
        document.body,
    );
}
