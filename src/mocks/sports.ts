import type { Sport } from "@/types";

export const sports: Sport[] = [
  {
    id: "1",
    key: "football",
    active: true,
    group: "Popular",
    description: "Football/Soccer matches from major leagues worldwide",
    title: "Football",
    hasOutrights: true,
    activeEventCount: 150,
    image:
      "https://res.cloudinary.com/oladetounjed/image/upload/v1741550474/orca88/football.jpg",
    backgroundColor: "#AF7800",
    slug: "football",
  },
  {
    id: "2",
    key: "basketball",
    active: true,
    group: "Popular",
    description: "Basketball matches from major leagues worldwide",
    title: "Basketball",
    hasOutrights: true,
    activeEventCount: 75,
    image:
      "https://res.cloudinary.com/oladetounjed/image/upload/v1741550475/orca88/basketball.jpg",
    backgroundColor: "#9f1239",
    slug: "basketball",
  },
  {
    id: "3",
    key: "tennis",
    active: true,
    group: "Popular",
    description: "Tennis matches and tournaments worldwide",
    title: "Tennis",
    hasOutrights: true,
    activeEventCount: 50,
    image:
      "https://res.cloudinary.com/oladetounjed/image/upload/v1741550475/orca88/tennis.jpg",
    backgroundColor: "#6b21a8",
    slug: "tennis",
  },
  {
    id: "4",
    key: "cricket",
    active: true,
    group: "Other",
    description: "Cricket matches and tournaments worldwide",
    title: "Cricket",
    hasOutrights: true,
    activeEventCount: 25,
    image:
      "https://res.cloudinary.com/oladetounjed/image/upload/v1741550474/orca88/cricket.jpg",
    backgroundColor: "#1e3a8a",
    slug: "cricket",
  },
  {
    id: "5",
    key: "ice-hockey",
    active: true,
    group: "Other",
    description: "Ice Hockey matches from major leagues worldwide",
    title: "Ice Hockey",
    hasOutrights: true,
    activeEventCount: 30,
    image:
      "https://res.cloudinary.com/oladetounjed/image/upload/v1741550474/orca88/ice-hockey.jpg",
    backgroundColor: "#166534",
    slug: "hockey",
  },
];
