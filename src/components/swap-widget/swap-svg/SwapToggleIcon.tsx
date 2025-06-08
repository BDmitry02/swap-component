import { useMemo } from "react";

interface SwapChartToggleIconProps {
    isOpened?: boolean;
    svgClassName?: string;
    pathClassName?: string;
}

export function SwapToggleIcon({ isOpened, svgClassName, pathClassName }: SwapChartToggleIconProps) {
    const isUndefined = useMemo(() => isOpened === undefined, [isOpened]);
    const isElementOpened = useMemo(() => !!isOpened, [isOpened]);

    return (
        <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${
                !isUndefined &&
                `transition-transform-scaleY ${
                    isElementOpened ? "animate-arrow-open" : "animate-arrow-close"
                }`
            } ${svgClassName ? svgClassName : ""}`}
        >
            <path
                d="M12.3334 1.5L7.47148 6.36193C7.21115 6.62227 6.78901 6.62227 6.52868 6.36193L1.66675 1.5"
                className={pathClassName ? pathClassName : ""}
                stroke="#4C5272"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
