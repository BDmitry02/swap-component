import { createPortal } from "react-dom";
import { SetStateFunc } from "@/tools/types/general-func-types";
import { CloseIcon } from "@/components/swap-widget/swap-svg/CloseIcon";

interface SubmitModalWindowProps {
    setIsSubmitModalOpen: SetStateFunc<boolean>;
}

export function SubmitModalWindow({ setIsSubmitModalOpen }: SubmitModalWindowProps) {
    return createPortal(
        <div className="bg-background/50 fixed inset-0 z-90 flex items-center justify-center">
            <div
                className="bg-card-background border-card-border scrollbar relative flex h-[440px] w-[400px] flex-col items-center gap-4 overflow-y-scroll rounded-3xl border-[0.5px] px-6 py-[22px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex w-full items-center justify-between">
                    <p className="text-font-primary">You&apos;re swapping</p>
                    <button
                        className="absolute top-[22px] right-7 flex cursor-pointer items-center justify-center border-0 p-2"
                        onClick={() => {
                            setIsSubmitModalOpen(false);
                        }}
                    >
                        <CloseIcon />
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
}
