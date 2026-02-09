// Technobit'26 Event Segments Data
// Intra Online Event: 5-8 March 2026
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
        description: "Test your IT knowledge in this comprehensive olympiad covering hardware, software, networking, and more.",
        fee: 0,
        type: "online",
        image: "/events/it-olympiad.jpg"
      },
      {
        id: 102,
        name: "Gaming Quiz",
        value: "gaming-quiz",
        description: "How well do you know the gaming world? From retro classics to modern masterpieces, prove your gaming knowledge!",
        fee: 0,
        type: "online",
        image: "/events/gaming-quiz.jpg"
      },
      {
        id: 103,
        name: "Robothon Olympiad",
        value: "robothon-olympiad",
        description: "A robotics knowledge challenge covering mechanics, electronics, programming and AI concepts.",
        fee: 0,
        type: "online",
        image: "/events/robothon.jpg"
      },
      {
        id: 104,
        name: "Marvel-DC Quiz",
        value: "marvel-dc-quiz",
        description: "Are you Team Marvel or Team DC? Test your superhero universe knowledge in this ultimate comic quiz!",
        fee: 0,
        type: "online",
        image: "/events/marvel-dc.jpg"
      },
      {
        id: 105,
        name: "Animelogia",
        value: "animelogia",
        description: "From Naruto to Attack on Titan, prove you're the ultimate otaku in this anime knowledge showdown!",
        fee: 0,
        type: "online",
        image: "/events/animelogia.jpg"
      },
      {
        id: 106,
        name: "Google It",
        value: "google-it",
        description: "Master the art of searching! Find answers faster than anyone else using your Google-fu skills.",
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
        description: "The ultimate programming challenge! Solve algorithmic puzzles and prove your coding prowess.",
        fee: 30,
        type: "online",
        image: "/events/crack-the-code.jpg"
      },
      {
        id: 202,
        name: "Sci-Fi Story Writing",
        value: "sci-fi-story",
        description: "Unleash your imagination and craft captivating science fiction narratives set in the future.",
        fee: 0,
        type: "online",
        image: "/events/sci-fi-story.jpg"
      },
      {
        id: 203,
        name: "Tech Meme War",
        value: "tech-meme-war",
        description: "Create the funniest, most relatable tech memes and win the internet! Creativity is your weapon.",
        fee: 0,
        type: "online",
        image: "/events/tech-meme.jpg"
      },
      {
        id: 204,
        name: "AI Art",
        value: "ai-art",
        description: "Harness the power of AI to create stunning digital artwork. Prompt engineering meets creativity!",
        fee: 0,
        type: "online",
        image: "/events/ai-art.jpg"
      },
      {
        id: 205,
        name: "Poster Designing",
        value: "poster-designing",
        description: "Design eye-catching posters that communicate powerful messages. Show your graphic design skills!",
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
        description: "Battle it out on the virtual pitch! Show your football gaming skills in this intense tournament.",
        fee: 40,
        type: "online",
        image: "/events/efootball.jpg"
      },
      {
        id: 302,
        name: "PUBG Mobile",
        value: "pubg-mobile",
        description: "Drop in, loot up, and be the last squad standing in this battle royale showdown!",
        fee: 50,
        type: "online",
        image: "/events/pubg.jpg"
      },
      {
        id: 303,
        name: "Free Fire",
        value: "free-fire",
        description: "Fast-paced battle royale action! Survive the battlefield and claim victory.",
        fee: 50,
        type: "online",
        image: "/events/freefire.jpg"
      },
      {
        id: 304,
        name: "Chess",
        value: "chess",
        description: "The classic game of strategy and intellect. Checkmate your opponents in this mind sport tournament.",
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
  dates: "5-8 March 2026",
  type: "Intra Online Event",
  organizer: "BNMPC IT Club",
};
