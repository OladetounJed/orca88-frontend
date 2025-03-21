export type TabType = "Live" | "Upcoming";

export enum EventResult {
  HOME_TEAM_WIN = "HOME_TEAM_WIN",
  DRAW = "DRAW",
  AWAY_TEAM_WIN = "AWAY_TEAM_WIN",
}

export enum MatchState {
  NOT_STARTED = "NOT_STARTED",
  FIRST_HALF = "FIRST_HALF",
  HALF_TIME = "HALF_TIME",
  SECOND_HALF = "SECOND_HALF",
  EXTRA_TIME = "EXTRA_TIME",
  PENALTIES = "PENALTIES",
  FULL_TIME = "FULL_TIME",
  POSTPONED = "POSTPONED",
  CANCELLED = "CANCELLED",
  // Add more states as needed for different sports
  BREAK = "BREAK", // Generic break state
  TIMEOUT = "TIMEOUT",
  QUARTER = "QUARTER",
  PERIOD = "PERIOD",
}

export enum BetStatus {
  PENDING = "PENDING",
  WON = "WON",
  LOST = "LOST",
  CANCELED = "CANCELED",
}

export enum BetType {
  SINGLE = "Single",
  MULTI = "Multi",
}

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
  BET_PLACED = "BET_PLACED",
  BET_WON = "BET_WON",
  BET_REFUNDED = "BET_REFUNDED",
}

export enum BetSelectionType {
  HOME = "HOME",
  AWAY = "AWAY",
  DRAW = "DRAW",
}

export interface Sport {
  id: string;
  key: string;
  active: boolean;
  group: string;
  description: string;
  title: string;
  hasOutrights: boolean;
  activeEventCount?: number;
  leagues?: League[];
  // UI specific fields
  image: string;
  backgroundColor: string;
  slug: string;
}

export interface League {
  id: string;
  sportId: string;
  sport?: Sport;
  name: string;
  country: string;
  events?: Event[];
  // UI specific fields
  image?: string;
}

export interface ScoreUpdate {
  id: string;
  eventId: string;
  score: string;
  name: string;
  timestamp: string;
}

export interface Event {
  id: string;
  externalId?: string;
  isLive: boolean;
  completed: boolean;
  name: string;
  homeTeamName: string;
  awayTeamName: string;
  startTime: string;
  sportId: string;
  sport?: Sport;
  leagueId: string;
  league?: League;
  market?: Market;
  scoreUpdates?: ScoreUpdate[];
  result?: EventResult;
  // UI specific fields
  minute?: number;
  matchState?: MatchState;
  period?: number; // For sports with quarters/periods
  score?: {
    home: number;
    away: number;
  };
}

export interface Market {
  id: string;
  eventId: string;
  event?: Event;
  lastUpdated: string;
  options: MarketOption[];
}

export interface MarketOption {
  id: string;
  lastUpdated: string;
  name: "HOME" | "DRAW" | "AWAY";
  odds: number;
  marketId: string;
  market?: Market;
}

export interface BetOption {
  id: number;
  betId: string;
  bet?: Bet;
  marketOptionId: string;
  marketOption?: MarketOption;
  status?: BetStatus;
}

export interface Bet {
  id: string;
  userId?: string;
  user?: User;
  type: BetType;
  selections: BetSelection[];
  stake?: number;
  potentialWinnings?: number;
  createdAt?: string;
  status?: BetStatus;
}

export interface Transaction {
  id: string;
  walletId: string;
  wallet?: Wallet;
  amount: number;
  transactionType: TransactionType;
  createdAt: string;
}

export interface Wallet {
  id: string;
  userId: string;
  user?: User;
  balance: number;
  transactions?: Transaction[];
}

export interface User {
  id: string;
  externalId?: string;
  username?: string;
  email?: string;
  wallet?: Wallet;
  bets?: Bet[];
}

export interface BetSelection {
  id: string;
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  selectedTeam: "HOME" | "DRAW" | "AWAY";
  odds: number;
  stake?: number;
  potentialWinnings?: number;
}
