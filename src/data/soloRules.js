export const soloRulesData = [
  {
    id: 'solo-role',
    icon: '📖',
    title: 'The Solo Player\'s Role',
    subsections: [
      {
        title: 'Your Role',
        content: 'You play your character and portray the world honestly. When things go badly — let them. The fiction only matters if the danger is real.\n\nKeep a notebook. Write down rooms, NPCs, faction states, and what changed. You\'ll need it.',
      },
    ],
  },

  {
    id: 'solo-adjustments',
    icon: '⚖️',
    title: 'Solo Adjustments',
    subsections: [
      {
        title: 'Overview',
        content: 'A single PC faces odds built for a party of four. These rules compensate without removing danger.',
      },
      {
        title: 'Resilience',
        content: 'Roll 2d6 for starting HP and keep the higher result.',
      },
      {
        title: 'Last Stand',
        content: 'Once per combat, when you would take Critical Damage, you may ignore the STR loss from that single hit. You still lose the HP. This can only prevent death — it does not protect you from future hits.',
      },
      {
        title: 'Healing',
        content: 'Once per day in a safe location, you may remove one Fatigue without requiring a full night\'s rest.',
      },
      {
        title: 'Companions',
        content: 'You may hire one companion using the hireling rules. Give them a background, attributes (3d6 each), and 1d6 HP. They follow orders but have their own morale. When they hit 0 HP, they are out of the fight.',
      },
    ],
  },

  {
    id: 'solo-oracle',
    icon: '🔮',
    title: 'The Oracle',
    subsections: [
      {
        title: 'When to Use It',
        content: 'Use the Oracle when you genuinely don\'t know what happens and the rules don\'t resolve it. Don\'t use it for things already established in fiction, or things your background clearly covers.',
      },
      {
        title: 'Yes/No Oracle (d20)',
        content: 'Decide how likely the thing is, then roll 1d20.',
        table: {
          headers: ['Likelihood', 'Yes if roll is…'],
          rows: [
            ['Almost Certain', '1–18'],
            ['Likely', '1–14'],
            ['50/50', '1–10'],
            ['Unlikely', '1–6'],
            ['Almost Impossible', '1–2'],
          ],
        },
      },
      {
        title: 'Reading the Result',
        content: 'Exactly at threshold = Yes, but — a complication arises.\nRoll of 20 = No, and — something additionally bad happens.',
      },
      {
        title: 'Twist (d6)',
        content: 'Roll when you get a Yes, but or No, and.',
        table: {
          headers: ['d6', 'Complication'],
          rows: [
            ['1', 'A resource is depleted or damaged'],
            ['2', 'An NPC\'s attitude worsens'],
            ['3', 'New danger arrives or escalates'],
            ['4', 'Unwelcome information is revealed'],
            ['5', 'A path or option closes'],
            ['6', 'An unexpected element is introduced'],
          ],
        },
      },
      {
        title: 'Open Questions',
        content: 'For questions that aren\'t Yes/No, use the Warden\'s Guide tables as oracles.',
        items: [
          'What\'s in this room? → Lore Room (Room Type + Clue)',
          'What happened here? → Ruination (Condition + Cause)',
          'What does this NPC want? → Dungeon Faction Agendas (Goal + Obstacle)',
          'What\'s the creature doing? → Monster Activity column',
        ],
      },
      {
        title: 'Die of Fate (d6)',
        content: 'Roll 1d6 when an outcome is uncertain but not worth a full Oracle call.\n4+ = favors you. 1–3 = bad for you.',
      },
    ],
  },

  {
    id: 'solo-exploration',
    icon: '🗺',
    title: 'Exploration Loop',
    subsections: [
      {
        title: 'Dungeon',
        content: 'Follow the Dungeon Exploration Cycle from the Player\'s Guide. Roll Dungeon Events (d6) when you spend extra time in a room, move carelessly, enter a new level, or make noise.\n\nWhen you enter a room, note the first obvious thing:\n• Inhabited: roll Monster Group + Activity → Roll Reactions\n• Empty: roll Lore Room (Room Type + Clue) → interpret as atmosphere or clue\n• Unknown: ask the Oracle, "Is something dangerous here?" (Likely in deep levels, Unlikely near the entrance)\n\nTraps: Careful search (one full turn) = automatic discovery. Careless movement = trigger on 1–2 on 1d6.',
      },
      {
        title: 'Wilderness',
        content: 'Follow the Wilderness Exploration Cycle. Each Watch, roll Wilderness Events (d6) after declaring your action.\n\nGetting Lost: Trails = lost on 1–2. Wilderness = lost on 1–3. Recovery costs one Watch.\n\nCamp: Spend the third watch Making Camp. Skip it and you add Fatigue and become Deprived. Deprived travel raises terrain difficulty one step.\n\nCamp safety: Ask the Oracle — "Is this location safe?" Default: 50/50 in the wilderness. An unsafe camp means rolling Wilderness Events during rest; only a result of 6 means uninterrupted sleep.',
      },
      {
        title: 'Events (d6)',
        table: {
          headers: ['d6', 'Dungeon', 'Wilderness'],
          rows: [
            ['1', 'Encounter', 'Encounter'],
            ['2', 'Sign', 'Sign'],
            ['3', 'Environment', 'Environment'],
            ['4', 'Loss', 'Loss'],
            ['5', 'Exhaustion', 'Exhaustion'],
            ['6', 'Quiet', 'Discovery'],
          ],
        },
      },
    ],
  },

  {
    id: 'solo-factions',
    icon: '⚔️',
    title: 'Factions',
    subsections: [
      {
        title: 'Faction Actions',
        content: 'Factions pursue their agendas independently. Between sessions or after significant in-world events, ask for each active faction: "Is this faction positioned to advance a goal right now?" If yes, roll 1d6.',
        table: {
          headers: ['d6', 'Result'],
          rows: [
            ['1', 'Failure — New obstacle appears; an Advantage is lost'],
            ['2', 'Setback — An Advantage is lost'],
            ['3', 'Status Quo — Nothing changes'],
            ['4', 'Mixed Success — Goal achieved; an Advantage is lost'],
            ['5', 'Success — Goal achieved'],
            ['6', 'Major Success — Goal achieved; a new Advantage gained'],
          ],
        },
      },
      {
        title: 'Making It Real',
        content: 'Then ask: "What does this look like in the world?" Translate the result into something visible — a changed NPC, a closed road, a new presence somewhere.\n\nNo stat tracking. No contested rolls between factions. Just the d6 and the fiction.',
      },
    ],
  },

  {
    id: 'solo-npcs',
    icon: '💬',
    title: 'NPCs',
    subsections: [
      {
        title: 'Attitude',
        content: 'Roll Reactions (2d6) when meeting an NPC whose stance is unknown.',
        table: {
          headers: ['2d6', 'Reaction'],
          rows: [
            ['2', 'Hostile'],
            ['3–5', 'Wary'],
            ['6–8', 'Curious'],
            ['9–11', 'Kind'],
            ['12', 'Helpful'],
          ],
        },
      },
      {
        title: 'Motivation',
        content: 'Roll Denizen Traits (Virtue + Vice) and Faction Agenda (Goal + Obstacle) if you need to know what they want. Interpret through the fiction.',
      },
      {
        title: 'Dialogue',
        content: 'Ask what they would say given their attitude and motivation. Use the Oracle for specific questions — "Does the guard take the bribe?" — and set likelihood based on their established traits:\n• Selfish = Likely\n• Loyal = Unlikely\n\nNo NPC stat blocks unless they\'re enemies. No contested rolls for social situations.',
      },
    ],
  },

  {
    id: 'solo-combat',
    icon: '💀',
    title: 'Combat',
    subsections: [
      {
        title: 'Core Rules Unchanged',
        content: 'All combat mechanics are unchanged from the Player\'s Guide. Play your enemies honestly.',
      },
      {
        title: 'Before Combat Begins',
        content: 'Note two things:\n1. What does this creature want?\n2. How does it fight?\n\nPlay the enemy according to those two facts — not to create a balanced fight. If it would flee at half strength, it flees.',
      },
      {
        title: 'Morale',
        content: 'Morale triggers at first casualty and at half strength. Rather than tracking a leader\'s WIL score, assign a likelihood before rolling the Oracle: "Does this group\'s morale hold?"\n\n• Wary, desperate, or loyal groups = Likely\n• Hired muscle, cornered animals, or broken groups = Unlikely\n\nOn a No result, roll 1d6: 1–3 flee, 4–6 surrender or offer terms.',
      },
    ],
  },

  {
    id: 'solo-growth',
    icon: '⬆️',
    title: 'Growth',
    subsections: [
      {
        title: 'When Growth is Earned',
        content: 'Growth is earned through experience. Apply it when a character has engaged in at least two of:',
        items: [
          'A consistent pattern of behavior toward a single goal',
          'Taking an obvious risk with unknown consequences',
          'Interacting with something they don\'t fully understand',
        ],
      },
      {
        title: 'What Growth Looks Like',
        items: [
          'Reroll a relevant Attribute after a significant success against the odds; keep if higher',
          'Stop requiring a save for something practiced repeatedly under real duress',
          'Gain a permanent change from a unique item or entity — often with a cost',
        ],
      },
      {
        title: 'Scars',
        content: 'Scars apply immediately per the Scars table. Always apply them.',
      },
      {
        title: 'The Principle',
        content: 'Growth should make the character more interesting before it makes them more capable.',
      },
    ],
  },

  {
    id: 'solo-session',
    icon: '📋',
    title: 'Session Structure',
    subsections: [
      {
        title: 'Before',
        content: 'Review your character and notebook. Run Faction Actions for anything that\'s had time to develop. Ask: What does my character want this session?',
      },
      {
        title: 'During',
        content: 'Declare intent → resolve with rules, Oracle, and dice → record consequences → ask "What\'s next?"',
      },
      {
        title: 'After',
        content: 'Note what changed. Check for growth triggers. Ask:',
        items: [
          'What was the most interesting thing that happened?',
          'What is my character most afraid of now?',
          'What do they want next?',
        ],
      },
    ],
  },

  {
    id: 'solo-death',
    icon: '☠️',
    title: 'Death',
    subsections: [
      {
        title: 'Accept It',
        content: 'Don\'t rewind the save. The body, the gear, the Bond items — all still in the world. Create a new character who arrives with reason to follow the same thread. Factions that were moving are still moving. The half-explored dungeon is still half-explored.\n\nDeath is a chapter break, not an ending.',
      },
    ],
  },

  {
    id: 'solo-reference',
    icon: '📊',
    title: 'Quick Reference',
    subsections: [
      {
        title: 'Oracle (d20)',
        table: {
          headers: ['Likelihood', 'Yes if…'],
          rows: [
            ['Almost Certain', '1–18'],
            ['Likely', '1–14'],
            ['50/50', '1–10'],
            ['Unlikely', '1–6'],
            ['Almost Impossible', '1–2'],
          ],
        },
      },
      {
        title: 'Twist (d6)',
        table: {
          headers: ['d6', 'Complication'],
          rows: [
            ['1', 'Resource depleted'],
            ['2', 'NPC attitude worsens'],
            ['3', 'Danger arrives'],
            ['4', 'Unwelcome info revealed'],
            ['5', 'Path or option closes'],
            ['6', 'New element introduced'],
          ],
        },
      },
      {
        title: 'Faction Actions (d6)',
        table: {
          headers: ['d6', 'Result'],
          rows: [
            ['1', 'Failure'],
            ['2', 'Setback'],
            ['3', 'Status Quo'],
            ['4', 'Mixed Success'],
            ['5', 'Success'],
            ['6', 'Major Success'],
          ],
        },
      },
      {
        title: 'All Other Tables',
        content: 'Die of Fate (d6): 4+ good · 1–3 bad\n\nReactions (2d6): 2 Hostile · 3–5 Wary · 6–8 Curious · 9–11 Kind · 12 Helpful\n\nEvents (d6): 1 Encounter · 2 Sign · 3 Environment · 4 Loss · 5 Exhaustion · 6 Quiet/Discovery',
      },
    ],
  },
]
