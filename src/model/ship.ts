export type ShipData = {
  ownerId: string
  starId: string | null
  targetStarId: string | null
  starName: string | null
  targetStarName: string | null
  health: number
  arrivalTime: Date | null
  status: number
  lastHarvested: Date
  speed: number
  fuel: number
  name: string
  tokenId: number | null
}

export type Ship = {
  id: string
} & ShipData