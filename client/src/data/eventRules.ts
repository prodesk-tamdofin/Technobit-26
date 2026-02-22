// Event rules based on Technobit'26 Official Rulebook

export interface EventRules {
  rules: string[];
  submissionInfo?: string[];
  topics?: string[];
  topic?: string;
  groupLink?: { text: string; url: string };
}

export const eventRules: Record<string, EventRules> = {
  "efootball": {
    rules: [
      "All matches will be played in Friendly Match mode.",
      "Players are allowed to play with their own team (Dream Team).",
      "Every player must send a screenshot of the team they will be using before every match to the group created by the organizers.",
      "The screenshot of the match result must be sent by both players to the group created by the organizers.",
      "All matches will be knockout matches.",
      "Players must comply with this rulebook and the game's Terms of Service.",
      "Use of emulators is strictly prohibited. Any player found using an emulator will be disqualified.",
      "No Mercy Rule: If a player reaches a goal difference of 7 or more, they will be declared the winner. This rule does not apply in the Semi-Final and Final matches.",
      "If a player fails to appear within 5 minutes of being called for their match without a valid reason, a 3–0 walkover will be awarded to the opponent.",
      "If a player displays offensive behavior, uses abusive language, or makes threats, they will be immediately disqualified.",
      "If any interruption occurs (e.g. network issue), the player must provide necessary proof and the game will be restarted with the same settings.",
    ],
  },
  "chess": {
    rules: [
      "All matches will be played online on Lichess.org using the official tournament link.",
      "Players of all ratings are allowed; no minimum games required on Lichess.",
      "Only one Lichess account per player is allowed; multiple accounts are strictly prohibited.",
      "Tournament format and time control will be announced by the organizers.",
      "Match results recorded on Lichess will be considered final.",
      "Use of chess engines, external assistance, or any unfair means will lead to immediate disqualification.",
      "Any offensive behavior or unsportsmanlike conduct will result in disqualification.",
      "All players must join their matches on time.",
      "The top two players with the highest points will be declared the winners.",
      "All participants must join the official Technobit'26 Chess team on Lichess before the event. The link is provided below.",
    ],
    groupLink: {
      text: "Join the Technobit'26 Chess Team on Lichess",
      url: "https://lichess.org/team/technobit26-chess-championship",
    },
  },
  "pubg-mobile": {
    rules: [
      "This is a team-based event played in Team Deathmatch (TDM).",
      "Each team must have 4 main players and may register 1 substitute player.",
      "All team members must be enrolled students from the same college.",
      "Players must use their own PUBG Mobile accounts; use of emulators is not allowed.",
      "Any form of hacking, cheating, scripting, or use of third-party tools will result in immediate disqualification.",
      "Teams must join the match on time; late entry may lead to a forfeit.",
      "Players are expected to maintain sportsmanship and respectful behavior throughout the tournament.",
      "The organizers' decision is final in all cases and disputes.",
    ],
  },
  "free-fire": {
    rules: [
      "This is a team-based event played in the game mode announced by the organizers.",
      "Each team must have 4 main players and may register 1 substitute player.",
      "All team members must be enrolled students from the same college.",
      "Players must use their own Free Fire accounts; use of emulators is strictly prohibited.",
      "Any form of hacking, cheating, scripting, or third-party tools will result in immediate disqualification.",
      "All teams must join the match on time; late entry may lead to a forfeit.",
      "Players must maintain sportsmanship and respectful behavior throughout the tournament.",
      "The organizers' decision will be final in all cases and disputes.",
    ],
  },
  "it-olympiad": {
    rules: [
      "This is an individual (solo) event.",
      "Prior online registration is required for all participants.",
      "The competition will include 30 Multiple Choice Questions (MCQ) based on IT knowledge and technology.",
      "The time limit for the quiz will be 20 minutes.",
      "No unfair means are allowed — no copying, AI tools, or discussion with others.",
      "Any participant found violating rules will be disqualified.",
      "Only currently enrolled students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate.",
    ],
    topics: [
      "Computer Hardware", "Operating Systems", "Networking Basics", "Cybersecurity",
      "Programming Concepts", "Database Systems", "Internet & Web", "IT General Knowledge",
    ],
  },
  "gaming-quiz": {
    rules: [
      "This is a solo event — only one participant is allowed.",
      "The quiz will consist of 30 MCQs based on Gaming knowledge.",
      "The time limit for the main quiz will be 20 minutes.",
      "In case of a tie, a tie-breaker round will be conducted with a time limit of 10 minutes.",
      "The Quiz Master's decision is final in all situations.",
      "Only currently enrolled students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate.",
    ],
  },
  "robothon-olympiad": {
    rules: [
      "This is an individual (solo) event.",
      "Only currently enrolled students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate.",
      "Participants must complete registration within the specified deadline.",
      "The quiz will consist of 30 Multiple Choice Questions (MCQ) based on Robotics and Cybersecurity.",
      "Participants must answer within the allotted time; late submissions will not be accepted.",
      "Use of mobile phones, smart devices, books, or external help is strictly prohibited.",
      "Any participant found violating rules will be disqualified.",
    ],
    topics: [
      "Robotics Fundamentals", "Mechanics & Electronics", "Programming for Robots",
      "Cybersecurity Basics", "AI in Robotics", "Automation Concepts",
    ],
  },
  "marvel-dc-quiz": {
    rules: [
      "This is a solo event — only one participant is allowed.",
      "The quiz will consist of 30 MCQs based on Marvel and DC franchises.",
      "The time limit for the main quiz will be 20 minutes.",
      "In case of a tie, a tie-breaker round will be conducted with a time limit of 10 minutes.",
      "The Quiz Master's decision is final in all situations.",
      "Only currently enrolled students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate.",
    ],
    topics: [
      "Spider-Man", "Iron Man", "The Batman (2022)", "Superman (2025)",
    ],
  },
  "animelogia": {
    rules: [
      "This is a solo event — only one participant is allowed per entry.",
      "The quiz will have 1 Round and a Tie-breaker (if required).",
      "Round 1 consists of 30 questions with a time limit of 20 minutes.",
      "In case of a tie, a Tie-breaker round will be conducted with a time limit of 10 minutes.",
      "The Quiz Master's decision is final in all cases.",
      "Only currently enrolled students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate.",
    ],
    topics: [
      "Attack On Titan", "Demon Slayer", "Chainsaw Man", "Spy x Family", "Jujutsu Kaisen",
    ],
  },
  "google-it": {
    rules: [
      "This is an individual (solo) competition.",
      "Only currently enrolled students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate.",
      "Prior online registration is required for all participants.",
      "The competition will be conducted in MCQ format.",
      "The competition duration will be strictly maintained.",
      "Participants may use search engines (e.g. Google), but use of AI tools, chatbots, or smart assistants is strictly prohibited.",
      "Any participant found violating rules will be disqualified.",
    ],
  },
  "crack-the-code": {
    rules: [
      "The competition will be conducted online on HackerRank.",
      "Participants must solve all problems within the time limit.",
      "Submissions made after the time limit will not be considered.",
      "Use of unauthorized resources, external help, or collaboration is strictly prohibited.",
      "All solutions must be original and written by the participant.",
      "The problems may include ciphers, numeric puzzles, word riddles, or logic-based challenges.",
      "Any violation of the rules will result in immediate disqualification.",
      "Participants must ensure their HackerRank username is correctly entered during registration.",
    ],
  },
  "sci-fi-story": {
    rules: [
      "Individual participation only — no teams.",
      "The story must be science-fiction based (future, technology, AI, space, time travel, etc.).",
      "Any content copied from movies, books, or the internet will lead to disqualification.",
      "AI-generated stories are not allowed. Any detected AI content will result in disqualification.",
      "The story can be written in Bangla or English.",
      "The story must be submitted within the given time. Late submissions will not be accepted.",
      "Only currently enrolled students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate.",
    ],
    submissionInfo: [
      "Submit your story in PDF or DOCX format.",
      "Stories must be submitted through the Technobit website or the official submission link.",
      "Name your file with your full name, section, and roll number.",
    ],
  },
  "tech-meme-war": {
    rules: [
      "Individual participants only — each participant may submit only one meme.",
      "Memes must be original, creative, and tech-related.",
      "All content must be fun, respectful, and audience-friendly. No bullying, harassment, hate speech, or offensive material.",
      "Targeting individuals, public figures, organizations, political or religious topics is prohibited.",
      "Only currently enrolled students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate.",
    ],
    submissionInfo: [
      "Submit your meme on the Facebook group 'EXHIB_IT' using the link below.",
      "The caption must include the hashtag #Technobit26_meme.",
      "Include your Name, Section, Roll, and Group in the caption.",
    ],
    groupLink: {
      text: "Join the EXHIB IT Facebook Group to Submit",
      url: "https://www.facebook.com/groups/exhib.it.bnmpcitc",
    },
  },
  "ai-art": {
    topic: "Sci/Tech Related",
    rules: [
      "All artworks must be generated using AI tools by the participant.",
      "Manually edited or copied artworks will be disqualified.",
      "Offensive, plagiarized, or disrespectful content is strictly prohibited.",
      "Only currently enrolled students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate.",
    ],
    submissionInfo: [
      "Submit your artwork on the Facebook group 'EXHIB_IT' using the link below.",
      "The caption must include the hashtag #Technobit26_art.",
      "Include your Name, Section, Roll, and Group in the caption.",
    ],
    groupLink: {
      text: "Join the EXHIB IT Facebook Group to Submit",
      url: "https://www.facebook.com/groups/exhib.it.bnmpcitc",
    },
  },
  "poster-designing": {
    topic: "Justice for Hadi",
    rules: [
      "This is an individual (solo) event.",
      "Participants must create an original digital poster during the event.",
      "The artwork must be created using any graphic designing software.",
      "Use of pre-made templates, stock images, AI tools, or copied content is strictly prohibited.",
      "The time limit must be followed strictly. Late submissions will not be accepted.",
      "Participants may submit their artworks in PNG or JPG format.",
      "Only currently enrolled students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate.",
    ],
    submissionInfo: [
      "Submit your poster on the Facebook group 'EXHIB_IT' using the link below.",
      "The caption must include the hashtag #Technobit26_poster.",
      "Include your Name, Section, Roll, and Group in the caption.",
    ],
    groupLink: {
      text: "Join the EXHIB IT Facebook Group to Submit",
      url: "https://www.facebook.com/groups/exhib.it.bnmpcitc",
    },
  },
};

// Get rules by event slug
export const getRulesBySlug = (slug: string): EventRules | undefined => {
  return eventRules[slug];
};
