import { Configuration } from './config'
import * as characterService from './services/character'

export interface Context {
  configuration: Configuration
  characterService: typeof characterService
}
