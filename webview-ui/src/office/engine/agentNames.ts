const ADJECTIVES = [
  'swift', 'clever', 'bold', 'calm', 'bright', 'keen', 'witty', 'brave',
  'noble', 'deft', 'chill', 'happy', 'lucky', 'plucky', 'snappy', 'zippy',
  'cosmic', 'fuzzy', 'mighty', 'nimble', 'quirky', 'steady', 'wily', 'zesty',
]

const ANIMALS = [
  'fox', 'otter', 'panda', 'falcon', 'wolf', 'owl', 'lynx', 'robin',
  'badger', 'heron', 'koala', 'raven', 'gecko', 'mantis', 'tiger', 'ibis',
  'bear', 'hawk', 'newt', 'viper', 'crane', 'finch', 'moose', 'squid',
]

export function generateName(usedNames: Set<string>): string {
  for (let i = 0; i < 100; i++) {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
    const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)]
    const name = `${adj}-${animal}`
    if (!usedNames.has(name)) return name
  }
  // Fallback: append number
  let n = 1
  while (true) {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
    const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)]
    const name = `${adj}-${animal}-${n}`
    if (!usedNames.has(name)) return name
    n++
  }
}
