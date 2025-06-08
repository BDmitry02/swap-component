import { SetStateFunc } from "@/tools/types/general-func-types";

export function checkIsMobile(setIsMobile: SetStateFunc<boolean>) {
    const mobile = window.innerWidth <= 768;
    setIsMobile((prev) => {
        if (prev !== mobile) return mobile;
        return prev;
    });
}
