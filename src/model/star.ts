export type StarData = {
  edr3Id: string
  ra: string
  dec: string
  pmRa: number
  pmDec: number
  parallax: number
  mass: number
  radius: number
  temperature: number
  magnitude: number
  luminosity: number
  evolutionaryStage: string
  spectralType: string
  age: number
  name: string
  tokenId: number
  ownerId: string
  shipCount: number
}

export type StarLocation = {
  x: number
  y: number
  z: number
}

export type Star = {
  id: string
} & StarLocation & StarData

export type NearestStar = {
  distance: number
} & Star

export type StarWithNeighbours = {
  nearestStars: NearestStar[]
} & Star
