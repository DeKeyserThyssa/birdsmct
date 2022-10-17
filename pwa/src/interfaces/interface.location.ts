import Bird from './interface.bird'
import Observation from './interface.observation'
import {Polygon} from 'geojson'

export default interface Area {
  id?: string
  name: string
  observations: Observation[]
  // area: string
  surface: Polygon
  createdAt?: Date
  updatedAt?: Date
}
