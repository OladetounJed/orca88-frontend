import type { Match } from "@/types";

// Helper function to generate a random score
const randomScore = (max: number = 5) => Math.floor(Math.random() * max);

// Helper function to generate random odds
const randomOdds = (base: number = 2, variance: number = 1) =>
  +(base + Math.random() * variance).toFixed(2);

export const generateMatches = (leagueId: string): Match[] => {
  const now = new Date();
  const matches: Match[] = [];

  // Generate live matches
  for (let i = 0; i < 3; i++) {
    const minute = Math.floor(Math.random() * 90) + 1;
    matches.push({
      id: `${leagueId}-live-${i}`,
      league: leagueId,
      isLive: true,
      minute,
      homeTeam: `Home Team ${i + 1}`,
      awayTeam: `Away Team ${i + 1}`,
      score: {
        home: randomScore(),
        away: randomScore(),
      },
      odds: {
        home: randomOdds(),
        draw: randomOdds(3),
        away: randomOdds(),
      },
      markets: [
        {
          id: `${leagueId}-live-${i}-1x2`,
          name: "1X2",
          selections: [
            {
              id: `${leagueId}-live-${i}-1`,
              name: "Home",
              odds: randomOdds(),
            },
            {
              id: `${leagueId}-live-${i}-x`,
              name: "Draw",
              odds: randomOdds(3),
            },
            {
              id: `${leagueId}-live-${i}-2`,
              name: "Away",
              odds: randomOdds(),
            },
          ],
        },
        {
          id: `${leagueId}-live-${i}-btts`,
          name: "Both Teams to Score",
          selections: [
            {
              id: `${leagueId}-live-${i}-btts-yes`,
              name: "Yes",
              odds: randomOdds(1.8),
            },
            {
              id: `${leagueId}-live-${i}-btts-no`,
              name: "No",
              odds: randomOdds(1.8),
            },
          ],
        },
      ],
    });
  }

  // Generate upcoming matches
  for (let i = 0; i < 5; i++) {
    const startTime = new Date(now.getTime() + (i + 1) * 3600000); // Each match 1 hour apart
    matches.push({
      id: `${leagueId}-upcoming-${i}`,
      league: leagueId,
      isLive: false,
      startTime: startTime.toISOString(),
      homeTeam: `Home Team ${i + 4}`,
      awayTeam: `Away Team ${i + 4}`,
      odds: {
        home: randomOdds(),
        draw: randomOdds(3),
        away: randomOdds(),
      },
      markets: [
        {
          id: `${leagueId}-upcoming-${i}-1x2`,
          name: "1X2",
          selections: [
            {
              id: `${leagueId}-upcoming-${i}-1`,
              name: "Home",
              odds: randomOdds(),
            },
            {
              id: `${leagueId}-upcoming-${i}-x`,
              name: "Draw",
              odds: randomOdds(3),
            },
            {
              id: `${leagueId}-upcoming-${i}-2`,
              name: "Away",
              odds: randomOdds(),
            },
          ],
        },
        {
          id: `${leagueId}-upcoming-${i}-ou`,
          name: "Over/Under 2.5",
          selections: [
            {
              id: `${leagueId}-upcoming-${i}-over`,
              name: "Over",
              odds: randomOdds(1.9),
            },
            {
              id: `${leagueId}-upcoming-${i}-under`,
              name: "Under",
              odds: randomOdds(1.9),
            },
          ],
        },
      ],
    });
  }

  return matches;
};
