import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'cairn_characters'

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function persist(chars) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chars))
}

export function useCharacters() {
  const [characters, setCharacters] = useState(load)

  const save = useCallback((character) => {
    setCharacters(prev => {
      const updated = { ...character, updatedAt: Date.now() }
      const idx = prev.findIndex(c => c.id === character.id)
      const next = idx >= 0
        ? prev.map((c, i) => i === idx ? updated : c)
        : [...prev, updated]
      persist(next)
      return next
    })
  }, [])

  const remove = useCallback((id) => {
    setCharacters(prev => {
      const next = prev.filter(c => c.id !== id)
      persist(next)
      return next
    })
  }, [])

  const getById = useCallback((id) => {
    return load().find(c => c.id === id) || null
  }, [])

  return { characters, save, remove, getById }
}

export function createEmptyCharacter() {
  return {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    name: '',
    background: '',
    age: 30,
    traits: {
      physique: '', skin: '', hair: '', face: '',
      clothing: '', virtue: '', vice: '', speech: ''
    },
    backgroundChoices: { table1: null, table2: null },
    backgroundItems: [],
    str: { current: 10, max: 10 },
    dex: { current: 10, max: 10 },
    wil: { current: 10, max: 10 },
    hp: { current: 4, max: 4 },
    armor: 0,
    gold: 0,
    isDeprived: false,
    inventory: [],
    spellbooks: [],
    scrolls: [],
    relics: [],
    bond: null,
    omens: [],
    scars: [],
    notes: '',
    backgroundTableDescriptions: {
      table1: { question: '', text: '' },
      table2: { question: '', text: '' },
    },
    containers: [],
  }
}
