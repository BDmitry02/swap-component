import { SearchIcon } from "@/components/swap-widget/swap-svg/SearchIcon";
import { SetStateFunc } from "@/tools/types/general-func-types";
import { useRef } from "react";

interface SwapSearchProps {
    searchValue: string;
    setSearchValue: SetStateFunc<string>;
}

export function SwapSearch({ searchValue, setSearchValue }: SwapSearchProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const onSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    const onSearchClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div
            className="bg-card-background-secondary flex h-12 w-full cursor-pointer items-center gap-2 rounded-full px-4 py-3.5"
            onClick={onSearchClick}
        >
            <SearchIcon />
            <input
                ref={inputRef}
                type="text"
                autoComplete="off"
                value={searchValue}
                onChange={onSearchValueChange}
                placeholder="Search asset"
                className="text-font-primary placeholder:text-font-primary w-full bg-transparent text-lg outline-none"
            />
        </div>
    );
}
