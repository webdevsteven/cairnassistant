// Solo Rules data — each subsection can have:
//   content: string (plain text, newlines preserved)
//   table: { headers: string[], rows: string[][] }
//   items: string[]  (bullet list)

export const soloRulesData = [
  {
    id: 'solo-intro',
    icon: '📖',
    title: 'Introduction & Mindset',
    subsections: [
      {
        title: 'What is Solo Cairn?',
        content: 'Playing Cairn solo means you wear two hats at once: the player who makes choices, and the Warden who adjudicates those choices and portrays the world. The key is to keep these roles distinct.\n\nWhen you\'re playing your character, commit to their perspective. When you shift to the Warden role, be honest, be ruthless, and don\'t protect yourself.\n\nThe core rules from the Player\'s Guide are unchanged. This section supplements them with the tools a solo player needs to run both sides of the table.',
      },
      {
        title: 'Be Honest With Yourself',
        content: 'The biggest risk in solo play is unconsciously softening outcomes in your favor. When the dice say things go wrong, let them go wrong. The fiction is only interesting if the danger is real.\n\nIf you find yourself rerolling, reinterpreting, or narratively working around bad results — stop. Accept them. The best solo stories come from disaster.',
      },
      {
        title: 'Ask Questions, Follow Answers',
        content: 'Rather than planning a story, ask questions and discover what happens. "What is in this room?" is more interesting than knowing the answer before you open the door. The Oracle, the tables, and the dice exist to surprise you.',
      },
      {
        title: 'Separate Your Roles',
        content: 'Before each decision, be clear about which hat you\'re wearing:\n\nAs the Player: What does my character want to do? What would they actually try?\n\nAs the Warden: Given the fiction, what happens? What are the true stakes and consequences?\n\nKeep a notebook. Write things down. It\'s easy to lose track of the world when you\'re running both sides.',
      },
      {
        title: 'Play to Find Out',
        content: 'You don\'t know what happens next, and that\'s the point. Resist the temptation to pre-plan scenes. Use the tools in this document to discover the world and the story one question at a time.',
      },
    ],
  },

  {
    id: 'solo-oracle',
    icon: '🔮',
    title: 'The Oracle',
    subsections: [
      {
        title: 'What is the Oracle?',
        content: 'The Oracle replaces the Warden\'s judgment for questions that you cannot answer from established fiction alone.\n\nConsult the Oracle when:\n• You genuinely don\'t know whether something is true\n• The outcome is uncertain and consequential\n• You need to generate an NPC reaction, event, or detail\n• Something unexpected might happen based on established fiction\n\nDo NOT consult the Oracle for things already established in the fiction, things resolved by the rules (saves, damage, morale), or things your character\'s background clearly addresses.',
      },
      {
        title: 'Step 1 — Assess Likelihood',
        content: 'Before rolling, decide how likely the thing is to be true, given everything established so far.',
        table: {
          headers: ['Likelihood', 'When to Use'],
          rows: [
            ['Almost Certain', 'It would be strange if it weren\'t true'],
            ['Likely', 'The odds favor it'],
            ['50/50', 'Genuinely uncertain'],
            ['Unlikely', 'The odds are against it'],
            ['Almost Impossible', 'It would be remarkable if true'],
          ],
        },
      },
      {
        title: 'Step 2 — Roll 1d20',
        content: 'Compare the result to the threshold. Results at or below the threshold = Yes.',
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
        title: 'Step 3 — Interpret the Result',
        content: 'Yes — the thing is true. No — it isn\'t.\n\nYes, but… — if the result is exactly the threshold number, add a complication. "Yes, you find the passage — but it\'s flooded."\n\nNo, and… — if the result is 20, something additionally bad happens. "No, the guard isn\'t alone — and he saw you."',
      },
      {
        title: 'The Twist (d6)',
        content: 'When the Oracle produces a Yes, But or No, And, roll 1d6 to inspire what that complication is.',
        table: {
          headers: ['d6', 'Twist'],
          rows: [
            ['1', 'A resource is depleted or damaged'],
            ['2', 'An NPC\'s attitude worsens or changes'],
            ['3', 'New danger arrives or escalates'],
            ['4', 'Information is revealed (possibly unwelcome)'],
            ['5', 'A path or option closes'],
            ['6', 'An unexpected element is introduced'],
          ],
        },
      },
      {
        title: 'Open-Ended Oracle',
        content: 'For questions that can\'t be answered with Yes/No, use the Warden\'s Guide generation tables as Oracle tools. Treat any table as a random answer generator:\n\n• "What does this ruin look like?" → Roll on Dungeon Type + Feature\n• "Who lives here?" → Roll on Denizen Traits (Virtues + Vices)\n• "What does the NPC want?" → Roll on Faction Agendas (Goal + Obstacle)\n• "What\'s the first thing I notice?" → Roll on Lore Room (Room Type + Clue)\n• "What happened here?" → Roll on Ruination (Condition + Cause)\n\nAlways interpret results through the current fiction.',
      },
      {
        title: 'Die of Fate (d6)',
        content: 'Roll 1d6 whenever the outcome of a non-player element is uncertain:\n• 4+ = favorable to you\n• 3 or under = unfavorable to you\n\nUse for: Is it raining? Did the guard fall asleep? Has the creature moved on? Is there a merchant at the crossroads?',
      },
    ],
  },

  {
    id: 'solo-start',
    icon: '🗺',
    title: 'Starting the Game',
    subsections: [
      {
        title: 'Generate Your Character',
        content: 'Follow the standard character creation procedure from the Player\'s Guide in full. Roll everything. Don\'t pick what seems convenient — let the dice surprise you.\n\nAfter character creation, answer three questions in your notebook:\n\n1. What does my character want right now? (Immediate goal)\n2. What do they fear? (A specific fear tied to their fiction)\n3. What do they have to lose? (Someone or something that matters)\n\nThese three answers form the emotional core of your solo game. Return to them whenever the story loses direction.',
      },
      {
        title: 'Generate Your Region (Step 1–3)',
        content: 'Use the Setting Seeds procedure from the Warden\'s Guide to generate a region before play.\n\nStep 1 — Region Theme\nRoll 1d20 twice on the Culture table (Character + Ambition) and twice on the Resources table (Abundance + Scarcity). Ask: "What kind of people would live here? What tensions do these create?"\n\nStep 2 — Draw Terrain\nRoll 1d6, then roll that many d6 dice on map paper. Use the Terrain Die Drop Table to mark terrain types. Draw curvy lines between them. Roll Easy/Tough/Perilous tables for each zone and its landmark.\n\nStep 3 — Add Water\nDraw a wiggly line from highest elevation to lowest. This is a river.',
      },
      {
        title: 'Generate Your Region (Step 4–7)',
        content: 'Step 4 — Points of Interest\nRoll 3–8 d6 dice on the map. Use the POI Die Drop Table to mark each one. Roll on the relevant table (Settlement, Waypoint, Curiosity, Lair, Dungeon) for each. Mark your starting location as the Heart (H).\n\nStep 5 — Paths\nConnect POIs with 1–4 paths each. Note whether each is a Road (no penalty), Trail (+1 Watch, 2-in-6 lost), or Wilderness (+2 Watches, 3-in-6 lost).\n\nStep 6 — Factions\nGenerate 1–3 factions using the Faction tables: Type + Agent, Traits (two), Advantages, Agendas (Goal + Obstacle). Write out 3–5 Agenda Goals as a chain. These factions operate independently.\n\nStep 7 — Starting Dungeon or Forest\nPick the adventure site nearest your starting location. Use Dungeon Seeds or Forest Seeds to flesh it out.',
      },
    ],
  },

  {
    id: 'solo-loop',
    icon: '🔄',
    title: 'The Solo Loop',
    subsections: [
      {
        title: 'Scene Structure',
        content: 'Solo play proceeds in Scenes — distinct units of time and place where something meaningful happens. Each Scene follows this structure:\n\n1. Set the Scene — Establish where you are and what the situation is\n2. Declare your intent — What does your character want to accomplish here?\n3. Play it out — Use exploration procedures, Oracle, and dice to resolve events\n4. Record consequences — Note resource changes, new information, narrative outcomes\n5. Ask "What\'s next?" — Let the fiction point to the next Scene',
      },
      {
        title: 'Dungeon Events (d6)',
        content: 'Roll on the Dungeon Events table when you spend more than one cycle in a room, move carelessly, enter a new area, or create a loud disturbance.',
        table: {
          headers: ['d6', 'Event', 'Solo Interpretation'],
          rows: [
            ['1', 'Encounter', 'Roll on Monster Room table. Ask Oracle: Is the creature hostile? (Likelihood depends on dungeon\'s nature)'],
            ['2', 'Sign', 'Roll on Lore Room (Room Type + Clue). It\'s a hint, not a full room.'],
            ['3', 'Environment', 'Something changes. Roll on Ruination (Condition) for inspiration: water rises, ceiling shifts, distant sound changes.'],
            ['4', 'Loss', 'A resource is threatened. Use the Twist table to determine what.'],
            ['5', 'Exhaustion', 'Add a Fatigue, or rest and roll again.'],
            ['6', 'Quiet', 'Safe. Breathe. But don\'t forget where you are.'],
          ],
        },
      },
      {
        title: 'Monster Behavior (Dungeon)',
        content: 'When you encounter a creature:\n\n1. Roll Reactions (2d6) for initial attitude\n2. If Hostile or Wary: Ask Oracle "Does it attack immediately?" (Likelihood based on fiction, creature type, circumstances)\n3. If not immediately attacking: What does it want? Roll Denizen Traits (Virtue + Vice) to inspire its motivation\n4. During combat: the creature behaves as its nature dictates. Cunning creatures target tactically. Bestial creatures attack the nearest. Play enemies honestly.',
      },
      {
        title: 'Entering Rooms',
        content: 'When entering a room, ask:\n\n1. What do I immediately notice? (Roll Lore Room: Room Type + Clue for uninhabited; Monster Group + Activity for inhabited)\n2. Is there something hidden here? (Oracle — Unlikely by default)\n3. Is there something dangerous? (Oracle — depends on dungeon\'s established nature)\n\nTraps: Searching carefully (full Turn) reveals traps automatically. Moving without searching: trigger on 1–2 (d6). Trap damage goes to Attributes, not HP.\n\nName every room in your notebook. This keeps them distinct.',
      },
      {
        title: 'Wilderness Events (d6)',
        content: 'Roll 1d6 each Watch, after declaring your action.',
        table: {
          headers: ['d6', 'Event', 'Solo Interpretation'],
          rows: [
            ['1', 'Encounter', 'Roll on terrain\'s encounter table. Roll Reactions.'],
            ['2', 'Sign', 'A clue toward a nearby POI or current threat. Roll on Path Features (Feature + Condition).'],
            ['3', 'Environment', 'Weather shifts (roll seasonal weather) or terrain becomes harder.'],
            ['4', 'Loss', 'A resource is threatened — rations, light, equipment. Apply it.'],
            ['5', 'Exhaustion', 'Add a Fatigue or spend an extra Watch.'],
            ['6', 'Discovery', 'Find food (Supply die), an unkeyed location, or a narrative reveal. Roll Curiosity table for inspiration.'],
          ],
        },
      },
      {
        title: 'Getting Lost',
        content: 'When traveling without a road, roll 1d6 after each Watch:\n• Trails: lost on 1–2\n• Wilderness: lost on 1–3\n\nIf lost: spend the next Watch recovering your bearing (Travel action with no progress) unless you have a compass, map, or relevant skill.',
      },
      {
        title: 'Camp & Deprivation',
        content: 'Spend the third watch of each day Making Camp unless circumstances prevent it.\n\nSkipping camp: add Fatigue and become Deprived. If Deprived the next day: terrain difficulty increases one step.\n\nAsk Oracle "Is this location safe?" (Likelihood: depends on surroundings). If unsafe: camp anyway but roll Wilderness Events during rest. Quiet = undisturbed. Any other result = interrupted rest, no Fatigue removed.',
      },
      {
        title: 'Downtime',
        content: 'Downtime works exactly as written in the Player\'s Guide.\n\nResearch Sources: Ask the Oracle "Is there someone here who knows?" (Likelihood based on how obscure the knowledge is). If Yes: roll NPC type and Denizen Traits to characterize them. If No: spend a Downtime Action looking elsewhere.\n\nMilestones: For any multi-step goal, assign 1–5 Milestones before beginning. Write each in your notebook. Mark them when earned in play. Do not skip steps or award milestones you haven\'t narratively earned.',
      },
    ],
  },

  {
    id: 'solo-factions',
    icon: '⚔️',
    title: 'Factions in Motion',
    subsections: [
      {
        title: 'Running Factions',
        content: 'Between sessions (or after meaningful in-game events), ask for each faction:\n\n1. Is this faction positioned to advance one of their agenda goals?\n2. If yes: does another faction oppose them? If so, the opposing faction makes a WIL save (highest-ranking agent\'s WIL). Fail = no action this cycle.\n3. If they can act, roll 1d6 on Faction Actions.',
        table: {
          headers: ['d6', 'Result', 'Effect'],
          rows: [
            ['1', 'Failure', 'New Obstacle introduced; an Advantage is lost'],
            ['2', 'Setback', 'An Advantage is lost'],
            ['3', 'Status Quo', 'Nothing gained, nothing lost'],
            ['4', 'Mixed Success', 'Goal achieved, but an Advantage is lost'],
            ['5', 'Success', 'Goal achieved, no Advantages lost'],
            ['6', 'Major Success', 'Goal achieved; a new Advantage is found'],
          ],
        },
      },
      {
        title: 'What Faction Actions Look Like',
        content: 'Interpret faction results through the fiction. "Success" doesn\'t happen in a vacuum — decide what it looks like in the world:\n\n• The Order of Nine successfully bribes a local official → that official is now hostile to anyone the Order dislikes\n• The Marchguard suffers a setback → a border post is overrun; refugees flood toward the heart settlement\n\nAlways ask: "How does this affect my character\'s world? What do they see or hear that signals this change?"',
      },
      {
        title: 'Faction Relationships',
        content: 'Your character is not outside faction politics. At the start of play, determine which factions know of your character and their current relationship:\n• Neutral factions: Roll Reactions (2d6)\n• Factions with reason to care: Assign based on your background and bonds\n\nAs you act in the world, faction attitudes shift. Helping a faction\'s agenda improves their stance. Opposing it worsens it. Track this in your notebook.',
      },
    ],
  },

  {
    id: 'solo-combat',
    icon: '💀',
    title: 'Combat',
    subsections: [
      {
        title: 'Committing to Monster Behavior',
        content: 'Before combat begins, note two things about the enemy:\n\n1. Disposition: What does it want? (Defend territory, kill intruders, take the food, etc.)\n2. Tactics: How does it fight? (Recklessly, cautiously, by pack behavior, etc.)\n\nThen play the enemy according to its disposition and tactics — not according to what would make a good fight. If a creature would realistically flee at half strength, it flees. If a group would scatter when their leader falls, they scatter.',
      },
      {
        title: 'First Round DEX Save',
        content: 'At the start of combat\'s first round, roll a DEX save for your character. If you fail, you lose your first turn. This represents the chaos of initial engagement — even if you "started" the combat, the fiction may not have given you a clean advantage.\n\nExceptions: you have surprise (attacked from hiding), or a clear positional advantage (enemy is unaware and you are well-positioned).',
      },
      {
        title: 'Multiple Enemies',
        content: 'When multiple enemies act, declare all of their intended actions before resolving:\n\n1. Decide what each enemy is doing based on its disposition and tactics\n2. Roll all enemy attacks, then apply results\n3. When multiple enemies target the same PC: roll all their dice, keep the single highest',
      },
      {
        title: 'Morale',
        content: 'Apply morale exactly as written. Triggers: first casualty, half their number lost, lone enemy at 0 HP.\n\nThe group\'s leader (or highest WIL creature) makes a WIL save:\n• Fail: roll 1d6. 1–3 = flee; 4–6 = surrender or offer terms\n• Success: continue fighting this round. Roll morale again next trigger\n\nHonor the result. If the enemy flees, they flee. If they surrender, they mean it (unless buying time — ask the Oracle if unsure).',
      },
      {
        title: 'Death & Legacy',
        content: 'Playing solo means death is always a real outcome. Accept this.\n\nIf a PC takes Critical Damage: they are dying. About one hour. Bandages stabilize. Without aid, they die.\n\nWhen a character dies:\n1. Accept it. Don\'t rewind, don\'t reroll the save.\n2. Record the death — where, why, what they were attempting.\n3. Consider the body — their inventory remains. Bond items, spellbooks, unique gear don\'t vanish.\n4. Create a new character. Ask: "How does this character arrive in the same world? What do they know about what happened?"\n5. The world continues. Factions are still in motion. Partially explored dungeons remain (and are now more dangerous). The Omen, if unresolved, remains.\n\nA character\'s death is not the end of the story — it\'s a chapter break.',
      },
    ],
  },

  {
    id: 'solo-npcs',
    icon: '💬',
    title: 'NPCs & Dialogue',
    subsections: [
      {
        title: 'Generating NPC Goals',
        content: 'Every significant NPC has something they want and something that stands in their way. When meeting an NPC, roll:\n• Faction Agent column — what kind of person are they?\n• Denizen Traits (Virtue + Vice) — how do they act?\n• Faction Agenda (Goal + Obstacle) — what do they want?\n\nCombine these through the fiction. A "Spy (Loyal + Manipulative)" with goal "Power" and obstacle "Conflict" might be a charming insider working toward political dominance, blocked by an open dispute they can\'t be seen in.',
      },
      {
        title: 'Running Dialogue',
        content: 'When an NPC responds, ask: "Given what they want and who they are, how would they react to this?" Then roleplay their response. If stuck, ask the Oracle a specific question:\n\n• "Does the merchant trust me enough to share what they know?" (Likelihood based on relationship and sensitivity of information)\n• "Will the guard take a bribe?" (Loyal = Unlikely; Selfish = Likely)\n\nUse WIL saves for genuine attempts to persuade or deceive where the outcome is uncertain and the stakes are real. 1 = always success; 20 = always failure.',
      },
      {
        title: 'NPC Reactions (2d6)',
        content: '',
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
        title: 'NPC Death',
        content: 'If an NPC dies who had established relationships, factions, or agendas — those things don\'t disappear. Note the consequences. Factions react to losing their agents. Other characters hear about what happened. The world remembers.',
      },
    ],
  },

  {
    id: 'solo-growth',
    icon: '⬆️',
    title: 'Growth',
    subsections: [
      {
        title: 'Growth Triggers',
        content: 'Your character earns growth when they have engaged in at least two of the following simultaneously:\n• A focused, consistent pattern of behavior around a single objective\n• Taking an obvious risk with potentially serious consequences\n• Interacting with a unique item, creature, or entity not fully understood',
      },
      {
        title: 'Attribute Improvement',
        content: 'When a character succeeds at a save in a situation where that attribute was their greatest vulnerability or is clearly being pushed, you (as Warden) may call for a reroll of that attribute. Keep the result if it\'s higher.',
      },
      {
        title: 'New Ability or Skill',
        content: 'When a character has repeatedly attempted something in a consistent pattern and recently succeeded under real duress, they no longer need to save for it in similar circumstances. Describe what the new ability looks like in fiction.',
      },
      {
        title: 'Changed by an Item or Creature',
        content: 'When a character has long-term exposure to a unique Spellbook, Relic, or strange entity — and has taken risks with it — permanent change may result. The change should reflect the nature of the item or entity, and may include a cost.',
      },
      {
        title: 'Bond & Omen Resolution',
        content: 'When a character takes concrete steps to address their Bond or Omen through play (not just thinking about it), progress occurs. Use the Downtime Milestones procedure to track this. Each completed Milestone is a step toward resolution.',
      },
      {
        title: 'Scars',
        content: 'Scars are immediate growth that happens mechanically, per the Scars table. Always apply these immediately and honestly.',
      },
      {
        title: 'Being Your Own Honest Warden',
        content: 'The hardest part of solo growth is not being too generous or too stingy. Ask yourself:\n• Did my character actually take a real risk, or did I protect them?\n• Has this pattern of behavior been consistent across multiple sessions, or am I awarding growth for a single moment?\n• Does this growth make the character more interesting, or just more capable?\n\nThe Warden\'s principle: "It is more important for a character to become more interesting than to become more skilled or capable."\n\nGrowth with a cost — a new ability tied to a curse, a bond with a dangerous entity, a physical change with both benefits and drawbacks — is almost always better fiction than straightforward improvement.',
      },
    ],
  },

  {
    id: 'solo-generating',
    icon: '🎲',
    title: 'Generating Content',
    subsections: [
      {
        title: 'Quick Dungeon (5 minutes)',
        items: [
          'Roll on Dungeon Type + Feature (d20 + d20)',
          'Roll on Purpose (Original Use + Built By)',
          'Roll on Ruination (Condition + Cause)',
          'Roll 6–10 d6 on paper; mark room types using Dungeon Die Drop Table',
          'Draw paths between rooms',
          'Roll on Monster Room, Lore Room, Special Room, and Trap tables for each room',
          'Name the dungeon using Names Formula (Adjective + Noun)',
        ],
      },
      {
        title: 'Quick Forest (5 minutes)',
        items: [
          'Roll on Forest Description (two descriptors)',
          'Roll on Forest Traits (Virtue + Vice) for the spirit\'s attitude',
          'Roll on Forest Agenda (Goal + Obstacle)',
          'Roll 8–10 d6 on paper; mark POIs using Forest Die Drop Table',
          'Roll on Monster, Ruins, Shelter, and Hazard tables for each POI',
          'Draw trails between POIs',
        ],
      },
      {
        title: 'Quick NPC',
        items: [
          'Roll Reactions (2d6) for attitude',
          'Roll on Faction Agent column for type',
          'Roll on Denizen Traits (Virtue + Vice) for personality',
          'Roll on Faction Agenda (Goal + Obstacle) for what they want',
          'Name them using the Naming Procedure',
        ],
      },
      {
        title: 'Quick Encounter',
        items: [
          'Roll on Monster Group + Activity (dungeon or forest table)',
          'Roll Reactions (2d6)',
          'If intelligent: roll Denizen Traits (Virtue + Vice)',
          'Ask the Oracle: what does it want from this encounter?',
        ],
      },
      {
        title: 'Random Spellbook & Relic',
        content: 'Spellbook: Roll 1d100 on the Spellbooks table. Note both the spell effect and the book\'s physical quirk/personality. Spellbooks found in play should always feel distinct — the quirk is as important as the spell.\n\nRelic: Roll 1d20 to randomly select from the Reliquary table (assign numbers 1–20), or choose one that fits the location. Note its charges and Recharge condition.',
      },
    ],
  },

  {
    id: 'solo-procedure',
    icon: '📋',
    title: 'Session Procedure',
    subsections: [
      {
        title: 'Before You Play',
        items: [
          'Review your character sheet — note current HP, attributes, inventory, and Fatigue',
          'Review your notebook — where did you leave off? What factions are in motion?',
          'Update the world — run Faction Actions for any faction that had opportunity to act since last session',
          'Set your goal — what is your character actively trying to accomplish this session?',
        ],
      },
      {
        title: 'During Play',
        content: 'Follow the Solo Loop for each Scene:\n1. Set the Scene\n2. Declare intent\n3. Play it out (Dungeon or Wilderness cycle, Oracle, dice)\n4. Record consequences\n5. Ask "What\'s next?"\n\nKeep notes on every significant NPC, every location visited, and every faction interaction.\n\nWhen you don\'t know what happens: use the Oracle and the tables. When you\'re tempted to protect yourself: don\'t.',
      },
      {
        title: 'After You Play',
        items: [
          'Record everything — what happened, what changed, what was discovered',
          'Update factions — note any changes to standing, agendas, or advantages',
          'Growth check — did any Growth Triggers occur? Apply growth honestly',
          'Ask: What was the most interesting thing that happened?',
          'Ask: What is my character most afraid of now?',
          'Ask: What do they want next?',
        ],
      },
    ],
  },

  {
    id: 'solo-reference',
    icon: '📊',
    title: 'Quick Reference',
    subsections: [
      {
        title: 'Oracle — At a Glance',
        content: 'Step 1: Decide the question\nStep 2: Assess likelihood\nStep 3: Roll 1d20\nStep 4: Compare to threshold',
        table: {
          headers: ['Result', 'Meaning'],
          rows: [
            ['Under threshold', 'Yes'],
            ['Exactly at threshold', 'Yes, but… (roll Twist d6)'],
            ['Over threshold, not 20', 'No'],
            ['Exactly 20', 'No, and… (roll Twist d6)'],
          ],
        },
      },
      {
        title: 'Twist (d6)',
        table: {
          headers: ['d6', 'Complication'],
          rows: [
            ['1', 'Resource depleted or damaged'],
            ['2', 'NPC attitude worsens'],
            ['3', 'New danger arrives'],
            ['4', 'Unwelcome information revealed'],
            ['5', 'A path or option closes'],
            ['6', 'Unexpected element introduced'],
          ],
        },
      },
      {
        title: 'Faction Actions (d6)',
        table: {
          headers: ['d6', 'Result'],
          rows: [
            ['1', 'Failure — new obstacle + lose advantage'],
            ['2', 'Setback — lose an advantage'],
            ['3', 'Status Quo — nothing changes'],
            ['4', 'Mixed Success — goal achieved, lose advantage'],
            ['5', 'Success — goal achieved'],
            ['6', 'Major Success — goal + new advantage'],
          ],
        },
      },
      {
        title: 'Scene Checklist',
        items: [
          'Where am I?',
          'What\'s the immediate situation?',
          'What do I want to accomplish?',
          'What could go wrong?',
          'Are there NPCs present? What are their reactions?',
          'Is time a factor?',
        ],
      },
      {
        title: 'Oracle Thresholds (d20)',
        table: {
          headers: ['Likelihood', 'Yes on…', 'Threshold #'],
          rows: [
            ['Almost Certain', '1–18', '18'],
            ['Likely', '1–14', '14'],
            ['50/50', '1–10', '10'],
            ['Unlikely', '1–6', '6'],
            ['Almost Impossible', '1–2', '2'],
          ],
        },
      },
    ],
  },
]
