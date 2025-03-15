import type { TabType } from "@/types";
import { cn } from "@/lib/utils";

interface TabSelectorProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  eventStatusTabs: TabType[];
}

export function EventStatusTab({
  activeTab,
  setActiveTab,
  eventStatusTabs,
}: TabSelectorProps) {
  return (
    <div className="flex p-1 bg-goku rounded-full w-fit text-white">
      {eventStatusTabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={cn(
            "px-5 py-3 rounded-full text-xs font-normal",
            activeTab === tab ? "bg-gokudark " : " hover:text-white"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
