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
    <div className="flex p-1 bg-goku rounded-full w-fit text-white">
      {(Object.values(BetType) as BetType[]).map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          disabled={tab === BetType.MULTI && selectionsCount < 2}
          className={cn(
            "px-5 py-3 rounded-full text-xs font-normal",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            activeTab === tab ? "bg-gokudark" : "hover:text-white"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
