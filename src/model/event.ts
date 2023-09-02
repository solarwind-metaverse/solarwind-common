export type EventData = {
  userId: string
  type: number
  text: string
  seen: boolean
  closed: boolean
}

export type Event = EventData & {
  id: string
}