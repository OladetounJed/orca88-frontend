import type { League } from "@/types";

export const leagues: League[] = [
  // Football Leagues
  {
    id: "premier-league",
    sportId: "1",
    name: "Premier League",
    country: "England",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2",
  },
  {
    id: "la-liga",
    sportId: "1",
    name: "La Liga",
    country: "Spain",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d",
  },
  // Basketball Leagues
  {
    id: "nba",
    sportId: "2",
    name: "NBA",
    country: "USA",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a",
  },
  {
    id: "euroleague",
    sportId: "2",
    name: "EuroLeague",
    country: "Europe",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf",
  },
  // Tennis Leagues
  {
    id: "atp",
    sportId: "3",
    name: "ATP Tour",
    country: "International",
    image: "https://images.unsplash.com/photo-1542144582-1ba00456b5e3",
  },
  // Cricket Leagues
  {
    id: "ipl",
    sportId: "4",
    name: "Indian Premier League",
    country: "India",
    image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972",
  },
  // Ice Hockey Leagues
  {
    id: "nhl",
    sportId: "5",
    name: "NHL",
    country: "USA/Canada",
    image: "https://images.unsplash.com/photo-1515703407324-5f753afd8be8",
  },
];
