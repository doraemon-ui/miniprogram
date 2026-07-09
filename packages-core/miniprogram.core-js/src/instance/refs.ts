import type { ChildRelationType, ParentRelationType, RelationType } from '../types/options'
import { getData } from './components'
import type { ComponentPublicInstance, Doraemon } from './init'
import { findLogicalAncestors, normalizeNodes } from './logicalTree'

export function initRefs(vm: Doraemon) {
  const components = vm.$options.components || {}
  const parentNodes: Array<{ path: string; type: ParentRelationType }> = []
  const childrenNodes: Array<{ path: string; type: ChildRelationType }> = []
  const refNodes: Array<{ ref: string; path: string; type: RelationType }> = []
  for (const key in components) {
    const { module: componentName, type = 'child' } = getData(components[key])
    if (['ancestor', 'parent'].includes(type)) {
      parentNodes.push({ path: componentName, type: type as ParentRelationType })
    } else if (['child', 'descendant'].includes(type)) {
      childrenNodes.push({ path: componentName, type: type as ChildRelationType })
    }
    refNodes.push({
      ref: key,
      path: componentName,
      type,
    })
  }
  Object.defineProperty(vm, '$parent', {
    get() {
      const nodes = parentNodes
        .slice(0, 1)
        .reduce<ComponentPublicInstance[]>((acc, node) => [...acc, ...find(vm, node.path, node.type)], [])
      return nodes && nodes[0]
    },
  })
  Object.defineProperty(vm, '$root', {
    get() {
      return (this as ComponentPublicInstance).$parent ? (this.$parent as ComponentPublicInstance).$root : vm
    },
  })
  Object.defineProperty(vm, '$children', {
    get() {
      const nodes = childrenNodes.reduce<ComponentPublicInstance[]>((acc, node) => [...acc, ...find(vm, node.path, node.type)], [])
      return nodes
    },
  })
  Object.defineProperty(vm, '$refs', {
    get() {
      const nodes = refNodes.reduce<{ [key: string]: ComponentPublicInstance | ComponentPublicInstance[] }>(
        (acc, node) => ({
          ...acc,
          [node.ref]: find(vm, node.path, node.type),
        }),
        {},
      )
      return nodes
    },
  })
}

function find(vm: Doraemon, path: string, type: RelationType = 'child') {
  return normalizeNodes(findLogicalAncestors(vm, path, type))
}
