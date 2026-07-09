import { Doraemon } from './init'
import { eventsMixin, renderMixin, stateMixin } from './mixin'

stateMixin(Doraemon)
eventsMixin(Doraemon)
renderMixin(Doraemon)

export { Doraemon }

export type { Config } from './config'
export type {
  ComponentCustomProperties,
  ComponentInternalInstance,
  ComponentPublicInstance,
  ComponentRenderProxy,
  DoraemonClass,
} from './init'
