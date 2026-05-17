export const rulesData = [
  {
    id: "core-concepts",
    title: "Core Concepts",
    icon: "⚔",
    subsections: [
      {
        title: "What is Cairn?",
        content: "Cairn is an adventure game about exploring a dark and mysterious Wood filled with strange folk, hidden treasure, and unspeakable monstrosities. Character generation is quick and random, adventures are tense and reward careful exploration, and combat is frantic and deadly."
      },
      {
        title: "Design Philosophies",
        content: "Neutrality — The Warden is a neutral arbiter, portraying rules, NPCs, and narrative clearly.\n\nClassless — A character's equipment and experiences define their specialty, not a class.\n\nDeath — Characters are vulnerable. Death is always near but never random or without warning.\n\nFiction First — Dice don't reflect difficulty. Success and failure are based on in-world elements.\n\nGrowth — Characters advance through surviving dangerous events and overcoming obstacles.\n\nPlayer Choice — Players always understand the reasons behind their choices. Risk is communicated freely."
      },
      {
        title: "Principles for Players",
        content: "Agency: Attributes and saves are tools, not definitions of your character. Ask not just what your character would do — ask what you would do.\n\nTeamwork: Seek consensus before acting unilaterally. Stay aligned on goals and limits.\n\nExploration: Asking questions and listening to detail is more useful than any stat or item. There is no single correct way forward.\n\nTalking: Treat NPCs as real people. Most want to talk before getting violent.\n\nCaution: Fighting is a choice, and rarely a wise one. Stack the odds in your favor. Retreat when things look unfavorable.\n\nPlanning: Avoid obstacles through reconnaissance, subtlety, and fact-finding. Research your objectives.\n\nAmbition: Set goals and take steps forward with meager means. Expect nothing. Earn your reputation."
      }
    ]
  },
  {
    id: "character-creation",
    title: "Character Creation",
    icon: "✦",
    subsections: [
      {
        title: "Creation Summary",
        content: "1. Roll or choose a Background (d20). Note starting gear and names.\n2. Roll on each background table (two d6 tables per background). Record items, skills, or abilities.\n3. Roll Attributes (3d6 each for STR, DEX, WIL in order). May swap any two results.\n4. Roll Hit Protection (1d6).\n5. Roll Character Traits (d10 each for Physique, Skin, Hair, Face, Clothing, Virtue, Vice, Speech).\n6. Roll Bonds (d20). Note the result and any associated items.\n7. Roll Age (2d20+10). If youngest character, roll on Omens table (d20) and read aloud.\n8. Record all starting gear in inventory."
      },
      {
        title: "Special Background Rules",
        content: "Fieldwarden: Roll on the Bonds table twice.\n\nFoundling: Always roll on the Omens table regardless of age — keep the result private.\n\nMountebank (table result 3): Also roll on the Omens table, keep it secret.\n\nOutrider (table result 6): Also roll on the Bonds table a second time."
      },
      {
        title: "Character Traits",
        content: "Roll d10 for each:\n\nPhysique: Athletic, Brawny, Flabby, Lanky, Rugged, Scrawny, Short, Statuesque, Stout, Towering\n\nSkin: Birthmarked, Marked, Oily, Rosy, Scarred, Soft, Tanned, Tattooed, Weathered, Webbed\n\nHair: Bald, Braided, Curly, Filthy, Frizzy, Long, Luxurious, Oily, Wavy, Wispy\n\nFace: Bony, Broken, Chiseled, Elongated, Pale, Perfect, Rakish, Sharp, Square, Sunken\n\nClothing: Antique, Bloody, Elegant, Filthy, Foreign, Frayed, Frumpy, Livery, Rancid, Soiled\n\nVirtue: Ambitious, Cautious, Courageous, Disciplined, Gregarious, Honorable, Humble, Merciful, Serene, Tolerant\n\nVice: Aggressive, Bitter, Craven, Deceitful, Greedy, Lazy, Nervous, Rude, Vain, Vengeful\n\nSpeech: Blunt, Booming, Cryptic, Droning, Formal, Gravelly, Precise, Squeaky, Stuttering, Whispery"
      }
    ]
  },
  {
    id: "attributes-saves",
    title: "Attributes & Saves",
    icon: "🎲",
    subsections: [
      {
        title: "The Three Attributes",
        content: "STR (Strength) — Physical power, lifting, breaking, resisting poison.\n\nDEX (Dexterity) — Poise, speed, reflexes, dodging, climbing, sneaking, balancing.\n\nWIL (Willpower) — Persuasion, deception, charm, interrogation, intimidation, spell manipulation.\n\nAttributes range from 3–18. They are not rigid descriptors — a character with low STR can still attempt to lift a heavy door; their risk is simply higher."
      },
      {
        title: "Saves",
        content: "A save is a roll to avoid negative outcomes from risky choices.\n\nRoll d20 and compare to the relevant attribute:\n• Equal to or under = success\n• 1 = always a success\n• 20 = always a failure\n\nIf two opponents contest each other, whoever is most at risk saves.\n\nIf two PCs act together, the one with the lowest relevant Attribute saves."
      },
      {
        title: "Die of Fate",
        content: "Optionally roll 1d6 when an outcome is uncertain but a save doesn't apply.\n• 4 or more = generally favors the PCs\n• 3 or under = generally bad luck for the PCs"
      }
    ]
  },
  {
    id: "inventory",
    title: "Inventory & Encumbrance",
    icon: "🎒",
    subsections: [
      {
        title: "Inventory Slots",
        content: "Characters have 10 inventory slots total, but can only carry 4 items comfortably without bags, backpacks, horses, carts, etc.\n\nEach PC starts with a Backpack that holds up to 6 slots of items or Fatigue.\n\nCarts (pulled with both hands), Horses, Mules, and Hirelings can significantly expand carrying capacity."
      },
      {
        title: "Slot Rules",
        content: "Most items = 1 slot\nPetty items = 0 slots (small, light, easily pocketed)\nBulky items = 2 slots (large, awkward, needs two hands)\nA bag of coins worth less than 100gp = petty, no slot\n\nA character carrying a full inventory (all 10 slots filled) is reduced to 0 HP.\nA character cannot fill more than ten slots."
      },
      {
        title: "Fatigue",
        content: "Fatigue is added from: casting spells, exertion in the fiction, deprivation, or certain abilities.\n\nEach Fatigue occupies one inventory slot.\n\nIf forced to add Fatigue with no free slots: must drop an item.\n\nFatigue lasts until the PC recuperates (full night's rest in a safe spot)."
      }
    ]
  },
  {
    id: "hp-healing",
    title: "HP & Healing",
    icon: "❤",
    subsections: [
      {
        title: "Hit Protection",
        content: "HP (Hit Protection) reflects the ability to avoid damage in combat — not health or fortitude.\n\nStarting HP: roll 1d6.\n\nIf an attack takes a PC's HP to exactly 0, consult the Scars table.\n\nExcess damage beyond 0 HP is subtracted from STR, triggering a Critical Damage save."
      },
      {
        title: "Healing",
        content: "Resting briefly and drinking water restores all lost HP (requires safe location and light source — may leave party exposed).\n\nBandages stabilize a character that has taken Critical Damage.\n\nAttribute loss (from Critical Damage) usually restores with about a week's rest, facilitated by a healer or appropriate expertise.\n\nMedical Healing: 50gp at a proper healer."
      },
      {
        title: "Deprivation",
        content: "A PC lacking a crucial need (food, water, rest) is Deprived.\n\nDeprived for more than one day: add 1 Fatigue per day to inventory.\n\nA Deprived PC cannot recover HP, Attributes, or clear Fatigue until the need is met."
      }
    ]
  },
  {
    id: "combat",
    title: "Combat",
    icon: "⚔",
    subsections: [
      {
        title: "Rounds",
        content: "A round is roughly 10 seconds of in-game time.\n\nFirst round: Each PC that wishes to act makes a DEX save. Failure = lose turn this round. (Special abilities or circumstances may negate this.)\n\nOpponents then take their turn. First round ends.\n\nSubsequent rounds: PCs act first, then opponents, until combat ends.\n\nActions within each side's turn occur simultaneously."
      },
      {
        title: "Actions",
        content: "On their turn, a character may move up to 40ft and take one action.\n\nActions: attack, cast spell, move a second time, or any reasonable activity.\n\nAll actions are declared before dice are rolled. Risky attempts may require a save."
      },
      {
        title: "Attacking & Damage",
        content: "Roll weapon die, subtract target's Armor, apply remainder to HP.\n\nAttacks automatically hit in combat.\n\nMultiple attackers on the same foe: roll all damage dice, keep the single highest result. Declare all actions first.\n\nHP reduced to exactly 0 → consult the Scars table.\n\nUnarmed attacks always deal 1d4 damage."
      },
      {
        title: "Attack Modifiers",
        content: "Impaired — Fighting from weakness (cover, bound, etc.): Roll 1d4 regardless of weapon.\n\nEnhanced — Position of advantage (helpless foe, daring maneuver): Roll 1d12 instead of normal die.\n\nBlast — Affects all targets in area: Roll separately for each target.\n\nTwo weapons (e.g. d6+d6): Roll both, keep single highest.\n\nRanged attacks: Target must be close enough to see the whites of their eyes. Very distant targets = Impaired. Ammunition not tracked unless specified."
      },
      {
        title: "Retreat",
        content: "Running away from a dire situation always requires a successful DEX save plus a safe destination to flee to."
      },
      {
        title: "Detachments",
        content: "Large groups of similar combatants fighting together = a single Detachment.\n\nCritical Damage = routed or significantly weakened. 0 STR = destroyed.\n\nAttacks by individuals against detachments are Impaired (except Blast damage).\n\nAttacks by detachments against individuals are Enhanced and deal Blast damage."
      }
    ]
  },
  {
    id: "critical-damage",
    title: "Critical Damage & Death",
    icon: "💀",
    subsections: [
      {
        title: "Critical Damage",
        content: "Damage that reduces HP below 0 — the excess is subtracted from STR.\n\nTarget must immediately make a STR save (with new, reduced STR score).\n\nFailure = Critical Damage: character can only crawl weakly. Stabilized by bandages; dies within 1 hour untreated.\n\nSuccess = still fighting, but continues making Critical Damage saves when incurring more damage.\n\nNPCs and monsters that fail are considered dead (Warden's discretion)."
      },
      {
        title: "Attribute Loss",
        content: "STR at 0 → Death\nDEX at 0 → Paralyzed\nWIL at 0 → Delirious\n\nComplete DEX or WIL loss renders the character unable to act until restored through extended rest or extraordinary means.\n\nDamage outside of combat goes to Attributes (usually STR), not HP."
      },
      {
        title: "Scars (HP reduced to exactly 0)",
        content: "Look up the entry based on HP lost in that attack:\n\n1 — Lasting Scar: Roll d6 for location (1:Neck 2:Hands 3:Eye 4:Chest 5:Legs 6:Ear). Roll d6; if higher than max HP, take as new max.\n2 — Rattling Blow: Disoriented, shaken. Roll d6; if higher than max HP, take as new max.\n3 — Walloped: Sent flying, winded. Deprived until rested. Roll d6, add to max HP.\n4 — Broken Limb: Roll d6 (1–2:Leg 3–4:Arm 5:Rib 6:Skull). Once mended, roll 2d6; if higher than max HP, take as new max.\n5 — Diseased: Gross infection. Recover, then roll 2d6; if higher than max HP, take as new max.\n6 — Reorienting Head Wound: Roll d6 (1–2:STR 3–4:DEX 5–6:WIL). Roll 3d6; if higher than current attribute, take as new max.\n7 — Hamstrung: Barely move until healed. Roll 3d6; if higher than max DEX, take as new max DEX.\n8 — Deafened: Cannot hear until extraordinary aid found. WIL save; if passed, +1d4 max WIL.\n9 — Re-brained: Hidden part of psyche knocked loose. Roll 3d6; if higher than max WIL, take as new max.\n10 — Sundered: Appendage torn off or useless. WIL save; if passed, +1d6 max WIL.\n11 — Mortal Wound: Deprived and out of action. Die in one hour unless healed. Recovery: roll 2d6 as new max HP.\n12 — Doomed: If next Critical Damage save fails, die horribly. If you pass, roll 3d6; if higher than max HP, take as new max."
      },
      {
        title: "Character Death",
        content: "When a character dies, the player creates a new character or takes control of a hireling. They join the party immediately to reduce downtime."
      }
    ]
  },
  {
    id: "magic",
    title: "Magic",
    icon: "✦",
    subsections: [
      {
        title: "Spellbooks",
        content: "Contain a single spell; take up one inventory slot.\n\nCannot be easily transcribed or created — recovered from tombs, dungeons, manors.\n\nMay display unusual properties (foul smell when opened, innate intelligence, only legible in moonlight, etc.).\n\nDangerous to display openly; attracts those who seek arcane power."
      },
      {
        title: "Casting Spells",
        content: "Anyone can cast a spell by holding a spellbook in both hands and reading its contents aloud.\n\nMust then add 1 Fatigue to inventory.\n\nWith time and safety, PCs can enhance a spell's impact (multiple targets, increased power, etc.) at no extra cost.\n\nIf deprived or in danger (such as during combat), the Warden may require a WIL save to avoid ill effects.\n\nConsequences of failure are on par with the intended effect: added Fatigue, spellbook destruction, injury, or death."
      },
      {
        title: "Scrolls",
        content: "Similar to spellbooks, but:\n• Petty (no inventory slot)\n• Do not cause Fatigue\n• Disappear after one use"
      },
      {
        title: "Relics",
        content: "Items imbued with a magical spell or power.\n• Do not cause Fatigue\n• Usually have limited uses and a Recharge condition"
      }
    ]
  },
  {
    id: "reactions-morale",
    title: "Reactions & Morale",
    icon: "👁",
    subsections: [
      {
        title: "Reactions",
        content: "When a newly encountered NPC's reaction is not obvious, the Warden rolls 2d6:\n\n2 — Hostile\n3–5 — Wary\n6–8 — Curious\n9–11 — Kind\n12 — Helpful"
      },
      {
        title: "Morale",
        content: "Enemies must pass a WIL save to avoid fleeing when they take their first casualty and again when they lose half their number.\n\nSome groups use their leader's WIL in place of their own.\n\nLone foes save when reduced to 0 HP.\n\nMorale does not affect PCs."
      }
    ]
  },
  {
    id: "dungeon-exploration",
    title: "Dungeon Exploration",
    icon: "🕯",
    subsections: [
      {
        title: "The Basics",
        content: "'Dungeon' refers to any dangerous locale — mansions, farmhouses, adventure sites, etc.\n\nOn their Turn, a character can move a distance equal to their torchlight's perimeter (~40ft) and perform one Action.\n\nPlayers can use their action to move up to 3× that distance, but this increases the chance of triggering a Dungeon Events roll.\n\nThe Warden presents obvious information about an area freely and at no cost."
      },
      {
        title: "Dungeon Events (d6)",
        content: "Triggered when: party spends more than one cycle in a location; moves quickly or haphazardly; moves into a new area or level; creates a loud disturbance.\n\n1 — Encounter: Roll on encounter table. Possibly hostile (check Reactions).\n2 — Sign: A clue, spoor, track, abandoned lair, scent, or victim is discovered.\n3 — Environment: Surroundings shift — water rises, ceilings collapse, ritual nears completion.\n4 — Loss: Torches blown out, spell fizzles. Party must resolve effects before moving on.\n5 — Exhaustion: Party must rest, add Fatigue, or consume a ration.\n6 — Quiet: The party is left alone and safe for now."
      },
      {
        title: "Resting in Dungeons",
        content: "Spend a turn resting = restore all HP.\n\nRequires a light source and a safe location. Present or oncoming danger makes rest impossible.\n\nDoes not restore Fatigue — impossible to safely Make Camp in a dungeon."
      },
      {
        title: "Light",
        content: "Torches and lanterns illuminate 40ft; dim outline of objects beyond that.\n\nA torch can be lit 3 times before permanently degrading.\n\nA lantern can be relit indefinitely but requires an Oil Can (6 uses).\n\nNo light source → risk of panic."
      },
      {
        title: "Panic",
        content: "Triggered by: being surrounded by enemies, total darkness, facing greatest fears.\n\nWIL save typically required to avoid becoming panicked.\n\nA panicked character must use their action each turn to make a WIL save to recover.\n\nPanicked character: 0 HP, does not act in first round, all attacks impaired."
      },
      {
        title: "Traps",
        content: "Cautious character receives all information needed to potentially avoid triggering a trap.\n\nUnwitting character: triggers according to fiction, or 2-in-6 chance.\n\nTrap damage goes to Attributes (usually STR or DEX), not HP.\n\nArmor reduces trap damage only if applicable."
      }
    ]
  },
  {
    id: "wilderness-exploration",
    title: "Wilderness Exploration",
    icon: "🌲",
    subsections: [
      {
        title: "Watches",
        content: "A day is divided into three watches: morning, afternoon, and night.\n\nEach character chooses one Wilderness Action per watch.\n\nPoints = potential destinations on a map. One or more watches may be required to journey between two points."
      },
      {
        title: "Travel Duration",
        content: "Path Type:\n• Roads — No penalty, no lost chance\n• Trails — +1 Watch, 2-in-6 lost chance\n• Wilderness — +2 Watches, 3-in-6 lost chance\n\nPath Distance:\n• Short — +1 Watch\n• Medium — +2 Watches\n• Long — +3 Watches\n\nTerrain:\n• Easy (plains, plateaus, valleys) — No penalty\n• Tough (forests, deserts, hills) — +1 Watch\n• Perilous (mountains, jungles, swamps) — +2 Watches\n\nFor especially vast terrain, add up to +2 watches. Mounts, guides, and maps can reduce or negate certain penalties."
      },
      {
        title: "Weather (d6 per day)",
        content: "Spring: 1-Nice, 2-Fair, 3-Fair, 4-Unpleasant, 5-Inclement, 6-Extreme\nSummer: 1-Nice, 2-Nice, 3-Fair, 4-Unpleasant, 5-Inclement, 6-Extreme\nFall: 1-Fair, 2-Fair, 3-Unpleasant, 4-Inclement, 5-Inclement, 6-Extreme\nWinter: 1-Fair, 2-Unpleasant, 3-Inclement, 4-Inclement, 5-Extreme, 6-Extreme\n\nIf Extreme is rolled twice in a row → Catastrophic (most parties cannot travel).\n\nWeather Effects:\n• Nice / Fair — Favorable travel\n• Unpleasant — Add Fatigue or +1 Watch\n• Inclement — Add Fatigue or +1 Watch; raise terrain difficulty one step\n• Extreme — Add Fatigue and +1 Watch; raise terrain difficulty one step\n• Catastrophic — Most parties cannot travel"
      },
      {
        title: "Wilderness Events (d6)",
        content: "1 — Encounter: Roll on encounter table for terrain type. Roll reactions if applicable.\n2 — Sign: Party discovers a clue or indication of nearby encounter, locality, or hidden feature.\n3 — Environment: A shift in weather or terrain.\n4 — Loss: Party faced with a choice that costs a resource, time, or effort.\n5 — Exhaustion: Barrier requiring extra time (Wilderness Action) or adding Fatigue.\n6 — Discovery: Party finds food, treasure, or useful resources."
      },
      {
        title: "Wilderness Actions",
        content: "Travel — Move toward destination. Roll to check if lost (d6, modified by path type, maps, skills). If lost, spend Wilderness Action to recover.\n\nExplore — Search large area for hidden features. Discovers a Location or Feature. Travel action still required to leave area.\n\nSupply — Hunt, fish, or forage. Base: 1d4 Rations. Each additional participant increases the die (1d4→1d6→max 1d12). Can also resupply at villages for gold + a full Watch.\n\nMake Camp — Party stops to rest. Each member consumes 1 Ration. Party members who rested remove all Fatigue."
      }
    ]
  },
  {
    id: "downtime",
    title: "Downtime",
    icon: "📜",
    subsections: [
      {
        title: "Downtime Overview",
        content: "Between sessions, players can engage in research, following leads, improving skills, or building relationships.\n\nA PC is limited to one Downtime Action at a time.\n\nCannot be undertaken in unsafe conditions or while a character is in recovery."
      },
      {
        title: "Milestones & Costs",
        content: "For activities requiring multiple steps, the Warden assigns 1–5 Milestones to track progress.\n\nPCs complete Milestones by taking a Downtime Action and paying a Cost:\n• Gold — Direct payment\n• Resources — Non-monetary goods\n• Reputation — Drawing on renown, personality, social connections\n• Loss — Something specific and unique: a finger, a soul, a Relic, etc.\n\nIf a PC lacks required reputation: WIL save — success reduces or eliminates the cost."
      },
      {
        title: "Research",
        content: "A PC investigates a single question about lost lore, an item's location, an NPC's whereabouts, etc.\n\nRequires: a clearly formulated question + a Source of knowledge (NPC, faction, spirit, place, or another PC).\n\nIf no Source exists: spend a Downtime Action trying to find one (no guarantee of success)."
      },
      {
        title: "Training",
        content: "A character improves a skill or ability with concrete narrative or mechanical results.\n\nRequires: a precise description of what to improve + a Master to train with + inspiration from actual play experiences."
      },
      {
        title: "Strengthening Ties",
        content: "A character fosters or repairs a connection with an NPC or Faction.\n\nRequires: identify the entity + state a specific intent (build trust, mend a friendship, join a faction, form an alliance).\n\nWith each completed Milestone, the relationship grows or changes."
      }
    ]
  },
  {
    id: "hirelings-wealth",
    title: "Hirelings & Wealth",
    icon: "🪙",
    subsections: [
      {
        title: "Hirelings",
        content: "Recruit hirelings from the marketplace. Daily rates:\n\nAlchemist: 30gp | Animal Handler: 5gp | Blacksmith: 15gp | Bodyguard: 10gp | Local Guide: 5gp | Lockpick: 10gp | Navigator: 10gp | Sailor: 5gp | Scholar: 20gp | Tracker: 5gp | Trapper: 5gp | Veteran Bodyguard: 20gp"
      },
      {
        title: "Creating Hirelings",
        content: "Choose an appropriate role and name. Roll 3d6 for each attribute, 1d6 for HP. Give them appropriate equipment. Roll on Character Traits tables.\n\nAlternatively: choose a background and name; roll all background tables; roll for Rations, Gold, Attributes, HP, and Age."
      },
      {
        title: "Armor",
        content: "Shield (+1 Armor): 10gp\nHelmet (+1 Armor): 10gp\nGambeson (+1 Armor): 15gp\nBrigandine (1 Armor, bulky): 20gp\nChainmail (2 Armor, bulky): 40gp\nPlate (3 Armor, bulky): 60gp"
      },
      {
        title: "Weapons",
        content: "Dagger, Cudgel, Sickle, Staff (d6): 5gp\nSpear, Sword, Mace, Axe, Flail (d8): 10gp\nHalberd, War Hammer, Long Sword (d10, bulky): 20gp\nSling (d6): 5gp\nBow (d6, bulky): 20gp\nCrossbow (d8, bulky): 30gp"
      },
      {
        title: "Gear & Upkeep",
        content: "Room & Board/night: 10gp | Private Room/night (fits 4): 35gp | Medical Healing: 50gp | Rations (3 uses): 10gp\n\nRope (25ft): 5gp | Torch (3 uses): 5gp | Lantern: 10gp | Oil Can (6 uses): 10gp | Bandages (3 uses): 30gp | Antitoxin: 20gp\n\nCompass: 75gp | Spyglass: 40gp | Thieving Tools: 25gp | Grappling Hook: 25gp | Tent (fits 2, bulky): 20gp\n\nHorse (+4 slots): 75gp | Mule (+6 slots, slow): 30gp | Cart (+4 slots): 30gp | Wagon (+8 slots, slow): 200gp"
      }
    ]
  },
  {
    id: "setting",
    title: "The World of Vald",
    icon: "🌍",
    subsections: [
      {
        title: "Vald",
        content: "The implied setting of Cairn is called Vald, encompassing all developed or settled lands, cities, towns, and forests. Most adventures take place in smaller towns and villages, the forest, and the margins of the realm.\n\nTowns are built near water and lumber sources, within a day's walk of each other. Established trails between larger towns are fairly common; maintained roads are almost nonexistent except near the distant cities."
      },
      {
        title: "The Wood",
        content: "The Wood surrounds and divides the realm — representing not one forest, but all forests. Its peoples, creatures, and unrelenting natural elements have kept the outside world at bay since time immemorial.\n\nAt the core of each forest is a Heart Tree — the place where the forest is most powerful and most dangerous. Each Heart Tree is born from a single Heartseed.\n\nThe Wood is populated by: Goblins, Spirits, Treants, Trolls, Werewolves, Witches, talking plants and animals. Most are openly hostile to outsiders. All demonstrate utter respect for the Fae (sometimes called the Pale Folk, or the Neighbors)."
      },
      {
        title: "The Roots",
        content: "The Roots is a realm of mystery and horror underground, where vast caves loom as large as emptied oceans, without even a hint of sunlight.\n\nEntrances to the Roots, known as Gates, are scattered across the lands and are usually hidden or protected by powerful forces. Once opened, Gates permit dangerous creatures to pass through.\n\nOnly the brave and foolish enter the Roots, and most do not return. The few who do whisper of indescribable horrors and evil intelligence guarding lost treasures."
      }
    ]
  }
]
