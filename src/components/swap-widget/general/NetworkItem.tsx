import { ParamVoidFunc } from "@/tools/types/general-func-types";
import { Network } from "@/tools/types/network";
import Image from "next/image";

interface NetworkItemProps {
    network: Network;
    onItemClick: ParamVoidFunc<Network>;
    className?: string;
}

export function NetworkItem({ network, onItemClick, className }: NetworkItemProps) {
    return (
        <button
            className={`flex w-full cursor-pointer items-center gap-1.5 p-1.5 ${className ? className : ""}`}
            onClick={() => onItemClick(network)}
        >
            <Image
                src={network.networkImg}
                alt={network.networkName}
                width={24}
                height={24}
                className="rounded-full"
            />
            <p className="text-font-secondary text-start text-sm">{network.networkName}</p>
        </button>
    );
}
