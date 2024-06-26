import type { ComponentPublicInstance, ComponentRenderProxy, Doraemon } from './init'
import { getPublicInstance } from './expose'
import { getData } from './components'

export function initRefs (vm: Doraemon) {
  const components = vm.$options.components || {}
  const parentNodes: string[] = []
  const childrenNodes: string[] = []
  const refNodes: Array<{ ref: string, path: string }> = []
  for (const key in components) {
    const { module: componentName, type = 'child' } = getData(components[key])
    if (['ancestor', 'parent'].includes(type)) {
      parentNodes.push(componentName)
    } else if (['child', 'descendant'].includes(type)) {
      childrenNodes.push(componentName)
    }
    refNodes.push({
      ref: key,
      path: componentName,
    })
  }
  Object.defineProperty(vm, '$parent', {
    get () {
      const nodes = parentNodes
        .slice(0, 1)
        .reduce<ComponentPublicInstance[]>((acc, path) => ([
          ...acc,
          ...find(vm, path),
        ]), [])
      return nodes && nodes[0]
    },
  })
  Object.defineProperty(vm, '$root', {
    get () {
      return (this as ComponentPublicInstance).$parent ? (this.$parent as ComponentPublicInstance).$root : vm
    },
  })
  Object.defineProperty(vm, '$children', {
    get () {
      const nodes = childrenNodes
        .reduce<ComponentPublicInstance[]>((acc, path) => ([
          ...acc,
          ...find(vm, path),
        ]), [])
      return nodes
    },
  })
  Object.defineProperty(vm, '$refs', {
    get () {
      const nodes = refNodes
        .reduce<{ [key: string]: ComponentPublicInstance | ComponentPublicInstance[] }>((acc, node) => ({
          ...acc,
          [node.ref]: find(vm, node.path),
        }), {})
      return nodes
    },
  })
}

function find (vm: Doraemon, path: string) {
  const nodes = vm._renderProxy.getRelationNodes(path) as ComponentRenderProxy<Doraemon>[]
  if (nodes && nodes.length > 0) {
    return nodes.map((v) => getPublicInstance(v.$component)) as unknown as ComponentPublicInstance[]
  }
  return []
}
