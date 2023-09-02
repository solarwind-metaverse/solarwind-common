import { Event } from './event'

export type User = {
  id: string
  email: string
  address: string
  username?: string
  events?: Event[]
}