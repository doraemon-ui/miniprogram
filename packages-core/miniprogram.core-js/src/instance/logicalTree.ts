import type { RelationType } from '../types/options'
import { ENV_TYPE, getEnv } from '../util/env'
import { getData } from './components'
import { getPublicInstance } from './expose'
import type { ComponentPublicInstance, ComponentRenderProxy, Doraemon } from './init'

const logicalOwnerMap = new WeakMap<ComponentRenderProxy<Doraemon>, ComponentRenderProxy<Doraemon> | null>()
const logicalChildrenMap = new WeakMap<ComponentRenderProxy<Doraemon>, ComponentRenderProxy<Doraemon>[]>()

function ensureLogicalChildren(node: ComponentRenderProxy<Doraemon>) {
  if (!logicalChildrenMap.has(node)) {
    logicalChildrenMap.set(node, [])
  }
  return logicalChildrenMap.get(node) || []
}

function getLogicalOwner(node: ComponentRenderProxy<Doraemon>) {
  return logicalOwnerMap.get(node) || null
}

function setLogicalOwner(node: ComponentRenderProxy<Doraemon>, owner: ComponentRenderProxy<Doraemon> | null) {
  logicalOwnerMap.set(node, owner)
}

function removeLogicalChild(parent: ComponentRenderProxy<Doraemon>, child: ComponentRenderProxy<Doraemon>) {
  logicalChildrenMap.set(
    parent,
    ensureLogicalChildren(parent).filter((item) => item !== child),
  )
}

function addLogicalChild(parent: ComponentRenderProxy<Doraemon>, child: ComponentRenderProxy<Doraemon>) {
  const children = ensureLogicalChildren(parent)
  if (!children.includes(child)) {
    logicalChildrenMap.set(parent, children.concat(child))
  }
}

function collectLogicalDescendants(node: ComponentRenderProxy<Doraemon>) {
  const result: ComponentRenderProxy<Doraemon>[] = []

  ensureLogicalChildren(node).forEach((child) => {
    result.push(child)
    result.push(...collectLogicalDescendants(child))
  })

  return result
}

function getLogicalNames(node: ComponentRenderProxy<Doraemon>) {
  const names = new Set<string>()
  const ctorName = node.$component?.constructor?.name
  const optionName = node.$component?.$options?.name

  if (typeof ctorName === 'string' && ctorName) names.add(ctorName)
  if (typeof optionName === 'string' && optionName) names.add(optionName)

  return Array.from(names)
}

function matchByAliases(node: ComponentRenderProxy<Doraemon>, aliases: string[]) {
  if (!aliases.length) return false
  const names = getLogicalNames(node)
  return aliases.some((alias) => names.includes(alias))
}

function getOwnerLogicalNode(node: ComponentRenderProxy<Doraemon>) {
  if (typeof node.selectOwnerComponent !== 'function') {
    return null
  }

  let owner = node.selectOwnerComponent() as ComponentRenderProxy<Doraemon> | null
  while (owner) {
    if (owner.$component) {
      return owner
    }
    owner =
      typeof owner.selectOwnerComponent === 'function' ? (owner.selectOwnerComponent() as ComponentRenderProxy<Doraemon> | null) : null
  }

  return null
}

function linkParent(node: ComponentRenderProxy<Doraemon>, parent: ComponentRenderProxy<Doraemon>) {
  const owner = getLogicalOwner(node)
  if (owner === parent) return
  if (owner) {
    removeLogicalChild(owner, node)
  }
  setLogicalOwner(node, parent)
  addLogicalChild(parent, node)
}

function unlinkParent(node: ComponentRenderProxy<Doraemon>, parent: ComponentRenderProxy<Doraemon>) {
  if (getLogicalOwner(node) === parent) {
    removeLogicalChild(parent, node)
    setLogicalOwner(node, null)
  }
}

export function logicalTree() {
  return Behavior({
    lifetimes: {
      created() {
        const node = this as ComponentRenderProxy<Doraemon>
        setLogicalOwner(node, null)
        logicalChildrenMap.set(node, [])
      },
      ready() {
        const node = this as ComponentRenderProxy<Doraemon>
        const owner = getOwnerLogicalNode(node)
        if (owner) {
          linkParent(node, owner)
        }
      },
      detached() {
        const node = this as ComponentRenderProxy<Doraemon>
        const owner = getLogicalOwner(node)
        if (owner) {
          unlinkParent(node, owner)
        }
        logicalChildrenMap.delete(node)
        logicalOwnerMap.delete(node)
      },
    },
  })
}

export function findLogicalAncestorsByAliases(vm: Doraemon, aliases: string[], directOnly = false) {
  const matches: ComponentRenderProxy<Doraemon>[] = []
  let owner = getLogicalOwner(vm._renderProxy)

  while (owner) {
    if (matchByAliases(owner, aliases)) {
      matches.push(owner)
      if (!directOnly) break
    }
    if (directOnly) break
    owner = getLogicalOwner(owner)
  }

  return matches
}

export function findLogicalDescendantsByAliases(vm: Doraemon, aliases: string[], directOnly = false) {
  const source = vm._renderProxy
  const nodes = directOnly ? ensureLogicalChildren(source) : collectLogicalDescendants(source)
  return nodes.filter((node) => matchByAliases(node, aliases))
}

export function normalizeNodes(nodes: ComponentRenderProxy<Doraemon>[]) {
  return nodes.map((node) => getPublicInstance(node.$component)).filter(Boolean) as ComponentPublicInstance[]
}

export function getAliasesByPath(vm: Doraemon, path: string) {
  const components = vm.$options.components || {}
  const aliases = Object.keys(components).filter((key) => getData(components[key]).module === path)
  return aliases
}

export function findLogicalAncestors(vm: Doraemon, path: string, type: RelationType = 'child') {
  if (getEnv() === ENV_TYPE.WEAPP) {
    const nodes = vm._renderProxy.getRelationNodes(path) as ComponentRenderProxy<Doraemon>[]
    if (nodes && nodes.length > 0) {
      return nodes
    }
    return []
  }

  const aliases = getAliasesByPath(vm, path)
  if (!aliases.length) return []

  if (type === 'ancestor') {
    return findLogicalAncestorsByAliases(vm, aliases, false)
  }
  if (type === 'parent') {
    return findLogicalAncestorsByAliases(vm, aliases, true)
  }
  if (type === 'descendant') {
    return findLogicalDescendantsByAliases(vm, aliases, false)
  }
  return findLogicalDescendantsByAliases(vm, aliases, true)
}
