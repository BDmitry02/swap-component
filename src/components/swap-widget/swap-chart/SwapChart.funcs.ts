import { eventKeys } from "@/tools/constants/event-listeners/event-keys";
import { SetStateFunc } from "@/tools/types/general-func-types";

export function handleKeyDown(event: KeyboardEvent, setIsChartOpened: SetStateFunc<boolean>) {
    if (eventKeys.includes(event.key)) {
        setIsChartOpened((prev) => !prev);
    }
}
