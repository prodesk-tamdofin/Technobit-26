// Event rules from Technobit'26 Rulebook

export interface EventRules {
  rules: string[];
  submissionInfo?: string[];
  topics?: string[];
  groupLink?: { text: string; url: string };
}

export const eventRules: Record<string, EventRules> = {
  "efootball": {
    rules: [
      "All matches will be played exclusively in Friendly Match mode using each participant's own Dream Team.",
      "Before every match, each player must share a screenshot of their selected team in the organizers' designated group.",
      "After each match, both players are required to submit a screenshot of the final result — failure to do so may result in the match being declared void.",
      "All rounds follow a knockout (elimination) format; the losing player is immediately eliminated from the tournament.",
      "Participants must strictly adhere to the eFootball Terms of Service; exploitation of in-game bugs will result in disqualification.",
      "Use of emulators or any third-party software to gain an unfair advantage is strictly prohibited.",
      "If a player achieves a goal difference of 7 or more, they will be declared the winner. This rule does not apply during the Semi-Final or Final rounds.",
      "If a participant fails to appear for their scheduled match within 5 minutes of the designated time, a 3–0 walkover will be awarded to the opponent.",
      "Any offensive behaviour, abusive language, or threatening conduct will result in immediate disqualification.",
      "In the event of a technical interruption (such as a network issue), the affected player must provide supporting evidence; upon verification, the match will be restarted under the same conditions.",
    ],
  },
  "chess": {
    rules: [
      "All matches will be conducted online on the official Lichess.org platform through a dedicated tournament link provided by the organizers.",
      "Players of all rating levels are welcome — no prior chess rating is required for registration.",
      "Each player is permitted to use only one Lichess account during the tournament; use of multiple accounts will result in disqualification.",
      "The tournament format (Swiss, Arena, or Knockout) and time control settings will be officially announced prior to the event.",
      "All match results recorded on Lichess will be considered final and binding; disputes must be raised within the designated review period.",
      "Use of chess engines, computer assistance, or any form of unfair means is strictly prohibited and will result in permanent disqualification.",
      "Offensive or unsportsmanlike behaviour will lead to immediate removal from the tournament.",
      "All participants must join the official Lichess tournament on time; late arrivals may negatively affect their standing.",
      "The top two players with the highest cumulative points at the end of the tournament will be declared the winners.",
      "All participants must join the official Technobit'26 Chess team on Lichess before the event begins. The link is provided below.",
    ],
    groupLink: {
      text: "Join the Technobit'26 Chess Team on Lichess",
      url: "https://lichess.org/team/technobit26-chess-championship",
    },
  },
  "pubg-mobile": {
    rules: [
      "This is a squad-based event played in Team Deathmatch (TDM) mode.",
      "A team may consist of a minimum of 1 and a maximum of 4 main players; all members must be enrolled students from the same college.",
      "An optional 5th player may be registered as a substitute and may only play if a main team member is unable to participate.",
      "Every participant must compete using their own registered PUBG Mobile account — account sharing or borrowing is strictly not permitted.",
      "Use of emulators, modified APKs, or any third-party hacking tools is strictly prohibited and will result in immediate disqualification.",
      "Teams that fail to appear for their scheduled match within the allotted grace period risk forfeiture of the match.",
      "All participants must maintain sportsmanship and respectful conduct toward opponents and organizers at all times.",
      "All rulings and decisions made by the organizers are final and shall not be contested under any circumstances.",
    ],
  },
  "free-fire": {
    rules: [
      "This is a team-based event; the specific game mode will be officially announced by the organizers prior to the tournament.",
      "A team may consist of a minimum of 1 and a maximum of 4 main players; all members must be from the same college.",
      "An optional 5th player may be included in the registration as a substitute.",
      "All participants must use their own personally registered Free Fire accounts — account sharing is strictly prohibited.",
      "Use of emulators of any kind is strictly prohibited; all players must participate from a legitimate mobile device.",
      "Any use of hacking tools, unauthorized mods, or cheating mechanisms will result in immediate and permanent disqualification.",
      "Teams that fail to appear for their scheduled match on time risk forfeiture of the game.",
      "Participants are expected to maintain sportsmanship and conduct themselves respectfully throughout the tournament.",
      "The organizers' decisions are final in all disputes and matters concerning the event.",
    ],
  },
  "it-olympiad": {
    rules: [
      "Each participant will be given 30 multiple-choice questions covering a wide range of Information Technology topics including hardware, software, networking, cybersecurity, and general computing concepts.",
      "Participants will be allotted a total of 20 minutes to complete all assigned questions.",
      "This is a strictly individual event; any form of collaboration, discussion, or use of external resources is a violation and will lead to immediate disqualification.",
      "Use of AI tools, search engines, or any electronic assistance during the competition is prohibited.",
      "Prior online registration through the official Technobit portal is mandatory before the event date; walk-in entries will not be accepted.",
      "Only currently enrolled students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate.",
      "Any breach of the rulebook or unsportsmanlike conduct will result in disqualification.",
    ],
    topics: [
      "Computer Hardware", "Operating Systems", "Networking Basics", "Cybersecurity", "Programming Concepts", "Database Systems", "Internet & Web", "IT General Knowledge",
    ],
  },
  "gaming-quiz": {
    rules: [
      "Each participant will be presented with 30 multiple-choice questions covering a diverse range of gaming knowledge — spanning retro classics, modern titles, esports, and gaming culture.",
      "Participants will be allotted 20 minutes to answer all questions in the first round.",
      "In the event of a tie, a tiebreaker round of 10 minutes will be conducted to determine the final rankings.",
      "The Quiz Master's decision on all matters — including tiebreakers, scoring, and final results — shall be considered absolute and final.",
      "This is a solo competition; no team-based or collaborative participation is permitted.",
      "Only currently enrolled students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate.",
    ],
  },
  "robothon-olympiad": {
    rules: [
      "Each participant will be assessed through 30 multiple-choice questions covering both Robotics and Cybersecurity topics.",
      "Participants must complete all questions within the allocated time without referencing any books, notes, or mobile devices.",
      "This is a strictly individual event; collaboration or communication with any other participant is prohibited.",
      "Prior registration through the official Technobit event portal is mandatory before the deadline; no late registrations will be accepted.",
      "Late submissions or entries after the deadline will not be entertained under any circumstances.",
      "Only currently enrolled students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate.",
      "Violation of any stated rule will result in immediate disqualification and forfeiture of any prize eligibility.",
    ],
    topics: [
      "Robotics Fundamentals", "Mechanics & Electronics", "Programming for Robots", "Cybersecurity Basics", "AI in Robotics", "Automation Concepts",
    ],
  },
  "marvel-dc-quiz": {
    rules: [
      "Each participant will be challenged with 30 multiple-choice questions covering the Marvel and DC universes — characters, storylines, cinematic events, and comic lore.",
      "Participants will be given 20 minutes to complete the first round.",
      "In the event of a tie, a dedicated tiebreaker round of 10 minutes will determine the final standings.",
      "This is a solo event; no collaboration or team-based participation is permitted.",
      "All decisions made by the Quiz Master shall be considered final and binding.",
      "Only currently enrolled students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate.",
    ],
    topics: [
      "Spider-Man", "Iron Man", "The Batman (2022)", "Superman (2025)",
    ],
  },
  "animelogia": {
    rules: [
      "The event will be conducted in a single round, with a separate tiebreaker round if required.",
      "Each participant will be given 30 questions covering anime knowledge within a time limit of 20 minutes.",
      "In the event of a tie, a tiebreaker round of 10 minutes will be administered to determine final rankings.",
      "This is a solo competition; no discussion or collaboration with other participants is permitted at any point.",
      "All rulings by the Quiz Master are final and shall not be contested.",
      "Only currently enrolled students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate.",
    ],
    topics: [
      "Attack On Titan", "Demon Slayer", "Chainsaw Man", "Spy x Family", "Jujutsu Kaisen",
    ],
  },
  "google-it": {
    rules: [
      "This is an individual speed-research competition where participants must find correct answers using Google Search as efficiently and accurately as possible.",
      "All participants must complete the assigned questions strictly within the provided time limit; no extensions will be granted.",
      "Questions will be in MCQ format, designed to test participants' ability to search effectively, evaluate sources critically, and respond quickly.",
      "Use of standard search engines is permitted; however, AI tools, chatbots, voice assistants, and pre-cached resources are strictly prohibited.",
      "Prior online registration through the official portal is mandatory before the event commences.",
      "Only currently enrolled students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate.",
      "Any form of unfair means or unauthorized assistance will result in immediate disqualification.",
    ],
  },
  "crack-the-code": {
    rules: [
      "The contest will be hosted on HackerRank; all registered participants must join the official contest link provided by the organizers before the event begins.",
      "Participants must solve all assigned problems within the designated time frame; partially completed submissions will be scored based on what has been solved.",
      "Problems may include ciphers, mathematical puzzles, logical reasoning challenges, riddles, and algorithmic thinking exercises.",
      "Late or post-deadline submissions will not be considered under any circumstances.",
      "All solutions must be entirely original — collaboration, sharing code, discussing approaches, or use of unauthorized resources is strictly prohibited.",
      "Participants must ensure their HackerRank username is correctly entered during registration, as it will be used for score tracking.",
      "Any violation of fair play guidelines will result in immediate disqualification and cancellation of the participant's score.",
    ],
  },
  "sci-fi-story": {
    rules: [
      "Participants must write an original science fiction story centred around futuristic themes such as artificial intelligence, space exploration, time travel, quantum science, or dystopian societies.",
      "AI-generated stories, plagiarised content, or previously published work will not be accepted and will result in immediate disqualification.",
      "Submissions must be made within the stipulated time; late entries will not be considered.",
      "Stories may be written in either Bangla or English; the chosen language must remain consistent throughout the entire submission.",
      "This is a strictly individual event; group submissions are not permitted.",
      "Only currently enrolled students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate.",
      "Content deemed inappropriate, offensive, or politically sensitive will be disqualified.",
    ],
    submissionInfo: [
      "Submit your work as a PDF or DOCX document via the official Technobit website or the designated submission portal.",
      "Ensure your file is properly named with your full name, section, and roll number.",
      "Late submissions will not be accepted under any circumstances — plan your time accordingly.",
    ],
  },
  "tech-meme-war": {
    rules: [
      "Each participant is allowed to submit only one original meme; multiple entries will result in disqualification.",
      "The submitted meme must be technology-related and created entirely by the participant.",
      "Content involving bullying, hate speech, offensive language, political commentary, religious references, or targeted personal attacks is strictly prohibited and will result in immediate disqualification.",
      "All participants must follow fair play guidelines and maintain the spirit of healthy, respectful competition.",
      "Only currently enrolled students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate.",
    ],
    submissionInfo: [
      "Submit your meme to the official EXHIB IT Facebook group using the link provided below.",
      "Include the hashtag #Technobit26_meme in your post caption.",
      "Your caption must include your full name, section, roll number, and class.",
    ],
    groupLink: {
      text: "Join the EXHIB IT Facebook Group to Submit",
      url: "https://www.facebook.com/groups/exhib.it.bnmpcitc",
    },
  },
  "ai-art": {
    rules: [
      "The submitted artwork must be generated using any AI-based tool of the participant's choice; manually created or hand-crafted artwork will not be accepted.",
      "No specific theme restriction applies — participants are free to choose any subject matter for their AI-generated artwork.",
      "Artwork containing offensive, plagiarised, or inappropriate content will be disqualified.",
      "The AI-generated image must be primarily produced through the participant's own prompting and creative direction.",
      "Only currently enrolled students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate.",
    ],
    submissionInfo: [
      "Submit your artwork to the official EXHIB IT Facebook group using the link provided below.",
      "Include the hashtag #Technobit26_art in your submission post caption.",
      "Your caption must include your full name, section, roll number, and class.",
    ],
    groupLink: {
      text: "Join the EXHIB IT Facebook Group to Submit",
      url: "https://www.facebook.com/groups/exhib.it.bnmpcitc",
    },
  },
  "poster-designing": {
    rules: [
      "Each participant must create an entirely original poster design within the allocated time frame; use of pre-made templates, stock images, or AI-generated elements is strictly prohibited.",
      "Graphic design software of any kind may be used — Canva, Adobe Photoshop, Illustrator, or any alternative tool.",
      "The poster theme will be officially announced at the start of the event; participants should be prepared to work creatively around any given topic.",
      "The final design must be submitted in PNG or JPG format strictly within the deadline; late submissions will not be accepted.",
      "Only currently enrolled students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate.",
      "Content deemed offensive, inappropriate, or irrelevant to the given theme will be disqualified.",
    ],
    submissionInfo: [
      "Submit your poster to the official EXHIB IT Facebook group using the link provided below.",
      "Include the hashtag #Technobit26_poster in your post caption.",
      "Your caption must include your full name, section, roll number, and class.",
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
