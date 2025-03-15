// import { useState } from "react";
// import type { League, TabType } from "@/types";
// import { Header } from "@/features/Layout/components/Header";
// import { SportsList } from "@/features/Sports/components/SportsList";
// import { EventStatusTab } from "@/features/Sports/components/EventStatusTab";
// import { LeagueSection } from "@/features/Sports/components/LeagueSection";
// import { Footer } from "@/features/Layout/components/Footer";
// import { Accordion } from "@/components/ui/accordion";

// const DEMO_LEAGUES: League[] = [
//   {
//     country: "India",
//     id: "indian-supe-league",
//     name: "Indian Super League",
//     matches: [
//       {
//         id: "1",
//         league: "Indian Super League",
//         isLive: true,
//         minute: 79,
//         homeTeam: "Mumbai City",
//         awayTeam: "Bengaluru FC",
//         score: { home: 2, away: 0 },
//         odds: { home: 1.5, draw: 4.61, away: 1.5 },
//       },
//       {
//         id: "2",
//         league: "Indian Super League",
//         isLive: true,
//         minute: 79,
//         homeTeam: "Kerala Blasters",
//         awayTeam: "Hyderabad FC",
//         score: { home: 2, away: 0 },
//         odds: { home: 1.5, draw: 4.61, away: 1.5 },
//       },
//     ],
//   },
//   {
//     country: "India",
//     id: "india-super-league",
//     name: "Indian Super League",
//     matches: [
//       {
//         id: "1",
//         league: "Indian Super League",
//         isLive: true,
//         minute: 79,
//         homeTeam: "Mumbai City",
//         awayTeam: "Bengaluru FC",
//         score: { home: 2, away: 0 },
//         odds: { home: 1.5, draw: 4.61, away: 1.5 },
//       },
//       {
//         id: "2",
//         league: "Indian Super League",
//         isLive: true,
//         minute: 79,
//         homeTeam: "Kerala Blasters",
//         awayTeam: "Hyderabad FC",
//         score: { home: 2, away: 0 },
//         odds: { home: 1.5, draw: 4.61, away: 1.5 },
//       },
//     ],
//   },
//   {
//     country: "India",
//     id: "indian-super-league",
//     name: "Indian Super League",
//     matches: [
//       {
//         id: "1",
//         league: "Indian Super League",
//         isLive: true,
//         minute: 79,
//         homeTeam: "Mumbai City",
//         awayTeam: "Bengaluru FC",
//         score: { home: 2, away: 0 },
//         odds: { home: 1.5, draw: 4.61, away: 1.5 },
//       },
//       {
//         id: "2",
//         league: "Indian Super League",
//         isLive: true,
//         minute: 79,
//         homeTeam: "Kerala Blasters",
//         awayTeam: "Hyderabad FC",
//         score: { home: 2, away: 0 },
//         odds: { home: 1.5, draw: 4.61, away: 1.5 },
//       },
//     ],
//   },
//   {
//     country: "India",
//     id: "indian-super-leagu",
//     name: "Indian Super League",
//     matches: [
//       {
//         id: "1",
//         league: "Indian Super League",
//         isLive: true,
//         minute: 79,
//         homeTeam: "Mumbai City",
//         awayTeam: "Bengaluru FC",
//         score: { home: 2, away: 0 },
//         odds: { home: 1.5, draw: 4.61, away: 1.5 },
//       },
//       {
//         id: "2",
//         league: "Indian Super League",
//         isLive: true,
//         minute: 79,
//         homeTeam: "Kerala Blasters",
//         awayTeam: "Hyderabad FC",
//         score: { home: 2, away: 0 },
//         odds: { home: 1.5, draw: 4.61, away: 1.5 },
//       },
//     ],
//   },
//   {
//     country: "England",
//     id: "premier-league",
//     name: "Premier League",
//     matchCount: 5,
//     matches: [],
//   },
// ];

// function App() {
//   const [activeTab, setActiveTab] = useState<TabType>("Live");

//   return (
//     <div className="min-h-screen text-white">
//       <div className="max-w-md mx-auto px-4 relative min-h-screen pb-24">
//         <Header />

//         <div className="space-y-6">
//           <SportsList />

//           <EventStatusTab activeTab={activeTab} onChange={setActiveTab} />

//           <Accordion className="space-y-4" type="single" collapsible>
//             {DEMO_LEAGUES.map((league) => (
//               <LeagueSection
//                 key={`${league.country}-${league.name}`}
//                 league={league}
//               />
//             ))}
//           </Accordion>
//         </div>

//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default App;

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function SportsIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/sports/football");
  }, [router]);

  return null;
}
