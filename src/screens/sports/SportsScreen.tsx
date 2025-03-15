import { useRouter } from "next/router";
import { useSportsList, useLeagues } from "@/features/Sports/hooks";
import { SportsList } from "@/features/Sports/components/SportsList";
import { LeagueSection } from "@/features/Sports/components/LeagueSection";
import { Accordion } from "@/components/ui/accordion";
import { Header } from "@/features/Layout/components/Header";
import { Footer } from "@/features/Layout/components/Footer";
import { useSports } from "@/features/Sports/hooks/useSports";
import { EventStatusTab } from "@/features/Sports/components/EventStatusTab";
import { Betslip } from "@/features/Betslip/components";
import { useBetslip } from "@/features/Betslip/hooks";

export function SportsScreen() {
  const router = useRouter();
  const { sport: currentSport } = router.query;
  const { activeTab, setActiveTab, eventStatusTabs } = useSports();
  const { showBetslip } = useBetslip();

  // Fetch sports data
  const {
    sports,
    isLoading: sportsLoading,
    error: sportsError,
  } = useSportsList();
  const currentSportData = sports.find((s) => s.slug === currentSport);

  // Fetch leagues data for current sport
  const { leagues, isLoading: leaguesLoading } = useLeagues(
    currentSportData?.id ?? ""
  );

  if (showBetslip) {
    return (
      <div className="min-h-screen text-white">
        <div className="max-w-md mx-auto px-4 relative min-h-screen pb-24">
          <Betslip />
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-md mx-auto px-4 relative min-h-screen pb-24">
        <Header />
        <div className="space-y-6">
          {/* Sports List */}
          <SportsList
            sports={sports}
            currentSport={currentSport as string}
            isLoading={sportsLoading}
            error={sportsError}
          />

          {/* Tab Selector */}
          <EventStatusTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            eventStatusTabs={eventStatusTabs}
          />

          {/* Leagues and Events */}
          <div className="space-y-4">
            {!currentSportData ? (
              <div className="text-center py-8 text-gray-500">
                Select a sport to view events
              </div>
            ) : leagues && leagues.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {leagues.map((league) => (
                  <LeagueSection
                    key={league.id}
                    league={league}
                    tab={activeTab}
                  />
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {leaguesLoading ? "Loading leagues..." : "No leagues available"}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
