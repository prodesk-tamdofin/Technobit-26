// Technobit'26 Event Segments Data
// Intra Online Event: 5-10 March 2026
// Motto: Built from bits, driven by brains

export interface Event {
  id: number;
  name: string;
  value: string;
  description: string;
  fee: number;
  type: "online" | "offline";
  image?: string;
}

export interface EventCategory {
  id: number;
  name: string;
  description: string;
  events: Event[];
}

export const eventCategories: EventCategory[] = [
  {
    id: 1,
    name: "Solo Segments",
    description: "Individual challenge events to test your knowledge and skills. All events are free to participate!",
    events: [
      {
        id: 101,
        name: "IT Olympiad",
        value: "it-olympiad",
        description: "30 MCQs based on IT knowledge and technology — hardware, software, networking, and more. Solo event for BNMPC students.",
        fee: 0,
        type: "online",
        image: "/events/it-olympiad.jpg"
      },
      {
        id: 102,
        name: "Gaming Quiz",
        value: "gaming-quiz",
        description: "30 MCQs based on gaming knowledge. Prove how much you know about games — solo event for BNMPC students.",
        fee: 0,
        type: "online",
        image: "/events/gaming-quiz.jpg"
      },
      {
        id: 103,
        name: "Robothon Olympiad",
        value: "robothon-olympiad",
        description: "30 MCQs covering Robotics and Cybersecurity. Individual event for BNMPC students.",
        fee: 0,
        type: "online",
        image: "/events/robothon.jpg"
      },
      {
        id: 104,
        name: "Marvel-DC Quiz",
        value: "marvel-dc-quiz",
        description: "Test your knowledge of Spider-Man, Iron Man, The Batman (2022), and Superman (2025). Solo quiz for BNMPC students.",
        fee: 0,
        type: "online",
        image: "/events/marvel-dc.jpg"
      },
      {
        id: 105,
        name: "Animelogia",
        value: "animelogia",
        description: "Anime quiz covering Attack On Titan, Demon Slayer, Chainsaw Man, Spy x Family, and Jujutsu Kaisen. Solo event.",
        fee: 0,
        type: "online",
        image: "/events/animelogia.jpg"
      },
      {
        id: 106,
        name: "Google It",
        value: "google-it",
        description: "A solo speed-search competition in MCQ format. Use Google to find answers — AI tools and chatbots are not allowed.",
        fee: 0,
        type: "online",
        image: "/events/google-it.jpg"
      }
    ]
  },
  {
    id: 2,
    name: "Signature Segments",
    description: "Our flagship events showcasing creativity, programming skills, and digital artistry.",
    events: [
      {
        id: 201,
        name: "Crack the Code",
        value: "crack-the-code",
        description: "Solve ciphers, numeric puzzles, word riddles, and logic challenges on HackerRank within the time limit.",
        fee: 30,
        type: "online",
        image: "/events/crack-the-code.jpg"
      },
      {
        id: 202,
        name: "Sci-Fi Story Writing",
        value: "sci-fi-story",
        description: "Write an original sci-fi story about the future — AI, space, time travel, or technology. Bangla or English accepted.",
        fee: 0,
        type: "online",
        image: "/events/sci-fi-story.jpg"
      },
      {
        id: 203,
        name: "Tech Meme War",
        value: "tech-meme-war",
        description: "Create one original tech-related meme and submit it to the EXHIB_IT Facebook group with #Technobit26_meme.",
        fee: 0,
        type: "online",
        image: "/events/tech-meme.jpg"
      },
      {
        id: 204,
        name: "AI Art",
        value: "ai-art",
        description: "Generate an AI artwork using any AI tool and submit it to the EXHIB_IT Facebook group with #Technobit26_art.",
        fee: 0,
        type: "online",
        image: "/events/ai-art.jpg"
      },
      {
        id: 205,
        name: "Poster Designing",
        value: "poster-designing",
        description: "Design an original digital poster on this year's official theme — \"Justice for Hadi\". Create using any graphic design software and submit to the EXHIB_IT Facebook group.",
        fee: 0,
        type: "online",
        image: "/events/poster-design.jpg"
      }
    ]
  },
  {
    id: 3,
    name: "Gaming Segments",
    description: "Competitive gaming tournaments in collaboration with BNMPC & BMARPC. Show your gaming skills!",
    events: [
      {
        id: 301,
        name: "eFootball",
        value: "efootball",
        description: "Knockout friendly matches using your own Dream Team. No emulators allowed. Follow the No Mercy rule at 7+ goal difference.",
        fee: 40,
        type: "online",
        image: "/events/efootball.jpg"
      },
      {
        id: 302,
        name: "PUBG Mobile",
        value: "pubg-mobile",
        description: "Team Deathmatch (TDM) — 4 main players + 1 substitute. Play on your own account. No emulators or third-party tools.",
        fee: 100,
        type: "online",
        image: "/events/pubg.jpg"
      },
      {
        id: 303,
        name: "Free Fire",
        value: "free-fire",
        description: "Team-based event in the game mode announced by organizers. 4 main players + 1 substitute. No emulators allowed.",
        fee: 100,
        type: "online",
        image: "/events/freefire.jpg"
      },
      {
        id: 304,
        name: "Chess",
        value: "chess",
        description: "Online chess tournament on Lichess.org. All ratings welcome. Top 2 players with the highest points win.",
        fee: 0,
        type: "online",
        image: "/events/chess.jpg"
      }
    ]
  }
];

// Helper to get all events flattened
export const getAllEvents = (): Event[] => {
  return eventCategories.flatMap(category => category.events);
};

// Helper to get event by value/slug
export const getEventBySlug = (slug: string): Event | undefined => {
  return getAllEvents().find(event => event.value === slug);
};

// Helper to get category by id
export const getCategoryById = (id: number): EventCategory | undefined => {
  return eventCategories.find(category => category.id === id);
};

// Event info for display
export const eventInfo = {
  name: "Technobit'26",
  tagline: "Built from bits, driven by brains",
  dates: "5-10 March 2026",
  type: "Intra Online Event",
  organizer: "BNMPC IT Club",
};
