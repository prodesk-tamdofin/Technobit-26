// Event rules from Technobit'26 Rulebook

export interface EventRules {
  rules: string[];
  submissionInfo?: string[];
  topics?: string[];
}

export const eventRules: Record<string, EventRules> = {
  "efootball": {
    rules: [
      "All matches will be played via the Friendly Match mode.",
      "Players are allowed to play with their own team (Dream Team).",
      "Every player must send a screenshot of the team before every match to the organizers' group.",
      "The screenshot of the match result must be sent by both players.",
      "All matches will be knockout matches.",
      "Players must comply with this rulebook and the game's Terms of Service.",
      "Use of emulators is strictly prohibited.",
      "If a player reaches a goal difference of 7 or more, they will be declared the winner (Not applicable in Semi-Final and Final).",
      "If a player fails to appear within 5 minutes, a 3–0 walkover will be awarded.",
      "Offensive behavior, abusive language, or threats will result in disqualification.",
      "In case of interruption (network issue etc.), proof must be provided and match will restart with same settings.",
    ],
  },
  "chess": {
    rules: [
      "All matches will be played online on Lichess.org using official tournament link.",
      "Players of all ratings are allowed.",
      "Only one Lichess account per player.",
      "Tournament format and time control will be announced.",
      "Match results recorded on Lichess will be final.",
      "Use of chess engines or unfair means will lead to disqualification.",
      "Offensive behavior will result in disqualification.",
      "Players must join on time.",
      "Top two players with highest points will be winners.",
    ],
  },
  "pubg-mobile": {
    rules: [
      "Team-based event played in Team Deathmatch (TDM).",
      "Each team must have 4 main players and 1 substitute.",
      "Must use own PUBG Mobile accounts.",
      "Emulators are not allowed.",
      "Hacking, cheating, scripting → immediate disqualification.",
      "Late entry may lead to forfeit.",
      "Maintain sportsmanship.",
      "Organizers' decision is final.",
    ],
  },
  "free-fire": {
    rules: [
      "Team-based event (mode announced by organizers).",
      "4 main players + 1 substitute.",
      "Must use own Free Fire accounts.",
      "Emulators strictly prohibited.",
      "Hacking/cheating → disqualification.",
      "Late entry may lead to forfeit.",
      "Maintain sportsmanship.",
      "Organizers' decision is final.",
    ],
  },
  "it-olympiad": {
    rules: [
      "Individual event.",
      "Prior online registration mandatory.",
      "30 MCQs based on IT knowledge.",
      "Time limit: 20 minutes.",
      "No unfair means (AI tools, copying, discussion).",
      "Rule violation → disqualification.",
      "Only for currently enrolled BNMPC students.",
    ],
  },
  "gaming-quiz": {
    rules: [
      "Solo event.",
      "30 MCQs.",
      "Time limit: 20 minutes.",
      "Tie-breaker: 10 minutes.",
      "Quiz Master's decision is final.",
      "Only for currently enrolled BNMPC students.",
    ],
  },
  "robothon-olympiad": {
    rules: [
      "Individual event.",
      "Only for currently enrolled BNMPC students.",
      "Registration required before deadline.",
      "30 MCQs (Robotics + Cybersecurity).",
      "Late submissions not accepted.",
      "No mobile/books/external help.",
      "Rule violation → disqualification.",
    ],
  },
  "marvel-dc-quiz": {
    rules: [
      "Solo event.",
      "30 MCQs.",
      "Time limit: 20 minutes.",
      "Tie-breaker: 10 minutes.",
      "Quiz Master's decision final.",
      "Only for currently enrolled BNMPC students.",
    ],
    topics: ["Spider-Man", "Iron Man", "Captain America"],
  },
  "animelogia": {
    rules: [
      "Solo event.",
      "1 Round + Tie-breaker (if needed).",
      "Round 1: 30 questions, 20 minutes.",
      "Tie-breaker: 10 minutes.",
      "Quiz Master's decision final.",
      "Only for currently enrolled BNMPC students.",
    ],
    topics: ["Attack On Titan", "Demon Slayer", "Chainsaw Man", "Spy x Family", "Jujutsu Kaisen"],
  },
  "google-it": {
    rules: [
      "Individual competition.",
      "Only for currently enrolled BNMPC students.",
      "Prior registration mandatory.",
      "MCQ format.",
      "Strict time limit.",
      "Search engines allowed.",
      "AI tools/chatbots prohibited.",
      "Rule violation → disqualification.",
    ],
  },
  "crack-the-code": {
    rules: [
      "Conducted online on HackerRank.",
      "Solve all problems within time.",
      "Late submissions not considered.",
      "No unauthorized resources or collaboration.",
      "Solutions must be original.",
      "Problems may include ciphers, numeric puzzles, riddles, logic challenges.",
      "Rule violation → disqualification.",
    ],
  },
  "sci-fi-story": {
    rules: [
      "Open to registered participants.",
      "Individual participation only.",
      "Must be science-fiction based (future, AI, space, etc.).",
      "No copied content.",
      "AI-generated stories not allowed.",
      "Language: Bangla or English.",
      "Must submit within time.",
      "Only for currently enrolled BNMPC students.",
    ],
    submissionInfo: [
      "Submit in PDF or DOCX format.",
      "Submit via Technobit website or official submission link.",
    ],
  },
  "tech-meme-war": {
    rules: [
      "Individual participation only.",
      "One meme per participant.",
      "Must be original and tech-related.",
      "No bullying, hate speech, offensive material.",
      "No targeting individuals, political or religious topics.",
      "Only for currently enrolled BNMPC students.",
    ],
    submissionInfo: [
      "Submit on Facebook group \"EXHIB_IT\".",
      "Include hashtag: #Technobit26_meme",
      "Include Name, Section, Roll, Group in caption.",
    ],
  },
  "ai-art": {
    rules: [
      "No specific topic.",
      "Must be AI-generated by participant.",
      "Manually edited/copied artworks → disqualification.",
      "No offensive/plagiarized content.",
      "Only for currently enrolled BNMPC students.",
    ],
    submissionInfo: [
      "Submit on Facebook group \"EXHIB_IT\".",
      "Include hashtag: #Technobit26_art",
      "Include Name, Section, Roll, Group in caption.",
    ],
  },
  "poster-designing": {
    rules: [
      "Individual event.",
      "Must create original illustration during event.",
      "Theme announced at beginning.",
      "Use any graphic designing software.",
      "No templates, stock images, AI tools.",
      "Strict time limit.",
      "Submit in PNG/JPG format.",
      "Only for currently enrolled BNMPC students.",
    ],
    submissionInfo: [
      "Submit on Facebook group \"EXHIB_IT\".",
      "Include hashtag: #Technobit26_poster",
      "Include Name, Section, Roll, Group in caption.",
    ],
  },
};

// Get rules by event slug
export const getRulesBySlug = (slug: string): EventRules | undefined => {
  return eventRules[slug];
};
