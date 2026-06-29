export interface PackageNameResolver {
  from: RegExp
  to: string
}

export const packageResolvers = {
  tt: [
    {
      from: /^@doraemon-ui\/miniprogram\./,
      to: '@doraemon-ui/tt.',
    },
  ],

  alipay: [
    {
      from: /^@doraemon-ui\/miniprogram\./,
      to: '@doraemon-ui/alipay.',
    },
  ],
}

export function resolvePackageName(pkgName: string, platform: string) {
  const resolvers = packageResolvers[platform as keyof typeof packageResolvers]

  if (!resolvers) {
    return pkgName
  }

  let result = pkgName

  for (const resolver of resolvers) {
    result = result.replace(resolver.from, resolver.to)
  }

  return result
}
