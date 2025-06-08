import { Fragment, useState } from "react";
import Image from "next/image";
import { ParamVoidFunc } from "@/tools/types/general-func-types";
import { Token } from "@/tools/types/token";
import { Network } from "@/tools/types/network";
import { TokenSelectNetworkIcon } from "@/components/swap-widget/swap-svg/TokenSelectNetworkIcon";
import { NetworkItem } from "@/components/swap-widget/general/NetworkItem";
import { useSwap } from "@/components/swap-widget/swap-provider/SwapProvider";
import { SwapSingleCardVariant, swapSingleCardVariants } from "@/tools/constants/swap-constants";

interface TokenItemProps {
    token: Token;
    onItemClick: ParamVoidFunc<Token, Network>;
    cardVariant: SwapSingleCardVariant;
}

export function TokenItem({ token, onItemClick, cardVariant }: TokenItemProps) {
    const { selectedNetwork, networks } = useSwap();
    const [isNetworkSelectorOpened, setIsNetworkSelectorOpened] = useState(false);

    const toggleNetworkSelector = () => {
        setIsNetworkSelectorOpened((prev) => !prev);
    };

    function onNetworkSelect(network: Network) {
        onItemClick(token, network);
        toggleNetworkSelector();
    }

    function onSelectTokenItemClick() {
        if (token.supportedNetworks?.length && cardVariant === swapSingleCardVariants.sell) {
            toggleNetworkSelector();
        } else if (cardVariant === swapSingleCardVariants.buy && selectedNetwork) {
            onItemClick(token, selectedNetwork);
        } else if (!token.supportedNetworks?.length) {
            const defaultNetwork = networks.find((network) => network.networkName === "Ethereum");

            onItemClick(token, defaultNetwork!);
        }
    }

    return (
        <div className="flex w-full flex-col gap-2">
            <button
                className="flex w-full cursor-pointer items-center gap-1.5 p-1.5"
                onClick={onSelectTokenItemClick}
            >
                <div className="relative size-10">
                    <Image
                        src={token.tokenImg}
                        alt={token.tokenName}
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <div className="border-card-background bg-card-background absolute bottom-1/20 left-1/5 z-10 size-5 -translate-x-1/2 translate-y-1/2 rounded-full border-2">
                        <Image src={"/EthereumLogo.svg"} alt={"Ethereum Logo"} width={20} height={20} />
                    </div>
                </div>
                <div className="flex flex-col gap-0.5">
                    <div className="flex w-full items-center justify-between">
                        <p className="text-font-secondary text-start text-sm">{token.tokenName}</p>
                    </div>
                    <div className="flex w-full items-center justify-between">
                        <p className="text-font-primary text-start text-sm">{token.tokenSymbol}</p>
                    </div>
                </div>
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isNetworkSelectorOpened ? "mt-2 max-h-96 opacity-100" : "mt-0 max-h-0 opacity-0"
                } `}
                style={{ willChange: "max-height, opacity" }}
            >
                <div className={`flex gap-6 p-2 ${isNetworkSelectorOpened ? "" : "pointer-events-none"}`}>
                    <TokenSelectNetworkIcon />
                    <div className="grid grid-cols-2 gap-2">
                        {token.supportedNetworks?.map((network) => (
                            <Fragment key={network.networkName}>
                                <NetworkItem
                                    network={network}
                                    onItemClick={onNetworkSelect}
                                    className="bg-card-background-secondary flex-row-reverse justify-between rounded-xl"
                                />
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
