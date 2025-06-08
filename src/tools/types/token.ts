import { Network } from "@/tools/types/network";

export interface Token {
    tokenName: string;
    tokenSymbol: string;
    tokenImg: string;
    supportedNetworks?: Network[];
    price: number;
}
