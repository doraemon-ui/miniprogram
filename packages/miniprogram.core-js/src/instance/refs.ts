import { getData } from './components'
import { getPublicInstance } from './expose'

export function initRefs (vm) {
  const components = vm.$options.components || {}
  const parentNodes = []
  const childrenNodes = []
  const refNodes = []
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
        .reduce((acc, path) => ([
          ...acc,
          ...find(vm, path),
        ]), [])
      return nodes && nodes[0]
    },
  })
  Object.defineProperty(vm, '$root', {
    get () {
      return this.$parent ? this.$parent.$root : vm
    },
  })
  Object.defineProperty(vm, '$children', {
    get () {
      const nodes = childrenNodes
        .reduce((acc, path) => ([
          ...acc,
          ...find(vm, path),
        ]), [])
      return nodes
    },
  })
  Object.defineProperty(vm, '$refs', {
    get () {
      const nodes = refNodes
        .reduce((acc, node) => ({
          ...acc,
          [node.ref]: find(vm, node.path),
        }), {})
      return nodes
    },
  })
}

function find (vm, path: string) {
  const nodes = vm._renderProxy.getRelationNodes(path)
  if (nodes && nodes.length > 0) {
    return nodes.map((v) => getPublicInstance(v.$component))
  }
  return []
}
