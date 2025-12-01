export const randomVector = (r: number): [number, number, number] => [
  r / 2 - Math.random() * r,
  r / 2 - Math.random() * r,
  r / 2 - Math.random() * r,
]

export const randomEuler = (): [number, number, number] => [
  Math.random() * Math.PI,
  Math.random() * Math.PI,
  Math.random() * Math.PI,
]
