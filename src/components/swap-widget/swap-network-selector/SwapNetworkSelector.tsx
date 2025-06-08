import { useState, Fragment } from "react";
import { useSwap } from "@/components/swap-widget/swap-provider/SwapProvider";
import { SwapToggleIcon } from "@/components/swap-widget/swap-svg/SwapToggleIcon";
import { EthereumIcon } from "@/components/swap-widget/swap-svg/EthereumIcon";
import { DotsIcon } from "@/components/swap-widget/swap-svg/DotsIcon";
import { ChildNetworkIcon } from "@/components/swap-widget/swap-svg/ChildNetworkIcon";
import { NetworkItem } from "@/components/swap-widget/general/NetworkItem";
import { Network } from "@/tools/types/network";
import { SetStateFunc } from "@/tools/types/general-func-types";

interface SwapNetworkSelectorProps {
    networkFilter?: Network;
    setNetworkFilter: SetStateFunc<Network | undefined>;
}

export function SwapNetworkSelector({ networkFilter, setNetworkFilter }: SwapNetworkSelectorProps) {
    const { networks } = useSwap();

    const [isNetworkSelectorOpened, setIsNetworkSelectorOpened] = useState(false);

    const toggleNetworkSelector = () => {
        setIsNetworkSelectorOpened((prev) => !prev);
    };

    const onNetworkSelect = (network?: Network) => {
        setNetworkFilter(network);
        setIsNetworkSelectorOpened(false);
    };

    return (
        <div className="relative">
            <button className="flex w-full cursor-pointer items-center gap-2" onClick={toggleNetworkSelector}>
                <DotsIcon />
                <p className="text-font-secondary">
                    {networkFilter ? networkFilter.networkName : "All Networks"}
                </p>
                <SwapToggleIcon isOpened={isNetworkSelectorOpened} pathClassName="stroke-[2px]" />
            </button>
            {isNetworkSelectorOpened && (
                <div
                    className="fixed inset-0 -top-1/3 left-1/2 z-90 flex -translate-x-1/2 items-center justify-center"
                    onClick={toggleNetworkSelector}
                >
                    <div
                        className="bg-card-background-secondary border-card-border absolute z-100 flex w-[232px] flex-col justify-center rounded-2xl border-[0.5px] p-1"
                        style={{
                            boxShadow:
                                "0px 40px 80px 10px rgba(0,0,0,0.3), 0px 10px 40px 10px rgba(0,0,0,0.2)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="flex w-full cursor-pointer items-center gap-1.5 p-1.5"
                            onClick={() => onNetworkSelect(undefined)}
                        >
                            <EthereumIcon />
                            <p className="text-font-secondary text-sm">All Networks</p>
                        </button>
                        {networks.map((network) => (
                            <Fragment key={network.networkName}>
                                <NetworkItem network={network} onItemClick={onNetworkSelect} />
                                {network.childNetworks &&
                                    network.childNetworks.length > 0 &&
                                    network.childNetworks.map((childNetwork) => (
                                        <div className="flex gap-2" key={childNetwork.networkName}>
                                            <ChildNetworkIcon />
                                            <NetworkItem
                                                network={childNetwork}
                                                onItemClick={onNetworkSelect}
                                            />
                                        </div>
                                    ))}
                            </Fragment>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
