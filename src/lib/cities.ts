export const cities = [
  { slug: 'queen-creek', name: 'Queen Creek' },
  { slug: 'gilbert', name: 'Gilbert' },
  { slug: 'chandler', name: 'Chandler' },
  { slug: 'tempe', name: 'Tempe' },
  { slug: 'san-tan-valley', name: 'San Tan Valley' },
  { slug: 'mesa', name: 'Mesa' },
  { slug: 'apache-junction', name: 'Apache Junction' },
] as const;

export type City = (typeof cities)[number];
