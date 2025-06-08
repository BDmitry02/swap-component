import { Fragment, useCallback } from "react";
import { useSwap } from "@/components/swap-widget/swap-provider/SwapProvider";
import { TokenItem } from "@/components/swap-widget/general/TokenItem";
import { Token } from "@/tools/types/token";
import { SwapSingleCardVariant, swapSingleCardVariants } from "@/tools/constants/swap-constants";
import { VoidFunc } from "@/tools/types/general-func-types";
import { Network } from "@/tools/types/network";

interface SwapModalTokenListProps {
    tokens: Token[];
    cardVariant: SwapSingleCardVariant;
    onMenuOpenToggle: VoidFunc;
}

export function SwapModalTokenList({ tokens, cardVariant, onMenuOpenToggle }: SwapModalTokenListProps) {
    const { setSelectedBuyCurrency, setSelectedSellCurrency, setSelectedNetwork } = useSwap();

    const setSelectedToken = useCallback(
        (token: Token) => {
            if (cardVariant === swapSingleCardVariants.buy) {
                return setSelectedBuyCurrency(token);
            } else {
                return setSelectedSellCurrency(token);
            }
        },
        [cardVariant, setSelectedBuyCurrency, setSelectedSellCurrency],
    );

    const onTokenItemClick = useCallback(
        (token: Token, network: Network) => {
            setSelectedToken(token);
            setSelectedNetwork(network);
            onMenuOpenToggle();
        },
        [onMenuOpenToggle, setSelectedNetwork, setSelectedToken],
    );

    return (
        <div className="flex w-full flex-col gap-2">
            {tokens.map((token) => (
                <Fragment key={token.tokenName}>
                    <TokenItem token={token} onItemClick={onTokenItemClick} cardVariant={cardVariant} />
                </Fragment>
            ))}
        </div>
    );
}
