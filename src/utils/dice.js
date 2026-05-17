export const rollDie = (sides) => Math.floor(Math.random() * sides) + 1
export const roll3d6 = () => rollDie(6) + rollDie(6) + rollDie(6)
export const rollD20 = () => rollDie(20)
export const rollD10 = () => rollDie(10)
export const rollD6 = () => rollDie(6)
export const roll2d20plus10 = () => rollDie(20) + rollDie(20) + 10
export const rollD4 = () => rollDie(4)
