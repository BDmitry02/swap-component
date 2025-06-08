export const swapSingleCardVariants = {
    sell: "sell",
    buy: "buy",
} as const;

export type SwapSingleCardVariant = (typeof swapSingleCardVariants)[keyof typeof swapSingleCardVariants];

export const swapSingleCardPositions = {
    top: "top",
    bottom: "bottom",
} as const;

export type SwapSingleCardPosition = (typeof swapSingleCardPositions)[keyof typeof swapSingleCardPositions];
