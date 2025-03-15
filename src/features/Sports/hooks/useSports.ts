import { useSportsStore } from "@/stores/sports";

export const useSports = () => {
  const { eventStatusTabs, activeTab, setActiveTab } = useSportsStore();

  return {
    eventStatusTabs,
    activeTab,
    setActiveTab,
  };
};
