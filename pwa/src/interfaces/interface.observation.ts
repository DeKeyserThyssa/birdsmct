import Bird from "./interface.bird"
import Area from "./interface.location"

export default interface Observation {
  id: string
  name: string
  userId?: string
  weather?: string
  bird: Bird
  area: Area
  description?: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}
