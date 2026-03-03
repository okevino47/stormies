const PET_NAMES = [
  'Whiskers', 'Luna', 'Pixel', 'Mochi', 'Bean', 'Nibbles', 'Biscuit', 'Patches',
  'Sprout', 'Pebble', 'Gizmo', 'Waffle', 'Clover', 'Pepper', 'Maple', 'Ziggy',
  'Olive', 'Noodle', 'Cosmo', 'Hazel', 'Chip', 'Daisy', 'Basil', 'Cinnamon',
  'Pudding', 'Marble', 'Pippin', 'Truffle', 'Sage', 'Acorn',
]

export function generatePetName(usedNames: Set<string>): string {
  // Try to find an unused name
  const available = PET_NAMES.filter((n) => !usedNames.has(n))
  if (available.length > 0) {
    return available[Math.floor(Math.random() * available.length)]
  }
  // Fallback: append number
  let n = 2
  while (true) {
    const base = PET_NAMES[Math.floor(Math.random() * PET_NAMES.length)]
    const name = `${base} ${n}`
    if (!usedNames.has(name)) return name
    n++
  }
}
