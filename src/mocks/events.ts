import type { Event, Market, MarketOption } from "@/types";

// Helper function to generate random odds
const randomOdds = (base: number = 2, variance: number = 1) =>
  +(base + Math.random() * variance).toFixed(2);

// Helper function to generate a random score
const randomScore = (max: number = 5) => Math.floor(Math.random() * max);

const generateMarketOptions = (marketId: string): MarketOption[] => {
  const now = new Date().toISOString();
  return [
    {
      id: `${marketId}-1`,
      lastUpdated: now,
      name: "HOME",
      odds: randomOdds(),
      marketId,
    },
    {
      id: `${marketId}-X`,
      lastUpdated: now,
      name: "DRAW",
      odds: randomOdds(3),
      marketId,
    },
    {
      id: `${marketId}-2`,
      lastUpdated: now,
      name: "AWAY",
      odds: randomOdds(),
      marketId,
    },
  ];
};

const generateMarket = (eventId: string): Market => {
  const now = new Date().toISOString();
  return {
    id: `${eventId}-1x2`,
    eventId,
    lastUpdated: now,
    options: generateMarketOptions(`${eventId}-1x2`),
  };
};

export const generateEvents = (leagueId: string, sportId: string): Event[] => {
  const now = new Date();
  const events: Event[] = [];

  // Generate live events
  for (let i = 0; i < 3; i++) {
    const minute = Math.floor(Math.random() * 90) + 1;
    const homeScore = randomScore();
    const awayScore = randomScore();

    events.push({
      id: `${leagueId}-live-${i}`,
      externalId: `EXT-${leagueId}-${i}`,
      isLive: true,
      completed: false,
      name: `Home Team ${i + 1} vs Away Team ${i + 1}`,
      homeTeamName: `Home Team ${i + 1}`,
      awayTeamName: `Away Team ${i + 1}`,
      startTime: new Date(now.getTime() - minute * 60000).toISOString(),
      sportId,
      leagueId,
      market: generateMarket(`${leagueId}-live-${i}`),
      scoreUpdates: [
        {
          id: `${leagueId}-live-${i}-score`,
          eventId: `${leagueId}-live-${i}`,
          score: `${homeScore}-${awayScore}`,
          name: "Current Score",
          timestamp: now.toISOString(),
        },
      ],
      // UI specific fields
      minute,
      score: {
        home: homeScore,
        away: awayScore,
      },
    });
  }

  // Generate upcoming events
  for (let i = 0; i < 5; i++) {
    const startTime = new Date(now.getTime() + (i + 1) * 3600000);
    events.push({
      id: `${leagueId}-upcoming-${i}`,
      externalId: `EXT-${leagueId}-upcoming-${i}`,
      isLive: false,
      completed: false,
      name: `Home Team ${i + 4} vs Away Team ${i + 4}`,
      homeTeamName: `Home Team ${i + 4}`,
      awayTeamName: `Away Team ${i + 4}`,
      startTime: startTime.toISOString(),
      sportId,
      leagueId,
      market: generateMarket(`${leagueId}-upcoming-${i}`),
    });
  }

  return events;
};
