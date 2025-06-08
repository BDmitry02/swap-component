export function convertPriceToUserFriendlyString(price: number, currency: string = "USD"): string {
    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);

    return formattedPrice;
}
