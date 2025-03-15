import { BetslipIcon } from "@/components/icons/BetslipIcon";
import { User } from "lucide-react";
import { useBetslip } from "@/features/Betslip/hooks";

export function Footer() {
  const { handleShowBetslip, showBetslip } = useBetslip();

  return (
    <div className="bg-gokudark fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 rounded-t-md">
      <div className="flex justify-between items-center gap-4">
        <div
          className="flex items-center gap-2 bg-goku p-2 rounded-lg"
          onClick={() => handleShowBetslip(!showBetslip)}
        >
          <BetslipIcon className="h-5 w-5" />
        </div>

        <button className="flex items-center gap-2 bg-goku px-4 py-2 rounded-lg w-full">
          <span className="font-light">2,000 oRCA</span>
        </button>

        <button className="p-2 bg-goku rounded-lg">
          <User className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
