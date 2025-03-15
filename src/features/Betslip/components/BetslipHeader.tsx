import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { BetSlipPage } from "@/stores/betslip";

type BetslipHeaderProps = {
  handleShowBetslip: (show: boolean) => void;
  betslipPage: BetSlipPage;
  handleBetslipPage: (page: BetSlipPage) => void;
};

export function BetslipHeader({
  handleShowBetslip,
  betslipPage,
  handleBetslipPage,
}: BetslipHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gokulight">
      <Select
        value={betslipPage}
        onValueChange={(value) => handleBetslipPage(value as BetSlipPage)}
      >
        <SelectTrigger>
          <SelectValue placeholder={betslipPage} />
        </SelectTrigger>
        <SelectContent>
          {Object.values(BetSlipPage).map((page) => (
            <SelectItem key={page} value={page}>
              {page}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {handleShowBetslip && (
        <button
          onClick={() => handleShowBetslip(false)}
          className="p-1 hover:bg-gokulight rounded-md transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
