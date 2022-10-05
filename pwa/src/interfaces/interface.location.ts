import Bird from './interface.bird'
import Observation from './interface.observation'

export default interface Area {
  id: string
  name: string
  observations: Observation[]
  area: string
  createdAt?: Date
  updatedAt?: Date
}
