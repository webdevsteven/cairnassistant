export const backgrounds = [
  {
    id: "aurifex",
    name: "Aurifex",
    description: "You are an artisan of the arcane, a smith of subtle forces. In the crucible of your workshop, the laws that govern this world are warped to suit your needs.",
    names: ["Hestia", "Basil", "Rune", "Prism", "Ember", "Quintess", "Aludel", "Mordant", "Salaman", "Jazia"],
    startingGear: ["3d6 Gold Pieces", "Rations (3 uses)", "Lantern", "Oil Can (6 uses)", "Needle-Knife (d6)", "Protective Gloves (petty)"],
    startingGoldDice: "3d6",
    specialRule: null,
    table1: {
      question: "What experiment went horribly wrong?",
      entries: [
        { roll: 1, text: "Explosion: lost your sense of smell, but can sniff out gold as a pig does truffles. Take a Tin of Snuff (6 uses) to dampen the impact — use it daily or become deprived.", items: ["Tin of Snuff (6 uses)"] },
        { roll: 2, text: "You dematerialized a beloved pet. It follows you invisibly. You can share its senses (add a Fatigue each time). It follows basic commands.", items: [] },
        { roll: 3, text: "Exposed to a long-acting truth serum whose effects haven't worn off. You cannot repeat lies you've heard, either.", items: [] },
        { roll: 4, text: "You were adept at creating fake gold until your ruse was discovered. Take a heavy Metal Ingot and Gold Powder (3 uses).", items: ["Metal Ingot", "Gold Powder (3 uses)"] },
        { roll: 5, text: "A rival stole your alchemical blueprint. Take a prototype Blunderbuss (d12, blast, bulky, 1 round to reload) and a taste for revenge.", items: ["Blunderbuss (d12, blast, bulky)"] },
        { roll: 6, text: "Ridiculed for discovering how to turn gold into lead. Take a bottle of Universal Solvent (2 uses) that dissolves anything into its constituent parts.", items: ["Universal Solvent (2 uses)"] },
      ]
    },
    table2: {
      question: "What alchemical marvel is the product of your latest ingenuity?",
      entries: [
        { roll: 1, text: "Pyrophoric Gel — Sticky green fluid that catches fire when exposed to air, burns 8 hours, cannot be extinguished (1 use).", items: ["Pyrophoric Gel (1 use)"] },
        { roll: 2, text: "Blast Sphere — Head-sized iron ball that explodes on impact (d12, blast, bulky, 1 use).", items: ["Blast Sphere (d12, blast, bulky, 1 use)"] },
        { roll: 3, text: "Aqua Vita — Purifies any liquid to pure water. Drinking it cures 1d6 STR (1 use).", items: ["Aqua Vita (1 use)"] },
        { roll: 4, text: "Mimic Stone — Records a short phrase that can be played back.", items: ["Mimic Stone"] },
        { roll: 5, text: "Spark Dust — Ignites easily. Useful for starting fires or as an incendiary device (3 uses).", items: ["Spark Dust (3 uses)"] },
        { roll: 6, text: "Homunculus — Miniature clay replica of yourself that follows commands, hates you, complains constantly. Any damage done to it is also done to you. 3 HP, 4 STR, 13 DEX, 5 WIL.", items: ["Homunculus (3 HP, 4 STR, 13 DEX, 5 WIL)"] },
      ]
    }
  },
  {
    id: "barber-surgeon",
    name: "Barber-Surgeon",
    description: "You walk the line between healer and harrower, knowing the frailty of the flesh but also the secrets within. With the right tools, life and death are merely words.",
    names: ["Wilmot", "Patch", "Lancet", "Sawbones", "Theo", "Cutwell", "Humor", "Landsford", "Goodeye", "Johanna"],
    startingGear: ["3d6 Gold Pieces", "Rations (3 uses)", "Torch (3 uses)", "Amputation Knife (d6)", "Bandages (3 uses)", "Leech (restores 1 STR, 3 uses)", "Stained Medical Finery (petty)"],
    startingGoldDice: "3d6",
    specialRule: null,
    table1: {
      question: "How have you 'improved' yourself?",
      entries: [
        { roll: 1, text: "You have a replacement eye that can magnify objects, act as a telescope, and provide minimal night vision. Cannot wear metal on your head; strong magnets make you deprived.", items: [] },
        { roll: 2, text: "One foot is mostly metal (kick, d6). Treat some Tough Terrain as Easy. Carry an Oil Can (6 uses) — without daily application, you are deprived and noisy.", items: ["Oil Can (6 uses)"] },
        { roll: 3, text: "One finger has been swapped, the bone replaced by gold and iron. Take a Hook and Screwdriver that can attach to the fingertip.", items: ["Hook", "Screwdriver"] },
        { roll: 4, text: "Both ears surgically enhanced, tripling your hearing range. You can focus on a specific sound at great distance. Wear an ear flap to protect against loud noises (WIL save or temporary paralysis).", items: [] },
        { roll: 5, text: "Your chest is lined with alchemical sigils, toughening the skin (1 Armor). Wearing other metallic armor nullifies the effect.", items: [] },
        { roll: 6, text: "One arm is fully metal and detaches at the shoulder. Can be used as a weapon (d8, bulky when not attached) and moves independently while in your sight.", items: [] },
      ]
    },
    table2: {
      question: "What rare tool is essential to your work?",
      entries: [
        { roll: 1, text: "Regrowth Salve — Regrows a body part over the course of a day (1 use).", items: ["Regrowth Salve (1 use)"] },
        { roll: 2, text: "Graftgrub — A small worm that can fuse inanimate objects with parts of the body (1 use).", items: ["Graftgrub (1 use)"] },
        { roll: 3, text: "Woundwax — Heals wounds from fire or chemicals (restoring full STR) but nothing else (2 uses).", items: ["Woundwax (2 uses)"] },
        { roll: 4, text: "Quicksilver — Go first in combat, auto-pass WIL saves for one hour. Addictive: save STR or become deprived after 24 hours without it (4 uses).", items: ["Quicksilver (4 uses)"] },
        { roll: 5, text: "Pneuma Pump — Portable iron lungs (bulky). Enables life-saving surgery or underwater breathing.", items: ["Pneuma Pump (bulky)"] },
        { roll: 6, text: "Lodestone — Draws out dangerous elements from the body; powerful magnetic force.", items: ["Lodestone"] },
      ]
    }
  },
  {
    id: "beast-handler",
    name: "Beast Handler",
    description: "You alone can walk among the creatures of the wild, fearless and in control. You share a connection with animals that others can only dream of…so long as you don't become their snack.",
    names: ["Amara", "Wulf", "Mireille", "Soren", "Freki", "Aster", "Gerrik", "Boreas", "Veda", "Matheus"],
    startingGear: ["3d6 Gold Pieces", "Rations (3 uses)", "Torch (3 uses)", "Leather Whip (d6)", "Soporific Darts (STR save or sleep, 6 uses)", "Lure", "Rope (25ft)"],
    startingGoldDice: "3d6",
    specialRule: null,
    table1: {
      question: "What do creatures of the wild understand that your kind do not?",
      entries: [
        { roll: 1, text: "With quiet concentration, you can borrow the senses of a nearby creature of your specialty.", items: [] },
        { roll: 2, text: "The behavior of beasts is a language in itself. When observing beasts of your specialty, you gain insight into weather patterns and impending disasters.", items: [] },
        { roll: 3, text: "You have a sense for when predators — even those not of your specialty — are near.", items: [] },
        { roll: 4, text: "Your chance of becoming lost in terrain dominated by beasts of your specialty is reduced by one step (e.g. 4-in-6 becomes 3-in-6).", items: [] },
        { roll: 5, text: "When surrounded by creatures of your specialty, they can alert you to approaching danger before it arrives.", items: [] },
        { roll: 6, text: "Once per day, take on a simple feature from a creature of your specialty (webbed fingers, night vision, etc.). Add a Fatigue each time.", items: [] },
      ]
    },
    table2: {
      question: "What creature is your specialty?",
      entries: [
        { roll: 1, text: "Arachnids — Take a Quick-Flame Rod and Oil Can (6 uses). Can destroy a large spider nest in seconds.", items: ["Quick-Flame Rod", "Oil Can (6 uses)"] },
        { roll: 2, text: "Felines — Take a sack of Whiskerwort. Its odor can calm and control even the largest of cats.", items: ["Whiskerwort (sack)"] },
        { roll: 3, text: "Canines — Take a wreath of Wolfsbane and a Large Net. Also effective against werewolves.", items: ["Wolfsbane (wreath)", "Large Net"] },
        { roll: 4, text: "Birds — Take a Warble-Whistle (3 charges). Imitates any bird call, can send simple messages. Recharge: Feed a baby bird as its mother would, then blow.", items: ["Warble-Whistle (3 charges)"] },
        { roll: 5, text: "Rodents — Take a Windpipe that emits a high-pitched sound only rodents hear. They will follow while you play, even to their deaths.", items: ["Windpipe (rodent caller)"] },
        { roll: 6, text: "Serpents — Take a Warming Stone generating irresistible heat and a vial of Antitoxin (2 uses).", items: ["Warming Stone", "Antitoxin (2 uses)"] },
      ]
    }
  },
  {
    id: "bonekeeper",
    name: "Bonekeeper",
    description: "You are a shepherd to the departed. You listen to the final whispers of the dead as they descend into the cold, unyielding earth. To fully celebrate the gift of life, we must honor its finale as well.",
    names: ["Rook", "Ebon", "Moro", "Yew", "Pall", "Leth", "Lenore", "Barnaby", "Vesper", "Leder"],
    startingGear: ["3d6 Gold Pieces", "Rations (3 uses)", "Lantern", "Oil Can (6 uses)", "Stake (d6)", "Chains (10ft)"],
    startingGoldDice: "3d6",
    specialRule: null,
    table1: {
      question: "What did you take from the dead?",
      entries: [
        { roll: 1, text: "A Crow-Shaped Amulet. You can ask a question of the dead, but must add a Fatigue each time.", items: ["Crow-Shaped Amulet"] },
        { roll: 2, text: "A mortal wound from a freed revenant. You were healed but disfigured. You require neither air nor sustenance, but are still subject to pain and death. The dead see you as one of their own.", items: [] },
        { roll: 3, text: "A Blood Pail (bulky) from a local death-cult. Empty it to raise a servant from whatever is buried below. Only one servant at a time. Recharge: Fill with the blood of a dying warrior.", items: ["Blood Pail (bulky)"] },
        { roll: 4, text: "A Burial Wagon (+6 slots) from your last job, with a stubborn old Donkey (+4 slots, only +2 if pulling wagon, slow).", items: ["Burial Wagon (+6 slots)", "Donkey (+4 slots, slow)"] },
        { roll: 5, text: "The Detect Magic Spellbook, stolen from an ancient library. Detect Magic: You can see or hear nearby magical auras. Becomes warm to the touch when magic is used nearby.", items: ["Spellbook: Detect Magic"] },
        { roll: 6, text: "A Plague Doctor's Mask, after its owner succumbed to the disease that wiped out everyone you once knew.", items: ["Plague Doctor's Mask"] },
      ]
    },
    table2: {
      question: "What tool was invaluable in your work?",
      entries: [
        { roll: 1, text: "Manacles — Still effective against the very strong. You don't have the key.", items: ["Manacles (no key)"] },
        { roll: 2, text: "Sponge — Supposedly made from the remains of a rare sea creature. It never seems to dry out.", items: ["Sponge (never dries out)"] },
        { roll: 3, text: "Pulley — Great for moving gravestones, rocks, or bodies.", items: ["Pulley"] },
        { roll: 4, text: "Incense — Perfect for rituals or to keep the flies at bay. Cools the blood.", items: ["Incense"] },
        { roll: 5, text: "Crowbar (d6) — Sometimes you just need to get the damn thing open.", items: ["Crowbar (d6)"] },
        { roll: 6, text: "Repellent — Powerful stuff. Its faded label makes it unclear what it actually repels. Perhaps everything. 3 uses.", items: ["Repellent (3 uses, unknown type)"] },
      ]
    }
  },
  {
    id: "cutpurse",
    name: "Cutpurse",
    description: "You live in the grey space between those who have power and those who don't. With nimble fingers, you unburden both the richest merchant and the lowliest guard.",
    names: ["Arlo", "Lyra", "Eamon", "Salina", "Elara", "Freya", "Bull", "Sparrow", "Ivy", "Silas"],
    startingGear: ["3d6 Gold Pieces", "Rations (3 uses)", "Torch (3 uses)", "Twin Daggers (d6+d6, bulky)", "Padded Leather (1 Armor)", "Lockpicks", "Black Outfit (petty)"],
    startingGoldDice: "3d6",
    specialRule: null,
    table1: {
      question: "What was your last big job?",
      entries: [
        { roll: 1, text: "A noble's summer home. Full of fancy wine (+20gp) but not much else. Take Fence Cutters.", items: ["Fence Cutters"], gold: 20 },
        { roll: 2, text: "A bank. (You were caught.) You bear a brand only visible by firelight; anyone who sees it can ask you for a beer. Take Retractable Wires.", items: ["Retractable Wires"] },
        { roll: 3, text: "A guild warehouse. Take a Ladder (bulky, 10ft) and Blinding Powder (1 use).", items: ["Ladder (bulky, 10ft)", "Blinding Powder (1 use)"] },
        { roll: 4, text: "A moneylender. Someone beat you to it but left behind a Scroll of Arcane Eye (petty). Arcane Eye: You can see through a magical floating eyeball that flies around at your command.", items: ["Scroll: Arcane Eye (petty)"] },
        { roll: 5, text: "The constable's quarters. You escaped but left friends behind. Take Strong Silk Rope and a queasy feeling.", items: ["Strong Silk Rope"] },
        { roll: 6, text: "A university. You were seen but not pursued. You still don't know why. Take Smoke Pellets (3 uses).", items: ["Smoke Pellets (3 uses)"] },
      ]
    },
    table2: {
      question: "What helps you steal?",
      entries: [
        { roll: 1, text: "Catring (2 charges) — Climb up walls and fall safely. Recharge: Place the ring on a stray cat's tail.", items: ["Catring (2 charges)"] },
        { roll: 2, text: "Gildfinger (1 charge) — A finger glove that mimics any mundane key. Recharge: Bundle with at least 100gp for a night.", items: ["Gildfinger (1 charge)"] },
        { roll: 3, text: "Glimpse Glass (3 uses) — A monocle that lets you see through walls. Shatters after the last use.", items: ["Glimpse Glass (3 uses)"] },
        { roll: 4, text: "Sweetwhistle (1 charge) — Listeners hear a soft, familiar voice they cannot resist following. Recharge: Lose a dear memory (describe it).", items: ["Sweetwhistle (1 charge)"] },
        { roll: 5, text: "Vagrant's Veil (1 charge, petty) — Wear it to blend seamlessly into crowds as a simple pauper. Recharge: Donate all the day's winnings to the poor.", items: ["Vagrant's Veil (1 charge, petty)"] },
        { roll: 6, text: "Reverse Teetotum (1 use) — When spun, time skips backwards 30 seconds. Everyone remembers what happened.", items: ["Reverse Teetotum (1 use)"] },
      ]
    }
  },
  {
    id: "fieldwarden",
    name: "Fieldwarden",
    description: "Protectors of the harvest, defense against pests, thieves, and beasts. A position of great honor, while it lasts — many do not live out their natural lives.",
    names: ["Seed", "Thresh", "Dibber", "Sow", "Stalk", "Harrow", "Cobb", "Flax", "Briar", "Rye"],
    startingGear: ["3d6 Gold Pieces", "Rations (3 uses)", "Torch (3 uses)", "Brigandine (1 Armor, bulky)", "Sling (d6)", "Hand Axe (d6)", "Repellent (pick type, 3 uses)"],
    startingGoldDice: "3d6",
    specialRule: "Roll a second time on the Bonds table.",
    table1: {
      question: "What got the better of you?",
      entries: [
        { roll: 1, text: "A voracious swarm that swallowed crops and animals alike. Take Gale Seed Extract (3 uses). Ingesting it lets you sprint at 4× your regular speed. Afterward, add two Fatigue.", items: ["Gale Seed Extract (3 uses)"] },
        { roll: 2, text: "A crop spirit, angered by poor tithing. The fires consumed nearly everything. Take a pouch of Fireseeds (d8, blast, 4 uses).", items: ["Fireseeds (d8, blast, 4 uses)"] },
        { roll: 3, text: "An antlered, toothy demon that nearly ended you. Take a blood-stained bone knife (d6). On Critical Damage, its next attack becomes enhanced from contact with blood.", items: ["Bone Knife (d6, bloodthirsty)"] },
        { roll: 4, text: "The Withering, a stem rot from the Roots. Take a Diseased Crop (6 uses) that decays any plant it touches.", items: ["Diseased Crop (6 uses)"] },
        { roll: 5, text: "Wolves, or so you thought. You are now a Werewolf (8 HP, 15 STR, 14 DEX, claws d6+d6, bite d8; WIL unchanged). Turn at will once per day; must make a WIL save to revert. Anyone left alive from your attacks must save WIL or be infected.", items: [] },
        { roll: 6, text: "Crop thieves — you were outnumbered but some didn't survive. Start with +d4 HP and a Cusped Falchion (d8).", items: ["Cusped Falchion (d8)"] },
      ]
    },
    table2: {
      question: "What tool saved your life?",
      entries: [
        { roll: 1, text: "Bloodvine Whip (d8) — On Critical Damage, drains target's blood; next attack with it gains the blast quality.", items: ["Bloodvine Whip (d8)"] },
        { roll: 2, text: "Clatter Keeper — Hand-cranked device emitting loud noise, frightening most creatures.", items: ["Clatter Keeper"] },
        { roll: 3, text: "Sun Stick — Provides warmth and light for up to one hour (1 use). Recharge: Leave in heavy sunlight for a full day.", items: ["Sun Stick (1 use)"] },
        { roll: 4, text: "Root Tether — When thrown, binds a creature as large as a wolf to the soil for a short time.", items: ["Root Tether"] },
        { roll: 5, text: "Greenwhistle — Small flute that calms plants, easing passage through heavy plant life.", items: ["Greenwhistle"] },
        { roll: 6, text: "Everbloom Band — A circlet with flowers that never wilt. On Critical Damage, the flowers dissolve but you act as if your save succeeded (STR loss still occurs).", items: ["Everbloom Band"] },
      ]
    }
  },
  {
    id: "fletchwind",
    name: "Fletchwind",
    description: "You strike from afar, but that does not make you a coward. You are a musician, the song of your bowstring nought but a warning, singing the silent promise of a quick death.",
    names: ["Flint", "Feather", "Crier", "Thunder", "Falcon", "Pluck", "Needle", "Warsong", "Hawk", "Cai"],
    startingGear: ["3d6 Gold Pieces", "Rations (3 uses)", "Torch (3 uses)", "Bow (see table)", "Serrated Knife (d6)", "Boiled Leather (1 Armor)", "Heartroot Salve (restores 1d4 STR, 1 use)"],
    startingGoldDice: "3d6",
    specialRule: null,
    table1: {
      question: "What kind of wood is your bow made from?",
      entries: [
        { roll: 1, text: "Western Yew (d6, bulky) — Can be wielded as a blunt weapon (d6). Noisy.", items: ["Bow: Western Yew (d6, bulky)"] },
        { roll: 2, text: "Sessile Oak (d8, bulky) — Slams into targets. On Critical Damage, something is torn off.", items: ["Bow: Sessile Oak (d8, bulky)"] },
        { roll: 3, text: "Stone Pine (d6, bulky) — Produces one use of Sticky Sap per day. The sap is highly explosive.", items: ["Bow: Stone Pine (d6, bulky)"] },
        { roll: 4, text: "White Ash (d6, bulky) — Can be used in place of a shield in melee (+1 Armor).", items: ["Bow: White Ash (d6, bulky)"] },
        { roll: 5, text: "Striped Bamboo (d6) — Collapsible; only requires one slot (still requires both hands).", items: ["Bow: Striped Bamboo (d6, 1 slot)"] },
        { roll: 6, text: "Wych Elm (d6, bulky) — Protects the bearer from poisons and toxins while held.", items: ["Bow: Wych Elm (d6, bulky)"] },
      ]
    },
    table2: {
      question: "How did you earn your bow?",
      entries: [
        { roll: 1, text: "War — If you are first to attack, your bow gains the blast property for the first round.", items: [] },
        { roll: 2, text: "Falconry — Keep a falcon (3 HP, 5 STR, 16 DEX, 4 WIL, claws d6+d6, bite d8). It only eats live game.", items: ["Falcon companion (3 HP, 5 STR, 16 DEX, 4 WIL)"] },
        { roll: 3, text: "Hunting — When taking the Supply action, your ability to secure Rations increases by one step (e.g. 1d4 becomes 1d6).", items: [] },
        { roll: 4, text: "Tournaments — Attacks with your bow are enhanced if the target is immobile.", items: [] },
        { roll: 5, text: "Training — If you are first to attack, melee attacks against you are impaired until you take STR damage.", items: [] },
        { roll: 6, text: "Scouting — When taking the Travel action, your presence decreases the chance of getting lost by one step (e.g. 4-in-6 becomes 3-in-6).", items: [] },
      ]
    }
  },
  {
    id: "foundling",
    name: "Foundling",
    description: "An odd birthmark, a strange smell: somehow, the touch of elsewhere still lingers. Wherever you are, you have trouble fitting in.",
    names: ["Faunus", "Snowdrop", "Wisp", "Silverdew", "Brim", "Solstice", "Steeleye", "Artea", "Gossamer", "Hazel"],
    startingGear: ["3d6 Gold Pieces", "Rations (3 uses)", "Torch (3 uses)", "Salt Pouch", "Heirloom Amulet (petty, glows near magic)", "Sling (d6)", "Dagger (d6)"],
    startingGoldDice: "3d6",
    specialRule: "Always roll on the Omens table regardless of age — keep the result private.",
    table1: {
      question: "Who took you in?",
      entries: [
        { roll: 1, text: "An old hunter. Take a Weathered Longbow (d8, bulky) and a Leather Jerkin (1 Armor).", items: ["Weathered Longbow (d8, bulky)", "Leather Jerkin (1 Armor)"] },
        { roll: 2, text: "A wizened apothecary who maintained clinical detachment. Take a Healing Unguent (restores d4 STR, 1 use).", items: ["Healing Unguent (restores d4 STR, 1 use)"] },
        { roll: 3, text: "A druid who taught you the language of trees. Take a Gnarled Staff (d8).", items: ["Gnarled Staff (d8)"] },
        { roll: 4, text: "A gruff blacksmith from a sleepy river town. Take a Smith's Apron (petty) and oft-mended Chain Mail (2 Armor, bulky).", items: ["Smith's Apron (petty)", "Chain Mail (2 Armor, bulky)"] },
        { roll: 5, text: "A troupe of traveling entertainers who vanished one morning without explanation. Take a Storybook, a Dagger (d6), and burning questions.", items: ["Storybook", "Dagger (d6)"] },
        { roll: 6, text: "The monks of a secluded forest monastery. Take a Monk's Habit (warm, petty) and a Spellbook of Control Plants. Control Plants: Nearby plants and trees obey you and gain the ability to move at a slow pace.", items: ["Monk's Habit (warm, petty)", "Spellbook: Control Plants"] },
      ]
    },
    table2: {
      question: "What keeps away bad tidings?",
      entries: [
        { roll: 1, text: "Pipeweed — Your good luck charm. Conversations flow more easily after a smoke (6 uses).", items: ["Pipeweed (6 uses)"] },
        { roll: 2, text: "Stink Jar — Shattering it releases an odor so foul all nearby must make a STR save or immediately vomit (1 use).", items: ["Stink Jar (1 use)"] },
        { roll: 3, text: "Ivy Worm — Swallowed whole, it absorbs any toxins or rot before exiting the usual way.", items: ["Ivy Worm"] },
        { roll: 4, text: "Dream Stone — Smooth blue stone that helps recall dreams clearly. Overuse can cause dream-addiction.", items: ["Dream Stone"] },
        { roll: 5, text: "Drowning Rod — Finger-sized stick that doubles in size each time fully submerged in water. Doesn't shrink back down.", items: ["Drowning Rod"] },
        { roll: 6, text: "Rabbit's Foot — You were wearing it when they found you. Said to protect from witch magic (petty).", items: ["Rabbit's Foot (petty)"] },
      ]
    }
  },
  {
    id: "fungal-forager",
    name: "Fungal Forager",
    description: "You follow the whisperings of the deep earth, the rhythmic pulse of the mycelium forest growing beneath the surface. The dark holds no terror for you. Also, you really love mushrooms.",
    names: ["Unther", "Woozy", "Hilda", "Current", "Leif", "Ratan", "Mourella", "Lal", "Per", "Madrigal"],
    startingGear: ["3d6 Gold Pieces", "Rations (3 uses)", "Sharpened Trowel (d6)", "Candle Helmet (+1 Armor, dim, 6 uses)", "Rope (25ft)", "Metal Pail"],
    startingGoldDice: "3d6",
    specialRule: null,
    table1: {
      question: "What strange fungus did you discover?",
      entries: [
        { roll: 1, text: "Shrieking Trumpet — When exposed to light, screams so loudly all nearby attacks (including your own) are impaired (2 uses).", items: ["Shrieking Trumpet (2 uses)"] },
        { roll: 2, text: "Torch Fungus — When crushed, creates a cold blue light for a short while (2 uses).", items: ["Torch Fungus (2 uses)"] },
        { roll: 3, text: "Murderous Truffle — Pungent, highly toxic, very rare (worth 50gp to assassins). Illegal almost everywhere (1 use).", items: ["Murderous Truffle (1 use, 50gp, illegal)"] },
        { roll: 4, text: "Hellcap — Exposure to its aroma causes intense nausea and vomiting. Clears the room. Bottled (1 use).", items: ["Hellcap (bottled, 1 use)"] },
        { roll: 5, text: "Sproutcup — Ingest to shrink to mouse-size (belongings stay the same size). You return to normal within the hour, often in fits and starts (1 use).", items: ["Sproutcup (1 use)"] },
        { roll: 6, text: "Rootflower — White fungus found only on corpses underground. Ingest to restore d6 WIL. You will dream of the dead and their stories (1 use).", items: ["Rootflower (1 use)"] },
      ]
    },
    table2: {
      question: "What keeps you sane, even in utter darkness?",
      entries: [
        { roll: 1, text: "Glowsnail — Casts a soft bioluminescent light. Feeds on one ration every two days.", items: ["Glowsnail (eats 1 ration/2 days)"] },
        { roll: 2, text: "Silk Moth Shawl — Weatherproof blanket; can also douse a fire without being damaged.", items: ["Silk Moth Shawl"] },
        { roll: 3, text: "Milkflower — Gentle stimulant. Chewing it makes you immune to panic for one hour (3 uses).", items: ["Milkflower (3 uses)"] },
        { roll: 4, text: "Luxcompass — Hums softly as it moves closer to the Sun. Eventually the noise becomes unbearably loud.", items: ["Luxcompass"] },
        { roll: 5, text: "Sloth-Tarp — Tough weatherproof fabric for hanging off trees. When inside, +1 Armor.", items: ["Sloth-Tarp (+1 Armor when inside)"] },
        { roll: 6, text: "Miner's Grease — Great for dislodging gems, tools, or limbs from tight cracks. Highly explosive (3 uses).", items: ["Miner's Grease (3 uses, explosive)"] },
      ]
    }
  },
  {
    id: "greenwise",
    name: "Greenwise",
    description: "You delve deep into the Wood, prying its secrets from between rough boughs and whispering leaves. To this verdant kingdom, you are no mere scholar but its confidant.",
    names: ["Gunther", "Moss", "Fern", "Lichen", "Root", "Willow", "Sage", "Yarrow", "Rowan", "Ash"],
    startingGear: ["3d6 Gold Pieces", "Rations (3 uses)", "Torch (3 uses)", "Iron Pot", "Root Knife (d6)", "Healing Salve (restores 1d4 STR, 1 use)", "Twine Bauble (petty, Ward once/day)"],
    startingGoldDice: "3d6",
    specialRule: null,
    table1: {
      question: "How has the Wood failed you?",
      entries: [
        { roll: 1, text: "A forest spirit cursed you for stealing, marking you as an enemy of their kind. Take a Bezoar Stone — ingesting it cures any poison (1 use, unless retrieved).", items: ["Bezoar Stone (1 use)"] },
        { roll: 2, text: "A close friend disappeared into the forest. You see their face in any tea you brew. Take a Soporific Concoction (3 uses).", items: ["Soporific Concoction (3 uses)"] },
        { roll: 3, text: "You were poisoned, losing your sense of taste and smell. You can now withstand noxious fumes. Always carry Antitoxin (2 uses).", items: ["Antitoxin (2 uses)"] },
        { roll: 4, text: "Radical experiments turned your skin green. You gain nourishment as a plant — no rations needed, but a day without sufficient sunlight and water leaves you deprived.", items: [] },
        { roll: 5, text: "Your corpseflower won a local contest, then promptly killed a judge. Take Prize Money (100gp) and a warrant for your arrest.", items: [], gold: 100 },
        { roll: 6, text: "You created a restorative tincture that also causes accidental infertility. Take a Healing Potion (completely restores STR). Only you know the unintended side effects.", items: ["Healing Potion (restores full STR)"] },
      ]
    },
    table2: {
      question: "What keeps you safe while in the Wood?",
      entries: [
        { roll: 1, text: "Amadou — Vermilion fungus that catches fire easily (3 uses).", items: ["Amadou (3 uses)"] },
        { roll: 2, text: "Delphinium — Breathe water for up to one hour (1 use, divisible into fractional doses).", items: ["Delphinium (1 use)"] },
        { roll: 3, text: "Tacky Stalk — Woody reed that hardens into a permanent adhesive when chewed (2 uses).", items: ["Tacky Stalk (2 uses)"] },
        { roll: 4, text: "Wisp Lantern — Dim light in wrought iron, so long as the wisp can feed on nearby pain and fear.", items: ["Wisp Lantern"] },
        { roll: 5, text: "Seed Bomb — Canvas sack of seeds that explode on impact (d6, blast, 3 uses).", items: ["Seed Bomb (d6, blast, 3 uses)"] },
        { roll: 6, text: "Briarvine — Entangles any creature up to horse size (STR to break free, reusable).", items: ["Briarvine (reusable)"] },
      ]
    }
  },
  {
    id: "half-witch",
    name: "Half Witch",
    description: "Born of both the mortal world and the unseen, you are an enigma to some and feared by many. Yours is the tale of what happens when two worlds collide.",
    names: ["Solena", "Veles", "Bryn", "Sabine", "Razvan", "Rowena", "Galen", "Nyx", "Vex", "Iwan"],
    startingGear: ["3d6 Gold Pieces", "Rations (3 uses)", "Torch (3 uses)", "Spellbook: Thicket", "Iron Dagger (d6)", "Herbs Pouch (restore 1 STR, 3 uses)", "Ghillie Suit"],
    startingGoldDice: "3d6",
    specialRule: null,
    table1: {
      question: "What did you bring back from the Unseelie court?",
      entries: [
        { roll: 1, text: "Black Rose Fiddle (bulky) — Its music causes intense sadness and immobility in nearby mortals. Others are merely fascinated. You don't know how to play.", items: ["Black Rose Fiddle (bulky)"] },
        { roll: 2, text: "Paper Legs — Extremely light; fall a few stories without getting hurt. Avoid tearing or getting them wet.", items: ["Paper Legs"] },
        { roll: 3, text: "A Living Nightmare that dwells within you, manifesting when you're in danger. It has your same Attributes and HP, attacks with claws (d8+d8). Disappears on Critical Damage (take 1d4 WIL damage), reappearing at the next full moon.", items: [] },
        { roll: 4, text: "A Raven Familiar (8 HP, 3 STR, 11 DEX, 13 WIL, beak d6). It speaks as an intelligent being and is entirely devoted to you.", items: ["Raven Familiar (8 HP, 3 STR, 11 DEX, 13 WIL)"] },
        { roll: 5, text: "A Briar Thorn — Can pierce any organic material painfully but leaves no trace of the intrusion.", items: ["Briar Thorn"] },
        { roll: 6, text: "A Fae creature's True Name — Use it to summon its owner for one great service, but only once. Could fetch a hefty price from the right buyer.", items: ["Fae True Name (1 use)"] },
      ]
    },
    table2: {
      question: "What concoction do you carry?",
      entries: [
        { roll: 1, text: "Rebirth Ash — Remnants of a bark spirit. Reignite a dead fire or return a creature that died moments before to life (3 uses).", items: ["Rebirth Ash (3 uses)"] },
        { roll: 2, text: "Glamour Feather — Plume of a firebird. Makes any creature appear convincingly as someone (or something) else (1 use).", items: ["Glamour Feather (1 use)"] },
        { roll: 3, text: "Hawthorn Seed — An acorn from the other side. When planted, sprouts a luxurious shelter that collapses at moonrise the next day (1 use).", items: ["Hawthorn Seed (1 use)"] },
        { roll: 4, text: "Stonetree Sap — Sap obtained in exchange for blood. Hardens when rubbed on any surface (+1 Armor, 3 uses).", items: ["Stonetree Sap (+1 Armor, 3 uses)"] },
        { roll: 5, text: "Nightdust Powder — Made from the ritual burning of six owls. When tossed in the air, day turns to night for a short while (2 uses).", items: ["Nightdust Powder (2 uses)"] },
        { roll: 6, text: "Hex Stone — From a river flowing from the other side. Removed from its iron tin, it can absorb an active magical effect. If destroyed, the magic is released (1 use).", items: ["Hex Stone (1 use)"] },
      ]
    }
  },
  {
    id: "hexenbane",
    name: "Hexenbane",
    description: "You are a mere digit on the unerring hand of justice. You go where others fear to tread, unyielding and unbroken.",
    names: ["Percival", "Felix", "Isolde", "Wolfram", "Aldric", "Eira", "Oswin", "Ivor", "Brunhilda", "Beatrix"],
    startingGear: ["3d6 Gold Pieces", "Rations (3 uses)", "Torch (3 uses)", "Vestments of the Order (petty)", "Blessed Tinctures", "Silver Knife (d6)", "Crossbow (d8, bulky)"],
    startingGoldDice: "3d6",
    specialRule: null,
    table1: {
      question: "To which order do you belong?",
      entries: [
        { roll: 1, text: "Order of the Crossroads — Take a Pocket Leyfinder that points to nearby ley lines and arcane power. If you lose it, the punishment is death.", items: ["Pocket Leyfinder"] },
        { roll: 2, text: "Order of the Bleeding Star — Take a Star-Iron Mace (d8). Shines faintly in darkness and becomes very hot near witchcraft.", items: ["Star-Iron Mace (d8)"] },
        { roll: 3, text: "Order of the Glass Sigil — Take a Short Sword (d8) and Chainmail (2 Armor, bulky). You have contacts in most towns willing to aid, feed, or arm you.", items: ["Short Sword (d8)", "Chainmail (2 Armor, bulky)"] },
        { roll: 4, text: "Order of the Blank Eye — Take a Voidglass Shard. Peer through it to see invisible marks, creatures, and magical effects. Lose use of your eye for an hour afterward (you are deprived).", items: ["Voidglass Shard"] },
        { roll: 5, text: "Order of Canaas — Once per day, you can change into a wolf. Take a Quicksilver Chain — without it, you cannot shift back.", items: ["Quicksilver Chain"] },
        { roll: 6, text: "Order of the Silent Veil — Take a Quell Stone (2 uses) wrapped in burlap. Extinguishes nearby flames when exposed to air.", items: ["Quell Stone (2 uses)"] },
      ]
    },
    table2: {
      question: "What was your vow?",
      entries: [
        { roll: 1, text: "Honesty — Choose a weapon type. Attacks against you of this type are impaired. If broken, lose d4 WIL.", items: [] },
        { roll: 2, text: "Poverty — Carry the Disassemble Spellbook (only you can use it; if vow broken, it explodes for d12 STR damage). Disassemble: Any of your body parts may be detached and reattached at will, without pain or damage.", items: ["Spellbook: Disassemble"] },
        { roll: 3, text: "Selflessness — Immune to magical effects such as charm, hatred, and frenzy. If broken, lose d6 WIL.", items: [] },
        { roll: 4, text: "Mercy — Choose a weapon type. Attacks with it are enhanced. If broken, you can never use that weapon type again.", items: [] },
        { roll: 5, text: "Charity — Once per day, shrug off a Fatigue. If broken, permanently lose one inventory slot.", items: [] },
        { roll: 6, text: "Valor — The first time you inflict Critical Damage, receive +d4 HP, returning to previous limit at end of combat. If broken, you die.", items: [] },
      ]
    }
  },
  {
    id: "jongleur",
    name: "Jongleur",
    description: "What inspires the soul more than song, words, and spectacle? Why practice for years to master the arcane when you've already got real magic inside?",
    names: ["Jax", "Selene", "Baladria", "Ada", "Mort", "Saylor", "Tripp", "Lantos", "Echo", "Jubilo"],
    startingGear: ["3d6 Gold Pieces", "Rations (3 uses)", "Torch (3 uses)", "Costume", "Simple Instrument (Pipes, Lute, etc.)", "Lucky Jerkin (+1 Armor)", "Sling (d6)"],
    startingGoldDice: "3d6",
    specialRule: null,
    table1: {
      question: "What happened at your final performance?",
      entries: [
        { roll: 1, text: "An actor died and you were blamed. Take a lightweight Rapier (d6) and a false identity.", items: ["Rapier (d6)"] },
        { roll: 2, text: "The crowd loved your catchy tune about a noble's romantic failings. Take the Read Mind Spellbook and a warrant for your arrest. Read Mind: You can hear the surface thoughts of nearby creatures.", items: ["Spellbook: Read Mind"] },
        { roll: 3, text: "Your debut reduced the audience to murmuring about bright creatures descending from the sky. You noticed the notes resembled stellar constellations. Take a Book on Astronomy and many questions.", items: ["Book on Astronomy"] },
        { roll: 4, text: "You mocked a forgotten trickster god and were cursed to speak only in perfect rhyme. Take a Thesaurus (20gp) — without it, you are deprived.", items: ["Thesaurus (20gp)"] },
        { roll: 5, text: "You were scarred in an on-stage accident. The crowd cheered. Take well-worn Stage Mail (1 Armor), a memorable scar, and a fear of applause.", items: ["Stage Mail (1 Armor)"] },
        { roll: 6, text: "Your uncanny mimicry got you branded a witch (literally) and banished. Take an Uncanny Hand-Puppet and a Rabbit Skull (petty) that protects against charms.", items: ["Uncanny Hand-Puppet", "Rabbit Skull (petty, charm protection)"] },
      ]
    },
    table2: {
      question: "What trinket were you unable to leave behind?",
      entries: [
        { roll: 1, text: "False Cuffs — Comfortable, realistic-looking cuffs. Only you know the trick to get out of them.", items: ["False Cuffs"] },
        { roll: 2, text: "Pocket Theatre — Small puppets and a folding stage. Good for quick distractions.", items: ["Pocket Theatre"] },
        { roll: 3, text: "Ghost Violin — A dark-gray violin playing a haunting tune, mirrored by an invisible, distant twin.", items: ["Ghost Violin"] },
        { roll: 4, text: "Tragic Tales — Banned in proper company; becomes less bawdy and more harrowing toward the end. Worth 100gp.", items: ["Tragic Tales (100gp)"] },
        { roll: 5, text: "Mythos Mask — A plaster mask that allows you to take on a monster's countenance. Add a Fatigue when it comes off.", items: ["Mythos Mask"] },
        { roll: 6, text: "Rebreak Glass — A wine flute that can be broken multiple times, reforming after 24 hours. Makes a very loud noise.", items: ["Rebreak Glass"] },
      ]
    }
  },
  {
    id: "kettlewright",
    name: "Kettlewright",
    description: "You are known by the smell of molten metal and the jingle of tin. You are no mere merchant but an artisan of fire and metal.",
    names: ["Fergus", "Eon", "Bram", "Idris", "Hester", "Darragh", "Seren", "Rónán", "Berek", "Lorenz"],
    startingGear: ["3d6 Gold Pieces", "Rations (3 uses)", "Torch (3 uses)", "Pincers", "Roll of Tin", "Gloves (petty)", "Hammer (d6)"],
    startingGoldDice: "3d6",
    specialRule: null,
    table1: {
      question: "What is your trade?",
      entries: [
        { roll: 1, text: "Small contraptions for local guilds (no questions asked). Take extra 40gp and a wanted poster with your face. Given time and materials, you can open almost any door or vault.", items: [], gold: 40 },
        { roll: 2, text: "Home goods and tools hawked to townspeople. Take 20gp of items from the gear table. You are fluent in the Traveler's Cant.", items: [], gold: 20 },
        { roll: 3, text: "Military smelter, before peace destroyed your livelihood. Take a Smelting Hammer (d10, bulky) and Tin Helm (+1 Armor). Given time and materials, you can repair armor.", items: ["Smelting Hammer (d10, bulky)", "Tin Helm (+1 Armor)"] },
        { roll: 4, text: "Rare quality items for monasteries and nobles. Take a Spyglass, a Necklace (petty, 20gp), and a Scroll of Mirrorwalk. Mirrorwalk: A mirror becomes a gateway to another mirror that you looked into today.", items: ["Spyglass", "Necklace (petty, 20gp)", "Scroll: Mirrorwalk (petty)"] },
        { roll: 5, text: "Protection as a service. Start with +d4 HP, a Long Sword (d10, bulky), and a Gambeson (+1 Armor).", items: ["Long Sword (d10, bulky)", "Gambeson (+1 Armor)"] },
        { roll: 6, text: "Scavenge raw tin and iron from battlefields. Take a young Donkey (+4 slots, slow), a Crossbow (d8, bulky), and a Saw (d6).", items: ["Donkey (+4 slots, slow)", "Crossbow (d8, bulky)", "Saw (d6)"] },
      ]
    },
    table2: {
      question: "What never fails to get you out of trouble?",
      entries: [
        { roll: 1, text: "Fire Eggs — Six pellets of sea salt, wood, and crockery-dust. Explode at low heat (d8, blast) but flames dissipate quickly.", items: ["Fire Eggs (d8, blast, 6 uses)"] },
        { roll: 2, text: "Black Tar — Both sticky and highly flammable (3 uses).", items: ["Black Tar (3 uses)"] },
        { roll: 3, text: "Spiked Boots — Crack heads (d8) as easily as ice and muck. Travel is slower but easier.", items: ["Spiked Boots (d8)"] },
        { roll: 4, text: "Tinker's Paste — Seals shut any fist-sized opening (3 uses).", items: ["Tinker's Paste (3 uses)"] },
        { roll: 5, text: "Fireworks — Enough explosive material to blow off a finger or three (2 uses remain).", items: ["Fireworks (2 uses)"] },
        { roll: 6, text: "Carrion Cat — A clever pet small enough to hide in your pack (bulky). Scares off smaller predators. Requires one meat Ration per day. 3 HP, 5 STR, 15 DEX, 12 WIL.", items: ["Carrion Cat (bulky, 3 HP, 5 STR, 15 DEX, 12 WIL)"] },
      ]
    }
  },
  {
    id: "marchguard",
    name: "Marchguard",
    description: "Bound by blood Oath to patrol the border and protect the realm. Once sworn, the Oath cannot be broken. The Guard always finds their own.",
    names: ["Gann", "Light", "Saoirse", "Frost", "Thorn", "Reed", "Dirk", "Ragnar", "Brie", "Aasim"],
    startingGear: ["3d6 Gold Pieces", "Rations (3 uses)", "Lantern", "Oil Can (6 uses)", "Long Sword (d10, bulky)", "Boiled Leather (1 Armor)"],
    startingGoldDice: "3d6",
    specialRule: null,
    table1: {
      question: "Why did you take the Oath?",
      entries: [
        { roll: 1, text: "Long family tradition of serving. When taking the Supply action, your yield increases by one step (e.g. 1d4 becomes 1d6).", items: [] },
        { roll: 2, text: "As a convict, the Oath simply avoided punishment. Take a set of Lockpicks and a Key (petty) to a safehouse.", items: ["Lockpicks", "Safehouse Key (petty)"] },
        { roll: 3, text: "Noble-born, you joined to escape family trouble. Take a Goosefelt Tarp (fits two) that you stole before leaving home.", items: ["Goosefelt Tarp (fits 2)"] },
        { roll: 4, text: "When your family lost everything, you took the Oath to avoid becoming a burden. Take extra Rations (3 uses) and Throwing Knives (d6).", items: ["Rations (3 uses)", "Throwing Knives (d6)"] },
        { roll: 5, text: "Your life was saved by a Marchguard, and you were inspired to join. Take a Snare Trap and a Sketchbook filled with detailed drawings.", items: ["Snare Trap", "Sketchbook"] },
        { roll: 6, text: "You were in a dark place and needed direction. You're still not sure it was the right choice. Take an Oilskin Coat and Mapping Paper.", items: ["Oilskin Coat", "Mapping Paper"] },
      ]
    },
    table2: {
      question: "What do you carry as proof of your Oath?",
      entries: [
        { roll: 1, text: "Impressive Pin (petty) — Metal badge of honor. Can open doors but leaves a trail.", items: ["Impressive Pin (petty)"] },
        { roll: 2, text: "Oath Compass — Points not north, but to the nearest member of the Guard. Also tells you when they're getting close.", items: ["Oath Compass"] },
        { roll: 3, text: "Pullstones — Two jet-black stones. When separated, they always roll toward one another.", items: ["Pullstones (pair)"] },
        { roll: 4, text: "Fireflask — Highly alcoholic, strangely delicious. When thrown, creates a wall of flames 10ft high that burns out after a few minutes (1 use).", items: ["Fireflask (1 use)"] },
        { roll: 5, text: "Pain Band (petty) — Touch an injured creature to transfer their wounds to you. Recharge: wear while in perfect health — lose 1 STR permanently.", items: ["Pain Band (petty)"] },
        { roll: 6, text: "Poacher's Woe — Strongly-scented arrows (3 uses). Scent powerful enough to track with ease.", items: ["Poacher's Woe (3 uses)"] },
      ]
    }
  },
  {
    id: "mountebank",
    name: "Mountebank",
    description: "Wits are your sharpest weapon, a facade your strongest shield. But when you do lose, you lose badly.",
    names: ["Ambrose", "Lucius", "Beauregard", "Cornelius", "Aria", "Toph", "Indigo", "Delphine", "Solene", "Noa"],
    startingGear: ["3d6 Gold Pieces", "Rations (3 uses)", "Torch (3 uses)", "Cart (+4 slots, bulky when pulled)", "Trick Playing Cards", "Fancy Hat (petty)", "Cane Sword (d6)"],
    startingGoldDice: "3d6",
    specialRule: null,
    table1: {
      question: "How was your fraud exposed?",
      entries: [
        { roll: 1, text: "Your 'patients' kept reporting miraculous recoveries despite your lack of training. Start with Bandages (3 uses) and a knack for healing.", items: ["Bandages (3 uses)"] },
        { roll: 2, text: "After seducing a wealthy patron, their family sent criminals after you. Start with Beauty Cream (2 uses) — apply to appear irresistibly beautiful for 12 hours.", items: ["Beauty Cream (2 uses)"] },
        { roll: 3, text: "You were a peddler of fake prophesies, until one turned out to be true. Roll on the Omens table, keep it secret. Start with a concealable Knife (d6, petty).", items: ["Knife (d6, petty)"], rollOmens: true },
        { roll: 4, text: "Your latest stunt destroyed a priceless artifact and injured a dozen bystanders. Start with a Captain's Uniform (petty), a Ceremonial Sword (harmless, 60gp), and a Bouquet of Flowers.", items: ["Captain's Uniform (petty)", "Ceremonial Sword (60gp)", "Bouquet of Flowers"] },
        { roll: 5, text: "A hedgewitch cursed you for fooling innocent village folk. Magic acts unpredictably in your hands (WIL save to avoid disaster). The same applies to magic aimed at you.", items: [] },
        { roll: 6, text: "Your 'seances' used a cleverly hidden Spellbook of Auditory Illusion. A patron discovered your secret. Start with the spellbook and a Bundle of Scarves. Auditory Illusion: Create illusory sounds that seem to come from a direction of your choice.", items: ["Spellbook: Auditory Illusion", "Bundle of Scarves"] },
      ]
    },
    table2: {
      question: "What keepsake could always identify you?",
      entries: [
        { roll: 1, text: "Royal Crest — Born into royalty, you chose a different life. The crest grants access but alerts your family of your whereabouts.", items: ["Royal Crest"] },
        { roll: 2, text: "Miracle Oil — Smelly, slippery concoction (2 uses).", items: ["Miracle Oil (2 uses)"] },
        { roll: 3, text: "Surgeon's Soap — Lye and ash block that makes skin temporarily transparent, revealing the anatomy within (4 uses).", items: ["Surgeon's Soap (4 uses)"] },
        { roll: 4, text: "Goat Powder — Derived from the placenta of a baby goat. Temporarily cures any affliction, but symptoms return within hours.", items: ["Goat Powder"] },
        { roll: 5, text: "Cursed Sapphire — Worth 200gp; noticeably returns to your pocket shortly after you spend it. You can't seem to get rid of it.", items: ["Cursed Sapphire (200gp, returns to pocket)"] },
        { roll: 6, text: "Alchemical Tattoo (petty) — A dog, cat, or bird that can leave your body on demand. Follows commands; can pass its injuries (as STR loss) back onto you.", items: ["Alchemical Tattoo (petty)"] },
      ]
    }
  },
  {
    id: "outrider",
    name: "Outrider",
    description: "Your coin comes from escorting caravans, tracking fugitives, or lending your blade to a cause. You've been a savior, an executioner, a hero, and even a villain. Yours is not a solitary path — you'll always have your horse.",
    names: ["Drake", "Cyra", "Keir", "Darius", "Valen", "Rorik", "Yara", "Rui", "Talon", "Jory"],
    startingGear: ["3d6 Gold Pieces", "Rations (3 uses)", "Torch (3 uses)", "Long Sword (d10, bulky)", "Leather Jerkin (1 Armor)", "Crossbow (d8, bulky)", "Spyglass"],
    startingGoldDice: "3d6",
    specialRule: null,
    table1: {
      question: "What personal code do you uphold?",
      entries: [
        { roll: 1, text: "No innocent blood — Take a Steadymade Buckler (+1 Armor). While held, you cannot be moved so long as both feet are planted on firm ground.", items: ["Steadymade Buckler (+1 Armor)"] },
        { roll: 2, text: "Revere the tools of death — Take a Wyrmbone Whetstone. After a half-hour sharpening ritual, attacks with that weapon are enhanced until STR damage is dealt.", items: ["Wyrmbone Whetstone"] },
        { roll: 3, text: "To the death, always — Take a Death-Whistle (1 charge). Its scream frightens all who hear it (save WIL or flee). Recharge: Capture the final breath of a dying warrior.", items: ["Death-Whistle (1 charge)"] },
        { roll: 4, text: "Revere the dead — Take an extra 30gp. You always place two gold pieces on the eyelids of a slain foe. Somehow you always find the coin.", items: [], gold: 30 },
        { roll: 5, text: "Loyalty to the work — Take a Tally Stick. Once a vow is marked on its face, the stick hardens (d8) until complete. The stick will snap in half if the vow is broken.", items: ["Tally Stick"] },
        { roll: 6, text: "Always pay your debts — Take a blacked-out ledger. Also, roll a second time on the Bonds table.", items: ["Blacked-out Ledger"], rollBonds: true },
      ]
    },
    table2: {
      question: "What breed is your horse?",
      entries: [
        { roll: 1, text: "Heavy Destrier — Built for war. 8 HP, 1 Armor, hooves (d10+d10), +2 slots.", items: ["Horse: Heavy Destrier (8 HP, 1 Armor, +2 slots)"] },
        { roll: 2, text: "Blacklegged Dandy — Hardy and adaptable. Tough or Perilous terrain one step easier. 6 HP, +4 slots.", items: ["Horse: Blacklegged Dandy (6 HP, +4 slots)"] },
        { roll: 3, text: "Rivertooth — Impressively strong for heavy loads. 4 HP, +6 slots (only +2 if carrying two people).", items: ["Horse: Rivertooth (4 HP, +6 slots)"] },
        { roll: 4, text: "Piebald Cob — Intelligent; understands simple commands; instinct for danger. 6 HP, +4 slots.", items: ["Horse: Piebald Cob (6 HP, +4 slots)"] },
        { roll: 5, text: "Linden White — Highly trained and agile (no DEX save to flee). 4 HP, +3 slots.", items: ["Horse: Linden White (4 HP, +3 slots)"] },
        { roll: 6, text: "Stray Fogger — Wild but very fast, even in Tough terrain. Rides light. 4 HP, +2 slots.", items: ["Horse: Stray Fogger (4 HP, +2 slots)"] },
      ]
    }
  },
  {
    id: "prowler",
    name: "Prowler",
    description: "You are a specter in the night, a fleeting shadow that slips by its prey, unseen. Each kill is a test of cunning and animal determination. You know one day you will lose. You look forward to it.",
    names: ["Winda", "Brielle", "Theron", "Chayse", "Nuja", "Dev", "Raven", "Baruani", "Arawan", "Sable"],
    startingGear: ["3d6 Gold Pieces", "Rations (3 uses)", "Torch (3 uses)", "Tarp (shelters 1)", "Boiled Leather (1 Armor)", "Short Sword (d6)", "Spring-Loaded Trap (4 STR damage)"],
    startingGoldDice: "3d6",
    specialRule: null,
    table1: {
      question: "What did you last hunt?",
      entries: [
        { roll: 1, text: "A mock firefly, baiting water carriers with its lure. Take an Alchemical Limb (d8, petty when worn) and Oil Can (6 uses). The limb is immune to heat and poison but needs daily oiling.", items: ["Alchemical Limb (d8, petty when worn)", "Oil Can (6 uses)"] },
        { roll: 2, text: "An ice nettle draining sheep. You lost your commission when the fungus you introduced killed half the flock. Take a Rime Seed (1 use) — freezes any body of water. Don't eat it.", items: ["Rime Seed (1 use, freezes water)"] },
        { roll: 3, text: "A silver marsh crawler that killed someone close to you. Take its Tooth (petty) on a chain. It hums softly when something is stalking you.", items: ["Marsh Crawler Tooth (petty, stalker detector)"] },
        { roll: 4, text: "A malicious forest spirit that poisoned a homestead. Take a Heartseed (plant it to create a new forest). Also take Iron Bracers (+1 Armor, bulky).", items: ["Heartseed (creates forest)", "Iron Bracers (+1 Armor, bulky)"] },
        { roll: 5, text: "A hollow wolf. You nursed it back to health; now it is loyal to you unto death and is a great tunneler. 5 HP, 11 STR, 13 DEX, 8 WIL, teeth (d6).", items: ["Hollow Wolf companion (5 HP, 11 STR, 13 DEX, 8 WIL)"] },
        { roll: 6, text: "An azure warbler — the gametes fetch a good price if properly extracted. Take a Paring Knife (d6), an extra 20gp, and a pang of regret.", items: ["Paring Knife (d6)"], gold: 20 },
      ]
    },
    table2: {
      question: "What tool is always in your pack?",
      entries: [
        { roll: 1, text: "Fermented Spirits — Keeps you warm; can also be used as an explosive (3 uses).", items: ["Fermented Spirits (3 uses)"] },
        { roll: 2, text: "Trail Shaker — Noisy instrument that reveals nearby trails, even deeply hidden ones.", items: ["Trail Shaker"] },
        { roll: 3, text: "Drowse Balm — Wax bar. Boiled in water, the steam acts as a soporific agent.", items: ["Drowse Balm"] },
        { roll: 4, text: "Spike and Cord — For traversing difficult terrain or creating makeshift traps.", items: ["Spike and Cord"] },
        { roll: 5, text: "Iron Rattle — Noisemaker for distracting or scaring quarry. Sounds convincingly like a snake.", items: ["Iron Rattle"] },
        { roll: 6, text: "Hardening Glue — Makes any flat material as hard as stone. Expensive (20gp a bottle, 3 uses).", items: ["Hardening Glue (3 uses, 20gp)"] },
      ]
    }
  },
  {
    id: "rill-runner",
    name: "Rill Runner",
    description: "You sing the stories of rivers and lakes, your talents soothing friends and the elements alike. You've seen more than most, but somehow it never seems to be enough.",
    names: ["Gale", "Piper", "Brook", "Adair", "Stone", "Dale", "Wren", "Cliff", "Rain", "Robin"],
    startingGear: ["3d6 Gold Pieces", "Rations (3 uses)", "Torch (3 uses)", "Water Shoes", "Brigandine (1 Armor, bulky)", "Compass", "Dagger (d6)"],
    startingGoldDice: "3d6",
    specialRule: null,
    table1: {
      question: "What songs are you best known for?",
      entries: [
        { roll: 1, text: "The Tinker's Two-Step — Take a Reed Whistle. Anyone in earshot must pass a WIL save to perform an act of violence.", items: ["Reed Whistle"] },
        { roll: 2, text: "The Sylph and Her Lover — Take a Breeze Knot (3 charges). Creates a strong breeze. Recharge: Tie it to a mast during a storm.", items: ["Breeze Knot (3 charges)"] },
        { roll: 3, text: "Harper's Devotion — Take a Celestial Lute. Reveals the constellations above, no matter the weather.", items: ["Celestial Lute"] },
        { roll: 4, text: "The Reed Fisher — Take a spool of River Twine (5 uses). Each dip into a river guarantees a catch, though it might not be pleasant.", items: ["River Twine (5 uses)"] },
        { roll: 5, text: "Song of the Silver Stream — Take a Stone Flute that can calm almost any river.", items: ["Stone Flute"] },
        { roll: 6, text: "The Thrush and the Meadow — Take a Feather Quill (1 use, petty). A map drawn with it reveals the most expedient course between any two points.", items: ["Feather Quill (1 use, petty)"] },
      ]
    },
    table2: {
      question: "What pays your way across the land?",
      entries: [
        { roll: 1, text: "Performance — Performing at taverns always yields room and board. Start with extra d6 gold.", items: [] },
        { roll: 2, text: "Bodyguard — You protect those afraid to travel alone. Start with a Rapier (d8).", items: ["Rapier (d8)"] },
        { roll: 3, text: "Wares — You buy low and sell high. Take one item worth 20gp or less from the gear table.", items: [] },
        { roll: 4, text: "Transport — You deliver 'delicate' packages throughout the lands. You have at least one contact in any major town.", items: [] },
        { roll: 5, text: "Sailor's Friend — You always make sure a ship reaches its destination. Passage is always free for you.", items: [] },
        { roll: 6, text: "Guide — You shepherd caravans across water-soaked lands. Start with a Map relevant to your next journey.", items: ["Map (relevant to next journey)"] },
      ]
    }
  },
  {
    id: "scrivener",
    name: "Scrivener",
    description: "You copy ancient texts and illuminate manuscripts, recording the voices of the clever, the great, and the powerful. You will prove that the pen truly is mightier than the sword.",
    names: ["Lazlo", "Stilo", "Akshara", "Pisa", "Ji-Yun", "Kalamos", "Hugo", "Shui", "Kalam", "Julius"],
    startingGear: ["3d6 Gold Pieces", "Rations (3 uses)", "Torch (3 uses)", "Quill & Ink", "Blank Book", "Awl (d6)", "Badge (petty)"],
    startingGoldDice: "3d6",
    specialRule: null,
    table1: {
      question: "What work did you keep for yourself?",
      entries: [
        { roll: 1, text: "The Wild Tongue — Bundle of leather-bound scrolls cataloging the hidden languages of beasts and how to understand them.", items: ["The Wild Tongue (scroll bundle)"] },
        { roll: 2, text: "The Silent Symphony — Bound in fluorescent wrap. Very rare; chronicles the subtle signs used by those employing invisibility magic.", items: ["The Silent Symphony"] },
        { roll: 3, text: "A Treatise on the Abyss — A nondescript black book. In-depth, largely theoretical text describing the Roots, with information about the location of a nearby Gate.", items: ["A Treatise on the Abyss"] },
        { roll: 4, text: "The Star Waltz — Comet-shaped clasp in fine leather. Detailed astronomical charts, celestial movements, and stellar festivals. Worth 100gp to travelers.", items: ["The Star Waltz (100gp)"] },
        { roll: 5, text: "The Cathedral and the Canopy — Large-leaf binding over vellum. Nominally a children's storybook; the margins detail traveling, eating, and sleeping in cloud forests.", items: ["The Cathedral and the Canopy"] },
        { roll: 6, text: "Garden of Glass — Bound in another book's cover. A heretical work describing materials, procedures, and optimal locations required to open a Gate.", items: ["Garden of Glass (heretical tome)"] },
      ]
    },
    table2: {
      question: "How do you transcribe sensitive information?",
      entries: [
        { roll: 1, text: "Fib Ink — Glows when used to write true statements; fades when writing false ones.", items: ["Fib Ink"] },
        { roll: 2, text: "Cipher Stone — A pair of sharp black stones. Each decrypts any message written by the other.", items: ["Cipher Stone (pair)"] },
        { roll: 3, text: "Everquill (petty) — A quill that writes on any surface. You still need ink.", items: ["Everquill (petty)"] },
        { roll: 4, text: "Whisper Vial — Whisper a message into the vial, and it plays back to whoever opens it next.", items: ["Whisper Vial"] },
        { roll: 5, text: "Sanguine Lens — Extracts blood from a target without their knowledge. A stolen drop placed on the eye reveals memories from the past day.", items: ["Sanguine Lens"] },
        { roll: 6, text: "Echo Leaf — Blank parchment. Whoever unfurls it sees their actions of the day slowly revealed in tight scrawl.", items: ["Echo Leaf"] },
      ]
    }
  }
]

export function getBackgroundById(id) {
  return backgrounds.find(b => b.id === id) || null
}

export function deriveArmorFromGear(gearList) {
  let armor = 0
  const armorKeywords = {
    'brigandine': 1, 'boiled leather': 1, 'padded leather': 1, 'leather jerkin': 1,
    'lucky jerkin': 1, 'stage mail': 1, 'chainmail': 2, 'chain mail': 2,
    'plate': 3, 'candle helmet': 1, 'tin helm': 1,
  }
  const shieldKeywords = { 'shield': 1, 'buckler': 1 }

  for (const item of gearList) {
    const lower = item.toLowerCase()
    for (const [kw, val] of Object.entries(armorKeywords)) {
      if (lower.includes(kw)) { armor = Math.max(armor, val); break }
    }
    for (const [kw, val] of Object.entries(shieldKeywords)) {
      if (lower.includes(kw)) { armor = Math.min(3, armor + val); break }
    }
  }
  return armor
}
