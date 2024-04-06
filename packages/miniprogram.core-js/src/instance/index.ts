
import { Doraemon } from './init'
import { eventsMixin, renderMixin, stateMixin } from './mixin'

stateMixin(Doraemon)
eventsMixin(Doraemon)
renderMixin(Doraemon)

export {
  Doraemon,
}

export type {
  DoraemonClass,
  ComponentRenderProxy,
  ComponentPublicInstance,
  ComponentCustomProperties,
  ComponentInternalInstance
} from './init'
