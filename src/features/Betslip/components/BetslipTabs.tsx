import { BetType } from "@/types";
import { cn } from "@/lib/utils";

interface BetslipTabsProps {
  activeTab: BetType;
  onChange: (tab: BetType) => void;
  selectionsCount: number;
}

export function BetslipTabs({
  activeTab,
  onChange,
  selectionsCount,
}: BetslipTabsProps) {
  return (
    <div className="flex border-b border-gokulight">
      {(Object.values(BetType) as BetType[]).map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          disabled={
            tab === BetType.SINGLE ? selectionsCount > 1 : selectionsCount < 2
          }
          className={cn(
            "flex-1 p-3 text-xs font-medium transition-colors relative",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            activeTab === tab
              ? "text-white border-b-2 border-vegeta"
              : "text-gray-400 hover:text-white"
          )}
        >
          {tab}
          {selectionsCount > 0 && (
            <span className="ml-1">({selectionsCount})</span>
          )}
        </button>
      ))}
    </div>
  );
}
