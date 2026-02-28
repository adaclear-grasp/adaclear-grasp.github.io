export type Domain = 'sim' | 'real'
export type Obstacles = 2 | 4 | 6

export interface RowSpec {
  domain: Domain
  object: string
  runs: number[] 
}

export const OBSTACLE_OPTIONS: Obstacles[] = [2, 4, 6]

export const ROWS: RowSpec[] = [
  { domain: 'real', object: 'apple', runs: [1, 2] },
  { domain: 'real', object: 'cube', runs: [1, 2] },
  { domain: 'real', object: 'mug', runs: [1, 2] },

  { domain: 'sim', object: 'apple', runs: [1, 2, 3] },
  { domain: 'sim', object: 'ball', runs: [1, 2, 3] },
  { domain: 'sim', object: 'can', runs: [1, 2, 3] },
  { domain: 'sim', object: 'cube', runs: [1, 2, 3] },
  { domain: 'sim', object: 'lego', runs: [1, 2, 3] },
  { domain: 'sim', object: 'mug', runs: [1, 2, 3] },
  { domain: 'sim', object: 'pear', runs: [1, 2, 3] },
]
