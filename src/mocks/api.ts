import { sports } from "./sports";
import { leagues } from "./leagues";
import { generateEvents } from "./events";
import { BetType, BetStatus, TransactionType } from "@/types";
import type {
  Sport,
  League,
  Event,
  Market,
  MarketOption,
  Bet,
  BetOption,
  User,
} from "@/types";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Current user mock data
const currentUser: User = {
  id: "user1",
  username: "demo_user",
  email: "demo@example.com",
  wallet: {
    id: "wallet1",
    userId: "user1",
    balance: 1000,
    transactions: [],
  },
  bets: [],
};

// Current bet mock data
const currentBet: Bet = {
  id: "current",
  userId: currentUser.id,
  type: BetType.SINGLE,
  selections: [],
  stake: 0,
  potentialWinnings: 0,
  createdAt: new Date().toISOString(),
  status: BetStatus.PENDING,
};

// Queries
export const me = async (): Promise<User> => {
  await delay(300);
  return currentUser;
};

export const listSports = async (group?: string): Promise<Sport[]> => {
  await delay(500);
  const filteredSports = group
    ? sports.filter((sport) => sport.group === group)
    : sports;
  return filteredSports.map((sport) => ({
    ...sport,
    leagues: leagues.filter((league) => league.sportId === sport.id),
  }));
};

export const listLeagues = async (sportId: string): Promise<League[]> => {
  await delay(500);
  return leagues.filter((league) => league.sportId === sportId);
};

export const getLeague = async (id: string): Promise<League | undefined> => {
  await delay(500);
  return leagues.find((league) => league.id === id);
};

export const getEvent = async (id: string): Promise<Event | undefined> => {
  await delay(500);
  for (const league of leagues) {
    const events = generateEvents(league.id, league.sportId);
    const event = events.find((event) => event.id === id);
    if (event) {
      return {
        ...event,
        league: league,
        sport: sports.find((sport) => sport.id === league.sportId),
      };
    }
  }
  return undefined;
};

export const listEvents = async (leagueId: string): Promise<Event[]> => {
  await delay(800);
  const league = await getLeague(leagueId);
  if (!league) return [];
  return generateEvents(league.id, league.sportId).filter(
    (event) => !event.isLive && !event.completed
  );
};

export const listLiveEvents = async (leagueId: string): Promise<Event[]> => {
  await delay(800);
  const league = await getLeague(leagueId);
  if (!league) return [];
  return generateEvents(league.id, league.sportId).filter(
    (event) => event.isLive
  );
};

export const getMarket = async (
  eventId: string
): Promise<Market | undefined> => {
  await delay(500);
  const event = await getEvent(eventId);
  return event?.market;
};

// Mutations
export const placeBet = async (
  betType: BetType,
  marketOptionIds: string[],
  stake: number
): Promise<Bet> => {
  await delay(1000);

  const allEvents = leagues.flatMap((league) =>
    generateEvents(league.id, league.sportId)
  );
  const allMarkets = allEvents
    .map((event) => event.market)
    .filter((market): market is Market => !!market);
  const allOptions = allMarkets.flatMap((market) => market.options);

  const betOptions: BetOption[] = marketOptionIds.map((optionId, index) => {
    const option = allOptions.find((opt) => opt.id === optionId);
    if (!option) throw new Error(`Market option not found: ${optionId}`);

    return {
      id: index + 1,
      betId: currentBet.id,
      marketOptionId: optionId,
      marketOption: option,
      status: BetStatus.PENDING,
    };
  });

  const totalOdds = betOptions.reduce(
    (acc, opt) => acc * (opt.marketOption?.odds || 1),
    1
  );
  const potentialWinnings = +(stake * totalOdds).toFixed(2);

  const bet: Bet = {
    id: `bet-${Date.now()}`,
    userId: currentUser.id,
    type: betType,
    selections: betOptions.map((opt) => ({
      id: opt.id.toString(),
      matchId: opt.marketOption?.marketId || "",
      homeTeam: "", // Add required fields
      awayTeam: "",
      league: "",
      odds: opt.marketOption?.odds || 0,
      selectedTeam: opt.marketOption?.name || "",
    })),
    stake,
    potentialWinnings,
    createdAt: new Date().toISOString(),
    status: BetStatus.PENDING,
  };

  // Update user's wallet
  if (currentUser.wallet) {
    currentUser.wallet.balance -= stake;
    currentUser.wallet.transactions?.push({
      id: `tx-${Date.now()}`,
      walletId: currentUser.wallet.id,
      amount: -stake,
      transactionType: TransactionType.BET_PLACED,
      createdAt: new Date().toISOString(),
    });
  }

  // Add bet to user's bets
  currentUser.bets = [...(currentUser.bets || []), bet];

  return bet;
};

// Subscriptions (simulated with callbacks)
export const subscribeToLiveMarketUpdates = (
  onUpdate: (options: MarketOption[]) => void
) => {
  const interval = setInterval(() => {
    const allEvents = leagues.flatMap((league) =>
      generateEvents(league.id, league.sportId)
    );
    const liveEvents = allEvents.filter((event) => event.isLive);
    const updatedOptions = liveEvents
      .map((event) => event.market)
      .filter((market): market is Market => !!market)
      .flatMap((market) => market.options)
      // Ensure odds are different by adding a small random increment
      .map((option) => ({
        ...option,
        odds: +(option.odds + (Math.random() * 0.2 - 0.1)).toFixed(2), // Add/subtract up to 0.1
        lastUpdated: new Date().toISOString(),
      }));

    onUpdate(updatedOptions);
  }, 5000); // Update every 5 seconds instead of 30 seconds

  return () => clearInterval(interval);
};

export const subscribeToEventScores = (onUpdate: (events: Event[]) => void) => {
  const interval = setInterval(() => {
    const liveEvents = leagues.flatMap((league) =>
      generateEvents(league.id, league.sportId).filter((event) => event.isLive)
    );
    onUpdate(liveEvents);
  }, 30000);

  return () => clearInterval(interval);
};
